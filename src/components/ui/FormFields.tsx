import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { formatPhoneNumber, formatDateForInput } from '@/lib/constants/form';
import { UseFormReturn, FieldPath, FieldValues, Controller } from 'react-hook-form';

type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  description?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  rows?: number;
  disabled?: boolean;
  autoComplete?: string;
};

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  ({
    name,
    label,
    type = 'text',
    placeholder = '',
    required = false,
    className = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    description,
    min,
    max,
    step,
    rows,
    disabled = false,
    autoComplete,
    ...props
  }, ref) => {
    const {
      register,
      formState: { errors },
      setValue,
    } = useFormContext();

    const error = errors[name];
    const isTextarea = type === 'textarea';
    const isPhone = name === 'phone';
    const isDate = type === 'date';

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setValue(name, formatted, { shouldValidate: true });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDateForInput(e.target.value);
      setValue(name, formatted, { shouldValidate: true });
    };

    const baseProps = {
      id: name,
      name,
      placeholder,
      disabled,
      'aria-invalid': error ? true : false,
      'aria-describedby': `${name}-description ${name}-error`,
      className: `block w-full rounded-md ${
        error
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
          : 'border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
      } ${inputClassName}`,
    };

    const inputProps = {
      ...baseProps,
      ...(isPhone && {
        onChange: handlePhoneChange,
        maxLength: 14, // (123) 456-7890
      }),
      ...(isDate && {
        onChange: handleDateChange,
        min: min || formatDateForInput(new Date().toISOString()),
      }),
      ...(type === 'number' && { min, max, step }),
      ...(autoComplete && { autoComplete }),
    };

    const textareaProps = {
      ...baseProps,
    };

    return (
      <div className={className}>
        <div className="flex justify-between">
          <label
            htmlFor={name}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          {!required && (
            <span className="text-sm text-gray-500" id={`${name}-optional`}>
              Optional
            </span>
          )}
        </div>
        
        {description && (
          <p className="mt-1 text-sm text-gray-500" id={`${name}-description`}>
            {description}
          </p>
        )}
        
        <div className="mt-1 relative rounded-md shadow-sm">
          {isTextarea ? (
            <textarea
              {...register(name, { required })}
              rows={rows || 3}
              {...textareaProps}
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            />
          ) : (
            <input
              type={type}
              {...register(name, { required })}
              {...inputProps}
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              {...props}
            />
          )}
          
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        
        {error && (
          <p
            className={`mt-2 text-sm text-red-600 ${errorClassName}`}
            id={`${name}-error`}
          >
            {error.message as string}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

type FormSelectProps = FormInputProps & {
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
};

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  required = false,
  className = '',
  labelClassName = '',
  errorClassName = '',
  description,
  defaultValue = '',
  disabled = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={className}>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        {!required && (
          <span className="text-sm text-gray-500" id={`${name}-optional`}>
            Optional
          </span>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-sm text-gray-500" id={`${name}-description`}>
          {description}
        </p>
      )}
      
      <div className="mt-1 relative">
        <select
          id={name}
          {...register(name, { required })}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${name}-description ${name}-error`}
          className={`block w-full rounded-md ${
            error
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } py-2 pl-3 pr-10 text-base`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      
      {error && (
        <p
          className={`mt-2 text-sm text-red-600 ${errorClassName}`}
          id={`${name}-error`}
        >
          {error.message as string}
        </p>
      )}
    </div>
  );
};

type FormCheckboxProps = {
  name: string;
  label: React.ReactNode;
  description?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  description,
  required = false,
  className = '',
  labelClassName = '',
  errorClassName = '',
  disabled = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={`relative flex items-start ${className}`}>
      <div className="flex h-5 items-center">
        <input
          id={name}
          type="checkbox"
          {...register(name, { required })}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${name}-description ${name}-error`}
          className={`h-4 w-4 rounded ${
            error
              ? 'border-red-300 text-red-600 focus:ring-red-500'
              : 'border-gray-300 text-blue-600 focus:ring-blue-500'
          }`}
        />
      </div>
      
      <div className="ml-3 text-sm">
        <label
          htmlFor={name}
          className={`font-medium ${
            error ? 'text-red-700' : 'text-gray-700'
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        
        {description && (
          <p
            id={`${name}-description`}
            className={`${error ? 'text-red-500' : 'text-gray-500'}`}
          >
            {description}
          </p>
        )}
      </div>
      
      {error && (
        <p
          className={`mt-2 text-sm text-red-600 ${errorClassName}`}
          id={`${name}-error`}
        >
          {error.message as string}
        </p>
      )}
    </div>
  );
};

type FormRadioGroupProps = {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
};

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  required = false,
  className = '',
  labelClassName = '',
  errorClassName = '',
  description,
  orientation = 'vertical',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={className}>
      <label
        className={`block text-sm font-medium ${
          error ? 'text-red-700' : 'text-gray-700'
        } ${labelClassName}`}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      
      {description && (
        <p className="text-sm text-gray-500 mt-1" id={`${name}-description`}>
          {description}
        </p>
      )}
      
      <div
        className={`mt-2 space-y-2 ${
          orientation === 'horizontal'
            ? 'sm:flex sm:items-center sm:space-y-0 sm:space-x-6'
            : 'space-y-2'
        }`}
        role="radiogroup"
        aria-labelledby={`${name}-label`}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              value={option.value}
              {...register(name, { required })}
              className={`h-4 w-4 ${
                error
                  ? 'border-red-300 text-red-600 focus:ring-red-500'
                  : 'border-gray-300 text-blue-600 focus:ring-blue-500'
              }`}
              aria-describedby={`${name}-description ${name}-error`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p
          className={`mt-2 text-sm text-red-600 ${errorClassName}`}
          id={`${name}-error`}
        >
          {error.message as string}
        </p>
      )}
    </div>
  );
};

type FormTextareaProps = FormInputProps & {
  rows?: number;
};

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder = '',
  required = false,
  className = '',
  labelClassName = '',
  errorClassName = '',
  description,
  rows = 3,
  disabled = false,
}) => {
  return (
    <FormInput
      name={name}
      label={label}
      type="textarea"
      placeholder={placeholder}
      required={required}
      className={className}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      description={description}
      rows={rows}
      disabled={disabled}
    />
  );
};

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  form: UseFormReturn<T>;
  render: ({ field }: { field: { name: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; onBlur: () => void; value: unknown; ref: React.Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> } }) => React.ReactElement;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  required = false,
  form,
  render,
}: FormFieldProps<T>) {
  const { control, formState: { errors } } = form;
  const error = errors[name];

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => render({ field })}
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}
