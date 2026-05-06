'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/images/kundan-bridal-choker-katrash-hero.png',
    title: 'Exquisite Bridal Collection',
    subtitle: 'Crafted for your special day in Katrash',
    cta: 'Explore Bridal',
    link: '/collections/bridal'
  },
  {
    id: 2,
    image: '/images/antique-gold-necklace-katrash.png',
    title: '22K Hallmark Gold',
    subtitle: 'Pure elegance, timeless designs',
    cta: 'Shop Gold',
    link: '/collections/gold'
  }
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-[75vh] md:h-[90vh] bg-brand-black relative overflow-hidden">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full relative">
              {/* Background with Zoom Effect */}
              <motion.div 
                initial={{ scale: 1.1 }}
                animate={activeIndex === index ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 6, ease: "linear" } as any}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-5xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } as any}
                      className="space-y-6"
                    >
                      <p className="text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
                        {slide.subtitle}
                      </p>
                      
                      <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1]">
                        {slide.title}
                      </h1>

                      <div className="flex justify-center pt-8">
                        <Link 
                          href={slide.link} 
                          className="px-12 py-4 bg-white text-brand-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-white transition-all duration-500 rounded-sm shadow-2xl"
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 } as any}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </motion.div>
    </div>
  );
}
