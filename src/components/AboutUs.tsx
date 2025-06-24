"use client";
import { motion, useScroll } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image'; // Import Image
import SubtleCircle from './backgrounds/SubtleCircle';

const AboutUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Simplified variants for direct application, stagger handled by parent if needed or by delays here
  const baseDelay = 0.15; // Base delay for content after section title

  const titleVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: baseDelay } }
  };

  const contentBlockVariant = (delayIncrement: number = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: baseDelay + 0.15 + delayIncrement } }
  });

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: baseDelay + 0.25 } } // Delay after expertise text starts
  };


  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-20 bg-gray-50 overflow-hidden relative"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-royal-purple/10"
        yRange={['10%', '-10%']}
        opacityRange={[0.2, 0.05]}
        top="20%" right="-50px" width="200px" height="200px"
      />
       <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-primary-blue/5"
        yRange={['-15%', '15%']} xRange={['5%', '-5%']}
        opacityRange={[0.3, 0.1]} scaleRange={[1, 1.3]}
        top="70%" left="-100px" width="300px" height="300px"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-dark-gray text-center"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Your Trusted Partner in Mobile Engine Care
        </motion.h2>

        <div className="space-y-12"> {/* Main container for subsections */}
          <motion.div
            className="max-w-3xl mx-auto text-lg text-gray-700 text-center"
            variants={contentBlockVariant(0)} // First content block
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <p>
              At Royalty Repair, we&apos;re more than just mechanics; we&apos;re problem solvers dedicated to keeping your essential equipment running smoothly. We founded our company on the belief that expert small engine repair should be convenient, reliable, and always customer-focused. We understand that dealing with broken equipment is frustrating, and our goal is to make the repair process as seamless as possible.
            </p>
          </motion.div>

          <motion.div // Mission - full width
            variants={contentBlockVariant(0.1)}  // Stagger slightly after intro paragraph
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-4">Our Commitment to You</h3>
            <p className="text-lg text-gray-700">
              Our mission is to empower small engine repair businesses with top-tier CRM solutions and also to deliver professional, high-quality repair services directly where needed. We are committed to saving you time, providing transparent operations through our software, and ensuring your complete satisfaction. We treat every client like royalty.
            </p>
          </motion.div>

          {/* Expertise and Image Section - Two Columns */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12" // Added mt-12 for spacing
            variants={contentBlockVariant(0.2)} // Stagger after mission
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <motion.div
              className="text-left order-2 md:order-1" // Text first on mobile, image first on desktop can be an option
              variants={textVariants} // Define or use a generic variant for text block itself
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-4">Professional Technicians, Royal Service</h3>
              <p className="text-lg text-gray-700 mb-4">
                Our team consists of certified and experienced technicians who are passionate about small engines. They arrive with fully-equipped mobile workshops, ready to diagnose and repair a wide range of issues on-site. We invest in continuous training to stay updated with the latest engine technologies and repair techniques.
              </p>
              <p className="text-lg text-gray-700">
                From your lawnmower to your generator, we handle each repair with precision and a commitment to long-lasting solutions.
              </p>
            </motion.div>
            <motion.div
              className="w-full rounded-xl shadow-xl overflow-hidden order-1 md:order-2"
              variants={imageVariant} // Use a specific variant for the image
            >
              <Image
                src="/HeroSatisfy1.png" // Consider a different image if this is used in Hero too
                alt="Royalty Repair technician providing expert on-site service" // More descriptive alt
                width={600}
                height={450} // Assuming 4:3 aspect ratio for this image
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* This "Why Choose Us" section might be better suited for a dedicated "Key Benefits" section as per the plan.
              For now, I'll keep it refined here, but we can move/expand it later. */}
          <motion.div
            variants={contentBlockVariant(0.3)} // Stagger after expertise/image block
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-12" // Added mt-12
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-6">The Royalty Repair Advantage</h3>
            <ul className="list-none sm:list-disc sm:list-inside space-y-3 text-gray-700 text-lg text-left sm:text-center inline-block"> {/* Centering list items */}
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> **Unmatched Convenience:** We bring the workshop to you, saving your valuable time and effort.</li>
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> **Expert Diagnostics & Repair:** Certified technicians fix it right, the first time.</li>
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> **Transparent Process:** Clear communication, fair pricing, and easy service tracking via our CRM.</li>
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> **Quality You Can Trust:** We use high-quality parts and stand by our workmanship.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Placeholder textVariants if not already defined or imported; can be simple
const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};


export default AboutUs;
