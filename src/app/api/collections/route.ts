import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Collection } from '@/models/Collection';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    await connectToDatabase();
    
    const query: any = { isDeleted: { $ne: true } };
    if (!isAdmin) {
      query.$or = [{ status: 'published' }, { status: { $exists: false } }];
    }
    
    const collections = await Collection.find(query).sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: collections });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch collections' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const collection = await Collection.create(body);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, data: collection }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
