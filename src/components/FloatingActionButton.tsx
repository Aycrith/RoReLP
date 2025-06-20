"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion'; // Added AnimatePresence

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Using an array for scrollY.on ensures the cleanup function is typed correctly.
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 300) { // Show after scrolling 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      // Advanced: Hide if near footer (example, adjust threshold as needed)
      // const documentHeight = document.documentElement.scrollHeight;
      // const viewportHeight = window.innerHeight;
      // if (latest > documentHeight - viewportHeight - 300) { // If within 300px of footer
      //   setIsVisible(false);
      // }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToExpansionForm = () => {
    const element = document.getElementById('expansion-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Fallback: scroll to top or another relevant section if form not found
      // This might happen if the ExpansionOffer section is conditionally rendered
      // or if the FAB is rendered on a page without that form.
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToExpansionForm}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-accent-gold text-neutral-white p-3.5 sm:p-4 rounded-full shadow-xl hover:bg-yellow-500 active:scale-95 transform transition-all duration-200 z-[100] flex items-center space-x-2 group"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Claim Expansion Offer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="hidden sm:group-hover:inline sm:group-focus:inline pr-2 text-sm font-medium transition-all duration-300 ease-out">Claim Offer</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
export default FloatingActionButton;
