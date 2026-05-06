'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { revealUp } from '@/lib/animations';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={revealUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
