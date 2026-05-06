import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import ProductCard from '@/components/ui/ProductCard';
import { constructMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { STORE_DETAILS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const formattedCategory = category.replace('-', ' ');
  return constructMetadata({
    title: `${formattedCategory.toUpperCase()} in Katrash | ${STORE_DETAILS.name}`,
    description: `Explore the finest ${formattedCategory} collection at ${STORE_DETAILS.name} in Katrash.`,
    path: `/collections/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const formattedCategory = category.replace('-', ' ').toLowerCase();
  
  const products = PRODUCTS.filter(p => p.category.toLowerCase().includes(formattedCategory));
  const categoryTitle = CATEGORIES.find(c => c.slug === category)?.name || formattedCategory.replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex justify-center mb-10 md:mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 flex items-center gap-3">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-brand-black font-bold">{categoryTitle}</span>
          </div>
        </nav>

        {/* Luxury Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="font-playfair text-4xl md:text-6xl text-brand-black mb-6 tracking-tight">
            {categoryTitle}
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="h-[1px] w-12 bg-brand-gold"></div>
          </div>

          <p className="text-lg md:text-xl text-brand-black font-light mb-4 italic">
            Timeless Elegance in Katrash
          </p>
          
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Discover our curated selection of certified {categoryTitle.toLowerCase()}, crafted for the most discerning tastes in Jharkhand.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href={`tel:${STORE_DETAILS.phone}`} 
              className="w-full sm:w-auto px-10 py-3.5 bg-brand-black text-brand-gold text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 rounded-sm shadow-lg shadow-brand-gold/5"
            >
              Call for Enquiry
            </a>
            <a 
              href="https://maps.app.goo.gl/WzSwyHP1u9YhaE469" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-10 py-3.5 border border-gray-200 text-brand-black text-xs font-bold uppercase tracking-[0.2em] hover:border-brand-gold/50 hover:text-brand-gold transition-all duration-300 rounded-sm"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-24">
          {products.map((p, index) => (
            <ProductCard key={p.slug} {...p} image={p.images[0]} priority={index < 4} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 italic">
              More masterpieces coming soon to our Katrash store.
            </div>
          )}
        </div>

        {/* Bottom SEO Section - Clean & Minimal */}
        <div className="max-w-3xl mx-auto border-t border-gray-100 pt-16 mb-16">
          <h2 className="font-playfair text-2xl text-brand-black mb-8 text-center uppercase tracking-widest">About The Collection</h2>
          <div className="prose prose-sm md:prose-base text-gray-500 mx-auto text-center leading-loose">
            <p>
              Explore the best {categoryTitle.toLowerCase()} in Katrash. Crafted with precision, our collection at {STORE_DETAILS.name} brings you timeless elegance and hallmark certified purity. Since {STORE_DETAILS.since}, we have been the trusted choice for families looking for exquisite craftsmanship and transparency.
            </p>
            <p>
              Our Katrash store showcases a wide variety of designs, from traditional heirloom pieces to contemporary diamond creations. Every piece is certified to ensure the highest standards of quality for our valued customers.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            <Link href="/gold-jewellery-katrash" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-gold border-b border-transparent hover:border-brand-gold transition-all pb-1">Gold in Katrash</Link>
            <span className="text-gray-200">•</span>
            <Link href="/diamond-jewellery-katrash" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-gold border-b border-transparent hover:border-brand-gold transition-all pb-1">Diamond in Katrash</Link>
            <span className="text-gray-200">•</span>
            <Link href="/jewellery-shop-katrash" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-gold border-b border-transparent hover:border-brand-gold transition-all pb-1">Visit Store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
