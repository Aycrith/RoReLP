import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { onboardingApiSchema } from '@/lib/validations/onboarding'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request data using the frontend schema
    const validatedData = onboardingApiSchema.parse(body)

    // Transform data to match the submit_onboarding function's expected format
    const transformedCustomer = {
      fullName: validatedData.customer.full_name,
      email: validatedData.customer.email,
      phone: validatedData.customer.phone,
      address: {
        street: validatedData.customer.address_line1 + 
                (validatedData.customer.address_line2 ? ` ${validatedData.customer.address_line2}` : ''),
        city: validatedData.customer.city,
        state: validatedData.customer.state,
        zipCode: validatedData.customer.postal_code,
      },
      preferredContactMethod: validatedData.customer.preferred_contact_method || 'email',
      marketingOptIn: validatedData.customer.marketing_opt_in || false,
    }

    const transformedEquipment = {
      type: validatedData.equipment.category,
      make: validatedData.equipment.make,
      model: validatedData.equipment.model || '',
      year: validatedData.equipment.year?.toString() || '',
      serial: validatedData.equipment.serial_number || '',
    }

    const transformedService = {
      isMobileRepair: false, // Default for now
      preferredDate: validatedData.service.preferred_drop_off_date || '',
      preferredTime: validatedData.service.preferred_time_window || '',
      serviceInstructions: validatedData.problem.service_requested || '',
    }

    // Create Supabase client
    const supabase = await createClient()

    // Call the submit_onboarding function
    const { data, error } = await supabase.rpc('submit_onboarding', {
      p_customer: transformedCustomer,
      p_equipment_info: transformedEquipment,
      p_problem_description: validatedData.problem.issue_description,
      p_service_details: transformedService,
    })

    if (error) {
      console.error('Supabase function error:', error)
      return NextResponse.json(
        { error: 'Failed to submit onboarding request' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Onboarding request submitted successfully' 
    })

  } catch (error) {
    console.error('API route error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Enable CORS for the API route
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
