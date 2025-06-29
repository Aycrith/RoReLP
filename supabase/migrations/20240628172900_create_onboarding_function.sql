-- Create a function to handle the onboarding transaction
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
  -- Insert customer
  INSERT INTO public.customers (
    full_name,
    email,
    phone,
    address,
    billing_address,
    preferred_contact_method
  ) VALUES (
    p_customer->>'full_name',
    p_customer->>'email',
    p_customer->>'phone',
    p_customer->'address',
    p_customer->'billing_address',
    p_customer->>'preferred_contact_method'
  )
  ON CONFLICT (email) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    address = EXCLUDED.address,
    billing_address = EXCLUDED.billing_address,
    preferred_contact_method = EXCLUDED.preferred_contact_method,
    updated_at = timezone('utc'::text, now())
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

  -- Return the result
  RETURN v_result;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error in submit_onboarding: %', SQLERRM;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.submit_onboarding(JSONB, JSONB, TEXT, JSONB) TO anon, authenticated;
