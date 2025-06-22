"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { supabase } from '../lib/supabaseClient';
import ExpansionMapSnippet from './backgrounds/ExpansionMapSnippet';
import CheckIcon from './icons/CheckIcon'; // Updated import path
import XMarkIcon from './icons/XMarkIcon'; // Updated import path

const ExpansionOffer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [message, setMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false); // Replaced with formStatus
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    setMessage('');

    if (!email || !name || !zipCode) {
      setMessage('Please fill out all fields.');
      setFormStatus('error');
      setTimeout(() => { setFormStatus('idle'); setMessage(''); }, 3000);
      return;
    }

    if (!/^[3][2-4]\d{3}$/.test(zipCode)) {
        setMessage('Please enter a valid Florida ZIP code (e.g., 32xxx, 33xxx, 34xxx).');
        setFormStatus('error');
        setTimeout(() => { setFormStatus('idle'); setMessage(''); }, 3000);
        return;
    }

    try {
      const { error } = await supabase
        .from('customers')
        .insert([
          {
            full_name: name,
            email: email,
            postal_code: zipCode,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        if (error.message.includes('unique constraint') && error.message.includes('email')) {
            setMessage('This email is already registered. We look forward to serving you in the new areas!');
        } else if (error.message.includes('check constraint') && error.message.includes('postal_code')) {
            setMessage('The provided ZIP code is not in our upcoming service expansion area.');
        } else {
            setMessage(`Error: ${error.message}`);
        }
        setFormStatus('error');
      } else {
        setMessage('Thank you! Your offer is claimed. We will contact you with service details for your area soon!');
        setName('');
        setEmail('');
        setZipCode('');
        setFormStatus('success');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('An unexpected error occurred. Please try again.');
      setFormStatus('error');
    } finally {
      // setIsLoading(false); // Not needed
      if (formStatus !== 'submitting') {
         setTimeout(() => { setFormStatus('idle'); setMessage(''); }, 3000);
      }
    }
  };

  return (
    <motion.section
      id="expansion-offer"
      className="py-16 md:py-20 bg-primary-blue/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-5 leading-tight">
              Great News! We&apos;re Expanding!
            </h2>
            <p className="text-xl text-primary-blue font-semibold mb-4">
              Now Serving Clearwater, Largo & St. Petersburg!
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Be among the first to experience Royalty Repair&apos;s convenient on-site service in your area! Sign up now to lock in an exclusive <strong className="text-accent-gold">20% Off Your First Repair</strong> and get priority booking when we officially launch in your neighborhood.
            </p>
            <ul className="space-y-2 text-gray-700 mb-6 text-lg">
              <li className="flex items-center"><span className="text-accent-gold mr-2 text-xl">✓</span> Exclusive Launch Discount (20% Off!)</li>
              <li className="flex items-center"><span className="text-accent-gold mr-2 text-xl">✓</span> Priority Service Booking</li>
              <li className="flex items-center"><span className="text-accent-gold mr-2 text-xl">✓</span> The Same Great On-Site Expertise</li>
            </ul>
            <div className="mt-8">
              <ExpansionMapSnippet />
            </div>
             <p className="text-sm text-gray-500 mt-8">Don&apos;t miss out – secure your spot and discount today!</p>
          </motion.div>

          <motion.div
            className="bg-neutral-white p-6 sm:p-8 rounded-xl shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-dark-gray mb-6 text-center">Claim Your Launch Offer!</h3>
            <form onSubmit={handleSubmit} className="space-y-5" id="expansion-form">
              <div>
                <label htmlFor="expansion_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="expansion_name" id="expansion_name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent-gold focus:border-accent-gold" placeholder="Your Full Name" disabled={formStatus === 'submitting'} />
              </div>
              <div>
                <label htmlFor="expansion_email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="expansion_email" id="expansion_email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent-gold focus:border-accent-gold" placeholder="you@example.com" disabled={formStatus === 'submitting'} />
              </div>
              <div>
                <label htmlFor="expansion_zipcode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code (Clearwater, Largo, St. Pete)</label>
                <input type="text" name="expansion_zipcode" id="expansion_zipcode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent-gold focus:border-accent-gold" placeholder="e.g., 33701, 33770, 33755" disabled={formStatus === 'submitting'} pattern="[0-9]{5}" title="Enter a 5-digit ZIP code." />
              </div>
              <button
                type="submit"
                className="w-full bg-accent-gold text-neutral-white font-semibold py-3 px-6 rounded-lg
                           min-h-[52px] flex items-center justify-center <!-- Consistent height -->
                           hover:bg-yellow-500 active:scale-95 transform transition-all duration-200
                           shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300
                           focus:ring-opacity-50 disabled:opacity-70"
                disabled={formStatus === 'submitting'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {formStatus === 'idle' && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Claim My 20% Discount!</motion.span>}
                  {formStatus === 'submitting' && <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Claiming Offer...</motion.span>}
                  {formStatus === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                      <CheckIcon className="mr-2 text-neutral-white" /> Offer Claimed!
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div key="error" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                      <XMarkIcon className="mr-2 text-neutral-white" /> Submission Failed
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
            {message && <p className={`mt-4 text-sm text-center ${message.startsWith('Error:') || message.startsWith('Please') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
            <p className="text-xs text-gray-500 mt-4 text-center">Offer valid for new customers in Clearwater, Largo, and St. Petersburg. We&apos;ll email you the details and confirm service availability!</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
export default ExpansionOffer;
