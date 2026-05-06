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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-gray-100" : "bg-white py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start group py-1">
          <span className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.2em] text-gradient group-hover:brightness-125 transition-all duration-500">
            MAHARANI
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-brand-black uppercase font-bold">
              Jewellers
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 ${
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
            className="px-8 py-2.5 bg-brand-black text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 rounded-sm"
          >
            Connect
          </a>
        </div>
      </div>
      
      {/* Luxury Gold Divider Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-50" />
    </motion.header>
  );
}
