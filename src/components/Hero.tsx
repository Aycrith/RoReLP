"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Rate limiting configuration
const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS = 3; // Max submissions per minute

// Form field validation patterns
const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z\s-]{2,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{10,20}$/,
  shopName: /^[a-zA-Z0-9\s-]{0,100}$/
};

// Error messages
const ERROR_MESSAGES = {
  name: 'Please enter a valid name (2-50 characters, letters and spaces only)',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number (10-20 digits)',
  shopName: 'Shop name can only contain letters, numbers, and hyphens',
  rateLimit: 'Too many submissions. Please try again later.',
  generic: 'An error occurred. Please try again.'
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  shopName: string;
  source?: string;
  ip_address?: string;
  user_agent?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  shopName?: string;
  form?: string;
}

interface SubmissionAttempt {
  timestamp: number;
  ip: string;
}

const Hero = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    shopName: '',
    source: 'website_hero',
    ip_address: '',
    user_agent: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientInfo, setClientInfo] = useState({ ip: '', userAgent: '' });
  const [submissionAttempts, setSubmissionAttempts] = useState<SubmissionAttempt[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const lastSubmissionTime = useRef<number>(0);

  // Refs for parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // Animation variants removed as they were unused

  // Removed unused pulseAnimation

  // Get client info on component mount
  useEffect(() => {
    const getClientInfo = async () => {
      try {
        const response = await fetch('/api/client-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch client info');
        }
        
        const data = await response.json();
        setClientInfo({
          ip: data.ip || '',
          userAgent: data.userAgent || ''
        });
      } catch (error) {
        console.error('Error fetching client info:', error);
        // Don't block form submission if client info fails
      } finally {
        setIsLoading(false);
      }
    };

    getClientInfo();
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear any existing error for this field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    if (!value.trim()) {
      if (field === 'shopName') return undefined; // Optional field
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    
    if (field === 'email' && !VALIDATION_PATTERNS.email.test(value)) {
      return ERROR_MESSAGES.email;
    }
    
    if (field === 'phone' && !VALIDATION_PATTERNS.phone.test(value)) {
      return ERROR_MESSAGES.phone;
    }
    
    if (field === 'name' && !VALIDATION_PATTERNS.name.test(value)) {
      return ERROR_MESSAGES.name;
    }
    
    if (field === 'shopName' && value && !VALIDATION_PATTERNS.shopName.test(value)) {
      return ERROR_MESSAGES.shopName;
    }
    
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    
    // Define the fields that should be validated
    const fieldsToValidate = ['name', 'email', 'phone', 'shopName'] as const;
    
    // Validate each field
    for (const key of fieldsToValidate) {
      const value = formData[key];
      if (value !== undefined) {
        const error = validateField(key, value);
        if (error) {
          errors[key] = error;
          isValid = false;
        }
      }
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const checkRateLimit = (ip: string): boolean => {
    const now = Date.now();
    const timeWindow = now - RATE_LIMIT_DURATION;
    
    // Filter out old attempts
    const recentAttempts = submissionAttempts.filter(
      attempt => attempt.timestamp > timeWindow && attempt.ip === ip
    );
    
    return recentAttempts.length >= MAX_SUBMISSIONS;
  };

  // Form fields configuration
  const formFields = [
    {
      id: 'name',
      label: 'FULL NAME',
      type: 'text' as const,
      required: true,
      placeholder: 'John Doe',
      pattern: VALIDATION_PATTERNS.name.source,
      autoComplete: 'name',
      icon: null
    },
    {
      id: 'email',
      label: 'EMAIL',
      type: 'email' as const,
      required: true,
      placeholder: 'you@example.com',
      pattern: VALIDATION_PATTERNS.email.source,
      autoComplete: 'email',
      icon: null
    },
    {
      id: 'phone',
      label: 'PHONE NUMBER',
      type: 'tel' as const,
      required: true,
      placeholder: '(123) 456-7890',
      pattern: VALIDATION_PATTERNS.phone.source,
      autoComplete: 'tel',
      icon: null
    },
    {
      id: 'shopName',
      label: 'SHOP NAME (OPTIONAL)',
      type: 'text' as const,
      required: false,
      placeholder: 'ABC Auto Repair',
      pattern: VALIDATION_PATTERNS.shopName.source,
      autoComplete: 'organization',
      icon: null
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setMessage({ text: '', type: '' });
    
    // Validate form
    if (!validateForm()) {
      // Focus on first error field
      const firstError = Object.keys(formErrors)[0] as keyof FormErrors;
      if (firstError && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstError}"]`) as HTMLElement;
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }
    
    // Check rate limiting
    if (clientInfo.ip && checkRateLimit(clientInfo.ip)) {
      setIsRateLimited(true);
      setMessage({
        text: ERROR_MESSAGES.rateLimit,
        type: 'error'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update submission attempts
      const now = Date.now();
      setSubmissionAttempts(prev => [
        ...prev,
        { timestamp: now, ip: clientInfo.ip }
      ]);
      lastSubmissionTime.current = now;
      
      // Prepare submission data
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        shop_name: formData.shopName.trim(),
        source: formData.source,
        ip_address: clientInfo.ip,
        user_agent: clientInfo.userAgent,
        created_at: new Date().toISOString(),
        status: 'new',
        notes: 'Submitted from website hero section'
      };
      
      // Submit to Supabase
      const { error } = await supabase
        .from('leads')
        .insert([submissionData]);
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.details || error.message || 'Failed to submit form');
      }
      
      // Success
      setMessage({ 
        text: 'Thank you! We\'ll be in touch soon!', 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        shopName: '',
        source: 'website_hero',
      });
      
      // Reset form errors
      setFormErrors({});
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Form submission error:', error);
      
      setMessage({ 
        text: errorMessage.includes('duplicate key value') 
          ? 'This email has already been submitted. We\'ll be in touch soon!'
          : ERROR_MESSAGES.generic, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Boost Your Auto Repair Shop&apos;s Revenue
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl text-gray-300 mb-8"
              >
                Get more customers and increase your shop&apos;s visibility with our proven digital marketing strategies.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <a
                  href="#contact"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-center"
                >
                  Get Started
                </a>
                <a
                  href="#how-it-works"
                  className="bg-transparent hover:bg-gray-800 border-2 border-white text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-center"
                >
                  Learn More
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center space-x-4 text-sm text-gray-400"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-900"
                    ></div>
                  ))}
                </div>
                <div>
                  <p>Trusted by 500+ auto shops</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1">5.0 (200+ reviews)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Get Your Free Consultation</h2>
            
            {message.text && (
              <div className={`p-4 mb-6 rounded-lg ${
                message.type === 'error' 
                  ? 'bg-red-900/30 border border-red-700 text-red-200' 
                  : 'bg-green-900/30 border border-green-700 text-green-200'
              }`}>
                {message.text}
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label 
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-300"
                  >
                    {field.label}{field.required && ' *'}
                  </label>
                  <div className="relative">
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof FormData] as string}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        formErrors[field.id as keyof FormErrors] 
                          ? 'border-red-500' 
                          : 'border-gray-700'
                      } rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-colors`}
                      disabled={isSubmitting}
                      aria-invalid={!!formErrors[field.id as keyof FormErrors]}
                      aria-describedby={`${field.id}-error`}
                    />
                  </div>
                  {formErrors[field.id as keyof FormErrors] && (
                    <p 
                      id={`${field.id}-error`}
                      className="mt-1 text-sm text-red-400"
                    >
                      {formErrors[field.id as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ))}
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isRateLimited}
                  className={`w-full flex justify-center items-center py-4 px-6 rounded-lg font-semibold text-gray-900 ${
                    isSubmitting || isRateLimited
                      ? 'bg-yellow-600 cursor-not-allowed'
                      : 'bg-yellow-500 hover:bg-yellow-400'
                  } transition-colors duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Submitting...
                    </>
                  ) : (
                    'Get Free Consultation'
                  )}
                </button>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)',
          y: yBg
        }}
      />
      
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]" />
    </section>
  );
};

export default Hero;
