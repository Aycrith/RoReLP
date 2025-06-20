"use client"; // Added "use client" as it uses Framer Motion
import { motion } from 'framer-motion';
import React from 'react';

const AboutUs = () => {
  return (
    <motion.section
      id="about"
      className="py-16 md:py-20 bg-gray-50 overflow-hidden" // Added overflow-hidden for x-axis animations
      initial={{ opacity: 0, x: -50 }} // Slide in from left
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }} // Adjusted duration and ease
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-dark-gray"
          initial={{ opacity: 0, y: 30 }} // Slightly more y offset for title
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }} // Delayed after section appears
          viewport={{ once: true }}
        >
          About Royalty Repair
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }} // Staggered delay
          viewport={{ once: true }}
        >
          Royalty Repair was founded by mechanics, for mechanics. We experienced firsthand the daily chaos of running a small engine repair shop – juggling appointments, tracking parts, managing customer history, and struggling with paperwork. We knew there had to be a better way.
        </motion.p>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }} // Staggered delay
          viewport={{ once: true }}
        >
          Our mission is to empower your business with an intuitive, powerful, and affordable CRM designed specifically for the unique needs of small engine repair specialists. We're committed to helping you streamline operations, save time, and ultimately, grow your kingdom.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutUs;
