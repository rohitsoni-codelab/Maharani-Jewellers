'use client';

import Link from "next/link";
import { STORE_DETAILS } from "@/lib/constants";
import { motion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Gold", href: "/collections/gold" },
    { name: "Diamond", href: "/collections/diamond" },
    { name: "Bridal", href: "/collections/bridal" },
    { name: "Our Store", href: "/jewellery-shop-katrash" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-500 ${
        isScrolled ? "py-2 md:py-3 shadow-md" : "py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <Link href="/" className="flex flex-col items-center md:items-start group transition-transform duration-300 hover:scale-[1.02]">
          <span className="font-cinzel text-3xl md:text-3xl font-bold tracking-[0.25em] text-gradient drop-shadow-sm leading-none">
            MAHARANI
          </span>
          <div className="flex flex-col items-center md:items-start mt-1">
            <span className="text-[10px] md:text-[11px] tracking-[0.4em] text-brand-black uppercase font-semibold ml-1">
              Jewellers
            </span>
            <span className="text-[7px] md:text-[8px] text-gray-400 tracking-[0.2em] uppercase font-medium mt-1 border-t border-brand-gold/20 pt-1">
              Since 2015 • Katrash
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6 md:gap-10 font-medium text-[10px] uppercase tracking-[0.2em] text-brand-black/80">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative transition-colors duration-300 ${
                pathname === link.href ? "text-brand-gold" : "text-gray-400 hover:text-brand-black"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-brand-gold"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a 
            href={`tel:${STORE_DETAILS.phone}`} 
            className="px-8 py-2.5 bg-brand-black text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 rounded-sm shadow-lg shadow-brand-gold/5"
          >
            Connect
          </a>
        </div>
      </div>
      
      {/* Luxury Gold Divider Line */}
      <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-60 mt-3 md:mt-0" />
    </motion.header>
  );
}
