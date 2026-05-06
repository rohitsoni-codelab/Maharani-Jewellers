import { STORE_DETAILS, SITE_URL, GEO } from '@/lib/constants';

export default function MapSection() {
  const whatsappNumber = STORE_DETAILS.whatsapp || STORE_DETAILS.phone;
  const whatsappMsg = encodeURIComponent("Hi, I want to visit your jewellery shop in Katrash.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMsg}`;
  
  const mapSchema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": STORE_DETAILS.name,
    "image": `${SITE_URL}/images/logo.png`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": STORE_DETAILS.phone,
    "email": STORE_DETAILS.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhelatand Mor, Opposite Kali Mandir, Katrash",
      "addressLocality": "Katrash",
      "addressRegion": "Jharkhand",
      "postalCode": "828103",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GEO.lat,
      "longitude": GEO.lng
    }
  };

  return (
    <section className="py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mapSchema) }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-brand-black mb-4">Visit Our Jewellery Shop in Katrash</h2>
          <p className="text-gray-600">Located at Bhelatand Mor. Experience our premium hallmark gold and diamond collection in person.</p>
        </div>
        <div className="max-w-5xl mx-auto bg-brand-light p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100">
          {/* Map Container */}
          <div className="aspect-video sm:aspect-[21/9] w-full rounded-2xl overflow-hidden relative bg-gray-200 border border-gray-200">
            <iframe 
              src={`https://maps.google.com/maps?q=${GEO.lat},${GEO.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`} 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Maharani Jewellers Katrash Location"
            ></iframe>
          </div>
          
          {/* Location Details & CTAs */}
          <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6 px-2 md:px-4 pb-2">
            <div className="text-center lg:text-left">
              <h3 className="font-playfair text-xl font-bold text-brand-black mb-2">Maharani Jewellers</h3>
              <p className="text-gray-700 text-sm md:text-base">Bhelatand Mor, Opposite Kali Mandir</p>
              <p className="text-gray-700 text-sm md:text-base">Katrash, Jharkhand – 828103</p>
              <p className="text-gray-700 font-medium mt-2">Phone: {STORE_DETAILS.phone}</p>
              <p className="text-gray-700 text-sm italic">{STORE_DETAILS.email}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a 
                href="https://maps.app.goo.gl/WzSwyHP1u9YhaE469"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-8 py-3.5 bg-brand-black text-white text-center font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
              >
                Get Directions
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-8 py-3.5 bg-[#25D366] text-white text-center font-medium rounded-lg hover:bg-[#20bd5a] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
