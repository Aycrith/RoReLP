"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.15
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { 
        duration: 0.15
      } 
    },
  };

  // Simple SVG components for icons
  const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-slate-900/70 shadow-sm backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-1.5 sm:py-2 flex justify-between items-center">
        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          // Note: The inner transition={{ duration: 0.3 }} for whileHover might be overridden
          // by the main transition. For distinct hover transition, nest another motion.div
          // or use variant groups, but this should be acceptable for a simple effect.
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-[120px] sm:w-[140px] h-auto">
              <Image
                src="/assets/icons/royalty-repairNOBACKGROUND.svg"
                alt="Royalty Repair Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <span className="text-lg md:text-xl font-semibold text-dark-gray sr-only"> {/* Added sr-only as logo text is in SVG */}
            Royalty Repair
          </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="#features" className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
            Features
          </Link>
          <Link href="#services" className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
            Services
          </Link>
          <Link href="#about" className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
            About Us
          </Link>
          <Link
            href="#get-started"
            className="bg-grey-600 hover:bg-blue-700 text-white/90 font-medium py-1.5 px-4 rounded-lg transition-all active:scale-95 text-sm"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="p-1.5 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg z-40 border-t border-slate-100 dark:border-slate-800"
          >
            <nav className="flex flex-col space-y-1 px-4 py-3">
              <Link
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 text-lg text-dark-gray hover:bg-gray-100 rounded-md transition-colors"
              >
                Features
              </Link>
              <Link
                href="#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-4 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm font-medium"
              >
                Services
              </Link>
              <Link
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-4 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                href="#get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all active:scale-95 text-sm mt-2 shadow-sm"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
