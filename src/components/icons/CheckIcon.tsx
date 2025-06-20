"use client"; // If it uses motion or other client hooks directly, not strictly needed if just SVG
import React from 'react';
import { motion } from 'framer-motion'; // motion.svg requires "use client" in parent if not here

const CheckIcon = ({ className }: { className?: string }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5} // Increased strokeWidth for better visibility
    stroke="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </motion.svg>
);
export default CheckIcon;
