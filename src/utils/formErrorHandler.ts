import { FieldError, FieldErrors } from 'react-hook-form';
import { OnboardingFormData } from '@/lib/validations/onboarding';

/**
 * Get error message for a specific field
 */
export const getErrorMessage = (
  errors: FieldErrors<OnboardingFormData>,
  fieldName: string
): string | undefined => {
  const fieldNames = fieldName.split('.');
  let error: FieldError | undefined;
  
  // Traverse nested errors
  for (const name of fieldNames) {
    if (!error) {
      error = errors[name as keyof typeof errors] as FieldError | undefined;
    } else if (error && typeof error === 'object' && 'message' in error) {
      error = error[name as keyof typeof error] as FieldError | undefined;
    }
    
    if (!error) break;
  }
  
  return error?.message;
};

/**
 * Check if a field has an error
 */
export const hasError = (
  errors: FieldErrors<OnboardingFormData>,
  fieldName: string
): boolean => {
  return !!getErrorMessage(errors, fieldName);
};

/**
 * Get error class for form fields
 */
export const getErrorClass = (
  errors: FieldErrors<OnboardingFormData>,
  fieldName: string,
  baseClass = ''
): string => {
  const errorClass = hasError(errors, fieldName)
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    
  return `${baseClass} ${errorClass}`.trim();
};

/**
 * Get all error messages as an array
 */
export const getAllErrorMessages = (
  errors: FieldErrors<OnboardingFormData>
): string[] => {
  const messages: string[] = [];
  
  const extractMessages = (obj: unknown, prefix = ''): void => {
    if (!obj) return;
    
    Object.entries(obj).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && 'message' in value) {
        if (value.message) {
          messages.push(`${path}: ${value.message}`);
        }
      } else if (value && typeof value === 'object') {
        extractMessages(value, path);
      }
    });
  };
  
  extractMessages(errors);
  return messages;
};

/**
 * Scroll to the first error in the form
 */
export const scrollToFirstError = (errors: FieldErrors<OnboardingFormData>): void => {
  const firstError = Object.keys(errors)[0];
  if (firstError) {
    const element = document.querySelector(`[name="${firstError}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the first error field
      (element as HTMLElement).focus();
    }
  }
};

export const formatValidationError = (): string => {
  // Implementation of formatValidationError
  // This function should return a formatted error message based on the type of error
  // For now, we'll use a placeholder implementation
  return 'An error occurred. Please try again later.';
};
