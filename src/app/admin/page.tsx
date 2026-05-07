import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  let products = [];
  try {
    const db = await connectToDatabase();
    if (db) {
      // Fetch products and parse to standard JSON to avoid Next.js serialization errors for MongoDB ObjectIds
      const docs = await Product.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
      products = JSON.parse(JSON.stringify(docs));
    }
  } catch (error) {
    console.error("Failed to fetch products for admin:", error);
  }

  return <AdminDashboard userEmail={session.user?.email || "Admin"} initialProducts={products} />;
}
