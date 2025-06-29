import { NextRequest } from 'next/server';
import { createMocks } from 'node-mocks-http';
import { POST } from '../route';
import * as onboardingService from '@/lib/services/onboardingService';
import { onboardingSchema } from '@/lib/validations/onboarding';

// Mock the onboarding service
jest.mock('@/lib/services/onboardingService');

describe('Onboarding API Route', () => {
  describe('POST /api/onboarding', () => {
    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
    });

    it('should return 400 for invalid request body', async () => {
      // Create a mock request with invalid data
      const { req } = createMocks({
        method: 'POST',
        body: {},
      });

      // Call the API route
      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      // Check the response
      expect(response.status).toBe(400);
      expect(data).toEqual({
        success: false,
        error: expect.any(Array),
      });
    });

    it('should return 500 when service throws an error', async () => {
      // Mock the service to throw an error
      (onboardingService.submitOnboarding as jest.Mock).mockRejectedValueOnce(
        new Error('Database error')
      );

      // Create a valid request body
      const validData: onboardingSchema = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: {
          street: '123 Main St',
          city: 'Orlando',
          state: 'FL',
          zipCode: '32801',
        },
        billingAddressSame: true,
        preferredContactMethod: 'phone',
        equipmentType: 'Lawn Mower',
        makeBrand: 'Honda',
        modelNumber: 'HRX217VKA',
        serialNumber: '123456789',
        yearOfManufacture: '2020',
        problemDescription: 'Engine makes a loud noise',
        problemStarted: '2023-01-01',
        isMobileRepair: false,
        preferredServiceDate: '2023-12-31',
        preferredTimeWindow: 'morning',
        equipmentLocation: 'Backyard',
        specialInstructions: 'Gate code is 1234',
        diagnosticFeeAcknowledged: true,
        diagnosticAuthorization: true,
        termsAccepted: true,
      };

      // Create a mock request
      const { req } = createMocks({
        method: 'POST',
        body: validData,
      });

      // Call the API route
      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      // Check the response
      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'Failed to submit onboarding form',
      });
    });

    it('should return 200 and success message for valid request', async () => {
      // Mock the service response
      const mockResponse = {
        customerId: 'cust_123',
        repairJobId: 'job_123',
      };
      (onboardingService.submitOnboarding as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Create a valid request body
      const validData: onboardingSchema = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: {
          street: '123 Main St',
          city: 'Orlando',
          state: 'FL',
          zipCode: '32801',
        },
        billingAddressSame: true,
        preferredContactMethod: 'phone',
        equipmentType: 'Lawn Mower',
        makeBrand: 'Honda',
        modelNumber: 'HRX217VKA',
        serialNumber: '123456789',
        yearOfManufacture: '2020',
        problemDescription: 'Engine makes a loud noise',
        problemStarted: '2023-01-01',
        isMobileRepair: false,
        preferredServiceDate: '2023-12-31',
        preferredTimeWindow: 'morning',
        equipmentLocation: 'Backyard',
        specialInstructions: 'Gate code is 1234',
        diagnosticFeeAcknowledged: true,
        diagnosticAuthorization: true,
        termsAccepted: true,
      };

      // Create a mock request
      const { req } = createMocks({
        method: 'POST',
        body: validData,
      });

      // Call the API route
      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      // Check the response
      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        data: mockResponse,
      });

      // Verify the service was called with the correct data
      expect(onboardingService.submitOnboarding).toHaveBeenCalledWith(validData);
    });
  });
});
