import { Metadata } from "next";
import { SITE_URL } from "./constants";

interface MetadataProps {
  title: string;
  description: string;
  path: string;
}

export function constructMetadata({
  title,
  description,
  path,
}: MetadataProps): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Maharani Jewellers",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Maharani Jewellers in Dhanbad",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}
