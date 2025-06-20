"use client";
import { motion } from 'framer-motion';
import React from 'react';
// Link might be needed if "Contact us" is a link inside this section later. For now, removed.
// import Link from 'next/link';
// InteractiveCard is not used in the new structure.
// import InteractiveCard from './InteractiveCard';

const ServicesProcess = () => { // Renamed component
  // Animation variants for content blocks
  const sectionContainerVariants = { // For the div wrapping all content blocks
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the appearance of each content block
        delayChildren: 0.2  // Delay after the main section title appears
      }
    }
  };

  const contentBlockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      id="services" // Updated ID
      className="py-16 md:py-20 bg-neutral-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.05 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4"> {/* Removed text-center for more flexible inner content alignment */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-dark-gray text-center" // Title remains centered
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Our On-Site Service Advantage {/* Updated title */}
        </motion.h2>

        <motion.div
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-12 text-left"> {/* Added gap-y, text-left */}
            <motion.div variants={contentBlockVariants}>
              <h3 className="text-2xl font-semibold text-primary-blue mb-3">Direct To You Service</h3>
              <p className="text-gray-700 mb-4 text-lg">
                No more hauling your equipment to a shop! We provide expert small engine repairs right at your location, saving you time and hassle.
              </p>
              <p className="text-gray-700 text-lg">
                Serving the greater Springfield area. {/* Example placeholder */}
              </p>
            </motion.div>
            <motion.div variants={contentBlockVariants}>
              <h3 className="text-2xl font-semibold text-primary-blue mb-3">Transparent Hourly Rates</h3>
              <p className="text-gray-700 mb-4 text-lg">
                We believe in clear, upfront pricing. Our services are billed by the hour, and we're proud to offer rates that often beat traditional in-shop repair costs.
              </p>
              <p className="text-gray-700 text-lg">
                Contact us for our current hourly rate and an estimate for your specific needs.
              </p>
            </motion.div>
          </div>

          <motion.div variants={contentBlockVariants} className="max-w-2xl mx-auto"> {/* Centered process list */}
            <h3 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-6 text-center">Our Simple Process</h3> {/* Size up */}
            <ol className="list-none space-y-4 text-gray-700 text-lg">
              {[
                { step: 1, title: "Contact Us:", description: "Briefly describe your issue and location." },
                { step: 2, title: "Get an Estimate:", description: "We&apos;ll provide an estimated time and cost." },
                { step: 3, title: "Schedule Service:", description: "We arrange a convenient time to come to you." },
                { step: 4, title: "Expert On-Site Repair:", description: "Our technician performs the repair efficiently." },
                { step: 5, title: "Pay & Go:", description: "Simple payment once the job is done to your satisfaction." }
              ].map((item) => (
                <li key={item.step} className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
                  <span className="bg-primary-blue text-neutral-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">{item.step}</span>
                  <div>
                    <span className="font-semibold text-dark-gray">{item.title}</span> {item.description}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ServicesProcess; // Updated export name
