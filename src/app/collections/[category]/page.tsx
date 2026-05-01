import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import ProductCard from '@/components/ui/ProductCard';
import { constructMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { STORE_DETAILS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const formattedCategory = category.replace('-', ' ');
  return constructMetadata({
    title: `${formattedCategory.toUpperCase()} in Dhanbad | ${STORE_DETAILS.name}`,
    description: `Explore the finest ${formattedCategory} collection at ${STORE_DETAILS.name} in Dhanbad.`,
    path: `/collections/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const formattedCategory = category.replace('-', ' ').toLowerCase();
  
  const products = PRODUCTS.filter(p => p.category.toLowerCase().includes(formattedCategory));
  const categoryTitle = CATEGORIES.find(c => c.slug === category)?.name || formattedCategory.replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-gold">Home</Link> &gt; 
        <span className="text-brand-black">{categoryTitle}</span>
      </div>

      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl text-brand-black mb-6">{categoryTitle} in Dhanbad</h1>
        <p className="text-gray-600">
          Explore the best {categoryTitle.toLowerCase()} in Dhanbad. Crafted with precision, our collection at {STORE_DETAILS.name} brings you timeless elegance and hallmark certified purity. Visit our Dhanbad store to view these exquisite pieces in person.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {products.map((p, index) => (
          <ProductCard key={p.slug} {...p} image={p.images[0]} priority={index < 4} />
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            More {categoryTitle} coming soon to our Dhanbad store.
          </div>
        )}
      </div>

      <div className="bg-brand-light rounded-2xl p-8 text-center mt-12">
        <h3 className="font-playfair text-2xl text-brand-black mb-4">Looking for something specific?</h3>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link href="/gold-jewellery-dhanbad" className="px-6 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition-all text-brand-black">Gold Jewellery in Dhanbad</Link>
          <Link href="/diamond-jewellery-dhanbad" className="px-6 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition-all text-brand-black">Diamond Jewellery in Dhanbad</Link>
          <Link href="/jewellery-shop-dhanbad" className="px-6 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition-all text-brand-black">Our Dhanbad Store</Link>
        </div>
      </div>
    </div>
  );
}
