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
          About Royalty Repair
        </motion.h2>

        <div className="space-y-12"> {/* Main container for subsections */}
          <motion.div
            className="max-w-3xl mx-auto text-lg text-gray-700 text-center"
            variants={contentBlockVariant(0)} // First content block
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <p>
              Welcome to Royalty Repair, where we bring top-tier small engine repair services right to your doorstep. Founded on the principle of convenience and expertise, we understand that your time is valuable.
            </p>
          </motion.div>

          <motion.div // Mission - full width
            variants={contentBlockVariant(0.1)}  // Stagger slightly after intro paragraph
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700">
              Our mission is simple: to provide reliable, efficient, and hassle-free repair solutions, allowing you to get back to your work and leisure with minimal disruption. We treat every engine with royal care.
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
              <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-4">Our Expertise</h3>
              <p className="text-lg text-gray-700 mb-4">
                With years of experience and a passion for mechanics, our certified technicians are equipped to handle a wide array of small engine problems. We specialize in on-the-spot diagnostics and repairs for most common issues.
              </p>
              <p className="text-lg text-gray-700">
                From routine maintenance to more complex fixes, we bring the workshop to you, ensuring quality and precision in every job.
              </p>
            </motion.div>
            <motion.div
              className="w-full rounded-xl shadow-xl overflow-hidden order-1 md:order-2"
              variants={imageVariant} // Use a specific variant for the image
            >
              <Image
                src="/HeroSatisfy1.png"
                alt="Royalty Repair technician working with a smile" // More descriptive alt
                width={600}
                height={450} // Assuming 4:3 aspect ratio for this image
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* Why Choose Us Section - Can be full width again */}
          <motion.div
            variants={contentBlockVariant(0.3)} // Stagger after expertise/image block
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-12" // Added mt-12
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-6">Why Choose On-Site Mobile Repair?</h3>
            <ul className="list-none sm:list-disc sm:list-inside space-y-3 text-gray-700 text-lg text-left sm:text-center inline-block"> {/* Centering list items */}
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> Convenience: We come to you, saving time and hassle.</li>
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> Efficiency: Many repairs completed in a single visit.</li>
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> Transparency: Clear communication and fair pricing.</li>
              <li className="flex items-start sm:items-center"><span className="font-semibold text-dark-gray mr-2 text-accent-gold">✓</span> Quality: Expert service using quality parts.</li>
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
