const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deployFunction() {
  try {
    console.log('Reading migration file...');
    const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20240628172900_create_onboarding_function.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing SQL...');
    const { data, error } = await supabase.rpc('pg_temp.execute_sql', { 
      sql: sql 
    });
    
    if (error) {
      // If the error is about the pg_temp schema, try a different approach
      if (error.message.includes('permission denied for schema pg_temp')) {
        console.log('Using alternative method to execute SQL...');
        await executeSqlInBatches(sql);
        return;
      }
      throw error;
    }
    
    console.log('✅ Successfully deployed submit_onboarding function');
    
  } catch (error) {
    console.error('❌ Error deploying function:', error.message);
    
    // If we can't use RPC, try running the SQL directly
    if (error.message.includes('permission denied for function pg_temp.execute_sql')) {
      console.log('\nPlease run the following SQL in your Supabase SQL editor:');
      const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20240628172900_create_onboarding_function.sql');
      const sql = fs.readFileSync(migrationPath, 'utf8');
      console.log('\n' + sql + '\n');
    }
  }
}

async function executeSqlInBatches(sql) {
  // Split the SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  for (const statement of statements) {
    try {
      console.log('Executing:', statement.substring(0, 100) + '...');
      const { error } = await supabase.rpc('pg_temp.execute_sql', { 
        sql: statement + ';' 
      });
      
      if (error) throw error;
      console.log('✅ Statement executed successfully');
    } catch (error) {
      console.error('❌ Error executing statement:', error.message);
      console.log('\nPlease run the following SQL in your Supabase SQL editor:');
      console.log(statement + ';\n');
    }
  }
}

deployFunction();
