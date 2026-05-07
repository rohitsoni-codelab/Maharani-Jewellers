import Link from "next/link";
import { STORE_DETAILS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-light pt-16 pb-8 border-t-[4px] border-brand-gold" role="contentinfo">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Column */}
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
                Since {STORE_DETAILS.since} • Katrash
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
            Katrash's most trusted jewellery destination since {STORE_DETAILS.since}. Explore our exquisite collection of hallmark certified gold and diamond jewellery.
          </p>
          {/* Social Link */}
          <a 
            href={`https://instagram.com/${STORE_DETAILS.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-brand-gold transition-colors"
            aria-label="Follow Maharani Jewellers on Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @{STORE_DETAILS.instagram}
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-playfair text-lg mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/gold-jewellery-katrash" className="hover:text-brand-gold transition-colors duration-300">Gold Jewellery</Link></li>
            <li><Link href="/diamond-jewellery-katrash" className="hover:text-brand-gold transition-colors duration-300">Diamond Jewellery</Link></li>
            <li><Link href="/bridal-jewellery-katrash" className="hover:text-brand-gold transition-colors duration-300">Bridal Sets</Link></li>
            <li><Link href="/jewellery-shop-katrash" className="hover:text-brand-gold transition-colors duration-300">Visit Store</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-playfair text-lg mb-6 text-white">Visit Our Store</h4>
          <address className="not-italic text-sm text-gray-400 space-y-3">
            <p className="leading-relaxed">{STORE_DETAILS.address}</p>
            <p>
              Phone:{" "}
              <a href={`tel:${STORE_DETAILS.phone}`} className="hover:text-brand-gold transition-colors">
                {STORE_DETAILS.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${STORE_DETAILS.email}`} className="hover:text-brand-gold transition-colors break-all">
                {STORE_DETAILS.email}
              </a>
            </p>
            <p className="pt-2 border-t border-gray-800 text-gray-500">
              <span className="text-brand-gold/60">⏰</span> Mon — Sun | 10:00 AM — 8:00 PM
            </p>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>&copy; {currentYear} {STORE_DETAILS.name}. All rights reserved.</p>
        <p className="text-gray-600">
          Hallmark Certified • BIS Licensed • Trusted Since {STORE_DETAILS.since}
        </p>
      </div>
    </footer>
  );
}
