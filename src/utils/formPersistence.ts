import { debounce } from 'lodash';
import { useEffect, useCallback, useRef } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

type FormPersistenceOptions<T extends FieldValues> = {
  /** The key to use for storing the form data in localStorage */
  storageKey: string;
  /** Whether to automatically save form data on change */
  autoSave?: boolean;
  /** Debounce time in milliseconds for auto-save */
  debounceDelay?: number;
  /** Callback when form data is loaded */
  onLoad?: (data: Partial<T>) => void;
  /** Callback when form data is saved */
  onSave?: (data: Partial<T>) => void;
  /** Callback when form data is cleared */
  onClear?: () => void;
  /** Fields to exclude from persistence */
  excludeFields?: (keyof T)[];
};

/**
 * Hook to persist form data to localStorage
 */
export function useFormPersistence<T extends FieldValues>(
  formMethods: UseFormReturn<T>,
  options: FormPersistenceOptions<T>
) {
  const {
    storageKey,
    autoSave = true,
    debounceDelay = 500,
    onLoad,
    onSave,
    onClear,
    excludeFields = [],
  } = options;

  const { watch, reset, getValues } = formMethods;
  const isInitialMount = useRef(true);

  // Load saved form data on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as Record<string, unknown>;

        // Filter out excluded fields
        const filteredData = excludeFields.length > 0
          ? Object.fromEntries(
              Object.entries(parsedData).filter(
                ([key]) => !excludeFields.includes(key as keyof T)
              )
            )
          : parsedData;

        // Use type assertion to handle the reset type
        reset(filteredData as Parameters<typeof reset>[0]);
        onLoad?.(filteredData as Partial<T>);
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  }, [storageKey, reset, onLoad, excludeFields]);

  // Save form data when it changes
  const saveFormData = useRef(
    debounce((data: unknown) => {
      try {
        // Cast to any first to handle the case where data might be Partial<T>
        const dataObj = data as Record<string, unknown>;
        const filteredData = excludeFields.length > 0
          ? Object.fromEntries(
              Object.entries(dataObj).filter(
                ([key]) => !excludeFields.includes(key as keyof T)
              )
            )
          : dataObj;

        localStorage.setItem(storageKey, JSON.stringify(filteredData));
        onSave?.(filteredData as Partial<T>);
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    }, debounceDelay)
  ).current;

  // Auto-save when form data changes
  useEffect(() => {
    if (!autoSave || isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Create a type-safe wrapper for the save function
    const handleChange = (data: unknown) => {
      // Ensure we have a valid object before saving
      if (data && typeof data === 'object') {
        saveFormData(data);
      }
    };

    const subscription = watch(handleChange) as (() => void) | { unsubscribe: () => void };

    return () => {
      // Cancel any pending debounced saves
      if (saveFormData && typeof saveFormData.cancel === 'function') {
        saveFormData.cancel();
      }
      
      // Clean up subscription
      if (typeof subscription === 'function') {
        subscription();
      } else if (subscription && typeof subscription === 'object' && 'unsubscribe' in subscription) {
        subscription.unsubscribe();
      }
    };
  }, [watch, autoSave, saveFormData]);

  /**
   * Manually save the current form data
   */
  const save = useCallback(() => {
    const values = getValues();
    const dataToSave = { ...values };

    // Handle exclusions
    if (excludeFields.length > 0) {
      excludeFields.forEach((field) => {
        // Use type assertion to handle the dynamic field access
        delete (dataToSave as Record<string, unknown>)[field as string];
      });
    }

    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  }, [getValues, storageKey, excludeFields]);

  /**
   * Clear saved form data
   */
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      onClear?.();
      return true;
    } catch (error) {
      console.error('Error clearing form data:', error);
      return false;
    }
  }, [storageKey, onClear]);

  /**
   * Get the saved form data without loading it
   */
  const getSavedData = useCallback((): Partial<T> | null => {
    try {
      const data = localStorage.getItem(storageKey);
      if (!data) return null;
      
      const parsedData = JSON.parse(data) as Partial<T>;
      
      // Filter out excluded fields
      if (excludeFields.length > 0) {
        return Object.fromEntries(
          Object.entries(parsedData).filter(
            ([key]) => !excludeFields.includes(key as keyof T)
          )
        ) as Partial<T>;
      }
      
      return parsedData;
    } catch (error) {
      console.error('Error getting saved form data:', error);
      return null;
    }
  }, [storageKey, excludeFields]);

  return {
    save,
    clear,
    getSavedData,
  };
}

/**
 * Creates a form state manager that can be used outside of React components
 */
export function createFormStateManager<T extends Record<string, unknown>>(
  storageKey: string,
  excludeFields: string[] = []
) {
  return {
    /**
     * Save form data to localStorage
     */
    save: (data: T): boolean => {
      try {
        let dataToSave = { ...data };
        
        // Handle exclusions
        if (excludeFields.length > 0) {
          dataToSave = Object.fromEntries(
            Object.entries(dataToSave).filter(
              ([key]) => !excludeFields.includes(key)
            )
          ) as T;
        }
        
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
        return true;
      } catch (error) {
        console.error('Error saving form data:', error);
        return false;
      }
    },

    /**
     * Clear saved form data
     */
    clear: (): boolean => {
      try {
        localStorage.removeItem(storageKey);
        return true;
      } catch (error) {
        console.error('Error clearing form data:', error);
        return false;
      }
    },

    /**
     * Get saved form data
     */
    getSavedData: (): Partial<T> | null => {
      try {
        const data = localStorage.getItem(storageKey);
        if (!data) return null;
        
        const parsedData = JSON.parse(data) as Partial<T>;
        
        // Filter out excluded fields
        if (excludeFields.length > 0) {
          return Object.fromEntries(
            Object.entries(parsedData).filter(
              ([key]) => !excludeFields.includes(key)
            )
          ) as Partial<T>;
        }
        
        return parsedData;
      } catch (error) {
        console.error('Error getting saved form data:', error);
        return null;
      }
    },
  };
}

// Example usage in a component:
/*
  const formMethods = useForm<YourFormType>();
  const { save, clear, getSavedData } = useFormPersistence<YourFormType>(formMethods, {
    storageKey: 'your-form-key',
    autoSave: true,
    excludeFields: ['temporaryField1', 'temporaryField2']
  });
*/

// Example usage of createFormStateManager:
/*
  const formManager = createFormStateManager<YourFormType>('your-form-key', ['excludedField']);
  formManager.save(formData);
  const savedData = formManager.getSavedData();
  formManager.clear();
*/

// Note: The withFormPersistence HOC has been removed as it was causing TypeScript issues.
// Instead, use the useFormPersistence hook directly in your form components.
// Example usage in a component:
/*
  const formMethods = useForm();
  const { save, clear, getSavedData } = useFormPersistence(formMethods, {
    storageKey: 'your-form-key',
    autoSave: true,
    excludeFields: ['temporaryField1', 'temporaryField2']
  });
*/

/**
 * Utility to manage multiple form states
 */
export class FormPersistenceManager {
  private static instance: FormPersistenceManager;
  private storage: Storage;
  private prefix: string;
  
  private constructor(storage: Storage = localStorage, prefix = 'form_') {
    this.storage = storage;
    this.prefix = prefix;
  }
  
  public static getInstance(storage?: Storage, prefix?: string): FormPersistenceManager {
    if (!FormPersistenceManager.instance) {
      FormPersistenceManager.instance = new FormPersistenceManager(storage, prefix);
    }
    return FormPersistenceManager.instance;
  }
  
  private getKey(formId: string): string {
    return `${this.prefix}${formId}`;
  }
  
  public saveForm<T>(formId: string, data: T): void {
    try {
      this.storage.setItem(this.getKey(formId), JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving form ${formId}:`, error);
    }
  }
  
  public loadForm<T>(formId: string): T | null {
    try {
      const data = this.storage.getItem(this.getKey(formId));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error loading form ${formId}:`, error);
      return null;
    }
  }
  
  public clearForm(formId: string): void {
    try {
      this.storage.removeItem(this.getKey(formId));
    } catch (error) {
      console.error(`Error clearing form ${formId}:`, error);
    }
  }
  
  public clearAllForms(): void {
    try {
      Object.keys(this.storage).forEach(key => {
        if (key.startsWith(this.prefix)) {
          this.storage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing all forms:', error);
    }
  }
  
  public getAllForms(): Record<string, unknown> {
    const forms: Record<string, unknown> = {};
    
    try {
      Object.keys(this.storage).forEach(key => {
        if (key.startsWith(this.prefix)) {
          try {
            const formId = key.substring(this.prefix.length);
            forms[formId] = JSON.parse(this.storage.getItem(key) || '{}');
          } catch (e) {
            console.warn(`Error parsing form data for key ${key}:`, e);
          }
        }
      });
    } catch (error) {
      console.error('Error getting all forms:', error);
    }
    
    return forms;
  }
}

// Default export for convenience
export default FormPersistenceManager;
