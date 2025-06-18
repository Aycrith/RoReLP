"use client"; // Added "use client" as it uses Framer Motion
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link'; // For the "Contact us" link

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      features: ["Up to 5 Users", "Basic Scheduling", "Customer Management", "Email Support"],
      ctaText: "Choose Starter",
      delay: 0.3,
    },
    {
      name: "Pro",
      price: "59",
      features: ["Up to 15 Users", "Advanced Scheduling", "Inventory Tracking", "Priority Email & Chat Support"],
      ctaText: "Choose Pro",
      highlight: true, // To make this card stand out
      delay: 0.4,
    },
    {
      name: "Enterprise",
      price: "99",
      features: ["Unlimited Users", "All Pro Features", "API Access", "Dedicated Account Manager"],
      ctaText: "Choose Enterprise",
      delay: 0.5,
    }
  ];

  return (
    <motion.section
      id="pricing"
      className="py-16 md:py-20 bg-neutral-white" // Alternate background with AboutUs
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-dark-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 items-stretch"> {/* Added items-stretch for equal height cards */}
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`p-8 rounded-lg shadow-lg flex flex-col ${plan.highlight ? 'bg-primary-blue/10 ring-2 ring-primary-blue' : 'bg-gray-50'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className={`text-2xl font-semibold mb-4 ${plan.highlight ? 'text-primary-blue' : 'text-dark-gray'}`}>{plan.name}</h3>
              <p className="text-4xl font-bold mb-1 text-dark-gray">
                ${plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
              </p>
              <p className="text-xs text-gray-400 mb-6 h-8">{plan.highlight ? 'Billed Annually' : 'Billed Annually'}</p> {/* Placeholder for billing details */}
              <ul className="text-gray-600 mb-8 space-y-2 text-left flex-grow"> {/* Added flex-grow */}
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`font-semibold py-3 px-6 rounded-lg transition-colors w-full mt-auto ${plan.highlight ? 'bg-accent-gold text-neutral-white hover:bg-opacity-90' : 'bg-primary-blue text-neutral-white hover:bg-royal-purple'}`}
              >
                {plan.ctaText}
              </Link>
            </motion.div>
          ))}
        </div>
         <motion.p
          className="text-center mt-12 text-gray-600" // Increased margin-top
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
        >
          Need a custom enterprise solution? <Link href="#contact" className="text-primary-blue hover:underline font-semibold">Contact us</Link>!
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Pricing;
