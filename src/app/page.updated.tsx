"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import Header from "@/components/Header";
import Hero from "@/components/Hero.fixed"; // Updated import to use fixed Hero
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
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Preloader from '@/components/Preloader';
import FloatingActionButton from '@/components/FloatingActionButton';



// Track page view on mount
const trackPageView = () => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    (window.dataLayer as unknown as Array<Record<string, unknown>>).push({
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
};



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track initial page view
    trackPageView();
    
    // Set up route change tracking for SPA navigation
    const handleRouteChange = () => {
      trackPageView();
    };
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Set loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handleRouteChange);
    };
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
          <FloatingActionButton />
        </motion.div>
      )}
    </>
  );
}
