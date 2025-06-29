import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database.types';

// Initialize the Supabase client with the Database type
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Types for our form data (frontend format)
export type CustomerFormData = {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  preferred_contact_method?: 'phone' | 'text' | 'email';
};

export type EquipmentFormData = {
  category: Database['public']['Enums']['equipment_category'];
  make: string;
  model?: string;
  serial_number?: string;
  year?: number;
  description?: string;
};

export type ServiceFormData = {
  preferred_drop_off_date?: string;
  preferred_time_window?: string;
  preferred_contact_method?: string;
  service_requested?: string;
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: unknown, context: string): string => {
  console.error(`Supabase error in ${context}:`, error);
  throw new Error(
    error instanceof Error ? error.message : `Failed to ${context}. Please try again later.`
  );
};

// Combined operation to create both customer and repair job using the actual database function
export const onboardingService = {
  async submitOnboardingForm(
    customerData: CustomerFormData,
    equipmentData: EquipmentFormData, 
    problemDescription: string,
    serviceDetails: ServiceFormData
  ) {
    const { data, error } = await supabase.rpc('submit_onboarding', {
      p_customer: customerData,
      p_equipment_info: equipmentData,
      p_problem_description: problemDescription,
      p_service_details: serviceDetails,
    });

    if (error) handleSupabaseError(error, 'submit onboarding form');
    return data;
  },
};

// Customer operations
export const customerService = {
  async getCustomerByEmail(email: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "No rows returned" which is fine for our use case
      handleSupabaseError(error, 'get customer by email');
    }
    return data;
  },

  async getCustomerById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) handleSupabaseError(error, 'get customer by id');
    return data;
  },
};

// Equipment operations
export const equipmentService = {
  async getCustomerEquipment(customerId: string) {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('customer_id', customerId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) handleSupabaseError(error, 'get customer equipment');
    return data || [];
  },
};

// Repair job operations
export const repairJobService = {
  async getCustomerRepairJobs(customerId: string) {
    const { data, error } = await supabase
      .from('repair_jobs')
      .select(`
        *,
        equipment:equipment_id(*),
        customer:customer_id(*)
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) handleSupabaseError(error, 'get customer repair jobs');
    return data || [];
  },

  async getRepairJobById(id: string) {
    const { data, error } = await supabase
      .from('repair_jobs')
      .select(`
        *,
        equipment:equipment_id(*),
        customer:customer_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) handleSupabaseError(error, 'get repair job by id');
    return data;
  },
};

// Real-time subscriptions
export const subscribeToRepairJobUpdates = (
  customerId: string,
  callback: (payload: { 
    eventType: string; 
    new: Record<string, unknown>; 
    old: Record<string, unknown>; 
  }) => void
) => {
  return supabase
    .channel(`repair_jobs:customer_id=eq.${customerId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'repair_jobs',
        filter: `customer_id=eq.${customerId}`,
      },
      callback
    )
    .subscribe();
};

// Utility function to create server-side client (for API routes)
export const createServerClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
};

export const logSupabaseOperation = (operation: string, data?: Record<string, unknown>): void => {
  console.log(`Supabase operation: ${operation}`);
  if (data) {
    console.log('Data:', data);
  }
};
