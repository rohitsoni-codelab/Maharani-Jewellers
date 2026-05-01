import { getProductBySlug, getProducts } from '@/lib/dataFetcher';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { STORE_DETAILS, GEO, SITE_URL } from '@/lib/constants';
import Script from 'next/script';
import { constructMetadata } from '@/lib/metadata';
import ProductCard from '@/components/ui/ProductCard';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return constructMetadata({
    title: `${product.name} in Dhanbad | ${STORE_DETAILS.name}`,
    description: product.description,
    path: `/product/${slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p: any) => p.slug !== slug).slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map((img: string) => `${SITE_URL}${img}`),
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": STORE_DETAILS.name
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/product/${slug}`,
      "priceCurrency": "INR",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": STORE_DETAILS.name
      }
    }
  };

  const whatsappMessage = `Hi, I'm interested in the ${product.name} from your Dhanbad store.`;
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-brand-gold">Home</a> &gt; 
          <a href={`/collections/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-brand-gold">{product.category}</a> &gt; 
          <span className="text-brand-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <Image 
                src={product.images[0]} 
                alt={`${product.name} in Dhanbad`} 
                fill 
                priority 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <Image src={img} alt={`${product.name} details ${idx + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-playfair text-3xl md:text-5xl text-brand-black mb-4">{product.name}</h1>
            <p className="text-xl text-brand-gold mb-6">{product.price}</p>
            <div className="prose prose-sm text-gray-600 mb-8">
              <p>{product.description}</p>
              <ul className="mt-4 space-y-2">
                <li><span className="font-medium">Weight:</span> {product.weight}</li>
                <li><span className="font-medium">Purity:</span> Hallmark Certified</li>
                <li><span className="font-medium">Location:</span> Available at Dhanbad Store</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white text-center rounded-lg hover:bg-[#128C7E] transition-colors font-medium shadow-md">
                Enquire via WhatsApp
              </a>
              <a href={`tel:${STORE_DETAILS.phone}`} className="px-8 py-4 bg-brand-black text-white text-center rounded-lg hover:bg-brand-gold transition-colors font-medium shadow-md">
                Call Store Now
              </a>
            </div>

            <div className="mt-12 p-6 bg-brand-light rounded-xl flex items-start gap-4">
              <div className="bg-brand-gold/20 p-3 rounded-full shrink-0">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <h4 className="font-medium text-brand-black mb-1">Available at our Dhanbad Store</h4>
                <p className="text-sm text-gray-500">{STORE_DETAILS.address}</p>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="pt-12 border-t border-gray-100">
            <h2 className="font-playfair text-3xl text-brand-black mb-8 text-center">Similar Jewellery in Dhanbad</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: any) => (
                <ProductCard key={p.slug} {...p} image={p.images[0]} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
