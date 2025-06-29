import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  // This endpoint is for testing purposes only
  if (process.env.NODE_ENV !== 'test') {
    return NextResponse.json(
      { success: false, message: 'Not found' },
      { status: 404 }
    );
  }

  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Get customer by email
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (customerError) throw customerError;
    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get repair jobs for the customer
    const { data: repairJobs, error: jobsError } = await supabase
      .from('repair_jobs')
      .select('*')
      .eq('customer_id', customer.id);

    if (jobsError) throw jobsError;

    return NextResponse.json({
      success: true,
      customer,
      repairJobs,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Verification failed',
      },
      { status: 500 }
    );
  }
}
