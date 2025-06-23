"use client";
import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import SubtleCircle from './backgrounds/SubtleCircle'; // Assuming this is a shared component

interface CrmFeatureItemProps {
  icon: string; // Path to an icon image
  title: string;
  description: string;
  delay: number;
}

const CrmFeatureItem: React.FC<CrmFeatureItemProps> = ({ icon, title, description, delay }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } }
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      variants={itemVariants}
    >
      <div className="p-4 bg-primary-blue/10 rounded-full mb-5">
        <Image src={icon} alt={`${title} icon`} width={40} height={40} />
      </div>
      <h4 className="text-xl font-semibold text-dark-gray mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const CrmSpotlight = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } }
  };


  const features = [
    {
      icon: "/assets/icons/calendar-check.svg", // Placeholder
      title: "Easy Appointment Management",
      description: "Schedule new services, view upcoming appointments, or reschedule if needed, all in one place.",
      delay: 0.5
    },
    {
      icon: "/assets/icons/progress-tracking.svg", // Placeholder
      title: "Real-Time Repair Tracking",
      description: "Stay informed with live updates on your service status, from technician dispatch to job completion.",
      delay: 0.65
    },
    {
      icon: "/assets/icons/history-log.svg", // Placeholder
      title: "Full Service History",
      description: "Access detailed records of all past repairs, services, and invoices for your equipment.",
      delay: 0.8
    },
    {
      icon: "/assets/icons/document-access.svg", // Placeholder
      title: "Your Records, Your Control",
      description: "Download invoices, service reports, and warranty information whenever you need them.",
      delay: 0.95
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="crm-spotlight"
      className="py-16 md:py-20 bg-neutral-white overflow-hidden relative" // Changed to neutral-white for contrast if previous was gray-50
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-primary-blue/5"
        yRange={['-25%', '25%']}
        opacityRange={[0.25, 0.05]}
        top="15%" right="-100px" width="280px" height="280px"
      />
      <SubtleCircle
        scrollYProgress={scrollYProgress}
        className="text-accent-gold/5"
        yRange={['20%', '-20%']}
        opacityRange={[0.2, 0.05]}
        bottom="10%" left="-120px" width="220px" height="220px"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-dark-gray"
          variants={sectionTitleVariants}
        >
          Take Control with Your Royalty Repair Portal
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16 md:mb-20"
          variants={sectionTitleVariants} // Can use same variant or a slightly different one
          style={{ transitionDelay: '0.15s' }} // Slight delay after title
        >
          Our secure customer portal empowers you with complete transparency and control over your small engine services. Manage everything effortlessly.
        </motion.p>

        {/* Optional: Large visual element of the CRM dashboard */}
        <motion.div
          className="mb-16 md:mb-20"
          variants={imageVariants}
        >
          <Image
            src="/public/HEROSTORYLANDINGPAGE.PNG" // Replace with an actual CRM dashboard screenshot/mockup
            alt="Royalty Repair Customer Portal Dashboard"
            width={1000} // Adjust as needed
            height={600} // Adjust as needed
            className="rounded-xl shadow-2xl mx-auto object-contain"
          />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          // No need for variants here if CrmFeatureItem handles its own animation
        >
          {features.map((feature) => (
            <CrmFeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CrmSpotlight;
