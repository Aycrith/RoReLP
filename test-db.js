const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test connection by querying a table
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .limit(1);

    if (error) throw error;
    
    console.log('✅ Successfully connected to Supabase');
    console.log('Customers table exists and is accessible');
    
    // Check if the function exists
    const { data: functionExists, error: funcError } = await supabase.rpc('submit_onboarding', {
      p_customer: {},
      p_equipment_info: {},
      p_problem_description: '',
      p_service_details: {}
    });
    
    if (funcError) {
      console.error('❌ Error calling submit_onboarding function:', funcError);
    } else {
      console.log('✅ submit_onboarding function exists and is callable');
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    
    // Check if the error is related to missing tables
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.error('\nIt seems the database tables have not been created.');
      console.error('Please apply the database migrations in the supabase/migrations directory.');
    }
    
    process.exit(1);
  }
}

testDatabaseConnection();
