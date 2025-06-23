"use client";
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image'; // Added Image import

const processSteps = [
  { step: 1, title: "Easy Booking:", detail: "Tell us about your equipment and the issue. Book online or call us.", moreInfo: "Use our simple online form or give us a call. We'll gather some basic information to understand your needs." },
  { step: 2, title: "Transparent Quote:", detail: "Receive a clear, upfront estimate for your repair.", moreInfo: "We provide an estimate based on the information you provide, covering labor and anticipated parts. No hidden fees." },
  { step: 3, title: "Convenient Scheduling:", detail: "Pick a time that works for you. We come to your location.", moreInfo: "Our team will coordinate a service appointment that fits your schedule. You can also manage your booking through our customer portal." },
  { step: 4, title: "Expert On-Site Repair:", detail: "Our certified technician arrives, diagnoses, and repairs your equipment.", moreInfo: "Our mobile workshop is equipped for most repairs. You can track the status of your repair through our customer portal." },
  { step: 5, title: "Review & Pay:", detail: "Confirm your satisfaction. Easy payment and service records online.", moreInfo: "Once the job is complete, review the work with our technician. Securely pay on-site or online. All service records are available in your customer portal." }
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

  const contentBlockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const imageContentBlockVariants = { // Specific for blocks that contain an image and text
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const, staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const textVariants = { // For h3 and p within imageContentBlockVariants
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const processListContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const stepItemEntranceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 }}
  };


  return (
    <motion.section
      id="services"
      className="py-16 md:py-20 bg-neutral-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" as const }}
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
          Getting Your Equipment Repaired is Easy
        </motion.h2>

        <motion.div
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 mb-16"> {/* Changed to lg:grid-cols-2 for better image display */}

            {/* Block 1: We Come To You */}
            <motion.div variants={imageContentBlockVariants} className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
              <motion.div className="md:w-2/5 flex-shrink-0" variants={imageVariants}>
                <Image
                  src="/HeroMobileRepairUnit1.png"
                  alt="Royalty Repair mobile service unit arriving at a customer's location"
                  width={300}
                  height={225}
                  className="rounded-lg shadow-lg object-cover mx-auto"
                />
              </motion.div>
              <motion.div className="md:w-3/5" variants={textVariants}>
                <h3 className="text-2xl font-semibold text-primary-blue mb-3">1. We Come To You</h3>
                <p className="text-gray-700 mb-4 text-lg">
                  Forget the hassle of transporting heavy or cumbersome equipment. Our certified technicians arrive at your home or business with a fully-equipped mobile workshop.
                </p>
                <p className="text-gray-700 text-lg">
                  Prompt, professional, and ready to work.
                </p>
              </motion.div>
            </motion.div>

            {/* Block 2: Expert Repair On-Site */}
            <motion.div variants={imageContentBlockVariants} className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left md:flex-row-reverse">
              <motion.div className="md:w-2/5 flex-shrink-0" variants={imageVariants}>
                <Image
                  src="/HeroEngine2.png" // Consider a different, relevant image
                  alt="Royalty Repair technician performing an expert repair on a small engine"
                  width={300}
                  height={225}
                  className="rounded-lg shadow-lg object-cover mx-auto"
                />
              </motion.div>
              <motion.div className="md:w-3/5" variants={textVariants}>
                <h3 className="text-2xl font-semibold text-primary-blue mb-3">2. Expert Repair, Your Control</h3>
                <p className="text-gray-700 mb-4 text-lg">
                  Our technicians diagnose the issue and explain the required repairs clearly. With your approval, they get to work, aiming to fix it right the first time. Track progress and manage your service through our online customer portal.
                </p>
                <p className="text-gray-700 text-lg">
                  Quality parts and transparent communication, always.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Process list block - Refined title */}
          <motion.div variants={contentBlockVariants} className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-8 text-center">Your Hassle-Free Repair Journey</h3>
            <motion.div
              className="space-y-3"
              variants={processListContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  variants={stepItemEntranceVariants}
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
