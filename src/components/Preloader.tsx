"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-neutral-white z-[9999] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <Image
            src="/assets/icons/royalty-repairNOBACKGROUND.svg"
            alt="Royalty Repair Logo"
            width={200}
            height={53} // Aspect ratio based on 150:40 -> 200:53.33
            priority // Important for LCP if this is the first thing seen
        />
      </motion.div>
      <motion.div
        className="mt-6 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden" // Slightly larger bar
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-primary-blue"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "linear", delay: 0.5 }} // Slightly longer fill
        />
      </motion.div>
      <motion.p
        className="mt-4 text-sm text-gray-600" // Slightly darker text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Loading your experience...
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
