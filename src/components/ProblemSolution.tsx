"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Will use for icons if paths are valid

const showcaseData = [
  {
    problem: "Lawnmower sputters and dies?",
    solution: "Our mobile techs diagnose fuel, spark, or air issues on-site, getting your mower back in action quickly so you can reclaim your weekend.",
    // Assuming user will place these SVGs or similar in public/assets/icons/
    // Using the same icons as Features section as placeholders for now.
    icon: "/assets/icons/feature.svg"
  },
  {
    problem: "Generator won't start before a storm?",
    solution: "Don't get caught in the dark! We offer rapid on-site generator checks and repairs to ensure you're prepared and your family is safe.",
    icon: "/assets/icons/information (1).svg"
  },
  {
    problem: "Snowblower clogged or not throwing snow?",
    solution: "Winter's tough enough. We'll come to you to clear blockages, adjust augers, and ensure your snowblower is ready for whatever the season throws.",
    icon: "/assets/icons/feature (1).svg"
  }
];

const ProblemSolution = () => {
  return (
    <motion.section
      id="problem-solution"
      className="py-16 md:py-20 bg-neutral-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-dark-gray" // Increased bottom margin
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }} // Adjusted delay
          viewport={{ once: true }}
        >
          Stop Hauling, Start Repairing!
        </motion.h2>
        <div className="space-y-12 md:space-y-20"> {/* Increased spacing between items */}
          {showcaseData.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }} // Staggering via whileInView is natural
              viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of item is visible
            >
              <motion.div
                className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }} // Delay after row animates in
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gray-100 rounded-xl shadow-lg flex items-center justify-center p-6">
                  {/* Using next/image for actual SVG icons if paths are valid */}
                  <Image
                    src={item.icon}
                    alt={`${item.title || item.problem} illustration`}
                    width={100} // Adjust as needed
                    height={100} // Adjust as needed
                    className="object-contain text-primary-blue" // text-primary-blue might not affect SVGs with hardcoded fills
                  />
                </div>
              </motion.div>
              <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left">
                <motion.h3
                  className="text-2xl lg:text-3xl font-semibold text-primary-blue mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }} // Delay relative to parent row's whileInView
                  viewport={{ once: true }}
                >
                  {item.problem}
                </motion.h3>
                <motion.p
                  className="text-gray-700 text-lg lg:text-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }} // Delay after h3
                  viewport={{ once: true }}
                >
                  {item.solution}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
export default ProblemSolution;
