'use client';

import Link from "next/link";
import { STORE_DETAILS } from "@/lib/constants";
import { motion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on admin pages
  if (pathname?.startsWith('/admin') || pathname === '/login') return null;

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-500 ${
        isScrolled ? "py-2 md:py-3 shadow-md" : "py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group transition-transform duration-300 hover:scale-[1.02]" aria-label="Maharani Jewellers — Home">
          <span className="font-cinzel text-2xl md:text-3xl font-bold tracking-[0.25em] text-gradient drop-shadow-sm leading-none">
            MAHARANI
          </span>
          <div className="flex flex-col items-start mt-0.5">
            <span className="text-[10px] md:text-[11px] tracking-[0.4em] text-brand-black uppercase font-semibold ml-0.5">
              Jewellers
            </span>
            <span className="text-[7px] md:text-[8px] text-gray-400 tracking-[0.2em] uppercase font-medium mt-0.5 border-t border-brand-gold/20 pt-0.5">
              Since 2015 • Katrash
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 font-medium text-[10px] uppercase tracking-[0.2em] text-brand-black/80" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative transition-colors duration-300 py-1 ${
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

        {/* Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a 
            href={`tel:${STORE_DETAILS.phone}`} 
            className="hidden md:inline-block px-8 py-2.5 bg-brand-black text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 rounded-sm shadow-lg shadow-brand-gold/5"
            aria-label="Call Maharani Jewellers"
          >
            Connect
          </a>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-brand-black"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-100 bg-white"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-[0.15em] py-3 px-4 rounded-xl transition-all ${
                  pathname === link.href 
                    ? "bg-brand-gold/10 text-brand-gold" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-brand-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`tel:${STORE_DETAILS.phone}`}
              className="mt-2 py-3 bg-brand-black text-brand-gold text-center text-xs font-bold uppercase tracking-[0.2em] rounded-xl"
            >
              Call Now — {STORE_DETAILS.phone}
            </a>
          </div>
        </motion.nav>
      )}
      
      {/* Luxury Gold Divider Line */}
      <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-60 mt-1 md:mt-0" />
    </motion.header>
  );
}
