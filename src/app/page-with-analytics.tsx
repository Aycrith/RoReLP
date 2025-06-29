"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExpansionOffer from "@/components/ExpansionOffer";
import Features from "@/components/Features";
import AboutUs from "@/components/AboutUs";
import ServicesProcess from "@/components/ServicesProcess";
import KeyBenefits from "@/components/KeyBenefits";
import CrmSpotlight from "@/components/CrmSpotlight";
import ServiceAreas from "@/components/ServiceAreas";
import ProblemSolution from "@/components/ProblemSolution";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import ContactForm from "@/components/ContactFormWithAnalytics"; // Using enhanced version with analytics
import Footer from "@/components/Footer";
import Preloader from '@/components/Preloader';
import FloatingActionButton from '@/components/FloatingActionButton';

export default function HomeWithAnalytics() {
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
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Header />
          <main>
            <Hero />
            <ExpansionOffer />
            <Features />
            <AboutUs />
            <ServicesProcess />
            <KeyBenefits />
            <CrmSpotlight />
            <ServiceAreas />
            <ProblemSolution />
            <Testimonials />
            <FAQ />
            <CallToAction />
            <ContactForm />
          </main>
          <Footer />
        </motion.div>
      )}
      <FloatingActionButton />
    </>
  );
}
