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
          {...animationProps(0.1)}
        >
          Ready to Streamline Your Shop?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl mx-auto"
          {...animationProps(0.2)}
        >
          Join 500+ repair shops already saving 10+ hours weekly. Discover how Royalty Repair can transform your business operations.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          // This div itself doesn't need animation props if children are animated individually
        >
          {/* Primary CTA Button */}
          <motion.div {...animationProps(0.3)}>
            <Link
              href="/signup"
              className="block bg-accent-gold text-neutral-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Start Your Free 14-Day Trial
            </Link>
          </motion.div>

          {/* Secondary CTA Button */}
          <motion.div {...animationProps(0.4)}>
            <Link
              href="/request-demo"
              className="block bg-transparent border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-blue hover:text-neutral-white transition-colors shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Schedule Demo Call
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
