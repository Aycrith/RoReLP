"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';



const trackEvent = (action: string, category?: string, label?: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    (window.dataLayer as unknown as Array<Record<string, unknown>>).push({
      event: 'custom_event',
      action,
      category,
      label
    });
  }
};

const Hero = () => {
  // Refs for parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Track CTA click using GTM
    trackEvent('cta_click', 'CTA', 'Hero - Book Your On-Site Repair');
    // Smooth scroll to the contact form
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-gray-1000 to-gray-400 text-white pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 mt-16"
    >
      {/* Background Image with Next.js Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Small engine repair service"
          fill
          priority
          className="object-cover opacity-20"
          quality={75}
          sizes="100vw"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl text-white/100 md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Expert Small Engine Repair, Right At Your Doorstep.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-white/100 mb-8 max-w-2xl mx-auto"
            >
              Royalty Repair brings certified technicians and fully-equipped mobile workshops to you, saving you time and hassle. Get your equipment back up and running without ever leaving home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <a
                href="#contact"
                onClick={handleCtaClick}
                className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center inline-flex items-center justify-center"
              >
                <span className="relative z-10">Book Your On-Site Repair</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#features"
                className="bg-transparent hover:bg-gray-700 border-2 border-white text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-center"
              >
                Learn How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
          y: yBg
        }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,transparent,black)]" />
    </section>
  );
};

export default Hero;
