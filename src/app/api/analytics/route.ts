import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { Collection } from '@/models/Collection';
import { Enquiry } from '@/models/Enquiry';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const [
      totalProducts,
      publishedProducts,
      totalCollections,
      totalEnquiries,
      newEnquiries
    ] = await Promise.all([
      Product.countDocuments({ isDeleted: { $ne: true } }),
      Product.countDocuments({ $or: [{ status: 'published' }, { status: { $exists: false } }], isDeleted: { $ne: true } }),
      Collection.countDocuments({ isDeleted: { $ne: true } }),
      Enquiry.countDocuments({}),
      Enquiry.countDocuments({ status: 'new' })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        publishedProducts,
        totalCollections,
        totalEnquiries,
        newEnquiries
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
