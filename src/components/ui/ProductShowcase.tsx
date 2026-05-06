'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductShowcase({ initialProducts }: { initialProducts: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return initialProducts;
    return initialProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, initialProducts]);

  return (
    <section className="py-20 bg-white min-h-[600px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-brand-black mb-4 text-gradient">The Maharani Collection</h2>
          <p className="text-gray-600 mb-8">Exquisite craftsmanship for every occasion.</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-brand-black text-brand-gold border-brand-black shadow-lg shadow-brand-gold/10' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-brand-gold/30 hover:text-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 text-gray-400 italic"
              >
                No masterpieces found in this category.
              </motion.div>
            ) : (
              filteredProducts.map((product: any) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product._id || product.slug}
                >
                  <ProductCard 
                    {...product}
                    image={product.images?.[0]}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">
              Showing {filteredProducts.length} of {initialProducts.length} unique pieces
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
