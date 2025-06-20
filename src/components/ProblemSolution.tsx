"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const showcaseData = [
  {
    problem: "Lawnmower sputters and dies?",
    solution: "Our mobile techs diagnose fuel, spark, or air issues on-site, getting your mower back in action quickly so you can reclaim your weekend.",
    imageSrc: "/HeroEngine1.png",
    imageAlt: "Close-up of a small engine component being serviced"
  },
  {
    problem: "Generator won't start before a storm?",
    solution: "Don't get caught in the dark! We offer rapid on-site generator checks and repairs to ensure you're prepared and your family is safe.",
    imageSrc: "/HeroEngine2.png",
    imageAlt: "Technician inspecting a portable generator engine"
  },
  {
    problem: "Equipment Breakdown Mid-Job?", // More generic problem
    solution: "We handle various equipment types. Get fast on-site diagnostics and repairs to minimize downtime and keep your projects on track.", // More generic solution
    imageSrc: "/HeroGoldenHour1.png",
    imageAlt: "Commercial zero-turn lawnmower on a field at sunset"
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
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-dark-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Stop Hauling, Start Repairing!
        </motion.h2>
        <div className="space-y-12 md:space-y-20">
          {showcaseData.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="w-full md:w-1/2 p-2 md:p-4" // Adjusted width to give more space for image
                initial={{ scale: 0.85, opacity: 0 }} // Slightly different initial scale
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }} // Adjusted delay
                viewport={{ once: true }}
              >
                {/* Removed fixed aspect ratio div to let image define its aspect, constrained by width/height */}
                <div className="bg-gray-100 rounded-xl shadow-xl overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={500} // Example width, adjust based on desired display and original image aspect
                    height={375} // Example height for a 4:3 aspect ratio
                    className="object-cover w-full h-auto md:h-full" // Ensure it covers and is responsive
                  />
                </div>
              </motion.div>
              <div className="w-full md:w-1/2 p-2 md:p-4 text-center md:text-left"> {/* Adjusted width */}
                <motion.h3
                  className="text-2xl lg:text-3xl font-semibold text-primary-blue mb-4"
                  initial={{ opacity: 0, x: index % 2 !== 0 ? 20 : -20 }} // Adjust x based on row direction
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  viewport={{ once: true }}
                >
                  {item.problem}
                </motion.h3>
                <motion.p
                  className="text-gray-700 text-lg lg:text-xl"
                  initial={{ opacity: 0, x: index % 2 !== 0 ? 20 : -20 }} // Adjust x based on row direction
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
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
