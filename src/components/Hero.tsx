"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// Removed unused imports like Loader2, supabase, useState, useEffect, etc.

const Hero = () => {
  // Refs for parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']); // Keep parallax if desired

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-1000 to-gray-400 text-white pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 mt-16" // Added pt-32 and mt-16 to account for fixed header
      // Consider adding an ID for easy navigation: id="hero"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Changed to a single column layout for focused messaging */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto" // Increased max-width for better readability
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
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12" // Centered buttons
            >
              <a
                href="#get-started"
                className="bg-primary-blue hover:bg-royal-purple text-neutral-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-center"
              >
                Book Your On-Site Repair
              </a>
              <a
                href="#features"
                className="bg-transparent hover:bg-gray-700 border-2 border-white text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-center"
              >
                Learn How It Works
              </a>
            </motion.div>

            {/* Optional: Add a small visual element or a trust signal if relevant, e.g., "Certified Technicians" */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-gray-400"
            >
              <p>Fast, Reliable, and Convenient Service Guaranteed.</p>
            </motion.div> */}
          </motion.div>
        </div>
      </div>

      {/* Background elements - Kept for visual consistency, can be adjusted or removed */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10" // Reduced opacity for a subtler effect
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)', // Adjusted gradient
          y: yBg
        }}
      />

      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,transparent,black)]" /> {/* Adjusted grid opacity */}
    </section>
  );
};

export default Hero;
