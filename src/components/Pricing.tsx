"use client";
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import InteractiveCard from './InteractiveCard'; // Import InteractiveCard

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      features: ["Up to 5 Users", "Basic Scheduling", "Customer Management", "Email Support"],
      ctaText: "Choose Starter",
    },
    {
      name: "Pro",
      price: "59",
      features: ["Up to 15 Users", "Advanced Scheduling", "Inventory Tracking", "Priority Email & Chat Support"],
      ctaText: "Choose Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "99",
      features: ["Unlimited Users", "All Pro Features", "API Access", "Dedicated Account Manager"],
      ctaText: "Choose Enterprise",
    }
  ];
  const baseCardDelay = 0.15;

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // Entrance variants for each card
  const cardEntranceVariants = (index: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: baseCardDelay + index * 0.07 }
    }
  });


  return (
    <motion.section
      id="pricing"
      className="py-16 md:py-20 bg-neutral-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-dark-gray"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <InteractiveCard
              key={plan.name}
              className={`p-8 rounded-lg shadow-lg flex flex-col ${plan.highlight ? 'bg-primary-blue/10 ring-2 ring-primary-blue' : 'bg-gray-50'}`}
              variants={cardEntranceVariants(index)} // Use function to apply variants with calculated delay
              whileHoverConfig={{
                scale: 1.05,
                boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              rotationFactor={2} // Slightly less rotation for pricing cards
            >
              <h3 className={`text-2xl font-semibold mb-4 ${plan.highlight ? 'text-primary-blue' : 'text-dark-gray'}`}>{plan.name}</h3>
              <p className="text-4xl font-bold mb-1 text-dark-gray">
                ${plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
              </p>
              <p className="text-xs text-gray-400 mb-6 h-8">{plan.highlight ? 'Billed Annually' : 'Billed Annually'}</p>
              <motion.ul
                className="text-gray-600 mb-8 space-y-2 text-left flex-grow"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {plan.features.map((feature, idx) => (
                  <motion.li key={idx} className="flex items-center" variants={listItemVariants}>
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
              <Link
                href="/signup"
                className={`font-semibold py-3 px-6 rounded-lg w-full mt-auto transform transition-all duration-200 active:scale-95 ${plan.highlight ? 'bg-accent-gold text-neutral-white hover:bg-yellow-500 hover:shadow-md' : 'bg-primary-blue text-neutral-white hover:bg-royal-purple hover:shadow-md'}`}
              >
                {plan.ctaText}
              </Link>
            </InteractiveCard>
          ))}
        </div>
         <motion.p
          className="text-center mt-12 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Need a custom enterprise solution? <Link href="#contact" className="text-primary-blue hover:underline font-semibold">Contact us</Link>!
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Pricing;
