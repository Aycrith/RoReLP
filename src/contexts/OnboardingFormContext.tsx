import React, { createContext, useContext, ReactNode } from 'react';
import { OnboardingFormData } from '@/lib/validations/onboarding';

interface OnboardingFormContextType {
  formData: Partial<OnboardingFormData>;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  isSubmitting: boolean;
  submitForm: (data: OnboardingFormData) => Promise<void>;
}

const OnboardingFormContext = createContext<OnboardingFormContextType | undefined>(
  undefined
);

export const OnboardingFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = React.useState<Partial<OnboardingFormData>>({});
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const submitForm = async (data: OnboardingFormData) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Submit the form data to our API endpoint
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      // Save the submitted data
      setFormData(data);
      
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, 4)));
  };

  return (
    <OnboardingFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        isSubmitting,
        submitForm,
      }}
    >
      {children}
    </OnboardingFormContext.Provider>
  );
};

export const useOnboardingForm = () => {
  const context = useContext(OnboardingFormContext);
  if (context === undefined) {
    throw new Error(
      'useOnboardingForm must be used within an OnboardingFormProvider'
    );
  }
  return context;
};
