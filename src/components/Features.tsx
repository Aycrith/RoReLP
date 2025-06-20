"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image'; // Import next/image
import SubtleCircle from './backgrounds/SubtleCircle';

const featuresData = [
  {
    icon: "/assets/icons/feature (1).svg", // Assuming this exact filename, space included
    title: "Effortless Invoicing",
    description: "Create and send professional invoices in seconds. Track payments and send automated reminders."
  },
  {
    icon: "/assets/icons/feature.svg",
    title: "Smart Scheduling",
    description: "Manage appointments with an easy-to-use calendar. Avoid double bookings and keep your workflow smooth."
  },
  {
    icon: "/assets/icons/information (1).svg", // Assuming this exact filename, space included
    title: "Customer Central",
    description: "Keep a complete history of every customer and every repair job in one organized place."
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
  };

  const featureItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Removed iconContainerVariants and iconTextVariants as hover is now simpler with Image

  return (
    <motion.section
      ref={sectionRef}
      id="features"
      className="py-16 md:py-20 bg-neutral-white relative overflow-hidden"
    >
      {/* Background Parallax Elements */}
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-primary-blue/10"
        yRange={['-30%', '30%']}
        xRange={['-10%', '10%']}
        opacityRange={[0.4, 0.1]}
        scaleRange={[0.8, 1.2]}
        top="5%"
        left="-80px"
        width="250px"
        height="250px"
      />
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-accent-gold/10"
        yRange={['20%', '-20%']}
        opacityRange={[0.3, 0.05]}
        scaleRange={[1, 0.7]}
        top="55%"
        right="-120px"
        width="350px"
        height="350px"
      />

      <div className="container mx-auto px-4 relative z-10">
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
                className="w-20 h-20 relative flex items-center justify-center rounded-full bg-primary-blue/10 p-3 mx-auto mb-6" // Added p-3 for padding
                // Removed whileHover from here, as the Image component won't change color. Hover on card is enough.
                // Scale effect on icon can be added to the inner motion.div if desired.
              >
                <motion.div // Inner div for icon animation
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }} // Delay slightly after card appears
                >
                    <Image
                        src={feature.icon}
                        alt={`${feature.title} icon`}
                        width={48}
                        height={48}
                        className="object-contain" // Ensures icon scales nicely
                    />
                </motion.div>
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
    </motion.section>
  );
};

export default Features;
