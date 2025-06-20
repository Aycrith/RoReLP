"use client"; // Required for useState, useEffect
import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence, motion
// Removed Image import from "next/image" as it's not directly used here.

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutUs from "@/components/AboutUs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Preloader from '@/components/Preloader'; // Import Preloader

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure this only runs on the client-side after hydration
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2200); // Adjusted duration to allow preloader animations to mostly complete
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          key="mainContent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }} // Slightly shorter duration, earlier delay
        >
          <Header />
          <main>
            <Hero />
            <Features />
            <AboutUs />
            <Pricing />
            <Testimonials />
            <CallToAction />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
