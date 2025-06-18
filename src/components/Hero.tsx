"use client";
import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient'; // Adjust path as needed

const Hero = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
      // Ensure your table is named 'customers' and column 'email'
      const { data, error } = await supabase
        .from('customers')
        .insert([{ email: email, created_at: new Date().toISOString() }]);

      if (error) {
        console.error('Supabase error:', error);
        // Check for specific errors, like unique constraint violation
        if (error.code === '23505') { // PostgreSQL unique violation error code
          setMessage('This email has already been submitted. Thank you!');
        } else {
          setMessage(`Error: ${error.message}`);
        }
      } else {
        setMessage('Thank you! Your email has been submitted.');
        setEmail(''); // Clear input after successful submission
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center min-h-screen bg-gray-50 py-20 md:py-28"
    >
      <motion.div
        className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Content Side */}
        <motion.div className="md:w-1/2 text-center md:text-left" variants={itemVariants}> {/* Changed parent variant here */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-dark-gray leading-tight"
            variants={itemVariants}
          >
            The #1 CRM for Small-Engine Repair Shops
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl mb-8 text-gray-700"
            variants={itemVariants}
          >
            Streamline your bookings, manage customer relationships, and boost your revenue with our all-in-one CRM designed specifically for businesses like yours.
          </motion.p>

          <motion.form
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants}
            onSubmit={handleSubmit} // Use the new handler
          >
            <input
              type="email"
              placeholder="Enter your business email"
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue flex-grow sm:max-w-sm text-gray-700"
              aria-label="Business email for demo request"
              value={email} // Controlled component
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-blue text-neutral-white px-6 py-3 rounded-md font-semibold hover:bg-royal-purple transition-colors whitespace-nowrap active:scale-95 transform disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Request Free Demo'}
            </button>
          </motion.form>
          {message && (
            <motion.p
              className={`mt-4 text-sm ${message.startsWith('Error:') || message.startsWith('Please enter') ? 'text-red-500' : 'text-green-500'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message}
            </motion.p>
          )}
          {!message && ( // Keep the original supporting text if no message
            <motion.p
              className="text-sm text-gray-500 mt-4"
              variants={itemVariants} // This will make it animate with the form
            >
              Get started with a no-obligation demo.
            </motion.p>
          )}
        </motion.div>

        {/* Image Side */}
        <motion.div className="md:w-1/2 mt-10 md:mt-0" variants={itemVariants}>
          <Image
            src="/HEROSTORYLANDINGPAGE.PNG"
            alt="CRM Dashboard Preview for Royalty Repair"
            width={600}
            height={450}
            className="rounded-lg shadow-xl mx-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
