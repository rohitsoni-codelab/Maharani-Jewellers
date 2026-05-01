"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: '/images/kundan-bridal-choker-dhanbad-hero.png',
    title: 'Exquisite Bridal Collection',
    subtitle: 'Crafted for your special day in Dhanbad',
    cta: 'Explore Bridal',
    link: '/bridal-jewellery-dhanbad'
  },
  {
    id: 2,
    image: '/images/antique-gold-necklace-dhanbad.png',
    title: '22K Hallmark Gold',
    subtitle: 'Pure elegance, timeless designs',
    cta: 'Shop Gold',
    link: '/gold-jewellery-dhanbad'
  }
];

export default function HeroSlider() {
  return (
    <div className="w-full h-[70vh] md:h-[85vh] bg-brand-black relative">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full relative">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundColor: '#1a1a1a'
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-brand-gold text-sm md:text-lg tracking-widest uppercase mb-4"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white mb-8 max-w-4xl leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link href={slide.link} className="px-8 py-3 bg-brand-gold text-brand-black font-medium hover:bg-brand-soft-gold transition-colors duration-300">
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
