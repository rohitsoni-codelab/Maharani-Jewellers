import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { PRODUCTS } from '@/data/mockData';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, data: PRODUCTS });
    }
    
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    if (products.length === 0) {
      return NextResponse.json({ success: true, data: PRODUCTS });
    }
    
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not connected' }, { status: 503 });
    }
    
    const body = await request.json();
    
    // Auto-generate slug if not provided or to ensure uniqueness
    const baseSlug = (body.slug || body.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existingProduct = await Product.findOne({ slug: baseSlug });
    if (existingProduct) {
      body.slug = `${baseSlug}-${Date.now()}`;
    } else {
      body.slug = baseSlug;
    }

    const product = await Product.create(body);
    
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create product' }, { status: 400 });
  }
}
