import { FieldError } from 'react-hook-form';

type ValidationRules = {
  required?: string | boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: unknown) => string | boolean | Promise<string | boolean>;
  [key: string]: unknown;
};

type FieldValidation = {
  [key: string]: ValidationRules;
};

// Common validation messages
export const messages = {
  required: (field: string) => `${field} is required`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (field: string, length: number) =>
    `${field} must be at least ${length} characters`,
  maxLength: (field: string, length: number) =>
    `${field} must be less than ${length} characters`,
  pattern: (field: string) => `Invalid ${field.toLowerCase()} format`,
  url: 'Please enter a valid URL',
  number: 'Please enter a valid number',
  min: (field: string, min: number) =>
    `${field} must be greater than or equal to ${min}`,
  max: (field: string, max: number) =>
    `${field} must be less than or equal to ${max}`,
};

// Common validation rules
export const rules = {
  required: (field: string): ValidationRules => ({
    required: messages.required(field),
  }),
  
  email: (field = 'Email'): ValidationRules => ({
    ...rules.required(field),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: messages.email,
    },
  }),
  
  phone: (field = 'Phone'): ValidationRules => ({
    ...rules.required(field),
    pattern: {
      value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      message: messages.phone,
    },
  }),
  
  url: (): ValidationRules => ({
    pattern: {
      value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/,
      message: messages.url,
    },
  }),
  
  minLength: (field: string, length: number): ValidationRules => ({
    minLength: {
      value: length,
      message: messages.minLength(field, length),
    },
  }),
  
  maxLength: (field: string, length: number): ValidationRules => ({
    maxLength: {
      value: length,
      message: messages.maxLength(field, length),
    },
  }),
  
  number: (): ValidationRules => ({
    pattern: {
      value: /^\d+$/,
      message: messages.number,
    },
  }),
  
  min: (field: string, min: number): ValidationRules => ({
    min: {
      value: min,
      message: messages.min(field, min),
    },
  }),
  
  max: (field: string, max: number): ValidationRules => ({
    max: {
      value: max,
      message: messages.max(field, max),
    },
  }),
};

// Helper to get validation error message
export const getValidationMessage = (
  error: FieldError | undefined,
  fieldName: string = 'This field'
): string | undefined => {
  if (!error) return undefined;
  
  if (error.message) {
    return error.message as string;
  }
  
  switch (error.type) {
    case 'required':
      return messages.required(fieldName);
    case 'minLength': {
      const minLength = (error as FieldError & { minLength?: { value: number } })?.minLength?.value || 0;
      return messages.minLength(fieldName, minLength);
    }
    case 'maxLength': {
      const maxLength = (error as FieldError & { maxLength?: { value: number } })?.maxLength?.value || 0;
      return messages.maxLength(fieldName, maxLength);
    }
    case 'pattern':
      return messages.pattern(fieldName);
    case 'min': {
      const min = (error as FieldError & { min?: { value: number } })?.min?.value || 0;
      return messages.min(fieldName, min);
    }
    case 'max': {
      const max = (error as FieldError & { max?: { value: number } })?.max?.value || 0;
      return messages.max(fieldName, max);
    }
    case 'validate':
      return 'Validation failed';
    default:
      return 'Invalid field';
  }
};

// Helper to combine multiple validation rules
export const combineRules = (...rulesArray: ValidationRules[]): ValidationRules => {
  return rulesArray.reduce((acc, rule) => {
    return { ...acc, ...rule };
  }, {});
};

// Helper to create field validation schema
export const createValidationSchema = <T extends Record<string, unknown>>(
  schema: { [K in keyof T]: ValidationRules }
): FieldValidation => {
  return schema as FieldValidation;
};

// Helper to get field validation rules
export const getFieldRules = (
  fieldName: string,
  validations: FieldValidation
): ValidationRules | undefined => {
  return validations[fieldName];
};

// Helper to check if a field is required
export const isFieldRequired = (rules: ValidationRules | undefined): boolean => {
  return !!rules?.required;
};

// Helper to get field label with required indicator
export const getFieldLabel = (
  label: string,
  rules: ValidationRules | undefined
): string => {
  return isFieldRequired(rules) ? `${label} *` : label;
};

// Generic error message formatter
export const formatErrorMessage = (error: FieldError | undefined): string | undefined => {
  if (!error) return undefined;
  return error.message;
};

// Field-specific validation messages
export const VALIDATION_MESSAGES = {
  required: (fieldName: string) => `${fieldName} is required`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: 'Please enter a valid format',
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be no more than ${max}`,
} as const;

// Specific field validation messages
export const getFieldValidationMessage = (
  fieldName: string,
  validationType: string,
  value?: number | string
): string => {
  switch (validationType) {
    case 'required':
      return VALIDATION_MESSAGES.required(fieldName);
    case 'email':
      return VALIDATION_MESSAGES.email;
    case 'phone':
      return VALIDATION_MESSAGES.phone;
    case 'minLength':
      return VALIDATION_MESSAGES.minLength(value as number);
    case 'maxLength':
      return VALIDATION_MESSAGES.maxLength(value as number);
    case 'pattern':
      return VALIDATION_MESSAGES.pattern;
    case 'min':
      return VALIDATION_MESSAGES.min(value as number);
    case 'max':
      return VALIDATION_MESSAGES.max(value as number);
    default:
      return `Invalid ${fieldName}`;
  }
};

// Form-specific validation messages
export const FORM_VALIDATION_MESSAGES = {
  onboarding: {
    fullName: {
      required: 'Full name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must be no more than 100 characters',
    },
    email: {
      required: 'Email address is required',
      pattern: 'Please enter a valid email address',
    },
    phone: {
      required: 'Phone number is required',
      pattern: 'Please enter a valid phone number (e.g., (555) 123-4567)',
    },
    address: {
      street: {
        required: 'Street address is required',
      },
      city: {
        required: 'City is required',
      },
      state: {
        required: 'State is required',
      },
      zipCode: {
        required: 'ZIP code is required',
        pattern: 'Please enter a valid ZIP code',
      },
    },
    equipment: {
      type: {
        required: 'Equipment type is required',
      },
      makeBrand: {
        required: 'Make/Brand is required',
      },
      problemDescription: {
        required: 'Problem description is required',
        minLength: 'Please provide more details (at least 10 characters)',
      },
    },
    service: {
      preferredDate: {
        required: 'Preferred service date is required',
      },
    },
    agreement: {
      diagnosticFeeAcknowledged: {
        required: 'You must acknowledge the diagnostic fee',
      },
      termsAccepted: {
        required: 'You must accept the terms and conditions',
      },
    },
  },
} as const;

// Helper to get validation message for a specific field path
export const getValidationMessageForPath = (
  formType: keyof typeof FORM_VALIDATION_MESSAGES,
  fieldPath: string,
  validationType: string
): string => {
  const messages = FORM_VALIDATION_MESSAGES[formType];
  const pathParts = fieldPath.split('.');
  
  let current: unknown = messages;
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      current = undefined;
      break;
    }
  }
  
  if (current && typeof current === 'object' && validationType in current) {
    return (current as Record<string, string>)[validationType];
  }
  
  // Fallback to generic message
  return getFieldValidationMessage(fieldPath, validationType);
};

// Helper to format multiple validation errors
export const formatValidationErrors = (errors: Record<string, FieldError>): string[] => {
  return Object.entries(errors)
    .map(([fieldName, error]) => {
      if (error?.message) {
        return `${fieldName}: ${error.message}`;
      }
      return null;
    })
    .filter((message): message is string => message !== null);
};
