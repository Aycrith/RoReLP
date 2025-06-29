import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { OnboardingFormData } from '@/lib/validations/onboarding';

export const useOnboardingForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({});

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

      // Save form data for potential recovery
      setFormData(data);
      
      // Show success message
      toast.success('Your information has been submitted successfully!');
      
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 2000);
      
      return result;
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error toast with retry option
      toast.error(
        (t) => (
          <div>
            <p className="font-medium">Submission failed</p>
            <p className="text-sm">
              {error instanceof Error ? error.message : 'An error occurred. Please try again.'}
            </p>
            <div className="mt-2 flex justify-end space-x-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  submitForm(data);
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Retry
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        ),
        { duration: 10000 }
      );
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4)); // 4 is the last step index
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, 4))); // Clamp between 0 and 4
  };

  return {
    currentStep,
    isSubmitting,
    formData,
    submitForm,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  };
};
