"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }, // Stagger text block and image
    },
  };

  const textContentContainerVariants = {
    hidden: { opacity: 0, y:20 }, // It should have its own initial state
    visible: {
      opacity: 1, y:0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1, // Small delay after container appears
        duration: 0.5
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4 }
    })
  };

  const paragraphVariants = { // For paragraph and form block
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const imageVariants = { // Specific for the image
    hidden: { opacity: 0, y: 50, scale: 0.95 }, // Start further down and slightly smaller
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } } // Slower, more pronounced entry
  };

  const headlineText = "The #1 CRM for Small-Engine Repair Shops";
  const headlineWords = headlineText.split(" ");
  const paragraphText = "Streamline your bookings, manage customer relationships, and boost your revenue with our all-in-one CRM designed specifically for businesses like yours.";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    if (!email) {
      setMessage('Please enter your email.');
      setIsLoading(false);
      return;
    }
    try {
      const { error } = await supabase
        .from('customers')
        .insert([{ email: email, created_at: new Date().toISOString() }]);
      if (error) {
        if (error.code === '23505') {
          setMessage('This email has already been submitted. Thank you!');
        } else {
          setMessage(`Error: ${error.message}`);
        }
      } else {
        setMessage('Thank you! Your email has been submitted.');
        setEmail('');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section // Changed section to not be motion component
      id="hero"
      className="flex items-center justify-center min-h-screen py-20 md:py-28 animated-hero-bg overflow-hidden" // Added overflow-hidden
    >
      <motion.div
        className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12"
        variants={heroContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Content Side */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={textContentContainerVariants}
          // This will now be staggered by heroContainerVariants
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-white leading-tight"
            // Variants applied to children spans
            initial="hidden" // Need initial and whileInView here to trigger children if parent has delayChildren
            whileInView="visible"
            viewport={{ once: true }} // Ensures it triggers if textContentContainer has delayChildren
            transition={{ staggerChildren: 0.08 }} // This will apply to words if wordVariants is not custom
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                custom={i} // Pass index for custom delay in wordVariants
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

          <motion.div variants={paragraphVariants}> {/* Form block uses same as paragraph or a new one */}
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
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-accent-gold text-neutral-white px-6 py-3 rounded-lg font-semibold
                           hover:bg-yellow-500 hover:shadow-lg hover:ring-2 hover:ring-yellow-300 hover:ring-opacity-50
                           transition-all duration-200 whitespace-nowrap active:scale-95 transform disabled:opacity-50 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Request Free Demo'}
              </button>
            </form>
            {message && (
              <motion.p
                className={`mt-4 text-sm ${message.startsWith('Error:') || message.startsWith('Please enter') ? 'text-red-300' : 'text-green-300'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.p>
            )}
            {!message && (
              <p className="text-sm text-gray-300 mt-4">
                Get started with a no-obligation demo.
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Image Side */}
        <motion.div className="md:w-1/2 mt-10 md:mt-0" variants={imageVariants}> {/* Use distinct imageVariants */}
          <Image
            src="/HEROSTORYLANDINGPAGE.PNG"
            alt="CRM Dashboard Preview for Royalty Repair"
            width={600}
            height={450}
            className="rounded-lg shadow-2xl mx-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
