import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { PRODUCTS } from '@/data/mockData';

export async function getProducts() {
  try {
    const db = await connectToDatabase();
    if (!db) return PRODUCTS;
    // Only return published and non-deleted products for the public site
    // Include legacy products that don't have a status field yet
    const products = await Product.find({ 
      isDeleted: { $ne: true },
      $or: [{ status: 'published' }, { status: { $exists: false } }]
    }).sort({ sortOrder: 1, createdAt: -1 });
    
    if (products.length === 0) return PRODUCTS;
    // Serialize mongoose docs to plain JS objects to avoid Server Component hydration errors
    return JSON.parse(JSON.stringify(products)); 
  } catch (e) {
    return PRODUCTS;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const db = await connectToDatabase();
    if (!db) return PRODUCTS.find(p => p.slug === slug);
    const product = await Product.findOne({ 
      slug,
      isDeleted: { $ne: true },
      $or: [{ status: 'published' }, { status: { $exists: false } }]
    });
    if (!product) return PRODUCTS.find(p => p.slug === slug);
    return JSON.parse(JSON.stringify(product));
  } catch (e) {
    return PRODUCTS.find(p => p.slug === slug);
  }
}
