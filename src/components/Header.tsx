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
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.2 
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-white/80 shadow-md backdrop-blur-[10px]">
      <div className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/icons/royalty-repairNOBACKGROUND.svg"
              alt="Royalty Repair Logo"
              width={130}
              height={35}
            />
            <span className="text-lg md:text-xl font-semibold text-dark-gray sr-only">
              Royalty Repair
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="#features" className="text-dark-gray hover:text-primary-blue transition-colors">
            Features
          </Link>
          <Link href="#services" className="text-dark-gray hover:text-primary-blue transition-colors">
            Services
          </Link>
          <Link href="#about" className="text-dark-gray hover:text-primary-blue transition-colors">
            About Us
          </Link>
          <Link
            href="#get-started"
            className="bg-primary-blue hover:bg-royal-purple text-neutral-white font-medium py-1.5 px-3 rounded-md transition-colors active:scale-95 transform text-sm"
          >
            Get Started
          </Link>
          <a href="tel:+13862748701" className="text-dark-gray hover:text-primary-blue transition-colors ml-4">
            (386) 274-8701
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-md text-dark-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-blue"
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
            className="md:hidden absolute top-full left-0 right-0 bg-neutral-white shadow-xl z-40"
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
                className="block py-3 px-3 text-lg text-dark-gray hover:bg-gray-100 rounded-md transition-colors"
              >
                Services
              </Link>
              <Link
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 text-lg text-dark-gray hover:bg-gray-100 rounded-md transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-2 py-2 px-3 text-base text-center bg-primary-blue text-neutral-white rounded-md hover:bg-royal-purple transition-colors active:scale-95 transform"
              >
                Get Started
              </Link>
              <a
                href="tel:+13862748701"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 text-lg text-dark-gray hover:bg-gray-100 rounded-md transition-colors"
              >
                Call (386) 274-8701
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
