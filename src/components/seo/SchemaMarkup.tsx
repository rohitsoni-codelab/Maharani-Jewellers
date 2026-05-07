import { STORE_DETAILS, GEO, SITE_URL } from "@/lib/constants";
import Script from "next/script";

export function GlobalSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: STORE_DETAILS.name,
    image: `${SITE_URL}/og-image.jpg`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: STORE_DETAILS.phone,
    email: STORE_DETAILS.email,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bhelatand Mor, Opposite Kali Mandir",
      addressLocality: "Katrash",
      addressRegion: "Jharkhand",
      postalCode: "828103",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
    sameAs: [
      `https://instagram.com/${STORE_DETAILS.instagram}`,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Jewellery Collection",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Gold Jewellery",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "22K Gold Necklaces" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gold Bangles" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gold Earrings" } },
          ]
        },
        {
          "@type": "OfferCatalog",
          name: "Diamond Jewellery",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Diamond Rings" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Diamond Necklaces" } },
          ]
        },
        {
          "@type": "OfferCatalog",
          name: "Bridal Collection",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bridal Sets" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Kundan Jewellery" } },
          ]
        }
      ]
    }
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "@id": SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "120",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gold Jewellery",
        item: `${SITE_URL}/collections/gold`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Diamond Jewellery",
        item: `${SITE_URL}/collections/diamond`,
      },
    ],
  };

  return (
    <>
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="aggregate-rating-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
