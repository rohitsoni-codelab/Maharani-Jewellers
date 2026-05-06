import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as any },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } as any }
};

export const revealUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as any },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } as any }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    } as any
  }
};

export const imageZoom: Variants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } as any }
};

export const goldGlow = {
  hover: {
    boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)",
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } as any
  }
};
