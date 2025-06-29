const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eztzatvxjcesmzduvpfz.supabase.co';
const supabaseKey = 'sb_secret_OHUfOW2nMjwSd764cDkQBA_OlKpf1F5';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function deployOnboardingFunction() {
  try {
    console.log('Deploying submit_onboarding function...');
    
    // SQL to create or replace the function
    const sql = `
    CREATE OR REPLACE FUNCTION public.submit_onboarding(
      p_customer JSONB,
      p_equipment_info JSONB,
      p_problem_description TEXT,
      p_service_details JSONB
    )
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      v_customer_id UUID;
      v_result JSONB;
    BEGIN
      -- Insert or update customer
      INSERT INTO public.customers (
        full_name,
        email,
        phone,
        address,
        billing_address,
        preferred_contact_method
      ) VALUES (
        p_customer->>'fullName',
        p_customer->>'email',
        p_customer->>'phone',
        p_customer->'address',
        CASE 
          WHEN (p_customer->>'billingAddressSame')::boolean = true 
          THEN p_customer->'address'
          ELSE p_customer->'billingAddress'
        END,
        p_customer->>'preferredContactMethod'
      )
      ON CONFLICT (email) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        billing_address = EXCLUDED.billing_address,
        preferred_contact_method = EXCLUDED.preferred_contact_method,
        updated_at = NOW()
      RETURNING id INTO v_customer_id;

      -- Insert repair job
      INSERT INTO public.repair_jobs (
        customer_id,
        equipment_info,
        problem_description,
        service_details
      ) VALUES (
        v_customer_id,
        p_equipment_info,
        p_problem_description,
        p_service_details
      )
      RETURNING 
        jsonb_build_object(
          'customer_id', v_customer_id,
          'job_id', id,
          'status', status,
          'created_at', created_at
        ) INTO v_result;

      RETURN v_result;
    EXCEPTION
      WHEN OTHERS THEN
        RAISE EXCEPTION 'Error in submit_onboarding: %', SQLERRM;
    END;
    $$;

    -- Grant execute permission
    GRANT EXECUTE ON FUNCTION public.submit_onboarding(JSONB, JSONB, TEXT, JSONB) TO anon, authenticated;
    `;

    // Execute the SQL
    const { data, error } = await supabase.rpc('pg_temp.execute_sql', { sql });
    
    if (error) {
      console.error('Error deploying function:', error);
      console.log('\nTrying alternative deployment method...');
      await executeRawSQL(sql);
      return;
    }
    
    console.log('✅ Successfully deployed submit_onboarding function');
    
    // Test the function
    await testOnboardingFunction();
    
  } catch (error) {
    console.error('Error in deployment:', error);
  }
}

async function executeRawSQL(sql) {
  try {
    console.log('Executing raw SQL...');
    const { data, error } = await supabase.rpc('sql', { query: sql });
    
    if (error) throw error;
    console.log('✅ SQL executed successfully');
    return data;
  } catch (error) {
    console.error('Error executing raw SQL:', error);
    console.log('\nPlease run the following SQL in your Supabase SQL editor:');
    console.log(sql);
  }
}

async function testOnboardingFunction() {
  try {
    console.log('\nTesting submit_onboarding function...');
    
    const testData = {
      p_customer: {
        fullName: 'Test User',
        email: `test-${Date.now()}@example.com`,
        phone: '1234567890',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'FL',
          zipCode: '12345'
        },
        billingAddressSame: true,
        preferredContactMethod: 'email'
      },
      p_equipment_info: {
        type: 'Lawn Mower',
        make: 'Test Make',
        model: 'Test Model',
        serial: '12345',
        year: '2020'
      },
      p_problem_description: 'Test problem description',
      p_service_details: {
        isMobileRepair: false,
        preferredDate: '2023-12-31',
        preferredTime: 'afternoon',
        location: 'Backyard'
      }
    };

    const { data, error } = await supabase.rpc('submit_onboarding', testData);
    
    if (error) throw error;
    
    console.log('✅ Function test successful!');
    console.log('Result:', data);
    
  } catch (error) {
    console.error('❌ Function test failed:', error);
  }
}

// Run the deployment
deployOnboardingFunction();
