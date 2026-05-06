import { SEO_PAGES } from '@/data/seoPages';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';
import { STORE_DETAILS, GEO } from '@/lib/constants';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/dataFetcher';
import MapSection from '@/components/ui/MapSection';

export async function generateStaticParams() {
  return SEO_PAGES.map((page) => ({
    locationSlug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locationSlug: string }> }) {
  const { locationSlug } = await params;
  const pageData = SEO_PAGES.find(p => p.slug === locationSlug);
  if (!pageData) return {};

  return constructMetadata({
    title: `${pageData.title} | ${STORE_DETAILS.name}`,
    description: `Looking for the best ${pageData.keyword} in Katrash? Visit ${STORE_DETAILS.name} at Bhelatand Mor. Hallmark certified pure jewellery.`,
    path: `/${locationSlug}`,
  });
}

export default async function LocationSEOPage({ params }: { params: Promise<{ locationSlug: string }> }) {
  const { locationSlug } = await params;
  const pageData = SEO_PAGES.find(p => p.slug === locationSlug);
  
  if (!pageData) {
    notFound();
  }

  // Find related products based on keyword
  const allProducts = await getProducts();
  const keywordLower = pageData.keyword.toLowerCase();
  let relatedProducts = allProducts.filter((p: any) => 
    p.category.toLowerCase().includes(keywordLower) || 
    p.name.toLowerCase().includes(keywordLower) ||
    p.keywords.some((k: string) => k.toLowerCase().includes(keywordLower))
  );

  if (relatedProducts.length === 0) {
    relatedProducts = allProducts.slice(0, 4); // fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex justify-center mb-10 md:mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 flex items-center gap-3">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-brand-black font-bold">{pageData.title}</span>
          </div>
        </nav>

        {/* Luxury Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="font-playfair text-4xl md:text-6xl text-brand-black mb-6 tracking-tight">
            {pageData.title}
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="h-[1px] w-12 bg-brand-gold"></div>
          </div>

          <p className="text-lg md:text-xl text-brand-black font-light mb-4 italic">
            Certified Excellence in Katrash
          </p>
          
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Explore the finest selection of {pageData.keyword} in Katrash, where every piece tells a story of hallmark certified purity and timeless beauty.
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

        <section className="mb-24">
          <h2 className="font-playfair text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-12 text-center font-bold italic">Featured Selection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {relatedProducts.map((p: any, index: number) => (
              <ProductCard key={p.slug} {...p} image={p.images[0]} priority={index < 2} />
            ))}
          </div>
        </section>

        {/* Bottom SEO Section */}
        <div className="max-w-3xl mx-auto border-t border-gray-100 pt-16 mb-16">
          <h2 className="font-playfair text-2xl text-brand-black mb-8 text-center uppercase tracking-widest">About Our {pageData.keyword}</h2>
          <div className="prose prose-sm md:prose-base text-gray-500 mx-auto text-center leading-loose">
            <p>
              Welcome to {STORE_DETAILS.name}, the premier destination for <strong>{pageData.keyword} in Katrash</strong>. 
              Since {STORE_DETAILS.since}, we have been serving the people of Katrash with the finest, hallmark certified jewellery. 
              Our commitment to purity, transparency, and exquisite craftsmanship makes us the trusted choice for families across Jharkhand.
            </p>
            <p>
              Whether you are looking for traditional designs or modern elegance, our extensive collection is crafted to perfection. 
              Visit our store located conveniently at {STORE_DETAILS.address} to explore our exclusive ranges in person.
            </p>
          </div>
        </div>

        <MapSection />
      </div>
    </div>
  );
}
