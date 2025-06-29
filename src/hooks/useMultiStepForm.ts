import { useState, useCallback } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type Step = {
  id: string;
  title: string;
  fields?: string[];
};

interface UseMultiStepFormOptions<T extends FieldValues> {
  steps: Step[];
  formMethods: UseFormReturn<T>;
  onStepChange?: (currentStep: number, previousStep: number) => void;
}

export const useMultiStepForm = <T extends FieldValues>({
  steps,
  formMethods,
  onStepChange,
}: UseMultiStepFormOptions<T>) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const goToStep = useCallback(
    async (stepIndex: number) => {
      if (stepIndex < 0 || stepIndex >= steps.length) {
        console.warn(`Invalid step index: ${stepIndex}`);
        return;
      }

      const previousStepIndex = currentStepIndex;
      
      // Only validate if moving forward
      if (stepIndex > currentStepIndex) {
        const fieldsToValidate = steps[previousStepIndex]?.fields;
        if (fieldsToValidate && fieldsToValidate.length > 0) {
          const isValid = await formMethods.trigger(fieldsToValidate as Path<T>[]);
          if (!isValid) {
            toast.error('Please fill in all required fields before continuing.');
            return;
          }
        }
      }

      setIsTransitioning(true);
      
      // Call the callback if provided
      if (onStepChange) {
        await Promise.resolve(onStepChange(stepIndex, previousStepIndex));
      }

      // Small delay for animation
      setTimeout(() => {
        setCurrentStepIndex(stepIndex);
        setIsTransitioning(false);
      }, 200);
    },
    [currentStepIndex, formMethods, onStepChange, steps]
  );

  const goToNextStep = useCallback(async () => {
    if (!isLastStep) {
      await goToStep(currentStepIndex + 1);
    }
  }, [currentStepIndex, isLastStep, goToStep]);

  const goToPreviousStep = useCallback(async () => {
    if (!isFirstStep) {
      await goToStep(currentStepIndex - 1);
    }
  }, [currentStepIndex, isFirstStep, goToStep]);

  return {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    isTransitioning,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    steps,
  };
};
