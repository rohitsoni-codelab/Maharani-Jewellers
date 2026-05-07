import { constructMetadata } from "@/lib/metadata";
import { Cormorant_Garamond, Outfit, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileStickyBar from "@/components/ui/MobileStickyBar";
import { GlobalSchema } from "@/components/seo/SchemaMarkup";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = constructMetadata({
  title: "Maharani Jewellers — Premium Gold & Diamond Jewellery Shop in Katrash",
  description: "Maharani Jewellers is the most trusted hallmark certified gold and diamond jewellery shop in Katrash, Jharkhand. Explore bridal sets, necklaces, earrings & bangles at Bhelatand Mor. Since 2015.",
  path: "",
  keywords: ["jewellery shop near me", "gold rate Katrash", "best jeweller Jharkhand"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${cinzel.variable} h-full antialiased`}>
      <head>
        <GlobalSchema />
        <meta name="theme-color" content="#0F0F0F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://maps.google.com" />
      </head>
      <body className="min-h-full flex flex-col pb-16 md:pb-0 font-body">
        <SmoothScroll />
        <Header />
        <PageTransition>
          <main className="flex-grow">{children}</main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
        <MobileStickyBar />
      </body>
    </html>
  );
}
