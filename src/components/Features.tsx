"use client";
import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import SubtleCircle from './backgrounds/SubtleCircle';
import InteractiveCard from './InteractiveCard';

const featuresData = [
  {
    icon: "/assets/icons/engine-repair.svg", // Placeholder icon
    title: "Lawnmower Repair",
    description: "Comprehensive on-site repair for all types of lawnmowers: push, riding, zero-turn, and robotic."
  },
  {
    icon: "/assets/icons/generator-repair.svg", // Placeholder icon
    title: "Generator Maintenance",
    description: "Keep your power on. We service and repair portable and standby generators to ensure reliability."
  },
  {
    icon: "/assets/icons/snowblower-repair.svg", // Placeholder icon
    title: "Snowblower Servicing",
    description: "Get ready for winter. We provide full servicing and repair for snowblowers at your location."
  },
  {
    icon: "/assets/icons/pressure-washer-repair.svg", // Placeholder icon
    title: "Pressure Washer Repair",
    description: "Restore cleaning power. On-site diagnostics and repair for various pressure washer models."
  },
  {
    icon: "/assets/icons/small-engine-generic.svg", // Placeholder icon
    title: "Other Small Engines",
    description: "Tillers, leaf blowers, chainsaws, and more. If it has a small engine, we can likely fix it!"
  },
  {
    icon: "/assets/icons/crm-icon.svg", // Placeholder icon for CRM
    title: "Easy Service Management",
    description: "Track your appointments, view service history, and manage your repairs online with our Customer Portal."
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

  // Variants for icon container hover animation (background)
  const iconContainerBgVariants = {
    rest: { scale: 1, backgroundColor: "rgba(37, 99, 235, 0.1)" }, // primary-blue/10
    hover: { scale: 1.1, backgroundColor: "var(--color-primary-blue)" }
  };

  // Variants for icon image hover animation (reacts to parent container's hover)
  const iconImageVariants = {
    rest: { scale: 1, rotate: 0, y: 0 }, // Ensure y is defined for rest state
    hover: {
      scale: 1.25,
      rotate: [0, 5, -5, 5, -5, 0], // Wiggle effect
      y: [0, -5, 0], // Jump effect
      transition: { duration: 0.5, ease: "easeInOut" as const }
    }
  };


  return (
    <motion.section
      ref={sectionRef}
      id="features"
      className="py-16 md:py-20 bg-neutral-white relative overflow-hidden"
    >
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-primary-blue/10"
        yRange={['-30%', '30%']} xRange={['-10%', '10%']}
        opacityRange={[0.4, 0.1]} scaleRange={[0.8, 1.2]}
        top="5%" left="-80px" width="250px" height="250px"
      />
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-accent-gold/10"
        yRange={['20%', '-20%']} opacityRange={[0.3, 0.05]}
        scaleRange={[1, 0.7]}
        top="55%" right="-120px" width="350px" height="350px"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-dark-gray"
          variants={sectionTitleVariants}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          Comprehensive On-Site Repair Services
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" // Adjusted grid for better display of 6 items
          variants={gridContainerVariants}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {featuresData.map((feature, index) => (
            <InteractiveCard
              key={index}
              className="bg-gray-50 p-8 rounded-lg shadow-lg text-center flex flex-col items-center cursor-pointer"
              initialStyle={{ borderColor: "transparent", borderWidth: "2px", borderStyle: "solid" }}
              variants={featureItemVariants}
              whileHoverConfig={{
                scale: 1.05,
                boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "var(--color-accent-gold)",
              }}
              rotationFactor={3}
            >
              <motion.div // Icon container
                className="w-20 h-20 relative flex items-center justify-center rounded-full bg-primary-blue/10 p-3 mx-auto mb-6"
                variants={iconContainerBgVariants} // For background and its own scale
                initial="rest"
                whileHover="hover" // This will trigger 'hover' variant on this and children with same variant name
                transition={{ duration: 0.3 }}
              >
                <motion.div // Inner div for icon image animation (entrance and responding to parent hover)
                    variants={iconImageVariants} // For its own scale/rotate on parent hover
                    initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -15 }}
                    // Animate prop driven by parent (InteractiveCard -> featureItemVariants)
                    // For direct control related to card's inView, use whileInView here.
                    // However, simpler to let card's variants control this block's appearance.
                    // For simplicity, we'll use animate once the card is visible.
                    // This animate will be triggered when featureItemVariants makes the card 'visible'.
                    // We need to ensure this component animates once the card is visible.
                    // The `featureItemVariants` on `InteractiveCard` handles initial visibility.
                    // This inner animation should ideally be orchestrated by `featureItemVariants` too.
                    // Let's simplify: entrance animation is part of featureItemVariants for the whole card.
                    // The icon image itself will just have the hover reaction.
                    // The initial entrance for the icon image is now:
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }} // Animate to this when parent card is 'visible'
                    transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }} // Delay after card, then spring in
                >
                    <Image
                        src={feature.icon}
                        alt={`${feature.title} icon`}
                        width={48} height={48}
                        className="object-contain"
                    />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-dark-gray">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </InteractiveCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
