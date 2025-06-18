"use client"; // Added "use client" as it uses Framer Motion
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image'; // For potential user avatars

const testimonialsData = [
  {
    quote: "Royalty Repair has been a game-changer for our shop! The scheduling and invoicing features alone save us hours every week. Highly recommend!",
    name: "John 'Sparky' Smith",
    shop: "Smith & Sons Engine Repair",
    avatar: "/assets/images/avatar-placeholder-1.jpg", // Placeholder
    delay: 0.3,
  },
  {
    quote: "We were drowning in paperwork before Royalty Repair. Now, customer history is at our fingertips, and managing jobs is a breeze. It's the best investment we've made.",
    name: "Maria Garcia",
    shop: "Garcia's Outdoor Power",
    avatar: "/assets/images/avatar-placeholder-2.jpg", // Placeholder
    delay: 0.4,
  }
];

const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      className="py-16 md:py-20 bg-primary-blue/5" // Light brand color background
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
          Trusted by Repair Shops Like Yours
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonialsData.map((testimonial) => (
             <motion.div
              key={testimonial.name}
              className="bg-neutral-white p-8 rounded-lg shadow-lg flex flex-col items-center" // Added items-center
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }} // Subtle lift on hover
            >
              {/* Optional: Avatar
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full mb-4 border-2 border-accent-gold"
              />
              */}
              <p className="text-gray-600 mb-6 italic text-lg relative"> {/* Relative for quote styling */}
                <span className="absolute -top-3 -left-3 text-5xl text-primary-blue/30 font-serif">“</span>
                {testimonial.quote}
                <span className="absolute -bottom-3 -right-3 text-5xl text-primary-blue/30 font-serif">”</span>
              </p>
              <p className="font-bold text-lg text-dark-gray">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.shop}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
