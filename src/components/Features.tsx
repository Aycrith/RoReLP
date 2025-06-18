"use client";
import React from 'react';
import { motion } from 'framer-motion';
// Image from 'next/image' might not be needed if all icons are placeholders now.
// However, if other images are used in this component, keep it. For now, assume it's only for icons.

const featuresData = [
  {
    iconPlaceholder: "🧾", // Unicode for scroll/invoice
    title: "Effortless Invoicing",
    description: "Create and send professional invoices in seconds. Track payments and send automated reminders."
  },
  {
    iconPlaceholder: "📅", // Unicode for calendar
    title: "Smart Scheduling",
    description: "Manage appointments with an easy-to-use calendar. Avoid double bookings and keep your workflow smooth."
  },
  {
    iconPlaceholder: "👥", // Unicode for user group
    title: "Customer Central",
    description: "Keep a complete history of every customer and every repair job in one organized place."
  }
];

const Features = () => {
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const featureItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="features" // For navigation
      className="py-16 md:py-20 bg-neutral-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-dark-gray"
          variants={sectionTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Everything you need, nothing you don&apos;t
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center flex flex-col items-center hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              variants={featureItemVariants}
              // Individual item variants applied here
            >
              {/* Updated icon rendering to use placeholder text */}
              <motion.div
                className="w-20 h-20 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
                // Optional: Animate this wrapper if needed
              >
                <span className="text-4xl text-primary-blue">{feature.iconPlaceholder}</span>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-2 text-dark-gray"
                // Optional: variants for inner elements for finer control
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 text-sm" // Slightly smaller text for description
                // Optional: variants for inner elements
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
