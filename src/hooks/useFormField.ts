import { useState, useCallback } from 'react';
import { FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface UseFormFieldOptions<T extends FieldValues> {
  name: FieldPath<T>;
  form: UseFormReturn<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  formatValue?: (value: unknown) => string;
  parseValue?: (value: string) => unknown;
}

export const useFormField = <T extends FieldValues>({
  name,
  form,
  validateOnChange = false,
  validateOnBlur = true,
  formatValue,
  parseValue,
}: UseFormFieldOptions<T>) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = form;

  const error = errors[name] as FieldError | undefined;
  const value = getValues(name);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const rawValue = event.target.value;
      const parsedValue = parseValue ? parseValue(rawValue) : rawValue;
      
      setValue(name, parsedValue as T[FieldPath<T>], {
        shouldDirty: true,
        shouldTouch: true,
      });

      if (validateOnChange) {
        trigger(name);
      }
    },
    [name, setValue, parseValue, validateOnChange, trigger]
  );

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    setIsFocused(false);

    if (validateOnBlur) {
      trigger(name);
    }
  }, [name, validateOnBlur, trigger]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const displayValue = formatValue && value !== undefined ? formatValue(value) : value || '';

  return {
    field: {
      name,
      value: displayValue,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
      ref: register(name).ref,
    },
    fieldState: {
      error,
      isTouched,
      isFocused,
      isDirty: !!value,
      isValid: !error,
    },
    helpers: {
      setValue: (newValue: T[FieldPath<T>]) => setValue(name, newValue),
      clearError: () => form.clearErrors(name),
      validate: () => trigger(name),
    },
  };
};

// Helper hook for nested objects in the form
export const useNestedFormField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  name: TFieldName,
  formMethods: UseFormReturn<TFieldValues>
) => {
  // Implementation for nested form fields
  return useFormField({ name, form: formMethods });
};
