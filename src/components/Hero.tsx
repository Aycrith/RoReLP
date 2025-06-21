"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import CheckIcon from './icons/CheckIcon';
import XMarkIcon from './icons/XMarkIcon';
import { ArrowRight, Play, Star, Users, Award, Clock } from 'lucide-react';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800"
    >
      {/* Background Ken Burns Effect */}
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
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>

      {/* Subtle Gradient Overlay - Much more transparent to preserve image depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-slate-900/90"></div>

      {/* Background decorative elements - Reduced opacity */}
      <div className="absolute inset-0 z-15 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

      {/* Much more subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full filter blur-3xl opacity-15 animate-pulse delay-1000"></div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <motion.div
            className="flex flex-col items-start text-left lg:pr-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Trust Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Star className="w-4 h-4 text-accent-gold fill-current drop-shadow-sm" />
              <span className="text-sm font-semibold text-white" style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}>Trusted by 500+ Repair Shops</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="block text-white drop-shadow-2xl" style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.3)'
              }}>Transform Your</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-accent-gold to-yellow-300 bg-clip-text text-transparent font-extrabold relative" style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}>
                Repair Business
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-medium mt-2 text-gray-100 drop-shadow-lg" style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                with Smart CRM
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed text-gray-100 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                textShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Streamline your bookings, manage customer relationships, and boost your revenue with our all-in-one CRM designed specifically for small-engine repair shops.
            </motion.p>

            {/* Email Capture Form */}
            <motion.div
              className="w-full max-w-lg mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your business email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all duration-300 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={formStatus === 'submitting'}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold text-black font-semibold px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 group min-w-[200px] flex items-center justify-center"
                  disabled={formStatus === 'submitting'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {formStatus === 'idle' && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        Get Free Quote
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                    {formStatus === 'submitting' && (
                      <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Getting Quote...
                      </motion.span>
                    )}
                    {formStatus === 'success' && (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                        <CheckIcon className="mr-2 text-black" /> Success!
                      </motion.div>
                    )}
                    {formStatus === 'error' && (
                      <motion.div key="error" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                        <XMarkIcon className="mr-2 text-black" /> Try Again
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
            </motion.div>

            {/* Secondary CTA */}
            <motion.button
              className="inline-flex items-center gap-2 text-white hover:text-accent-gold transition-colors duration-300 text-lg font-semibold group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              style={{
                textShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform drop-shadow-sm" />
              Watch 2-Minute Demo
            </motion.button>
          </motion.div>

          {/* Right Side - CRM Dashboard Preview */}
          <motion.div
            className="flex items-center justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.8 }}
          >
            <div className="relative max-w-lg w-full">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent-gold/20 rounded-2xl blur-3xl scale-110 opacity-40"></div>
              
              {/* Main Dashboard Image */}
              <motion.div
                className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/HEROSTORYLANDINGPAGE.PNG"
                  alt="CRM Dashboard Preview"
                  width={600}
                  height={450}
                  style={{ objectFit: 'contain' }}
                  className="rounded-xl shadow-lg"
                  priority
                />
                
                {/* Floating Live Demo Badge */}
                <motion.div
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-accent-gold to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg"
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

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center group">
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
              <Users className="w-8 h-8 text-accent-gold" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>500+</div>
            <div className="text-gray-200 font-medium" style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>Active Repair Shops</div>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
              <Clock className="w-8 h-8 text-accent-gold" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>24/7</div>
            <div className="text-gray-200 font-medium" style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>Expert Support</div>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
              <Award className="w-8 h-8 text-accent-gold" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>98%</div>
            <div className="text-gray-200 font-medium" style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>Customer Satisfaction</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade - More subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/60 to-transparent z-30"></div>
    </section>
  );
};

export default Hero;
