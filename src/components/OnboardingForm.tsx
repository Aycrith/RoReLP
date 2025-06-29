'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingFormSchema, type OnboardingFormData, EQUIPMENT_CATEGORIES } from '@/lib/validations/onboarding';
import { toast } from 'react-hot-toast';

const OnboardingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize form with react-hook-form using the new schema structure
  const methods = useForm<OnboardingFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(onboardingFormSchema) as any,
    defaultValues: {
      customer: {
        full_name: '',
        email: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: 'FL',
        postal_code: '',
        preferred_contact_method: 'phone',
        marketing_opt_in: false,
      },
      equipment: {
        category: 'Lawnmower - Push',
        make: '',
        model: '',
        year: undefined,
        serial_number: '',
      },
      problem: {
        issue_description: '',
        service_requested: '',
        urgency_level: 'medium',
      },
      service: {
        preferred_drop_off_date: '',
        preferred_time_window: '',
        preferred_contact_method: 'phone',
      },
      terms: {
        terms_accepted: false,
        privacy_policy_accepted: false,
        marketing_consent: false,
      },
    },
  });

  const steps = [
    { id: 'contact', title: 'Contact Information', description: 'Tell us how to reach you' },
    { id: 'equipment', title: 'Equipment Details', description: 'What needs to be repaired?' },
    { id: 'problem', title: 'Problem Description', description: 'Describe the issue' },
    { id: 'service', title: 'Service Preferences', description: 'How would you like us to help?' },
    { id: 'review', title: 'Review & Submit', description: 'Confirm your information' },
  ];

  // Handle form submission
  const onSubmit = async (data: OnboardingFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Transform form data to match API schema
      const apiData = {
        customer: data.customer,
        equipment: data.equipment,
        problem: data.problem,
        service: data.service,
        terms: data.terms,
      };

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      toast.success('Your service request has been submitted successfully!');
      methods.reset();
      setCurrentStep(0);
      
      // Redirect to thank you page
      window.location.href = '/thank-you';
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next step with proper validation
  const handleNext = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 0:
        isValid = await methods.trigger(['customer.full_name', 'customer.email', 'customer.phone', 'customer.address_line1', 'customer.city', 'customer.state', 'customer.postal_code']);
        break;
      case 1:
        isValid = await methods.trigger(['equipment.category', 'equipment.make']);
        break;
      case 2:
        isValid = await methods.trigger(['problem.issue_description']);
        break;
      case 3:
        isValid = await methods.trigger(['service.preferred_contact_method']);
        break;
      case 4:
        isValid = await methods.trigger(['terms.terms_accepted', 'terms.privacy_policy_accepted']);
        break;
    }
    
    if (isValid) {
      if (currentStep === steps.length - 1) {
        methods.handleSubmit(onSubmit)();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Contact Information Step
  const ContactStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            {...methods.register('customer.full_name')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
          {methods.formState.errors.customer?.full_name && (
            <p className="mt-1 text-sm text-red-600">{methods.formState.errors.customer.full_name.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            {...methods.register('customer.email')}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          {methods.formState.errors.customer?.email && (
            <p className="mt-1 text-sm text-red-600">{methods.formState.errors.customer.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            {...methods.register('customer.phone')}
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
          {methods.formState.errors.customer?.phone && (
            <p className="mt-1 text-sm text-red-600">{methods.formState.errors.customer.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
          </label>
          <select
            {...methods.register('customer.preferred_contact_method')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="phone">Phone</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Line 1 *
        </label>
        <input
          {...methods.register('customer.address_line1')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Street address"
        />
        {methods.formState.errors.customer?.address_line1 && (
          <p className="mt-1 text-sm text-red-600">{methods.formState.errors.customer.address_line1.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Line 2
        </label>
        <input
          {...methods.register('customer.address_line2')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Apartment, suite, etc. (optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            {...methods.register('customer.city')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
          />
          {methods.formState.errors.customer?.city && (
            <p className="mt-1 text-sm text-red-600">{methods.formState.errors.customer.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            {...methods.register('customer.state')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="AL">Alabama</option>
            <option value="SC">South Carolina</option>
            <option value="NC">North Carolina</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            {...methods.register('customer.postal_code')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="12345"
          />
          {methods.formState.errors.customer?.postal_code && (
            <p className="mt-1 text-sm text-red-600">{methods.formState.errors.customer.postal_code.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  // Equipment Details Step
  const EquipmentStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Equipment Category *
        </label>
        <select
          {...methods.register('equipment.category')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {EQUIPMENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {methods.formState.errors.equipment?.category && (
          <p className="mt-1 text-sm text-red-600">{methods.formState.errors.equipment.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make/Brand *
          </label>
          <input
            {...methods.register('equipment.make')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Honda, Craftsman, Husqvarna"
          />
          {methods.formState.errors.equipment?.make && (
            <p className="mt-1 text-sm text-red-600">{methods.formState.errors.equipment.make.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <input
            {...methods.register('equipment.model')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Model number or name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <input
            {...methods.register('equipment.year', { valueAsNumber: true })}
            type="number"
            min="1950"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={new Date().getFullYear().toString()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Serial Number
          </label>
          <input
            {...methods.register('equipment.serial_number')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Serial number (if available)"
          />
        </div>
      </div>


    </div>
  );

  // Problem Description Step
  const ProblemStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What&apos;s the problem? *
        </label>
        <textarea
          {...methods.register('problem.issue_description')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Please describe the issue you're experiencing with your equipment..."
        />
        {methods.formState.errors.problem?.issue_description && (
          <p className="mt-1 text-sm text-red-600">{methods.formState.errors.problem.issue_description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Requested
        </label>
        <input
          {...methods.register('problem.service_requested')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Tune-up, Oil change, Repair, Diagnosis"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Urgency Level
        </label>
        <select
          {...methods.register('problem.urgency_level')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="low">Low - Can wait a week or more</option>
          <option value="medium">Medium - Needed within a few days</option>
          <option value="high">High - Needed ASAP</option>
        </select>
      </div>
    </div>
  );

  // Service Preferences Step
  const ServiceStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Drop-off Date
        </label>
        <input
          {...methods.register('service.preferred_drop_off_date')}
          type="date"
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Time Window
        </label>
        <select
          {...methods.register('service.preferred_time_window')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">No preference</option>
          <option value="morning">Morning (8 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="evening">Evening (5 PM - 8 PM)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How should we contact you about this service? *
        </label>
        <select
          {...methods.register('service.preferred_contact_method')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="phone">Phone Call</option>
          <option value="text">Text Message</option>
          <option value="email">Email</option>
        </select>
      </div>
    </div>
  );

  // Review and Terms Step
  const ReviewStep = () => {
    const watchedData = methods.watch();
    
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <strong>Contact:</strong> {watchedData.customer?.full_name} ({watchedData.customer?.email})
            </div>
            <div>
              <strong>Equipment:</strong> {watchedData.equipment?.category} - {watchedData.equipment?.make} {watchedData.equipment?.model}
            </div>
            <div>
              <strong>Issue:</strong> {watchedData.problem?.issue_description}
            </div>
            <div>
              <strong>Contact Method:</strong> {watchedData.service?.preferred_contact_method}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              {...methods.register('terms.terms_accepted')}
              type="checkbox"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> *
            </span>
          </label>
          {methods.formState.errors.terms?.terms_accepted && (
            <p className="ml-7 text-sm text-red-600">{methods.formState.errors.terms.terms_accepted.message}</p>
          )}

          <label className="flex items-start space-x-3">
            <input
              {...methods.register('terms.privacy_policy_accepted')}
              type="checkbox"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> *
            </span>
          </label>
          {methods.formState.errors.terms?.privacy_policy_accepted && (
            <p className="ml-7 text-sm text-red-600">{methods.formState.errors.terms.privacy_policy_accepted.message}</p>
          )}

          <label className="flex items-start space-x-3">
            <input
              {...methods.register('terms.marketing_consent')}
              type="checkbox"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
                             I&apos;d like to receive updates and promotional emails (optional)
            </span>
          </label>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ContactStep />;
      case 1:
        return <EquipmentStep />;
      case 2:
        return <ProblemStep />;
      case 3:
        return <ServiceStep />;
      case 4:
        return <ReviewStep />;
      default:
        return <ContactStep />;
    }
  };

  return (
    <section id="onboarding" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Get Your Equipment Serviced
            </h2>
            <p className="text-lg text-gray-600">
              Fill out this form to schedule your repair service. We&apos;ll contact you within 24 hours.
            </p>
            <p className="text-gray-600">Tell us about what&apos;s wrong with your equipment and when you need service.</p>
          </div>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      index <= currentStep
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      currentStep === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    type={currentStep === steps.length - 1 ? "submit" : "button"}
                    onClick={currentStep === steps.length - 1 ? undefined : handleNext}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      currentStep === steps.length - 1 ? 'Submit Request' : 'Next'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </div>
    </section>
  );
};

export default OnboardingForm;
