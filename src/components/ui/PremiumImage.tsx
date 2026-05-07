'use client';

import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeIn } from '@/lib/animations';

interface PremiumImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  aspectRatio?: string;
  containerClassName?: string;
}

export default function PremiumImage({ 
  src, 
  alt, 
  aspectRatio = 'aspect-square',
  containerClassName = '',
  className = '',
  ...props 
}: PremiumImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Cloudinary Optimization Helper
  const optimizedSrc = typeof src === 'string' && src.includes('cloudinary.com')
    ? src.replace('/upload/', '/upload/f_auto,q_auto/')
    : src;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName} bg-gray-50`}>
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        className="w-full h-full relative will-change-transform"
      >
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ${isLoaded ? 'scale-100' : 'scale-110'} ${className}`}
          onLoad={() => setIsLoaded(true)}
          loading={props.priority ? undefined : "lazy"}
          {...props}
        />
      </motion.div>
      
      {/* Soft Shimmer Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </div>
  );
}
