import { useFormContext } from 'react-hook-form';
import { useRef } from 'react';

type MaskFunction = (value: string) => string;

export const masks = {
  phone: (value: string): string => {
    if (!value) return '';
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Apply phone number formatting
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  },
  
  zipCode: (value: string): string => {
    if (!value) return '';
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Apply ZIP code formatting (5 digits or 5+4)
    if (cleaned.length <= 5) {
      return cleaned;
    } else {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}`;
    }
  },
  
  date: (value: string): string => {
    if (!value) return '';
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Apply date formatting (MM/DD/YYYY)
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
  },
  
  currency: (value: string): string => {
    if (!value) return '';
    
    // Remove all non-digit characters except decimal point
    const cleaned = value.replace(/[^\d.]/g, '');
    
    // Format as currency
    const parts = cleaned.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].slice(0, 2);
    }
    
    return parts.length === 2 ? `${parts[0]}.${parts[1]}` : parts[0];
  },
  
  creditCard: (value: string): string => {
    if (!value) return '';
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Apply credit card formatting (XXXX XXXX XXXX XXXX)
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    
    return parts.join(' ');
  },
  
  // Create a custom mask function
  createCustomMask: (pattern: (string | RegExp)[], placeholder: string = '_'): MaskFunction => {
    return (value: string): string => {
      if (!value) return '';
      
      const valueChars = value.split('');
      let result = '';
      let valueIndex = 0;
      
      for (const char of pattern) {
        if (valueIndex >= valueChars.length) break;
        
        if (typeof char === 'string') {
          result += char;
        } else if (char instanceof RegExp) {
          while (valueIndex < valueChars.length && !char.test(valueChars[valueIndex])) {
            valueIndex++;
          }
          
          if (valueIndex < valueChars.length) {
            result += valueChars[valueIndex];
            valueIndex++;
          } else {
            result += placeholder;
          }
        }
      }
      
      return result;
    };
  },
  
  // Unmask a value (remove all non-digit characters)
  unmask: (value: string): string => {
    if (!value) return '';
    return value.replace(/\D/g, '');
  },
};

// Higher-order function to create a masked input handler
export const createMaskedInputHandler = (
  maskFn: (value: string) => string,
  setValue: (value: string) => void,
  maxLength?: number
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Apply mask
    value = maskFn(value);
    
    // Enforce max length if provided
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    
    // Update the input value
    e.target.value = value;
    
    // Call the original setValue function
    setValue(value);
  };
};

// Hook to use masks with React Hook Form
export const useMaskedInput = (
  name: string,
  mask: keyof typeof masks | MaskFunction,
  options: {
    maxLength?: number;
    unmask?: boolean;
  } = {}
) => {
  const { register, setValue, watch } = useFormContext();
  const value = watch(name);
  
  const maskFn = typeof mask === 'function' ? mask : masks[mask];
  
  // Apply mask to the current value
  const maskedValue = maskFn ? maskFn(value || '') : value;
  
  // Create a ref to store the input element
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Apply mask
    if (maskFn && typeof maskFn === 'function') {
      newValue = (maskFn as MaskFunction)(newValue);
    }
    
    // Enforce max length if provided
    if (options.maxLength && newValue.length > options.maxLength) {
      newValue = newValue.slice(0, options.maxLength);
    }
    
    // Update the form value
    setValue(name, options.unmask ? masks.unmask(newValue) : newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  
  // Register the field with React Hook Form
  const { ref, ...rest } = register(name);
  
  // Combine refs
  const registerRef = (element: HTMLInputElement | null) => {
    ref(element);
    inputRef.current = element;
  };
  
  return {
    ...rest,
    ref: registerRef,
    value: maskedValue,
    onChange: handleChange,
  };
};
