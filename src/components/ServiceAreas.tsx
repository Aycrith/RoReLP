"use client";
import React from 'react';
import { motion } from 'framer-motion';

const currentServiceAreas = [
  { name: "Bradenton, FL", description: "Expert small engine repair services now available throughout Bradenton. Same-day service available for most repairs." },
  { name: "Tampa, FL", description: "Comprehensive mobile repair services covering all of Tampa. We come to you for convenient service." },
  { name: "Sarasota, FL", description: "Professional small engine repair services now serving the Sarasota area. Schedule your appointment today!" }
];

const expansionAreas = [
  { name: "St. Petersburg, FL", description: "Expanding to St. Petersburg soon! Join our waitlist for early access to our services." },
  { name: "Clearwater, FL", description: "Coming soon to Clearwater! Get notified when we launch in your area." },
  { name: "Largo, FL", description: "Largo service area launching shortly. Be the first to know when we arrive!" }
];

const ServiceAreas = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Increased y for more noticeable entry
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.1, duration: 0.5, ease: "easeOut" as const } // Added ease
    }
  };

  const sectionEntrance = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
  };

  const titleEntrance = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  const subTitleEntrance = (delay: number = 0.2) => ({ // Function to allow custom delay for subheadings
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } }
  });


  return (
    <motion.section
      id="service-areas"
      className="py-16 md:py-20 bg-gray-50"
      variants={sectionEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of section is visible
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-dark-gray"
          variants={titleEntrance}
          // initial, whileInView, viewport inherited from parent section if not specified or if parent orchestrates
        >
          Our Service Coverage
        </motion.h2>
        <motion.p
          className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          variants={subTitleEntrance(0.3)} // Delay slightly after main title
           // initial, whileInView, viewport inherited
        >
          We bring expert small engine repair services directly to your doorstep. Don&apos;t see your area? Contact us to inquire!
        </motion.p>

        {/* Current Service Areas */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl lg:text-3xl font-semibold text-primary-blue mb-8 text-center md:text-left" // Increased bottom margin
            variants={subTitleEntrance(0.4)}
          >
            Currently Serving
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap */}
            {currentServiceAreas.map((area) => (
              <motion.div
                key={`current-${area.name}`} // Use area.name for more stable key
                variants={cardVariants}
                // initial, whileInView, viewport inherited from parent section.
                // Staggering is handled by cardVariants' custom delay.
                className="p-6 bg-neutral-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <h4 className="text-xl font-bold text-dark-gray mb-2">{area.name}</h4>
                <p className="text-gray-700 text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expansion Areas */}
        <div>
          <motion.h3
            className="text-2xl lg:text-3xl font-semibold text-accent-gold mb-8 text-center md:text-left" // Increased bottom margin
            variants={subTitleEntrance(0.5)} // Further delay
          >
            Expanding Soon To
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap */}
            {expansionAreas.map((area) => (
              <motion.div
                key={`expansion-${area.name}`} // Use area.name for more stable key
                variants={cardVariants}
                className="p-6 bg-neutral-white rounded-xl shadow-lg border-2 border-accent-gold/30 hover:shadow-xl hover:border-accent-gold/60 transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-dark-gray mb-2">{area.name}</h4>
                <p className="text-gray-700 text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
};
export default ServiceAreas;
