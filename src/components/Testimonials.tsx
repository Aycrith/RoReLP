"use client";
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'; 
import React, { useRef } from 'react'; 

const testimonialsData = [
  {
    quote: "Royalty Repair has been a game-changer for our shop! The scheduling and invoicing features alone save us hours every week. Highly recommend!",
    name: "John 'Sparky' Smith",
    shop: "Smith & Sons Engine Repair"
  },
  {
    quote: "We were drowning in paperwork before Royalty Repair. Now, customer history is at our fingertips, and managing jobs is a breeze. It's the best investment we've made.",
    name: "Maria Garcia",
    shop: "Garcia's Outdoor Power"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"] // Animate from when section starts entering to when its center hits viewport center
  });

  // Get RGB values from CSS variable --color-primary-blue (e.g., #2563eb -> 37, 99, 235)
  // This needs to be done carefully. If CSS variables aren't easily parsable here, use fixed RGB values.
  // For simplicity, let's assume fixed RGB for primary blue: 37, 99, 235
  const r = 37;
  const g = 99;
  const b = 235;

  // Animate opacity from 0 (fully transparent) to 0.05 (bg-primary-blue/5)
  const backgroundColorOpacity = useTransform(scrollYProgress, [0, 0.5], [0.0, 0.05]); // Fade in up to 50% scroll through section
  const dynamicBackgroundColor = useMotionTemplate`rgba(${r}, ${g}, ${b}, ${backgroundColorOpacity})`;

  const baseCardDelay = 0.15;

  const cardContentContainerVariants = {
    hidden: {}, // Parent card handles initial opacity/scale
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2, // Delay after card itself appears
      },
    },
  };

  const cardTextItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      className="py-16 md:py-20 relative overflow-hidden" // Removed bg-primary-blue/5, added relative & overflow-hidden
      style={{ backgroundColor: dynamicBackgroundColor }} // Apply dynamic background color
      // Initial section animation (overall fade/scale)
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-dark-gray"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Trusted by Repair Shops Like Yours
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonialsData.map((testimonial, index) => (
             <motion.div
              key={testimonial.name}
              className="bg-neutral-white p-8 rounded-lg shadow-lg flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              // Moved main transition to be overridden by whileHover's transition if specified, or use a general one
              transition={{ duration: 0.6, delay: baseCardDelay + index * 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.1), 0px 8px 8px -5px rgba(0, 0, 0, 0.04)"
              }}
              // Add a specific transition for the hover effect if different from entrance
              // For this case, the default spring or a simple duration on the main transition should be fine.
              // If more control over hover transition is needed, it can be added to whileHover:
              // whileHover={{ ..., transition: { duration: 0.2 } }}
            >
              <motion.div variants={cardContentContainerVariants} initial="hidden" animate="visible">
                {/* Optional: Avatar
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4 border-2 border-accent-gold"
                />
                */}
                <motion.p
                  className="text-gray-600 mb-6 italic text-lg relative"
                  variants={cardTextItemVariants}
                >
                  <span className="absolute -top-3 -left-3 text-5xl text-primary-blue/30 font-serif">“</span>
                  {testimonial.quote}
                  <span className="absolute -bottom-3 -right-3 text-5xl text-primary-blue/30 font-serif">”</span>
                </motion.p>
                <motion.p
                  className="font-bold text-lg text-dark-gray"
                  variants={cardTextItemVariants}
                >
                  {testimonial.name}
                </motion.p>
                <motion.p
                  className="text-sm text-gray-500"
                  variants={cardTextItemVariants}
                >
                  {testimonial.shop}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
