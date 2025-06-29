const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

const testData = {
  fullName: "Test User",
  email: `test-${Date.now()}@example.com`,
  phone: "1234567890",
  address: {
    street: "123 Test St",
    city: "Test City",
    state: "FL",
    zipCode: "12345"
  },
  billingAddressSame: true,
  preferredContactMethod: "email",
  equipmentType: "Lawn Mower",
  makeBrand: "Test Make",
  modelNumber: "Test Model",
  serialNumber: "12345",
  yearOfManufacture: "2020",
  problemDescription: "Test problem description",
  problemStarted: "Last week",
  isMobileRepair: false,
  preferredServiceDate: "2023-12-31",
  preferredTimeWindow: "afternoon",
  equipmentLocation: "Backyard",
  diagnosticFeeAcknowledged: true,
  diagnosticAuthorization: true,
  termsAccepted: true
};

async function testOnboardingAPI() {
  try {
    console.log('Sending test request to /api/onboarding...');
    const response = await fetch('http://localhost:3000/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testOnboardingAPI();
