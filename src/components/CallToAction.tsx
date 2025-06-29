"use client";
import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  const animationProps = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true, amount: 0.3 },
  });

  const scrollToOnboarding = () => {
    const onboardingSection = document.getElementById('onboarding');
    if (onboardingSection) {
      onboardingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="get-started"
      className="py-16 md:py-24 bg-primary-blue/5"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark-gray"
          {...animationProps(0.05)}
        >
          Ready to Get Your Equipment Fixed?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl mx-auto"
          {...animationProps(0.1)}
        >
          Don&apos;t let broken equipment slow you down. Get professional small engine repair service with convenient scheduling and expert technicians ready to help.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          {...animationProps(0.15)}
        >
          <button
            onClick={scrollToOnboarding}
            className="bg-primary-blue text-neutral-white px-10 py-4 rounded-lg font-semibold text-lg
                       hover:bg-royal-purple hover:shadow-xl transform transition-all duration-200 active:scale-95 shadow-md"
          >
            Schedule Service Now
          </button>
          <a
            href="tel:+13862748701"
            className="bg-accent-gold text-neutral-white px-10 py-4 rounded-lg font-semibold text-lg
                       hover:bg-yellow-500 hover:shadow-xl transform transition-all duration-200 active:scale-95 shadow-md"
          >
            Call for Emergency Service
          </a>
        </motion.div>
        <motion.p
          className="text-md md:text-lg mt-8 text-gray-600"
          {...animationProps(0.2)}
        >
          Need immediate help? Call us now: <a href="tel:+13862748701" className="text-primary-blue font-semibold hover:underline">(386) 274-8701</a>
        </motion.p>
      </div>
    </motion.section>
  );
};

export default CallToAction;
