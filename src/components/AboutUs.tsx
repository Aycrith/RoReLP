"use client";
import { motion, useScroll, useTransform } from 'framer-motion'; // Added useScroll, useTransform
import React, { useRef } from 'react'; // Added useRef
import SubtleCircle from './backgrounds/SubtleCircle'; // Import SubtleCircle

const AboutUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <motion.section
      ref={sectionRef} // Added ref
      id="about"
      className="py-16 md:py-20 bg-gray-50 overflow-hidden relative" // Ensure relative for positioning context
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      {/* Background Parallax Elements */}
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-royal-purple/10"
        yRange={['10%', '-10%']}
        opacityRange={[0.2, 0.05]}
        top="20%"
        right="-50px"
        width="200px"
        height="200px"
      />
       <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-primary-blue/5" // Even more subtle
        yRange={['-15%', '15%']}
        xRange={['5%', '-5%']}
        opacityRange={[0.3, 0.1]}
        scaleRange={[1, 1.3]}
        top="70%"
        left="-100px"
        width="300px"
        height="300px"
      />

      <div className="container mx-auto px-4 text-center relative z-10"> {/* Content above circles */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-dark-gray"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          About Royalty Repair
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Royalty Repair was founded by mechanics, for mechanics. We experienced firsthand the daily chaos of running a small engine repair shop – juggling appointments, tracking parts, managing customer history, and struggling with paperwork. We knew there had to be a better way.
        </motion.p>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
        >
          Our mission is to empower your business with an intuitive, powerful, and affordable CRM designed specifically for the unique needs of small engine repair specialists. We're committed to helping you streamline operations, save time, and ultimately, grow your kingdom.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutUs;
