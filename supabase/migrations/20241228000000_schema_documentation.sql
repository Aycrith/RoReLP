-- Migration: Schema Documentation and Alignment
-- This migration documents the current state of the database schema
-- to align local development with the actual Supabase backend

-- ==================================================
-- ENUMS
-- ==================================================

-- Equipment categories enum (already exists in production)
DO $$ BEGIN
    CREATE TYPE equipment_category AS ENUM (
        'Lawnmower - Push',
        'Lawnmower - Riding', 
        'Lawnmower - Zero Turn',
        'Lawnmower - Electric',
        'Chainsaw - Gas',
        'Chainsaw - Electric', 
        'Chainsaw - Battery',
        'Generator - Portable',
        'Generator - Inverter',
        'Generator - Standby',
        'Leaf Blower - Handheld',
        'Leaf Blower - Backpack',
        'Leaf Blower - Wheeled',
        'Trimmer - String',
        'Trimmer - Hedge',
        'Other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Repair status enum (already exists in production)
DO $$ BEGIN
    CREATE TYPE repair_status AS ENUM (
        'Request Submitted',
        'Equipment Received',
        'Awaiting Diagnosis',
        'Diagnosing',
        'Quote Ready',
        'Quote Sent',
        'Quote Approved',
        'Quote Declined',
        'Awaiting Parts',
        'Parts Ordered',
        'Parts Received',
        'Repair In Progress',
        'Repair Paused - Awaiting Customer',
        'Testing / Quality Check',
        'Ready for Pickup',
        'Completed - Picked Up',
        'Completed - Delivered',
        'Cancelled by Customer',
        'Cancelled by Shop',
        'On Hold'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Payment status enum (already exists in production)
DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM (
        'Draft',
        'Sent',
        'Unpaid',
        'Paid',
        'Partially Paid',
        'Overdue',
        'Void',
        'Refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==================================================
-- TABLES
-- ==================================================

-- Customers table (core customer information)
CREATE TABLE IF NOT EXISTS customers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- Contact information
    email text UNIQUE,
    full_name text,
    phone text,
    
    -- Address information
    address_line1 text,
    address_line2 text,
    city text,
    state text,
    postal_code text,
    
    -- Communication preferences
    preferred_contact_method text,
    marketing_opt_in boolean DEFAULT false,
    
    -- Business fields
    is_active boolean DEFAULT true,
    quickbooks_id text,
    quickbooks_sync_token text,
    last_quickbooks_sync timestamptz,
    
    -- Lead management
    interest_level text,
    source text,
    status text DEFAULT 'lead',
    notes text,
    metadata jsonb,
    
    -- Technical fields
    ip_address text,
    user_agent text,
    is_subscribed boolean DEFAULT false,
    last_contacted timestamptz
);

-- Equipment table (customer equipment information)
CREATE TABLE IF NOT EXISTS equipment (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- Foreign key to customer
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Equipment details
    category equipment_category NOT NULL,
    make text NOT NULL,
    model text,
    year integer,
    serial_number text,
    description text,
    purchase_date date,
    
    -- Status
    is_active boolean DEFAULT true
);

-- Repair jobs table (service requests and jobs)
CREATE TABLE IF NOT EXISTS repair_jobs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- Foreign keys
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    equipment_id uuid REFERENCES equipment(id) ON DELETE SET NULL,
    
    -- Job identification
    job_number text,
    
    -- Problem and service details
    issue_description text NOT NULL,
    service_requested text,
    technician_notes text,
    
    -- Scheduling
    estimated_completion_date date,
    actual_completion_date date,
    preferred_drop_off_date date,
    preferred_time_window text,
    preferred_contact_method text,
    
    -- Financial
    quote_amount decimal(10,2),
    quote_approved_at timestamptz,
    quote_declined_at timestamptz,
    quote_sent_at timestamptz,
    total_cost decimal(10,2),
    
    -- Documentation
    photos_before jsonb,
    photos_after jsonb,
    photos_progress jsonb,
    voice_notes jsonb,
    digital_signatures jsonb,
    documentation_completed boolean DEFAULT false,
    documentation_updated_at timestamptz,
    customer_approval boolean,
    
    -- Technical details
    parts_needed jsonb,
    labor_hours decimal(5,2),
    diagnosis text,
    priority text,
    technician_id uuid,
    
    -- Status tracking
    status text DEFAULT 'Request Submitted',
    estimated_completion date,
    has_documentation boolean DEFAULT false,
    documentation_complete boolean DEFAULT false
);

-- ==================================================
-- INDEXES
-- ==================================================

-- Customer indexes
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_source ON customers(source);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

-- Equipment indexes
CREATE INDEX IF NOT EXISTS idx_equipment_customer_id ON equipment(customer_id);
CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);
CREATE INDEX IF NOT EXISTS idx_equipment_make ON equipment(make);

-- Repair jobs indexes
CREATE INDEX IF NOT EXISTS idx_repair_jobs_customer_id ON repair_jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_equipment_id ON repair_jobs(equipment_id);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_status ON repair_jobs(status);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_created_at ON repair_jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_job_number ON repair_jobs(job_number);

-- ==================================================
-- TRIGGERS
-- ==================================================

-- Updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at 
    BEFORE UPDATE ON customers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_equipment_updated_at ON equipment;
CREATE TRIGGER update_equipment_updated_at 
    BEFORE UPDATE ON equipment 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_repair_jobs_updated_at ON repair_jobs;
CREATE TRIGGER update_repair_jobs_updated_at 
    BEFORE UPDATE ON repair_jobs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================================================
-- ROW LEVEL SECURITY (RLS)
-- ==================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_jobs ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous onboarding form submission
-- Allow anonymous users to insert customers
CREATE POLICY "Allow anonymous customer creation" ON customers
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert equipment
CREATE POLICY "Allow anonymous equipment creation" ON equipment
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert repair jobs
CREATE POLICY "Allow anonymous repair job creation" ON repair_jobs
    FOR INSERT TO anon
    WITH CHECK (true);

-- ==================================================
-- FUNCTIONS
-- ==================================================

-- Main onboarding function (already exists in production)
CREATE OR REPLACE FUNCTION submit_onboarding(
    p_customer jsonb,
    p_equipment_info jsonb,
    p_problem_description text,
    p_service_details jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_customer_id uuid;
    v_equipment_id uuid;
    v_repair_job_id uuid;
    v_existing_customer customers%ROWTYPE;
BEGIN
    -- Check if customer exists by email
    SELECT * INTO v_existing_customer 
    FROM customers 
    WHERE email = (p_customer->>'email')::text
    LIMIT 1;

    IF v_existing_customer.id IS NOT NULL THEN
        -- Update existing customer
        v_customer_id := v_existing_customer.id;
        
        UPDATE customers SET
            full_name = COALESCE((p_customer->>'full_name')::text, full_name),
            phone = COALESCE((p_customer->>'phone')::text, phone),
            address_line1 = COALESCE((p_customer->>'address_line1')::text, address_line1),
            address_line2 = (p_customer->>'address_line2')::text,
            city = COALESCE((p_customer->>'city')::text, city),
            state = COALESCE((p_customer->>'state')::text, state),
            postal_code = COALESCE((p_customer->>'postal_code')::text, postal_code),
            preferred_contact_method = COALESCE((p_customer->>'preferred_contact_method')::text, preferred_contact_method),
            marketing_opt_in = COALESCE((p_customer->>'marketing_opt_in')::boolean, marketing_opt_in),
            source = COALESCE((p_customer->>'source')::text, source),
            status = COALESCE((p_customer->>'status')::text, status),
            updated_at = now()
        WHERE id = v_customer_id;
    ELSE
        -- Create new customer
        INSERT INTO customers (
            email, full_name, phone, address_line1, address_line2,
            city, state, postal_code, preferred_contact_method,
            marketing_opt_in, source, status
        ) VALUES (
            (p_customer->>'email')::text,
            (p_customer->>'full_name')::text,
            (p_customer->>'phone')::text,
            (p_customer->>'address_line1')::text,
            (p_customer->>'address_line2')::text,
            (p_customer->>'city')::text,
            (p_customer->>'state')::text,
            (p_customer->>'postal_code')::text,
            (p_customer->>'preferred_contact_method')::text,
            COALESCE((p_customer->>'marketing_opt_in')::boolean, false),
            COALESCE((p_customer->>'source')::text, 'onboarding_form'),
            COALESCE((p_customer->>'status')::text, 'lead')
        ) RETURNING id INTO v_customer_id;
    END IF;

    -- Create equipment record
    INSERT INTO equipment (
        customer_id, category, make, model, year, serial_number, description, purchase_date
    ) VALUES (
        v_customer_id,
        (p_equipment_info->>'category')::equipment_category,
        (p_equipment_info->>'make')::text,
        (p_equipment_info->>'model')::text,
        (p_equipment_info->>'year')::integer,
        (p_equipment_info->>'serial_number')::text,
        (p_equipment_info->>'description')::text,
        (p_equipment_info->>'purchase_date')::date
    ) RETURNING id INTO v_equipment_id;

    -- Create repair job
    INSERT INTO repair_jobs (
        customer_id, equipment_id, issue_description, service_requested,
        preferred_drop_off_date, preferred_time_window, preferred_contact_method,
        status
    ) VALUES (
        v_customer_id,
        v_equipment_id,
        p_problem_description,
        (p_service_details->>'service_type')::text,
        (p_service_details->>'preferred_drop_off_date')::date,
        (p_service_details->>'preferred_time_window')::text,
        (p_service_details->>'preferred_contact_method')::text,
        'Request Submitted'
    ) RETURNING id INTO v_repair_job_id;

    -- Return success response
    RETURN jsonb_build_object(
        'success', true,
        'customer_id', v_customer_id,
        'equipment_id', v_equipment_id,
        'repair_job_id', v_repair_job_id,
        'message', 'Onboarding completed successfully'
    );

EXCEPTION
    WHEN OTHERS THEN
        -- Return error response
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM,
            'message', 'Failed to process onboarding request'
        );
END;
$$;

-- ==================================================
-- COMMENTS
-- ==================================================

COMMENT ON TABLE customers IS 'Core customer information and contact details';
COMMENT ON TABLE equipment IS 'Customer equipment inventory';
COMMENT ON TABLE repair_jobs IS 'Service requests and repair job tracking';
COMMENT ON FUNCTION submit_onboarding IS 'Main onboarding function for new customers and service requests'; 