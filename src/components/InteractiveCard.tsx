"use client"; // For Framer Motion hooks
import React from 'react';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants; // For entrance animations
  whileHoverConfig?: Record<string, unknown>; // For existing whileHover props like scale, shadow
  initialStyle?: React.CSSProperties; // For initial styles like transparent border
  rotationFactor?: number;
  perspective?: string | number;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  variants,
  whileHoverConfig,
  initialStyle,
  rotationFactor = 5,
  perspective = '800px'
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Adjusted range for rotateX to match visual expectation (y mouse movement affects x-axis rotation)
  const rotateX = useTransform(y, [-100, 100], [rotationFactor, -rotationFactor]);
  // Adjusted range for rotateY (x mouse movement affects y-axis rotation)
  const rotateY = useTransform(x, [-100, 100], [-rotationFactor, rotationFactor]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    // Adjust sensitivity by dividing mouse position values if needed, e.g., by 2
    x.set((event.clientX - rect.left - rect.width / 2));
    y.set((event.clientY - rect.top - rect.height / 2));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      variants={variants} // For entrance animation
      initial="hidden" // Assuming variants have hidden/visible states
      whileInView="visible" // Assuming variants have hidden/visible states
      viewport={{ once: true }} // Assuming variants have hidden/visible states
      whileHover={whileHoverConfig} // For existing scale, shadow, border changes
      style={{
        ...initialStyle,
        perspective: perspective, // Apply perspective to the card itself
        rotateX,
        rotateY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ // Add a gentle transition for the rotation reset onMouseLeave
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};
export default React.memo(InteractiveCard);
