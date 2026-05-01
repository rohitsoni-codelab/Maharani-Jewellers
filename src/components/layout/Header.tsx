import Link from "next/link";
import Image from "next/image";
import { STORE_DETAILS } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start group py-2">
          <span className="font-cinzel text-2xl md:text-3xl font-bold tracking-[0.15em] text-gradient group-hover:brightness-125 transition-all duration-300">
            MAHARANI
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-brand-black uppercase font-medium">
              Jewellers
            </span>
            <span className="text-gray-300 text-[10px] hidden sm:inline">•</span>
            <span className="text-[8px] md:text-[9px] text-gray-500 tracking-wider hidden sm:inline">
              Since 2015 • Katrash, Dhanbad
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/collections/gold" className="hover:text-brand-gold transition-colors">Gold</Link>
          <Link href="/collections/diamond" className="hover:text-brand-gold transition-colors">Diamond</Link>
          <Link href="/collections/bridal" className="hover:text-brand-gold transition-colors">Bridal</Link>
          <Link href="/jewellery-shop-dhanbad" className="hover:text-brand-gold transition-colors">Our Store</Link>
        </nav>
        <div className="hidden md:flex items-center">
          <a href={`tel:${STORE_DETAILS.phone}`} className="px-6 py-2 bg-brand-black text-white text-sm hover:bg-brand-gold transition-colors duration-300">
            Call Us
          </a>
        </div>
      </div>
    </header>
  );
}
