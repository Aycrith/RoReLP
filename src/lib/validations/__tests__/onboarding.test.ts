import { onboardingSchema } from '../onboarding';

describe('Onboarding Form Validation', () => {
  describe('Contact Information', () => {
    it('requires full name', async () => {
      const formData = {
        fullName: '',
        email: 'test@example.com',
        phone: '123-456-7890',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['fullName'],
              message: 'Full name is required',
            }),
          ]),
        }),
      });
    });

    it('requires a valid email', async () => {
      const formData = {
        fullName: 'John Doe',
        email: 'invalid-email',
        phone: '123-456-7890',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['email'],
              message: 'Invalid email address',
            }),
          ]),
        }),
      });
    });

    it('requires a valid phone number', async () => {
      const formData = {
        fullName: 'John Doe',
        email: 'test@example.com',
        phone: 'invalid-phone',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['phone'],
            }),
          ]),
        }),
      });
    });
  });

  describe('Equipment Information', () => {
    it('requires equipment type', async () => {
      const formData = {
        equipmentType: '',
        makeBrand: 'Honda',
        modelNumber: 'HRX217VKA',
        serialNumber: '123456789',
        yearOfManufacture: '2020',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['equipmentType'],
              message: 'Equipment type is required',
            }),
          ]),
        }),
      });
    });

    it('requires make/brand', async () => {
      const formData = {
        equipmentType: 'Lawn Mower',
        makeBrand: '',
        modelNumber: 'HRX217VKA',
        serialNumber: '123456789',
        yearOfManufacture: '2020',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['makeBrand'],
              message: 'Make/Brand is required',
            }),
          ]),
        }),
      });
    });
  });

  describe('Problem Description', () => {
    it('requires a problem description', async () => {
      const formData = {
        problemDescription: '',
        problemStarted: '2023-01-01',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['problemDescription'],
              message: expect.stringContaining('Please provide a detailed description'),
            }),
          ]),
        }),
      });
    });

    it('requires problem started date', async () => {
      const formData = {
        problemDescription: 'Engine makes a loud noise',
        problemStarted: '',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['problemStarted'],
              message: 'Please indicate when the problem started',
            }),
          ]),
        }),
      });
    });
  });

  describe('Service Details', () => {
    it('requires preferred service date', async () => {
      const formData = {
        preferredServiceDate: '',
        preferredTimeWindow: 'morning',
        equipmentLocation: 'Backyard',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['preferredServiceDate'],
              message: 'Preferred service date is required',
            }),
          ]),
        }),
      });
    });

    it('requires equipment location', async () => {
      const formData = {
        preferredServiceDate: '2023-12-31',
        preferredTimeWindow: 'morning',
        equipmentLocation: '',
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['equipmentLocation'],
              message: 'Please specify equipment location',
            }),
          ]),
        }),
      });
    });
  });

  describe('Agreements', () => {
    it('requires diagnostic fee acknowledgment', async () => {
      const formData = {
        diagnosticFeeAcknowledged: false,
        diagnosticAuthorization: true,
        termsAccepted: true,
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['diagnosticFeeAcknowledged'],
              message: 'You must acknowledge the diagnostic fee',
            }),
          ]),
        }),
      });
    });

    it('requires diagnostic authorization', async () => {
      const formData = {
        diagnosticFeeAcknowledged: true,
        diagnosticAuthorization: false,
        termsAccepted: true,
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['diagnosticAuthorization'],
              message: 'You must authorize the diagnostic assessment',
            }),
          ]),
        }),
      });
    });

    it('requires terms acceptance', async () => {
      const formData = {
        diagnosticFeeAcknowledged: true,
        diagnosticAuthorization: true,
        termsAccepted: false,
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['termsAccepted'],
              message: 'You must accept the terms and conditions',
            }),
          ]),
        }),
      });
    });
  });

  describe('Cross-field Validation', () => {
    it('requires billing address when billing address is not same as mailing address', async () => {
      const formData = {
        billingAddressSame: false,
        billingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['billingAddress'],
              message: 'Billing address is required',
            }),
          ]),
        }),
      });
    });

    it('validates service date is not in the past', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const formData = {
        preferredServiceDate: yesterday.toISOString().split('T')[0],
      };
      
      await expect(onboardingSchema.safeParseAsync(formData)).resolves.toMatchObject({
        success: false,
        error: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: ['preferredServiceDate'],
              message: 'Service date must be today or in the future',
            }),
          ]),
        }),
      });
    });
  });
});
