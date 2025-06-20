"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import SubtleCircle from './backgrounds/SubtleCircle';

const AboutUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animation variants for content blocks
  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the appearance of each direct child motion component
        delayChildren: 0.3  // Delay after the main section title (0.15s) + title duration (0.6s) is too much.
                              // This delay is after the parent (this section) starts its animation.
                              // Main section delay: 0.05, duration 0.7. Title delay: 0.15.
                              // So title appears around 0.2s from section in view.
                              // Content should start appearing after title, e.g. delayChildren: 0.3 (relative to section start)
      }
    }
  };

  const pVariantProps = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: delay }, // Delays will be relative to parent whileInView trigger
    viewport: { once: true }
  });

  const subSectionVariantProps = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: delay },
    viewport: { once: true }
  });


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
          className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-dark-gray text-center" // Increased bottom margin
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }} // This is the first item to animate after section itself
          viewport={{ once: true }}
        >
          About Royalty Repair
        </motion.h2>

        {/* Wrapper for staggered content */}
        <motion.div
          className="max-w-3xl mx-auto space-y-8 text-lg text-gray-700 text-left sm:text-center" // Centering text for paragraphs
          variants={contentContainerVariants}
          initial="hidden"
          whileInView="visible" // This will trigger its children based on its own visibility
          viewport={{ once: true, amount: 0.1 }} // Trigger when a bit of this container is visible
        >
          <motion.p variants={pVariantProps(0)}> {/* Delay 0 relative to parent stagger sequence */}
            Welcome to Royalty Repair, where we bring top-tier small engine repair services right to your doorstep. Founded on the principle of convenience and expertise, we understand that your time is valuable.
          </motion.p>

          <motion.div variants={subSectionVariantProps(0)}> {/* Delay 0 relative to parent stagger sequence */}
            <h3 className="text-2xl font-semibold text-primary-blue mb-3 mt-6">Our Mission</h3>
            <p>
              Our mission is simple: to provide reliable, efficient, and hassle-free repair solutions, allowing you to get back to your work and leisure with minimal disruption. We treat every engine with royal care.
            </p>
          </motion.div>

          <motion.div variants={subSectionVariantProps(0)}> {/* Delay 0 relative to parent stagger sequence */}
            <h3 className="text-2xl font-semibold text-primary-blue mb-3 mt-6">Our Expertise</h3>
            <p>
              With years of experience and a passion for mechanics, our certified technicians are equipped to handle a wide array of small engine problems, from routine maintenance to complex diagnostics and repairs.
            </p>
          </motion.div>

          <motion.div variants={subSectionVariantProps(0)}> {/* Delay 0 relative to parent stagger sequence */}
            <h3 className="text-2xl font-semibold text-primary-blue mb-3 mt-6">Why Choose On-Site Mobile Repair?</h3>
            <ul className="list-disc list-inside space-y-2 text-left pl-1 sm:pl-4"> {/* Adjusted list padding */}
              <li><span className="font-semibold text-dark-gray">Convenience:</span> We come to you, saving you time and transportation headaches.</li>
              <li><span className="font-semibold text-dark-gray">Efficiency:</span> Many repairs completed in a single visit.</li>
              <li><span className="font-semibold text-dark-gray">Transparency:</span> Clear communication and fair, hourly-based pricing.</li>
              <li><span className="font-semibold text-dark-gray">Quality:</span> Expert service using quality parts.</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
