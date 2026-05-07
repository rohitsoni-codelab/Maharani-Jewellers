import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { HomepageConfig } from '@/models/HomepageConfig';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    await connectToDatabase();
    const config = await HomepageConfig.findOne({ slug: 'main' }).populate('featuredCollections');
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch CMS config' }, { status: 500 });
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
    
    const config = await HomepageConfig.findOneAndUpdate(
      { slug: 'main' },
      { ...body, slug: 'main' },
      { new: true, upsert: true }
    );
    
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, data: config });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
