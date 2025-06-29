import { FieldValues, UseFormReturn, Path } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { OnboardingFormData } from '@/lib/validations/onboarding';

interface SubmitHandlerOptions<T extends FieldValues> {
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  successMessage?: string;
  errorMessage?: string | ((error: Error) => string);
}

export const createFormSubmitHandler = <T extends FieldValues = OnboardingFormData>(
  formMethods: UseFormReturn<T>,
  submitFn: (data: T) => Promise<unknown>,
  options: SubmitHandlerOptions<T> = {}
) => {
  const {
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully!',
    errorMessage = 'An error occurred while submitting the form.',
  } = options;

  return async (data: T) => {
    try {
      await submitFn(data);
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        await onSuccess(data);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      
      const message = typeof errorMessage === 'function' 
        ? errorMessage(error as Error)
        : errorMessage;
      
      toast.error(message);
      
      if (onError) {
        await onError(error as Error);
      }
      
      return { success: false, error };
    }
  };
};

// Specific handler for the onboarding form
export const createOnboardingSubmitHandler = (
  formMethods: UseFormReturn<OnboardingFormData>,
  options: SubmitHandlerOptions<OnboardingFormData> & {
    onSuccessRedirect?: string;
  } = {}
) => {
  const { ...rest } = options;
  
  return createFormSubmitHandler<OnboardingFormData>(
    formMethods,
    async (data) => {
      // Here you would typically make an API call
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 'Failed to submit form. Please try again.'
        );
      }

      return response.json();
    },
    {
      successMessage: 'Your information has been submitted successfully!',
      errorMessage: (error) => error.message || 'Failed to submit form. Please try again.',
      ...rest,
    }
  );
};

// Helper to handle form validation with proper error handling
export const validateForm = async <T extends FieldValues>(
  formMethods: UseFormReturn<T>,
  fields?: string[],
  shouldFocus = true
): Promise<boolean> => {
  const { trigger, formState: { errors } } = formMethods;
  
  const isValid = await trigger(fields as Path<T>[]);
  
  if (!isValid && shouldFocus) {
    // Find the first error and scroll to it
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus the first error field
        (element as HTMLElement).focus();
      }
    }
  }
  
  return isValid;
};

export const handleFormSubmit = async <T extends Record<string, unknown>>(
  formMethods: UseFormReturn<T>,
  submitFn: (data: T) => Promise<unknown>,
  options: SubmitHandlerOptions<T> = {}
) => {
  const {
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully!',
    errorMessage = 'An error occurred while submitting the form.',
  } = options;

  const onSuccessHandler = onSuccess || (() => {
    toast.success('Form submitted successfully!');
  });

  return async (data: T) => {
    try {
      await submitFn(data);
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      await onSuccessHandler(data);
      
      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      
      const message = typeof errorMessage === 'function' 
        ? errorMessage(error as Error)
        : errorMessage;
      
      toast.error(message);
      
      if (onError) {
        await onError(error as Error);
      }
      
      return { success: false, error };
    }
  };
};
