import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { OnboardingForm } from '../OnboardingForm';
import { onboardingSchema } from '@/lib/validations/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock the form sections to simplify testing
jest.mock('../sections/ContactInfoSection', () => ({
  ContactInfoSection: () => <div>Contact Info Section</div>,
}));

jest.mock('../sections/EquipmentInfoSection', () => ({
  EquipmentInfoSection: () => <div>Equipment Info Section</div>,
}));

jest.mock('../sections/ProblemDescriptionSection', () => ({
  ProblemDescriptionSection: () => <div>Problem Description Section</div>,
}));

jest.mock('../sections/ServiceDetailsSection', () => ({
  ServiceDetailsSection: () => <div>Service Details Section</div>,
}));

jest.mock('../sections/AgreementSection', () => ({
  AgreementSection: () => <div>Agreement Section</div>,
}));

// Mock the form stepper
interface MockFormStepperProps {
  currentStep: number;
  steps: Array<{ id: string; title: string }>;
  onStepClick: (index: number) => void;
}

jest.mock('@/components/ui/FormStepper', () => ({
  FormStepper: ({ currentStep, steps, onStepClick }: MockFormStepperProps) => (
    <div>
      {steps.map((step, index: number) => (
        <button
          key={step.id}
          onClick={() => onStepClick(index)}
          data-testid={`step-${index}`}
          data-active={currentStep === index}
        >
          {step.title}
        </button>
      ))}
    </div>
  ),
}));

describe('OnboardingForm', () => {
  // Create a wrapper component that provides the form context
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      resolver: zodResolver(onboardingSchema),
      defaultValues: {
        fullName: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
        billingAddressSame: true,
        preferredContactMethod: 'phone',
        equipmentType: '',
        makeBrand: '',
        modelNumber: '',
        serialNumber: '',
        yearOfManufacture: '',
        problemDescription: '',
        problemStarted: '',
        isMobileRepair: false,
        preferredServiceDate: '',
        preferredTimeWindow: 'flexible',
        equipmentLocation: '',
        diagnosticFeeAcknowledged: false,
        diagnosticAuthorization: false,
        termsAccepted: false,
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('renders the form with the first step active', () => {
    render(
      <Wrapper>
        <OnboardingForm />
      </Wrapper>
    );

    // Check if the first step is active
    const firstStep = screen.getByTestId('step-0');
    expect(firstStep).toHaveAttribute('data-active', 'true');
    
    // Check if the first section is rendered
    expect(screen.getByText('Contact Info Section')).toBeInTheDocument();
  });

  it('navigates between steps when clicking on the stepper', async () => {
    render(
      <Wrapper>
        <OnboardingForm />
      </Wrapper>
    );

    // Click on the second step
    const secondStep = screen.getByTestId('step-1');
    fireEvent.click(secondStep);

    // Check if the second step is active
    await waitFor(() => {
      expect(secondStep).toHaveAttribute('data-active', 'true');
    });
    
    // Check if the second section is rendered
    expect(screen.getByText('Equipment Info Section')).toBeInTheDocument();
  });

  it('shows the previous button after the first step', async () => {
    render(
      <Wrapper>
        <OnboardingForm />
      </Wrapper>
    );

    // Go to the second step
    const secondStep = screen.getByTestId('step-1');
    fireEvent.click(secondStep);

    // Check if the previous button is visible
    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeInTheDocument();
  });

  it('shows the submit button on the last step', async () => {
    render(
      <Wrapper>
        <OnboardingForm />
      </Wrapper>
    );

    // Go to the last step
    const lastStep = screen.getByTestId('step-4');
    fireEvent.click(lastStep);

    // Check if the submit button is visible
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  // Add more tests for form validation, submission, etc.
});
