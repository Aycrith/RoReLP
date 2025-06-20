"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ExpansionMapSnippet = () => {
  const cityVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.8, duration: 0.5, type: 'spring' as const, stiffness: 150 } // Delay after path animation
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1], // Adjusted pulse scale
      opacity: [0.6, 0.9, 0.6], // Adjusted opacity
      transition: {
        delay: 1.5, // Stagger pulse start further after initial appearance
        duration: 2, // Slightly longer pulse
        repeat: Infinity,
        repeatType: "loop" as const, // Changed from "mirror" to "loop" for a more standard pulse
        ease: "easeInOut" as const
      }
    }
  };

  const cities = [
    { name: "Clearwater", x: "30%", y: "35%", color: "text-sky-600" }, // Adjusted colors for better contrast on gray-100
    { name: "Largo", x: "45%", y: "55%", color: "text-teal-600" },
    { name: "St. Pete", x: "60%", y: "75%", color: "text-emerald-600" } // Shortened name
  ];

  return (
    <motion.div
      className="w-full aspect-[4/3] max-w-sm mx-auto bg-gray-200/70 rounded-xl shadow-lg p-3 sm:p-4 relative overflow-hidden border border-gray-300/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <svg className="w-full h-full" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M10 10 Q50 -10 90 20 T150 10 Q190 40 170 80 T100 130 Q50 150 10 120 Z"
          className="fill-primary-blue/20 stroke-primary-blue/50"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
        />

        {cities.map((city) => (
          <motion.g
            key={city.name}
            initial="hidden"
            // Animate prop will be triggered by parent's whileInView
            // For direct control with delay, use whileInView here too or ensure parent orchestrates
            animate="visible"
            variants={cityVariants}
          >
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="7" // Slightly smaller radius
              className={`fill-current ${city.color}`} // Removed opacity here, let pulse handle it
              variants={pulseVariants}
              animate="pulse"
            />
            <text
              x={city.x}
              y={city.y}
              dy="-14" // Adjusted dy for better spacing
              textAnchor="middle"
              className="text-[9px] font-semibold fill-current text-dark-gray/80 select-none" // Added select-none
            >
              {city.name}
            </text>
          </motion.g>
        ))}
      </svg>
      <p className="absolute bottom-1.5 right-2.5 text-xs text-gray-500 select-none">*Conceptual map</p>
    </motion.div>
  );
};
export default ExpansionMapSnippet;
