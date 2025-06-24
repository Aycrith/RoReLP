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
      id="get-started" // For navigation, if needed - Updated ID
      className="py-16 md:py-24 bg-primary-blue/5" // Using a light shade of primary blue
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark-gray"
          {...animationProps(0.05)}
        >
          Ready to Streamline Your Repair Shop?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl mx-auto"
          {...animationProps(0.1)}
        >
          Join Royalty Repair and transform your small engine repair business with our powerful CRM. Sign up for a free trial or contact us to learn how we can help you manage your operations more efficiently.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          {...animationProps(0.15)}
        >
          <Link
            href="/signup" // Link to a future signup page
            className="block bg-primary-blue text-neutral-white px-10 py-4 rounded-lg font-semibold text-lg
                       hover:bg-royal-purple hover:shadow-xl transform transition-all duration-200 active:scale-95 shadow-md"
          >
            Start Your Free Trial
          </Link>
          <Link
            href="/request-demo" // Link to a future demo page
            className="block bg-accent-gold text-neutral-white px-10 py-4 rounded-lg font-semibold text-lg
                       hover:bg-yellow-500 hover:shadow-xl transform transition-all duration-200 active:scale-95 shadow-md"
          >
            Request a Demo
          </Link>
        </motion.div>
        <motion.p
          className="text-md md:text-lg mt-8 text-gray-600"
          {...animationProps(0.2)}
        >
          Or call us to inquire: <a href="tel:+13862748701" className="text-primary-blue font-semibold hover:underline">(386) 274-8701</a>
        </motion.p>
      </div>
    </motion.section>
  );
};

export default CallToAction;
