import ProductCard from '@/components/ui/ProductCard';
import TrustBadges from '@/components/ui/TrustBadges';
import { CATEGORIES } from '@/data/mockData';
import { STORE_DETAILS, GEO } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/ui/HeroSlider';
import { getProducts } from '@/lib/dataFetcher';
import MapSection from '@/components/ui/MapSection';
import ProductShowcase from '@/components/ui/ProductShowcase';
import PremiumImage from '@/components/ui/PremiumImage';

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      
      {/* Categories Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-brand-black mb-4">Discover Our Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the finest jewellery in Katrash, crafted with precision and passion since {STORE_DETAILS.since}.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
              <Link href={cat.link} key={cat.slug} className="group block relative overflow-hidden rounded-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-500 hover:-translate-y-2">
                <PremiumImage 
                  src={cat.image} 
                  alt={cat.name} 
                  className="transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="font-playfair text-xl text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductShowcase initialProducts={products} />

      <TrustBadges />

      <MapSection />
    </div>
  );
}
