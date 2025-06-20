"use client";
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

const processSteps = [
  { step: 1, title: "Contact Us:", detail: "Briefly describe your issue and location.", moreInfo: "You can reach us by phone at (555) 123-4567 or email us at service@royaltyrepair.app." },
  { step: 2, title: "Get an Estimate:", detail: "We'll provide an estimated time and cost.", moreInfo: "Our estimates are based on common repair times and our competitive hourly rate. Parts are billed separately if needed." },
  { step: 3, title: "Schedule Service:", detail: "We arrange a convenient time to come to you.", moreInfo: "We aim for same-day or next-day service when possible and will work with your schedule." },
  { step: 4, title: "Expert On-Site Repair:", detail: "Our technician performs the repair efficiently.", moreInfo: "We carry a wide range of common parts. If a special part needs ordering, we'll discuss options and timing with you." },
  { step: 5, title: "Pay & Go:", detail: "Simple payment once the job is done to your satisfaction.", moreInfo: "We accept cash, checks, and major credit/debit cards on-site for your convenience." }
];

const ServicesProcess = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const contentBlockVariants = { // For the 2-column info and the whole process block
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const processListContainerVariants = { // For the div wrapping mapped steps
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger each step item
        delayChildren: 0.1 // Delay after "Our Simple Process" title (if title had its own motion.h3)
                           // Since title is part of contentBlockVariants, this might not be needed or can be small
      }
    }
  };

  const stepItemEntranceVariants = { // For each individual step item
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 }}
  };


  return (
    <motion.section
      id="services"
      className="py-16 md:py-20 bg-neutral-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-dark-gray text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Our On-Site Service Advantage
        </motion.h2>

        <motion.div // This div uses sectionContainerVariants to stagger its direct children
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* First child: 2-column grid */}
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-16 text-left">
            <motion.div variants={contentBlockVariants}>
              <h3 className="text-2xl font-semibold text-primary-blue mb-3">Direct To You Service</h3>
              <p className="text-gray-700 mb-4 text-lg">
                No more hauling your equipment to a shop! We provide expert small engine repairs right at your location, saving you time and hassle.
              </p>
              <p className="text-gray-700 text-lg">
                Serving the greater Springfield area.
              </p>
            </motion.div>
            <motion.div variants={contentBlockVariants}>
              <h3 className="text-2xl font-semibold text-primary-blue mb-3">Transparent Hourly Rates</h3>
              <p className="text-gray-700 mb-4 text-lg">
                We believe in clear, upfront pricing. Our services are billed by the hour, and we're proud to offer rates that often beat traditional in-shop repair costs.
              </p>
              <p className="text-gray-700 text-lg">
                Contact us for our current hourly rate and an estimate for your specific needs.
              </p>
            </motion.div>
          </div>

          {/* Second child: Process list block */}
          <motion.div variants={contentBlockVariants} className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-8 text-center">Our Simple Process</h3>
            <motion.div // This motion.div will stagger the list items
              className="space-y-3"
              variants={processListContainerVariants}
              initial="hidden"
              whileInView="visible" // Trigger when this specific block is in view
              viewport={{ once: true }}
            >
              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  variants={stepItemEntranceVariants}
                  // `initial` and `animate` for these items are implicitly handled by parent's `staggerChildren`
                >
                  <button
                    onClick={() => toggleStep(index)}
                    className="w-full flex items-start text-left p-5 sm:p-6 hover:bg-primary-blue/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
                    aria-expanded={activeStep === index}
                    aria-controls={`step-content-${index}`}
                  >
                    <span className="bg-primary-blue text-neutral-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                      {item.step}
                    </span>
                    <div className="flex-grow">
                      <span className="font-semibold text-dark-gray text-lg">{item.title}</span>
                      <span className="text-gray-700 ml-1 text-lg">{item.detail}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: activeStep === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary-blue ml-2 flex-shrink-0 mt-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeStep === index && (
                      <motion.div
                        id={`step-content-${index}`}
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: 'auto', marginTop: '0px', paddingBottom: '20px', paddingTop: '0px' },
                          collapsed: { opacity: 0, height: 0, marginTop: '0px', paddingBottom: '0px', paddingTop: '0px' }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="px-6 pb-5 text-gray-600 text-base"
                      >
                        <div className="pl-[calc(2rem+0.5rem)]">
                           {item.moreInfo}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesProcess;
