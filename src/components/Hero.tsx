import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Using next/image for optimized images

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="hero" // For navigation
      className="flex items-center justify-center min-h-screen bg-gray-50 py-20 md:py-28" // Adjusted padding for header
    >
      <motion.div
        className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Content Side */}
        <motion.div className="md:w-1/2 text-center md:text-left" variants={containerVariants}>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-dark-gray leading-tight"
            variants={itemVariants}
          >
            The #1 CRM for Small-Engine Repair Shops
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl mb-8 text-gray-700"
            variants={itemVariants}
          >
            Streamline your bookings, manage customer relationships, and boost your revenue with our all-in-one CRM designed specifically for businesses like yours.
          </motion.p>

          {/* Lead Capture Form */}
          <motion.form
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants}
            onSubmit={(e) => e.preventDefault()} // Added onSubmit
          >
            <input
              type="email"
              placeholder="Enter your business email"
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue flex-grow sm:max-w-sm text-gray-700"
              aria-label="Business email for demo request"
              required // Added required
            />
            <button
              type="submit"
              className="bg-primary-blue text-neutral-white px-6 py-3 rounded-md font-semibold hover:bg-royal-purple transition-colors whitespace-nowrap active:scale-95 transform"
            >
              Request Free Demo
            </button>
          </motion.form>
          <motion.p
            className="text-sm text-gray-500 mt-4"
            variants={itemVariants}
          >
            Get started with a no-obligation demo.
          </motion.p>
        </motion.div>

        {/* Image Side */}
        <motion.div className="md:w-1/2 mt-10 md:mt-0" variants={itemVariants}>
          <Image
            src="/HEROSTORYLANDINGPAGE.PNG" // Updated src
            alt="CRM Dashboard Preview for Royalty Repair"
            width={600} // Adjust as per actual image aspect ratio
            height={450} // Adjust as per actual image aspect ratio
            className="rounded-lg shadow-xl mx-auto"
            priority // Consider if this is LCP
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
