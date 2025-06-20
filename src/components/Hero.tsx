"use client";
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import CheckIcon from '../icons/CheckIcon'; // Import CheckIcon
import XMarkIcon from '../icons/XMarkIcon'; // Import XMarkIcon

const Hero = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false); // Replaced with formStatus
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');


  // For Hero Image Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);


  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const textContentContainerVariants = {
    hidden: { opacity: 0, y:20 },
    visible: {
      opacity: 1, y:0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
        duration: 0.5
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 }
    })
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const imageEntranceVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const headlineText = "The #1 CRM for Small-Engine Repair Shops";
  const headlineWords = headlineText.split(" ");
  const paragraphText = "Streamline your bookings, manage customer relationships, and boost your revenue with our all-in-one CRM designed specifically for businesses like yours.";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    setMessage('');
    if (!email) {
      setMessage('Please enter your email.');
      setFormStatus('error'); // Changed to error status
      setTimeout(() => { setFormStatus('idle'); setMessage(''); }, 3000);
      return;
    }
    try {
      const { error } = await supabase
        .from('customers')
        .insert([{ email: email, created_at: new Date().toISOString() }]);
      if (error) {
        if (error.code === '23505') {
          setMessage('This email has already been submitted. We will be in touch!');
        } else {
          setMessage(`Error: ${error.message}`);
        }
        setFormStatus('error');
      } else {
        setMessage('Thank you! We will contact you shortly to discuss your on-site service needs.');
        setEmail('');
        setFormStatus('success');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      setFormStatus('error');
    } finally {
      // setIsLoading(false); // Not needed
      if (formStatus !== 'submitting') { // Don't revert if still submitting (e.g. fast clicks)
        setTimeout(() => { setFormStatus('idle'); setMessage(''); }, 3000);
      }
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="flex items-center justify-center min-h-screen py-20 md:py-28 bg-dark-gray relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 animated-hero-bg z-[1]"
        style={{ opacity: gradientOpacity }}
      />
      <motion.div
        className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-[2]"
        variants={heroContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={textContentContainerVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-white leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                custom={i}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl mb-8 text-gray-200"
            variants={paragraphVariants}
          >
            {paragraphText}
          </motion.p>

          <motion.div variants={paragraphVariants}>
            <form
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your business email"
                className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold flex-grow sm:max-w-sm text-gray-700"
                aria-label="Business email for demo request"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={formStatus === 'submitting'} // Updated disabled state
              />
              <button
                type="submit"
                className="bg-accent-gold text-neutral-white px-6 py-3 rounded-lg font-semibold
                           min-h-[48px] min-w-[200px] flex items-center justify-center
                           hover:bg-yellow-500 hover:shadow-lg hover:ring-2 hover:ring-yellow-300 hover:ring-opacity-50
                           transition-all duration-200 whitespace-nowrap active:scale-95 transform disabled:opacity-50 shadow-md"
                disabled={formStatus === 'submitting'} // Updated disabled state
              >
                <AnimatePresence mode="wait" initial={false}>
                  {formStatus === 'idle' && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Get an On-Site Quote</motion.span>}
                  {formStatus === 'submitting' && <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Getting Quote...</motion.span>}
                  {formStatus === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                      <CheckIcon className="mr-2 text-neutral-white" /> Success!
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div key="error" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                      <XMarkIcon className="mr-2 text-neutral-white" /> Failed
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
            {message && (
              <motion.p
                className={`mt-4 text-sm ${message.includes('Error:') || message.startsWith('Please enter') ? 'text-red-300' : 'text-green-300'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message}
              </motion.p>
            )}
            {!message && (
              <p className="text-sm text-gray-300 mt-4">
                Submit your email to start the quote process.
              </p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center"
          variants={imageEntranceVariants}
          style={{ perspective: "1200px", rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <Image
            src="/HEROSTORYLANDINGPAGE.PNG"
            alt="CRM Dashboard Preview for Royalty Repair"
            width={600}
            height={450}
            className="rounded-lg shadow-2xl mx-auto"
            priority
            style={{ transformStyle: "preserve-3d" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
