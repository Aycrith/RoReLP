const fetch = require('node-fetch');

// Test data that matches the actual database schema
const testData = {
  p_customer: {
    full_name: "John Smith",
    email: "john.smith.test@example.com",
    phone: "555-123-4567",
    address_line1: "123 Main Street",
    address_line2: "Apt 2B",
    city: "Springfield",
    state: "IL",
    postal_code: "62701",
    preferred_contact_method: "email",
    marketing_opt_in: false,
    source: "onboarding_form",
    status: "lead"
  },
  p_equipment_info: {
    category: "Lawnmower - Push",
    make: "Honda",
    model: "HRX217VKA",
    year: 2022,
    serial_number: "MAGA-1234567",
    description: "Self-propelled variable speed mower",
    purchase_date: "2022-05-15"
  },
  p_problem_description: "Mower won't start. Pull cord feels stuck and engine doesn't turn over. Last worked fine at end of last season. Has been stored in garage over winter.",
  p_service_details: {
    service_type: "drop_off",
    preferred_drop_off_date: "2024-01-15",
    preferred_time_window: "morning",
    preferred_contact_method: "phone",
    urgency_level: "medium",
    maintenance_history: "Oil changed last spring, air filter replaced 6 months ago"
  }
};

async function testOnboardingIntegration() {
  console.log('🧪 Testing Onboarding Integration');
  console.log('================================');
  
  try {
    console.log('📤 Sending test data to API endpoint...');
    console.log('Data structure:');
    console.log(JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log(`\n📨 Response Status: ${response.status} ${response.statusText}`);
    
    const responseData = await response.json();
    console.log('📋 Response Data:');
    console.log(JSON.stringify(responseData, null, 2));

    if (response.ok && responseData.success) {
      console.log('\n✅ SUCCESS: Onboarding integration test passed!');
      console.log(`👤 Customer ID: ${responseData.data.customer_id}`);
      console.log(`🔧 Equipment ID: ${responseData.data.equipment_id}`);
      console.log(`🛠️  Repair Job ID: ${responseData.data.repair_job_id}`);
    } else {
      console.log('\n❌ FAILED: Onboarding integration test failed');
      if (responseData.error) {
        console.log(`Error: ${responseData.error}`);
        if (responseData.details) {
          console.log('Details:', responseData.details);
        }
      }
    }

  } catch (error) {
    console.log('\n💥 ERROR: Network or parsing error');
    console.error(error);
  }
  
  console.log('\n================================');
}

// Test with different equipment categories
async function testMultipleCategories() {
  console.log('\n🔄 Testing Multiple Equipment Categories');
  console.log('=======================================');
  
  const categories = [
    "Chainsaw - Gas",
    "Generator - Portable", 
    "Leaf Blower - Handheld",
    "Trimmer - String"
  ];
  
  for (const category of categories) {
    console.log(`\n🧪 Testing category: ${category}`);
    
    const categoryTestData = {
      ...testData,
      p_customer: {
        ...testData.p_customer,
        email: `test.${category.toLowerCase().replace(/[^a-z]/g, '')}@example.com`
      },
      p_equipment_info: {
        ...testData.p_equipment_info,
        category: category,
        make: category.includes('Chainsaw') ? 'Stihl' : 
              category.includes('Generator') ? 'Honda' :
              category.includes('Blower') ? 'Echo' : 'Husqvarna'
      }
    };
    
    try {
      const response = await fetch('http://localhost:3000/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryTestData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`✅ ${category}: SUCCESS`);
      } else {
        console.log(`❌ ${category}: FAILED - ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`💥 ${category}: ERROR - ${error.message}`);
    }
  }
}

// Test validation errors
async function testValidationErrors() {
  console.log('\n🚫 Testing Validation Errors');
  console.log('============================');
  
  const invalidTestCases = [
    {
      name: 'Missing required customer fields',
      data: {
        p_customer: { email: 'test@example.com' }, // Missing required fields
        p_equipment_info: testData.p_equipment_info,
        p_problem_description: testData.p_problem_description,
        p_service_details: testData.p_service_details
      }
    },
    {
      name: 'Invalid equipment category',
      data: {
        ...testData,
        p_equipment_info: {
          ...testData.p_equipment_info,
          category: 'Invalid Category'
        }
      }
    },
    {
      name: 'Missing problem description',
      data: {
        p_customer: testData.p_customer,
        p_equipment_info: testData.p_equipment_info,
        p_problem_description: '', // Empty description
        p_service_details: testData.p_service_details
      }
    }
  ];
  
  for (const testCase of invalidTestCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    
    try {
      const response = await fetch('http://localhost:3000/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        console.log(`✅ Validation correctly rejected: ${result.error || 'Unknown error'}`);
      } else {
        console.log(`❌ Validation should have failed but didn't`);
      }
    } catch (error) {
      console.log(`💥 Network error: ${error.message}`);
    }
  }
}

// Run all tests
async function runAllTests() {
  await testOnboardingIntegration();
  await testMultipleCategories();
  await testValidationErrors();
  
  console.log('\n🏁 All tests completed!');
  console.log('Check your Supabase dashboard to verify data was created correctly.');
}

// Check if this script is being run directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testOnboardingIntegration,
  testMultipleCategories,
  testValidationErrors,
  runAllTests
}; 