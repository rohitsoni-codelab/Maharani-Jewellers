import Link from "next/link";
import Image from "next/image";
import { STORE_DETAILS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-light pt-16 pb-8 border-t-[4px] border-brand-gold">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="mb-6 flex flex-col items-start group">
            <span className="font-cinzel text-3xl font-bold tracking-[0.15em] text-gradient group-hover:brightness-125 transition-all duration-300">
              MAHARANI
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] tracking-[0.25em] text-brand-light uppercase font-medium">
                Jewellers
              </span>
              <span className="text-gray-600 text-[10px]">•</span>
              <span className="text-[9px] text-brand-gold tracking-wider">
                Since 2015 • Katrash
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4 max-w-sm">
            Katrash's most trusted jewellery destination since {STORE_DETAILS.since}. Explore our exquisite collection of hallmark certified gold and diamond jewellery.
          </p>
        </div>
        <div>
          <h4 className="font-playfair text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/gold-jewellery-katrash" className="hover:text-brand-gold transition-colors">Gold Jewellery</Link></li>
            <li><Link href="/diamond-jewellery-katrash" className="hover:text-brand-gold transition-colors">Diamond Jewellery</Link></li>
            <li><Link href="/bridal-jewellery-katrash" className="hover:text-brand-gold transition-colors">Bridal Sets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-playfair text-lg mb-4">Visit Our Store</h4>
          <address className="not-italic text-sm text-gray-400 space-y-2">
            <p>{STORE_DETAILS.address}</p>
            <p>Phone: <a href={`tel:${STORE_DETAILS.phone}`} className="hover:text-brand-gold">{STORE_DETAILS.phone}</a></p>
            <p>Instagram: <a href={`https://instagram.com/${STORE_DETAILS.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">@{STORE_DETAILS.instagram}</a></p>
            <p>Hours: Mon - Sun | 10:00 AM - 8:00 PM</p>
          </address>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} {STORE_DETAILS.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
