"use client"; // Required for useState, useEffect
import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence, motion
// Removed Image import from "next/image" as it's not directly used here.

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExpansionOffer from "@/components/ExpansionOffer"; // New import
import Features from "@/components/Features";
import AboutUs from "@/components/AboutUs";
import ServicesProcess from "@/components/ServicesProcess";
import KeyBenefits from "@/components/KeyBenefits";
import CrmSpotlight from "@/components/CrmSpotlight"; // Import the new CRM spotlight component
import ServiceAreas from "@/components/ServiceAreas";
import ProblemSolution from "@/components/ProblemSolution";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Preloader from '@/components/Preloader';
import FloatingActionButton from '@/components/FloatingActionButton'; // New import

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
            <ExpansionOffer /> {/* New component */}
            <Features />
            <AboutUs />
            <ServicesProcess />
            <KeyBenefits />
            <CrmSpotlight /> {/* Add the CRM Spotlight component to the page structure */}
            <ServiceAreas />
            <ProblemSolution />
            <Testimonials />
            <FAQ />
            <CallToAction />
          </main>
          <Footer />
        </motion.div>
      )}
      <FloatingActionButton /> {/* Add FAB here */}
    </>
  );
}
