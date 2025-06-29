export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          permissions: Json | null
          rate_limit_tier: string | null
          requests_per_hour: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          permissions?: Json | null
          rate_limit_tier?: string | null
          requests_per_hour?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          permissions?: Json | null
          rate_limit_tier?: string | null
          requests_per_hour?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          interest_level: string | null
          ip_address: string | null
          is_active: boolean | null
          is_subscribed: boolean | null
          last_contacted: string | null
          last_quickbooks_sync: string | null
          marketing_opt_in: boolean | null
          metadata: Json | null
          notes: string | null
          phone: string | null
          postal_code: string | null
          preferred_contact_method: string | null
          quickbooks_id: string | null
          quickbooks_sync_token: string | null
          source: string | null
          state: string | null
          status: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          interest_level?: string | null
          ip_address?: string | null
          is_active?: boolean | null
          is_subscribed?: boolean | null
          last_contacted?: string | null
          last_quickbooks_sync?: string | null
          marketing_opt_in?: boolean | null
          metadata?: Json | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_contact_method?: string | null
          quickbooks_id?: string | null
          quickbooks_sync_token?: string | null
          source?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          interest_level?: string | null
          ip_address?: string | null
          is_active?: boolean | null
          is_subscribed?: boolean | null
          last_contacted?: string | null
          last_quickbooks_sync?: string | null
          marketing_opt_in?: boolean | null
          metadata?: Json | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_contact_method?: string | null
          quickbooks_id?: string | null
          quickbooks_sync_token?: string | null
          source?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      equipment: {
        Row: {
          category: Database["public"]["Enums"]["equipment_category"]
          created_at: string
          customer_id: string
          description: string | null
          id: string
          is_active: boolean | null
          make: string
          model: string | null
          purchase_date: string | null
          serial_number: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["equipment_category"]
          created_at?: string
          customer_id: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          make: string
          model?: string | null
          purchase_date?: string | null
          serial_number?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["equipment_category"]
          created_at?: string
          customer_id?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          make?: string
          model?: string | null
          purchase_date?: string | null
          serial_number?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      repair_jobs: {
        Row: {
          actual_completion_date: string | null
          created_at: string
          customer_approval: boolean | null
          customer_id: string
          diagnosis: string | null
          digital_signatures: Json | null
          documentation_complete: boolean | null
          documentation_completed: boolean | null
          documentation_updated_at: string | null
          equipment_id: string | null
          estimated_completion: string | null
          estimated_completion_date: string | null
          has_documentation: boolean | null
          id: string
          issue_description: string
          job_number: string | null
          labor_hours: number | null
          parts_needed: Json | null
          photos_after: Json | null
          photos_before: Json | null
          photos_progress: Json | null
          preferred_contact_method: string | null
          preferred_drop_off_date: string | null
          preferred_time_window: string | null
          priority: string | null
          quote_amount: number | null
          quote_approved_at: string | null
          quote_declined_at: string | null
          quote_sent_at: string | null
          service_requested: string | null
          status: string
          technician_id: string | null
          technician_notes: string | null
          total_cost: number | null
          updated_at: string
          voice_notes: Json | null
        }
        Insert: {
          actual_completion_date?: string | null
          created_at?: string
          customer_approval?: boolean | null
          customer_id: string
          diagnosis?: string | null
          digital_signatures?: Json | null
          documentation_complete?: boolean | null
          documentation_completed?: boolean | null
          documentation_updated_at?: string | null
          equipment_id?: string | null
          estimated_completion?: string | null
          estimated_completion_date?: string | null
          has_documentation?: boolean | null
          id?: string
          issue_description: string
          job_number?: string | null
          labor_hours?: number | null
          parts_needed?: Json | null
          photos_after?: Json | null
          photos_before?: Json | null
          photos_progress?: Json | null
          preferred_contact_method?: string | null
          preferred_drop_off_date?: string | null
          preferred_time_window?: string | null
          priority?: string | null
          quote_amount?: number | null
          quote_approved_at?: string | null
          quote_declined_at?: string | null
          quote_sent_at?: string | null
          service_requested?: string | null
          status?: string
          technician_id?: string | null
          technician_notes?: string | null
          total_cost?: number | null
          updated_at?: string
          voice_notes?: Json | null
        }
        Update: {
          actual_completion_date?: string | null
          created_at?: string
          customer_approval?: boolean | null
          customer_id?: string
          diagnosis?: string | null
          digital_signatures?: Json | null
          documentation_complete?: boolean | null
          documentation_completed?: boolean | null
          documentation_updated_at?: string | null
          equipment_id?: string | null
          estimated_completion?: string | null
          estimated_completion_date?: string | null
          has_documentation?: boolean | null
          id?: string
          issue_description?: string
          job_number?: string | null
          labor_hours?: number | null
          parts_needed?: Json | null
          photos_after?: Json | null
          photos_before?: Json | null
          photos_progress?: Json | null
          preferred_contact_method?: string | null
          preferred_drop_off_date?: string | null
          preferred_time_window?: string | null
          priority?: string | null
          quote_amount?: number | null
          quote_approved_at?: string | null
          quote_declined_at?: string | null
          quote_sent_at?: string | null
          service_requested?: string | null
          status?: string
          technician_id?: string | null
          technician_notes?: string | null
          total_cost?: number | null
          updated_at?: string
          voice_notes?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "repair_jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_jobs_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      submit_onboarding: {
        Args: {
          p_customer: Json
          p_equipment_info: Json
          p_problem_description: string
          p_service_details: Json
        }
        Returns: Json
      }
    }
    Enums: {
      equipment_category:
        | "Lawnmower - Push"
        | "Lawnmower - Riding"
        | "Lawnmower - Zero Turn"
        | "Lawnmower - Electric"
        | "Chainsaw - Gas"
        | "Chainsaw - Electric"
        | "Chainsaw - Battery"
        | "Generator - Portable"
        | "Generator - Inverter"
        | "Generator - Standby"
        | "Leaf Blower - Handheld"
        | "Leaf Blower - Backpack"
        | "Leaf Blower - Wheeled"
        | "Trimmer - String"
        | "Trimmer - Hedge"
        | "Other"
      payment_status:
        | "Draft"
        | "Sent"
        | "Unpaid"
        | "Paid"
        | "Partially Paid"
        | "Overdue"
        | "Void"
        | "Refunded"
      repair_status:
        | "Request Submitted"
        | "Equipment Received"
        | "Awaiting Diagnosis"
        | "Diagnosing"
        | "Quote Ready"
        | "Quote Sent"
        | "Quote Approved"
        | "Quote Declined"
        | "Awaiting Parts"
        | "Parts Ordered"
        | "Parts Received"
        | "Repair In Progress"
        | "Repair Paused - Awaiting Customer"
        | "Testing / Quality Check"
        | "Ready for Pickup"
        | "Completed - Picked Up"
        | "Completed - Delivered"
        | "Cancelled by Customer"
        | "Cancelled by Shop"
        | "On Hold"
    }
  }
}

// Type helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Specific type exports for common use
export type Customer = Tables<'customers'>
export type Equipment = Tables<'equipment'>
export type RepairJob = Tables<'repair_jobs'>
export type EquipmentCategory = Enums<'equipment_category'>
export type PaymentStatus = Enums<'payment_status'>
export type RepairStatus = Enums<'repair_status'>

// Equipment categories constant for forms
export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  "Lawnmower - Push",
  "Lawnmower - Riding", 
  "Lawnmower - Zero Turn",
  "Lawnmower - Electric",
  "Chainsaw - Gas",
  "Chainsaw - Electric", 
  "Chainsaw - Battery",
  "Generator - Portable",
  "Generator - Inverter",
  "Generator - Standby", 
  "Leaf Blower - Handheld",
  "Leaf Blower - Backpack",
  "Leaf Blower - Wheeled",
  "Trimmer - String",
  "Trimmer - Hedge",
  "Other"
]

// Submit onboarding function types
export type SubmitOnboardingArgs = Database['public']['Functions']['submit_onboarding']['Args']
export type SubmitOnboardingResponse = Database['public']['Functions']['submit_onboarding']['Returns']
