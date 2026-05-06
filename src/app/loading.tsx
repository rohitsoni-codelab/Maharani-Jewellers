'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      {/* Luxury Minimal Loader */}
      <div className="relative flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-cinzel text-2xl md:text-3xl font-bold tracking-[0.2em] text-brand-gold mb-8"
        >
          MAHARANI
        </motion.div>
        
        <div className="w-48 h-[1px] bg-gray-100 relative overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-[10px] uppercase tracking-[0.4em] text-gray-400 font-medium"
        >
          Establishing Excellence
        </motion.p>
      </div>
    </div>
  );
}
