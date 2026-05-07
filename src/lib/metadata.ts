import { Metadata } from "next";
import { SITE_URL, STORE_DETAILS } from "./constants";

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}

export function constructMetadata({
  title,
  description,
  path,
  image,
  keywords = [],
}: MetadataProps): Metadata {
  const defaultKeywords = [
    "jewellery shop Katrash",
    "gold jewellery Katrash",
    "diamond jewellery Katrash",
    "hallmark jewellery Jharkhand",
    "Maharani Jewellers",
    "bridal jewellery Katrash",
    "jewellery near Bhelatand",
    "22k gold Katrash",
    ...keywords,
  ];

  return {
    title,
    description,
    keywords: defaultKeywords,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: STORE_DETAILS.name,
      images: [
        {
          url: image || `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${STORE_DETAILS.name} — Premium Jewellery in Katrash`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || `${SITE_URL}/og-image.jpg`],
    },
    other: {
      "geo.region": "IN-JH",
      "geo.placename": "Katrash",
      "geo.position": "23.768168;86.317318",
      "ICBM": "23.768168, 86.317318",
    },
  };
}
