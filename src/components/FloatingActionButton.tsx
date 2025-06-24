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

  // Removed scrollToExpansionForm function

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a // Changed button to a for tel: link
          href="tel:+13862748701"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-accent-gold text-neutral-white p-3.5 sm:p-4 rounded-full shadow-xl hover:bg-yellow-500 active:scale-95 transform transition-all duration-200 z-[100] flex items-center space-x-2 group"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Call Us at (386) 274-8701"
        >
          {/* Phone Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="hidden sm:group-hover:inline sm:group-focus:inline pr-2 text-sm font-medium transition-all duration-300 ease-out">Call (386) 274-8701</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
export default FloatingActionButton;
