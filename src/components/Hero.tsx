"use client";
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import CheckIcon from '../icons/CheckIcon';
import XMarkIcon from '../icons/XMarkIcon';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Note: Tilt effect was removed when foreground image was removed.
  // If tilt is desired on the Ken Burns background, it would need different logic.

  const centeredContentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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
      setFormStatus('error');
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
      if (formStatus !== 'submitting') {
        setTimeout(() => { setFormStatus('idle'); setMessage(''); }, 3000);
      }
    }
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center min-h-screen py-20 md:py-28 bg-dark-gray relative overflow-hidden text-center"
    >
      {/* 1. Ken Burns Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: 1.05 }}
        animate={{
          scale: [1.05, 1.15, 1.05],
          transition: { duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }}
      >
        <Image
          src="/Hero4HD.png"
          alt="Mobile mechanic working on an engine outdoors"
          layout="fill"
          objectFit="cover"
          priority
        />
      </motion.div>

      {/* 2. NEW: CRM Dashboard Image Layer */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.15, scale: 1 }} // Reduced final opacity for more subtlety
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} // Increased delay slightly
      >
        <Image
          src="/HEROSTORYLANDINGPAGE.PNG" // User needs to provide this image
          alt="CRM Dashboard Preview"
          layout="intrinsic" // Changed to intrinsic to allow natural sizing up to a point
          width={1000} // Example width, adjust based on image and desired max size
          height={750} // Example height
          objectFit="contain"
          className="opacity-100 max-w-[80vw] max-h-[70vh]" // Tailwind classes for responsiveness
        />
      </motion.div>

      {/* 3. Dark Radial Gradient Overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{ background: 'radial-gradient(ellipse at center, rgba(17,24,39,0.45) 0%, rgba(17,24,39,0.85) 70%, rgba(17,24,39,1) 100%)' }} // Softer center, darker edges
      ></div>

      {/* 4. Centered Content */}
      <motion.div
        className="container mx-auto px-6 flex flex-col items-center justify-center relative z-30"
        variants={centeredContentContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-white leading-tight max-w-3xl drop-shadow-lg" // Added drop-shadow-lg
          variants={itemVariants}
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
          className="text-lg sm:text-xl mb-8 text-gray-200 max-w-xl drop-shadow-md" // Added drop-shadow-md
          variants={itemVariants}
        >
          {paragraphText}
        </motion.p>

        <motion.div variants={itemVariants} className="w-full max-w-md">
          <form
            className="flex flex-col sm:flex-row gap-4 justify-center"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your business email"
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold flex-grow text-gray-700 sm:min-w-[280px]"
              aria-label="Business email for quote request"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={formStatus === 'submitting'}
            />
            <button
              type="submit"
              className="bg-accent-gold text-neutral-white px-6 py-3 rounded-lg font-semibold
                         min-h-[48px] min-w-[180px] sm:min-w-auto flex items-center justify-center
                         hover:bg-yellow-500 hover:shadow-lg hover:ring-2 hover:ring-yellow-300 hover:ring-opacity-50
                         transition-all duration-200 whitespace-nowrap active:scale-95 transform disabled:opacity-50 shadow-md"
              disabled={formStatus === 'submitting'}
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
    </section>
  );
};

export default Hero;
