"use client";
import React from 'react';
import { motion } from 'framer-motion';

const featuresData = [
  {
    iconPlaceholder: "🧾",
    title: "Effortless Invoicing",
    description: "Create and send professional invoices in seconds. Track payments and send automated reminders."
  },
  {
    iconPlaceholder: "📅",
    title: "Smart Scheduling",
    description: "Manage appointments with an easy-to-use calendar. Avoid double bookings and keep your workflow smooth."
  },
  {
    iconPlaceholder: "👥",
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

  // Variants for icon hover animation
  const iconContainerVariants = {
    rest: { backgroundColor: "rgba(37, 99, 235, 0.1)", scale: 1 }, // --color-primary-blue at 10% opacity
    hover: { backgroundColor: "var(--color-primary-blue)", scale: 1.1 }
  };

  const iconTextVariants = {
    rest: { color: "var(--color-primary-blue)" },
    hover: { color: "var(--color-neutral-white)" }
  };

  return (
    <section
      id="features"
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
              className="bg-gray-50 p-8 rounded-lg shadow-lg text-center flex flex-col items-center cursor-pointer"
              style={{ borderColor: "transparent", borderWidth: "2px", borderStyle: "solid" }}
              variants={featureItemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "var(--color-accent-gold)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-default"
                variants={iconContainerVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-3xl font-bold"
                  variants={iconTextVariants} // Inherits hover state from parent
                >
                  {feature.iconPlaceholder}
                </motion.span>
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2 text-dark-gray"
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-600 text-sm"
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
