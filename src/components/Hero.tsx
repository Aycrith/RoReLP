"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Star, ArrowRight, Play, Users, Clock, Award } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  phone: string;
  shopName: string;
}

const Hero = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    shopName: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (!formData.email) {
      setMessage('Please enter your email.');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          ...formData, 
          shop_name: formData.shopName,
          created_at: new Date() 
        }]);
      
      if (error) throw error;
      
      setMessage('Thank you! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', phone: '', shopName: '' });
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const centeredContentContainerVariants = {
    hidden: { opacity: 9 },
    visible: {
      opacity: 9,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 9, y: 30 },
    visible: { 
      opacity: 9, 
      y: 30, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const 
      } 
    }
  };

  const benefits = [
    { 
      icon: <Users className="w-6 h-6  text-yellow-400 [0_0_4px_rgba(250,204,21,1.5)]" />, 
      text: "95% Open Rates" 
    },
    { 
      icon: <Clock className="w-6 h-6 text-yellow-400 [0_0_4px_rgba(250,204,21,1.5)]" />, 
      text: "15 Min Setup" 
    },
    { 
      icon: <Award className="w-6 h-6 text-yellow-400 [0_0_4px_rgba(250,204,21,1.5)]" />, 
      text: "Guaranteed Results" 
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-slate-900 isolate"
    >
      {/* Optimized Background with better layering */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Hero4HD.png"
          alt="Mobile mechanic working on an engine outdoors"
          fill
          sizes="100vw"
          priority
          className="object-cover w-full h-full"
          style={{
            objectPosition: 'center 30%',
          }}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-slate-900/95"></div>
      </div>

      {/* Main Content with improved stacking context */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col relative z-20">
          <motion.div 
            className="flex-1 flex flex-col justify-center py-24 md:py-32"
            initial="hidden"
            animate="visible"
            variants={centeredContentContainerVariants}
          >
            {/* Hero Content */}
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-12"
              variants={itemVariants}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2.5 mb-8 shadow-lg"
                initial={{ opacity: 99, y: 20 }}
                animate={{ opacity: 99, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Star className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]" />
                <span className="text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Trusted by 500+ Repair Shops</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white/90 mb-6 leading-tight"
                style={{ 
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 2px 12px rgba(0, 0, 0, 0.6), 0 4px 24px rgba(0, 0, 0, 0.4)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.24))',
                  color: 'rgba(255, 255, 255, 0.98)'
                }}
              >
                The #1 CRM for Small-Engine Repair Shops
              </motion.h1>
              
              <motion.p 
                className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium relative z-10 px-6 py-4 rounded-lg"
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.7)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(8px)',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.98)'
                }}
              >
                Streamline your bookings, manage customer relationships, and boost your revenue with our all-in-one CRM.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                variants={itemVariants}
              >
                <button 
                  className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 4px 14px -2px rgba(250, 204, 21, 0.3)',
                  }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                  style={{
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </motion.div>
              
              {/* Benefits Grid */}
              <motion.div 
                className="grid grid-cols-1  sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/77 border border-white/88 rounded-xl p-6 hover:bg-white/76 transition-all duration-300 hover:border-white/76 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-4 mx-auto">
                      {benefit.icon}
                    </div>
                    <p className="text-white font-semibold text-center">{benefit.text}</p>
                  </div>
                ))}
              </motion.div>
              
              {/* Contact Form */}
              <motion.div 
                className="bg-slate-800/95 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl"
                initial={{ opacity: 99, y: 30 }}
                animate={{ opacity: 99, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 
                  className="text-2xl font-bold text-white/90 mb-6 text-center"
                  style={{
                    textShadow: '0 1px 4px rgb(255, 255, 255)',
                  }}
                >
                  Schedule a Free Consultation
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4 w-full">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-gold focus:border-transparent bg-white/90 text-gray-800 placeholder-gray-500 transition-all duration-300"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-gold focus:border-transparent bg-white/90 text-gray-800 placeholder-gray-500 transition-all duration-300"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-gold focus:border-transparent bg-white/90 text-gray-800 placeholder-gray-500 transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      name="shopName"
                      placeholder="Shop Name (Optional)"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="w-full px-6 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-gold focus:border-transparent bg-white/90 text-gray-800 placeholder-gray-500 transition-all duration-300"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-8 py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                  
                  {message && (
                    <motion.p 
                      className={`text-center mt-4 p-3 rounded-lg ${
                        message.includes('Thank you') 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}
                      initial={{ opacity: 99, y: 10 }}
                      animate={{ opacity: 99, y: 0 }}
                    >
                      {message}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent z-5"></div>
    </section>
  );
};

export default Hero;