import ProductCard from '@/components/ui/ProductCard';
import TrustBadges from '@/components/ui/TrustBadges';
import { CATEGORIES } from '@/data/mockData';
import { STORE_DETAILS, GEO } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/ui/HeroSlider';
import { getProducts } from '@/lib/dataFetcher';

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
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the finest jewellery in Dhanbad, crafted with precision and passion since {STORE_DETAILS.since}.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
              <Link href={cat.link} key={cat.slug} className="group block relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-500 hover:-translate-y-2">
                <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="font-playfair text-xl text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-brand-black mb-4 text-gradient">Trending in Dhanbad</h2>
            <p className="text-gray-600">Our most loved pieces by the people of Dhanbad.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product: any, index: number) => (
              <ProductCard 
                key={product.slug}
                {...product}
                image={product.images[0]}
                priority={index < 2}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/collections/gold" className="inline-block px-8 py-3 border-2 border-brand-black text-brand-black font-medium hover:bg-brand-black hover:text-white transition-colors duration-300">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-brand-black mb-4">Visit Our Store in Katrash, Dhanbad</h2>
            <p className="text-gray-600">Located at Bhelatand Mor, Katrash. Experience our premium collection in person.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-brand-light p-4 rounded-3xl shadow-sm">
            <div className="aspect-video w-full rounded-2xl overflow-hidden relative bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.250550085444!2d86.41725515!3d23.7957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a70a842eb351%3A0x6b74e7fc7868832a!2sDhanbad%2C%20Jharkhand%2C%20India!5e0!3m2!1sen!2sus!4v1714457220000!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Maharani Jewellers Dhanbad Location"
              ></iframe>
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
              <div className="text-center md:text-left">
                <p className="font-medium text-brand-black">{STORE_DETAILS.address}</p>
                <p className="text-gray-500 mt-1">Open today: 10:00 AM - 8:00 PM</p>
              </div>
              <div className="flex gap-4 shrink-0">
                <a 
                  href={`tel:${STORE_DETAILS.phone}`}
                  className="px-6 py-3 bg-brand-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Call Store
                </a>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand-gold text-brand-black font-medium rounded-lg hover:bg-brand-soft-gold transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
