"use client";
import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image'; // Using Next/Image for optimized images
import SubtleCircle from './backgrounds/SubtleCircle'; // Assuming this is a shared component

// Define an interface for the benefit props if needed for type safety, though not strictly necessary for this example
interface BenefitDetailProps {
  icon?: string; // Optional: if you want to add icons later
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  textOrder?: 'order-1' | 'order-2'; // For controlling text/image order
  imageOrder?: 'order-1' | 'order-2'; // For controlling text/image order
}

const BenefitDetail: React.FC<BenefitDetailProps> = ({ title, description, imageUrl, imageAlt, textOrder = 'order-1', imageOrder = 'order-2' }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const 
      } 
    }
  };
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const, 
        delay: 0.15 
      } 
    }
  };

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
      variants={itemVariants} // Apply to the whole item for staggered entrance
    >
      <motion.div className={`md:${textOrder}`} variants={itemVariants}> {/* Text content */}
        <h3 className="text-2xl md:text-3xl font-semibold text-primary-blue mb-4">{title}</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {description}
        </p>
      </motion.div>
      <motion.div className={`relative w-full h-64 md:h-80 rounded-xl shadow-xl overflow-hidden md:${imageOrder}`} variants={imageVariants}> {/* Image content */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
};


const KeyBenefits = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: 0.1, 
        ease: "easeOut" as const 
      } 
    }
  };

  const benefits = [
    {
      title: "Ultimate On-Site Convenience: We Come To You!",
      description: "Forget the struggle of loading heavy equipment or finding time to visit a repair shop. Royalty Repair brings certified technicians and a fully-stocked mobile workshop directly to your home or business. Save time, avoid transportation hassles, and get your equipment serviced where it sits. It's expert repair, made effortless.",
      imageUrl: "/HeroMobileRepairUnit.png", // Replace with actual relevant image
      imageAlt: "Royalty Repair mobile unit at a customer's location",
      textOrder: 'order-1',
      imageOrder: 'order-2'
    },
    {
      title: "Empowering CRM: Full Control At Your Fingertips",
      description: "Our integrated Customer Relationship Management (CRM) portal puts you in command. Easily schedule appointments, track your repair's progress in real-time, view your complete service history, and access all your records anytime, anywhere. Experience transparent and organized service like never before.",
      imageUrl: "/HeroSatisfy2.png", // Replace with actual relevant image
      imageAlt: "Customer accessing Royalty Repair CRM portal on a tablet",
      textOrder: 'order-2', // Image first on desktop for this one
      imageOrder: 'order-1'
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="key-benefits"
      className="py-16 md:py-20 bg-gray-50 overflow-hidden relative"
      initial="hidden" // Initial state for the section itself
      whileInView="visible" // Animate when in view
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
      transition={{ staggerChildren: 0.3, delayChildren: 0.2 }} // Stagger children animations
    >
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-royal-purple/5"
        yRange={['20%', '-20%']}
        opacityRange={[0.3, 0.05]}
        top="10%" left="-150px" width="300px" height="300px"
      />
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-accent-gold/5"
        yRange={['-15%', '15%']}
        opacityRange={[0.2, 0.05]}
        bottom="5%" right="-100px" width="250px" height="250px"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20 text-dark-gray"
          variants={sectionTitleVariants}
        >
          Why Choose Royalty Repair? The Clear Advantages.
        </motion.h2>

        <div className="space-y-16 md:space-y-20">
          {benefits.map((benefit, index) => (
            <BenefitDetail
              key={index}
              title={benefit.title}
              description={benefit.description}
              imageUrl={benefit.imageUrl}
              imageAlt={benefit.imageAlt}
              textOrder={benefit.textOrder as 'order-1' | 'order-2'}
              imageOrder={benefit.imageOrder as 'order-1' | 'order-2'}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default KeyBenefits;
