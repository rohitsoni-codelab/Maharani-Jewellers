import { constructMetadata } from "@/lib/metadata";
import { Cormorant_Garamond, Outfit, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileStickyBar from "@/components/ui/MobileStickyBar";
import { GlobalSchema } from "@/components/seo/SchemaMarkup";

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  variable: "--font-heading",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata = constructMetadata({
  title: "Premium Jewellery Shop in Katrash, Dhanbad | Maharani Jewellers",
  description: "Maharani Jewellers is the best gold and diamond jewellery shop near Bhelatand Mor, Katrash, Dhanbad. Explore our exclusive collections.",
  path: "",
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
      </head>
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileStickyBar />
      </body>
    </html>
  );
}
