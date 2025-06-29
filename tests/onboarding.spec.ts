import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Onboarding Form', () => {
  test('should submit the form successfully', async ({ page }) => {
    // Generate test data
    const testData = {
      // Contact Information
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: 'FL',
        zipCode: faker.location.zipCode('#####')
      },
      billingAddressSame: true,
      preferredContactMethod: 'email',
      
      // Equipment Information
      equipmentType: 'Lawn Mower',
      makeBrand: 'Honda',
      modelNumber: 'HRX217VKA',
      serialNumber: faker.string.alphanumeric(10),
      yearOfManufacture: '2022',
      
      // Problem Description
      problemDescription: 'Won\'t start, makes a loud noise when trying to start',
      problemStarted: '2025-06-20',
      recentMaintenance: 'Changed oil 2 months ago',
      lastServiceDate: '2024-12-15',
      
      // Service Details
      isMobileRepair: true,
      preferredServiceDate: faker.date.soon({ days: 7 }).toISOString().split('T')[0],
      preferredTimeWindow: 'afternoon',
      equipmentLocation: 'In the backyard, next to the shed',
      specialInstructions: 'Please call when you arrive',
      
      // Agreements
      diagnosticFeeAcknowledged: true,
      diagnosticAuthorization: true,
      termsAccepted: true
    };

    // Navigate to the form page
    await page.goto('/onboarding');

    // Step 1: Contact Information
    await page.fill('input[name="fullName"]', testData.fullName);
    await page.fill('input[name="email"]', testData.email);
    await page.fill('input[name="phone"]', testData.phone);
    
    // Address
    await page.fill('input[name="address.street"]', testData.address.street);
    await page.fill('input[name="address.city"]', testData.address.city);
    await page.selectOption('select[name="address.state"]', testData.address.state);
    await page.fill('input[name="address.zipCode"]', testData.address.zipCode);
    
    // Billing address same as shipping
    await page.check('input[name="billingAddressSame"]');
    
    // Preferred contact method
    await page.check(`input[value="${testData.preferredContactMethod}"]`);
    
    // Go to next step
    await page.click('button:has-text("Next")');

    // Step 2: Equipment Information
    await page.selectOption('select[name="equipmentType"]', testData.equipmentType);
    await page.fill('input[name="makeBrand"]', testData.makeBrand);
    await page.fill('input[name="modelNumber"]', testData.modelNumber);
    await page.fill('input[name="serialNumber"]', testData.serialNumber);
    await page.fill('input[name="yearOfManufacture"]', testData.yearOfManufacture);
    
    // Go to next step
    await page.click('button:has-text("Next")');

    // Step 3: Problem Description
    await page.fill('textarea[name="problemDescription"]', testData.problemDescription);
    await page.fill('input[name="problemStarted"]', testData.problemStarted);
    await page.fill('textarea[name="recentMaintenance"]', testData.recentMaintenance);
    await page.fill('input[name="lastServiceDate"]', testData.lastServiceDate);
    
    // Go to next step
    await page.click('button:has-text("Next")');

    // Step 4: Service Details
    await page.check('input[name="isMobileRepair"]');
    await page.fill('input[name="preferredServiceDate"]', testData.preferredServiceDate);
    await page.check(`input[value="${testData.preferredTimeWindow}"]`);
    await page.fill('input[name="equipmentLocation"]', testData.equipmentLocation);
    await page.fill('textarea[name="specialInstructions"]', testData.specialInstructions);
    
    // Go to next step
    await page.click('button:has-text("Next")');

    // Step 5: Agreements
    await page.check('input[name="diagnosticFeeAcknowledged"]');
    await page.check('input[name="diagnosticAuthorization"]');
    await page.check('input[name="termsAccepted"]');
    
    // Submit the form
    await Promise.all([
      page.waitForResponse(response => 
        response.url().includes('/api/onboarding') && 
        response.status() === 200
      ),
      page.click('button[type="submit"]')
    ]);

    // Verify success message
    await expect(page.getByText('Thank you for your submission!')).toBeVisible();
    
    // Verify the data was saved in the database
    const response = await page.request.post('/api/test/verify-onboarding', {
      data: {
        email: testData.email
      }
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.customer).toBeDefined();
    expect(result.repairJobs).toHaveLength(1);
  });
});
