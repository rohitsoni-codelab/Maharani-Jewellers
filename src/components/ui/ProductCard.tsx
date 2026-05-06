'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import PremiumImage from "./PremiumImage";
import { goldGlow } from "@/lib/animations";

interface ProductCardProps {
  name: string;
  slug: string;
  price?: string;
  image: string;
  category: string;
  priority?: boolean;
}

export default function ProductCard({ name, slug, price, image, category, priority = false }: ProductCardProps) {
  return (
    <motion.div
      whileHover="hover"
      variants={goldGlow}
      className="group relative"
    >
      <Link href={`/product/${slug}`} className="block">
        <PremiumImage 
          src={image}
          alt={`${name} in Katrash`}
          priority={priority}
          containerClassName="rounded-sm"
          className="transition-transform duration-1000 group-hover:scale-105"
        />
        
        <div className="mt-6 text-center space-y-3">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold">
              {category}
            </span>
            <h3 className="font-playfair text-lg text-brand-black tracking-tight group-hover:text-brand-gold transition-colors duration-500">
              {name}
            </h3>
          </div>
          
          <div className="h-[1px] w-8 bg-gray-100 mx-auto group-hover:w-12 group-hover:bg-brand-gold transition-all duration-500" />
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-500 font-light italic">
              {price || "Price on Enquiry"}
            </p>
            
            <div className="mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-black border-b border-brand-black pb-1">
                Explore Piece
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
