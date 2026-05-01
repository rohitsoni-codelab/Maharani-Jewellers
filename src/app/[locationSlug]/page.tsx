import { SEO_PAGES } from '@/data/seoPages';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';
import { STORE_DETAILS, GEO } from '@/lib/constants';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/dataFetcher';

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
    description: `Looking for the best ${pageData.keyword} in Dhanbad? Visit ${STORE_DETAILS.name} at Bhelatand Mor. Hallmark certified pure jewellery.`,
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
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-gold">Home</Link> &gt; 
        <span className="text-brand-black">{pageData.title}</span>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-playfair text-4xl md:text-5xl text-brand-black mb-6">{pageData.title}</h1>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p>
            Welcome to {STORE_DETAILS.name}, the premier destination for <strong>{pageData.keyword} in Dhanbad</strong>. 
            Since {STORE_DETAILS.since}, we have been serving the people of Dhanbad with the finest, hallmark certified jewellery. 
            Our commitment to purity, transparency, and exquisite craftsmanship makes us the trusted choice for families across Jharkhand.
          </p>
          <p>
            Whether you are looking for traditional designs or modern elegance, our extensive collection of {pageData.keyword} is crafted to perfection. 
            Visit our store located conveniently at {STORE_DETAILS.address} to explore our exclusive ranges.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <a href={`tel:${STORE_DETAILS.phone}`} className="px-8 py-3 bg-brand-black text-white rounded-lg hover:bg-brand-gold transition-colors font-medium">
            Call for Enquiry
          </a>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-brand-black text-brand-black rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Get Directions
          </a>
        </div>
      </div>

      <section className="mb-20">
        <h2 className="font-playfair text-3xl text-brand-black mb-8 text-center">Featured {pageData.keyword} Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p: any, index: number) => (
            <ProductCard key={p.slug} {...p} image={p.images[0]} priority={index < 2} />
          ))}
        </div>
      </section>

      {/* Map Section embedded again for SEO context */}
      <section className="bg-brand-light p-8 rounded-3xl">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl text-brand-black mb-2">Visit Our Dhanbad Store</h2>
          <p className="text-gray-600">Find the best {pageData.keyword} at {STORE_DETAILS.name}</p>
        </div>
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
      </section>
    </div>
  );
}
