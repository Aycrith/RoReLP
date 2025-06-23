"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // For CTA buttons if they link somewhere

const CallToAction = () => {
  const animationProps = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true, amount: 0.3 },
  });

  return (
    <motion.section
      id="cta" // For navigation, if needed
      className="py-16 md:py-24 bg-primary-blue/5" // Using a light shade of primary blue
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark-gray"
          {...animationProps(0.05)}
        >
          Ready for Hassle-Free Small Engine Repair?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl mx-auto"
          {...animationProps(0.1)}
        >
          Experience the convenience of Royalty Repair. Our certified technicians come to you, providing expert service at your doorstep. Get your equipment back in top shape without the usual fuss.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          {/* Primary CTA Button */}
          <motion.div {...animationProps(0.15)}>
            <Link
              href="#contact" // Or a dedicated booking page e.g., /book-service
              className="block bg-accent-gold text-neutral-white px-10 py-4 rounded-lg font-semibold text-lg
                         hover:bg-yellow-500 hover:shadow-xl hover:ring-2 hover:ring-yellow-300 hover:ring-opacity-50
                         transform transition-all duration-200 active:scale-95 shadow-md"
            >
              Book Your On-Site Repair Now
            </Link>
          </motion.div>

          {/* Secondary CTA Button (Optional - e.g., for getting a quote or learning more) */}
          <motion.div {...animationProps(0.2)}>
            <Link
              href="#services" // Or a dedicated quote page e.g., /get-quote
              className="block bg-transparent border-2 border-primary-blue text-primary-blue px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-blue hover:text-neutral-white transition-colors shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Get a Quick Quote
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
