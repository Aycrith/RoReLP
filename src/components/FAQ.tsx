"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What types of small engines do you repair?",
    answer: "We repair a wide range of small engines, including those in lawnmowers, string trimmers, generators, leaf blowers, pressure washers, chainsaws, tillers, and more. If it has a small engine and isn't working right, give us a call!"
  },
  {
    question: "What are your service hours for on-site repairs?",
    answer: "Our typical on-site service hours are Monday to Friday, 8 AM to 6 PM, and Saturdays from 9 AM to 3 PM. We strive to be flexible and may offer appointments outside these hours based on availability. Please call to schedule."
  },
  {
    question: "How is the cost determined for a mobile repair?",
    answer: "We charge a transparent hourly rate plus the cost of any parts needed. A standard service call-out fee may apply depending on your location, which covers travel time. We can often provide an estimated time and cost range for common repairs when you call. We always aim to be competitive with traditional shop rates while providing superior convenience."
  },
  {
    question: "What areas do you service?",
    answer: "We currently service the greater Springfield metropolitan area and surrounding communities within a 25-mile radius. Give us a call with your address to confirm if we can come to your location."
  },
  {
    question: "Do I need to do anything to prepare for an on-site visit?",
    answer: "Please ensure the equipment is easily accessible for our technician in a relatively clear, safe area (e.g., driveway, garage, yard). If possible, have the make and model number of the equipment handy, and a brief description of the issue. We'll handle the rest!"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="py-16 md:py-20 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }} // Adjusted delay
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }} // Adjusted delay
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 sm:p-6 text-left text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <span className="text-lg font-semibold">{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary-blue ml-2 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-content-${index}`}
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto', marginTop: '0px', paddingBottom: '20px', paddingTop: '4px' }, // Added paddingTop
                      collapsed: { opacity: 0, height: 0, marginTop: '0px', paddingBottom: '0px', paddingTop: '0px' } // Ensured consistent padding removal
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="px-5 sm:px-6 text-gray-700 text-base" // text-base for answer
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
export default FAQ;
