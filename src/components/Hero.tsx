"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import CheckIcon from './icons/CheckIcon';
import XMarkIcon from './icons/XMarkIcon';

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
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
    } catch {
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
      className="flex items-center justify-center min-h-screen py-20 md:py-28 bg-dark-gray relative overflow-hidden"
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

      {/* 2. Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to right, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.7) 50%, rgba(17,24,39,0.85) 100%)' }}
      ></div>

      {/* 3. Main Content Container */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          
          {/* Left Side - Content */}
          <motion.div
            className="flex flex-col items-start text-left lg:pr-8"
            variants={centeredContentContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-white leading-tight relative"
              variants={itemVariants}
            >
              {/* Enhanced background for better readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/80 via-dark-gray/60 to-transparent rounded-2xl blur-xl scale-110 -z-10"></div>
              
              {/* Main headline with enhanced styling */}
              <div className="relative z-10 bg-gradient-to-r from-dark-gray/90 via-dark-gray/70 to-dark-gray/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    custom={i}
                    className={`inline-block mr-2 ${
                      word === '#1' 
                        ? 'text-accent-gold font-black subtle-glow' 
                        : 'text-white font-black subtle-glow'
                    }`}
                    style={{ 
                      textShadow: '0 0 10px rgba(173, 216, 230, 0.4), 0 0 20px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl mb-8 text-white max-w-xl relative"
              variants={itemVariants}
            >
              {/* Background for better readability */}
              <div className="absolute inset-0 bg-dark-gray/70 backdrop-blur-sm rounded-xl -z-10 scale-105"></div>
              
              {/* Enhanced paragraph text */}
              <span className="relative z-10 block bg-dark-gray/60 backdrop-blur-md rounded-xl p-4 font-medium leading-relaxed subtle-glow" 
                    style={{ textShadow: '0 0 8px rgba(173, 216, 230, 0.3), 0 0 15px rgba(255, 255, 255, 0.15), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
                {paragraphText}
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="w-full max-w-md">
              <form
                className="flex flex-col sm:flex-row gap-4"
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

          {/* Right Side - CRM Dashboard Image */}
          <motion.div
            className="flex items-center justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative max-w-lg w-full">
              {/* Subtle glow effect behind the image */}
              <div className="absolute inset-0 bg-accent-gold/20 rounded-xl blur-2xl scale-110 opacity-30"></div>
              
              {/* Main CRM Dashboard Image */}
              <motion.div
                className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/HEROSTORYLANDINGPAGE.PNG"
                  alt="CRM Dashboard Preview"
                  width={600}
                  height={450}
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                  priority
                />
                
                {/* Floating badge */}
                <motion.div
                  className="absolute -top-3 -right-3 bg-accent-gold text-dark-gray px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                >
                  Live Demo
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
