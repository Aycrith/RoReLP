-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address JSONB NOT NULL,
    billing_address JSONB,
    preferred_contact_method TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT email_unique UNIQUE (email)
);

-- Create repair_jobs table
CREATE TABLE IF NOT EXISTS public.repair_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    equipment_info JSONB NOT NULL,
    problem_description TEXT NOT NULL,
    service_details JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_repair_jobs_customer_id ON public.repair_jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_status ON public.repair_jobs(status);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for customers table
CREATE POLICY "Enable read access for all users" ON public.customers
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.customers
    FOR INSERT WITH CHECK (true);

-- Create policies for repair_jobs table
CREATE POLICY "Enable read access for all users" ON public.repair_jobs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.repair_jobs
    FOR INSERT WITH CHECK (true);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at columns
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_repair_jobs_updated_at
BEFORE UPDATE ON public.repair_jobs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
