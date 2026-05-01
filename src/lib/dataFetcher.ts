import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { PRODUCTS } from '@/data/mockData';

export async function getProducts() {
  try {
    const db = await connectToDatabase();
    if (!db) return PRODUCTS;
    const products = await Product.find({}).sort({ createdAt: -1 });
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
    const product = await Product.findOne({ slug });
    if (!product) return PRODUCTS.find(p => p.slug === slug);
    return JSON.parse(JSON.stringify(product));
  } catch (e) {
    return PRODUCTS.find(p => p.slug === slug);
  }
}
