"use client"; // Needs to be a client component for hooks like useTransform
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface SubtleCircleProps {
  className?: string;
  // initialY?: number | string; // Replaced by direct positioning via className
  scrollYProgress: MotionValue<number>;
  yRange?: [number | string, number | string];
  xRange?: [number | string, number | string]; // Optional xRange
  opacityRange?: [number, number];
  scaleRange?: [number, number]; // Optional scaleRange
  width?: string | number;
  height?: string | number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

const SubtleCircle: React.FC<SubtleCircleProps> = ({
  className,
  scrollYProgress,
  yRange = ['0%', '50%'],
  xRange, // Not used by default
  opacityRange = [0.5, 0.2],
  scaleRange, // Not used by default
  width = "200",
  height = "200",
  top, left, right, bottom
}) => {
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const x = xRange ? useTransform(scrollYProgress, [0, 1], xRange) : "0%"; // Default to no x movement if not specified
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);
  const scale = scaleRange ? useTransform(scrollYProgress, [0, 1], scaleRange) : 1;

  const motionStyle: any = { y, opacity, scale };
  if (xRange) motionStyle.x = x; // Only add x if xRange is provided

  // Construct style for initial positioning
  const initialPositionStyle: React.CSSProperties = {};
  if (top !== undefined) initialPositionStyle.top = top;
  if (left !== undefined) initialPositionStyle.left = left;
  if (right !== undefined) initialPositionStyle.right = right;
  if (bottom !== undefined) initialPositionStyle.bottom = bottom;

  return (
    <motion.div
      className={`absolute -z-10 ${className}`}
      style={{ ...initialPositionStyle, ...motionStyle }} // Apply transformed y, opacity, scale, and potentially x
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200" // Keep viewBox consistent, actual size controlled by width/height props
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="currentColor" />
      </svg>
    </motion.div>
  );
};
export default SubtleCircle;
