import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

type Step = {
  id: string;
  title: string;
};

interface FormStepperProps {
  currentStep: number;
  steps: Step[];
  onStepClick?: (step: number) => void;
}

export const FormStepper: React.FC<FormStepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isActive = stepIdx === currentStep;
          const isCompleted = stepIdx < currentStep;

          return (
            <li
              key={step.id}
              className={`relative ${
                stepIdx !== steps.length - 1 ? 'flex-1' : ''
              }`}
              onClick={() => onStepClick?.(stepIdx)}
            >
              <div
                className={`flex flex-col items-center ${
                  onStepClick ? 'cursor-pointer' : ''
                }`}
              >
                {/* Step indicator */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isActive
                      ? 'border-2 border-blue-600 bg-white text-blue-600'
                      : 'border-2 border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </div>
                
                {/* Step title */}
                <span
                  className={`mt-2 text-sm font-medium ${
                    isCompleted || isActive
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
                
                {/* Current step indicator */}
                {isActive && (
                  <span className="sr-only">Current Step</span>
                )}
              </div>
              
              {/* Connector line */}
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute top-5 right-0 left-0 h-0.5 -z-10 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
