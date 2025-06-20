"use client"; // If it uses motion or other client hooks directly
import React from 'react';
import { motion } from 'framer-motion'; // motion.svg requires "use client" in parent if not here

const XMarkIcon = ({ className }: { className?: string }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5} // Increased strokeWidth for better visibility
    stroke="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </motion.svg>
);
export default XMarkIcon;
