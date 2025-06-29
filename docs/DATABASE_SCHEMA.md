# Database Schema Documentation

This document outlines the current database schema and backend processes for the Small Engine Repair business application, aligned with the actual Supabase backend.

## Project Information

- **Supabase Project ID**: `eztzatvxjcesmzduvpfz`
- **Project URL**: `https://eztzatvxjcesmzduvpfz.supabase.co`
- **Environment**: Production
- **Database**: PostgreSQL with Row Level Security (RLS) enabled

## Database Schema Overview

### Core Tables

#### 1. `customers` Table
Primary table for storing customer information and contact details.

```sql
CREATE TABLE customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- Contact Information
    email text UNIQUE,
    full_name text,
    phone text,
    
    -- Address Information
    address_line1 text,
    address_line2 text,
    city text,
    state text,
    postal_code text,
    
    -- Communication Preferences
    preferred_contact_method text,
    marketing_opt_in boolean DEFAULT false,
    
    -- Business Fields
    is_active boolean DEFAULT true,
    quickbooks_id text,
    quickbooks_sync_token text,
    last_quickbooks_sync timestamptz,
    
    -- Lead Management
    interest_level text,
    source text,
    status text DEFAULT 'lead',
    notes text,
    metadata jsonb,
    
    -- Technical Fields
    ip_address text,
    user_agent text,
    is_subscribed boolean DEFAULT false,
    last_contacted timestamptz
);
```

**Key Fields:**
- `email`: Unique identifier for customer lookup
- `source`: Tracks where the customer came from (e.g., 'onboarding_form')
- `status`: Customer status ('lead', 'active', etc.)
- `metadata`: Flexible JSON field for additional data

#### 2. `equipment` Table
Stores customer equipment inventory and details.

```sql
CREATE TABLE equipment (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    
    category equipment_category NOT NULL,
    make text NOT NULL,
    model text,
    year integer,
    serial_number text,
    description text,
    purchase_date date,
    
    is_active boolean DEFAULT true
);
```

**Key Fields:**
- `category`: Equipment type from predefined enum
- `make`: Required equipment manufacturer
- `customer_id`: Foreign key linking to customer

#### 3. `repair_jobs` Table
Tracks service requests and repair job lifecycle.

```sql
CREATE TABLE repair_jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- Foreign Keys
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    equipment_id uuid REFERENCES equipment(id) ON DELETE SET NULL,
    
    -- Job Details
    job_number text,
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
    total_cost decimal(10,2),
    quote_approved_at timestamptz,
    quote_declined_at timestamptz,
    quote_sent_at timestamptz,
    
    -- Documentation
    photos_before jsonb,
    photos_after jsonb,
    photos_progress jsonb,
    voice_notes jsonb,
    digital_signatures jsonb,
    documentation_completed boolean DEFAULT false,
    
    -- Technical
    parts_needed jsonb,
    labor_hours decimal(5,2),
    diagnosis text,
    priority text,
    technician_id uuid,
    
    -- Status
    status text DEFAULT 'Request Submitted'
);
```

### Enums

#### `equipment_category`
Predefined equipment categories for consistent classification:

```sql
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
```

#### `repair_status`
Comprehensive repair job status tracking:

```sql
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
```

#### `payment_status`
Financial status tracking:

```sql
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
```

## Backend Functions

### `submit_onboarding` Function

Main function for processing onboarding form submissions.

**Signature:**
```sql
submit_onboarding(
    p_customer jsonb,
    p_equipment_info jsonb,
    p_problem_description text,
    p_service_details jsonb
) RETURNS jsonb
```

**Parameters:**

1. **`p_customer`** (jsonb):
   ```json
   {
     "full_name": "John Doe",
     "email": "john@example.com",
     "phone": "555-1234",
     "address_line1": "123 Main St",
     "address_line2": "Apt 2",
     "city": "Anytown",
     "state": "CA",
     "postal_code": "12345",
     "preferred_contact_method": "email",
     "marketing_opt_in": false,
     "source": "onboarding_form",
     "status": "lead"
   }
   ```

2. **`p_equipment_info`** (jsonb):
   ```json
   {
     "category": "Lawnmower - Push",
     "make": "Honda",
     "model": "HRX217",
     "year": 2022,
     "serial_number": "ABC123",
     "description": "Self-propelled mower",
     "purchase_date": "2022-05-15"
   }
   ```

3. **`p_problem_description`** (text):
   Detailed description of the equipment issue.

4. **`p_service_details`** (jsonb):
   ```json
   {
     "service_type": "drop_off",
     "preferred_drop_off_date": "2024-01-15",
     "preferred_time_window": "morning",
     "preferred_contact_method": "phone",
     "urgency_level": "medium",
     "maintenance_history": "Last serviced 6 months ago"
   }
   ```

**Function Logic:**
1. Checks if customer exists by email
2. Updates existing customer or creates new one
3. Creates equipment record
4. Creates repair job with 'Request Submitted' status
5. Returns success/error response with created IDs

**Return Value:**
```json
{
  "success": true,
  "customer_id": "uuid",
  "equipment_id": "uuid", 
  "repair_job_id": "uuid",
  "message": "Onboarding completed successfully"
}
```

## Row Level Security (RLS)

All tables have RLS enabled with policies allowing anonymous form submission:

```sql
-- Allow anonymous users to create customers, equipment, and repair jobs
CREATE POLICY "Allow anonymous customer creation" ON customers
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous equipment creation" ON equipment
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous repair job creation" ON repair_jobs
    FOR INSERT TO anon WITH CHECK (true);
```

## API Integration

### Onboarding Endpoint

**URL:** `/api/onboarding`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "p_customer": { /* customer object */ },
  "p_equipment_info": { /* equipment object */ },
  "p_problem_description": "Equipment won't start...",
  "p_service_details": { /* service object */ }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Onboarding form submitted successfully",
  "data": {
    "customer_id": "uuid",
    "equipment_id": "uuid",
    "repair_job_id": "uuid"
  }
}
```

## Frontend Integration

### TypeScript Types

The database types are automatically generated and available in:
- `src/types/database.types.ts`

### Validation Schemas

Zod validation schemas in:
- `src/lib/validations/onboarding.ts`

### Form Components

Multi-step form implementation in:
- `src/components/OnboardingForm.tsx`

## Database Indexes

Performance-optimized indexes on frequently queried fields:

```sql
-- Customer indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_source ON customers(source);

-- Equipment indexes  
CREATE INDEX idx_equipment_customer_id ON equipment(customer_id);
CREATE INDEX idx_equipment_category ON equipment(category);

-- Repair job indexes
CREATE INDEX idx_repair_jobs_customer_id ON repair_jobs(customer_id);
CREATE INDEX idx_repair_jobs_status ON repair_jobs(status);
CREATE INDEX idx_repair_jobs_created_at ON repair_jobs(created_at);
```

## Triggers

Automatic `updated_at` timestamp updates on all tables:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## Migration History

1. **20240628172600_initial_schema.sql** - Initial table creation
2. **20240628172900_create_onboarding_function.sql** - Submit onboarding function
3. **20241228000000_schema_documentation.sql** - Schema alignment and documentation

## Development Guidelines

### Adding New Fields

1. Add field to appropriate table migration
2. Update TypeScript types in `database.types.ts`
3. Update validation schemas in `onboarding.ts`
4. Update form components as needed
5. Test with actual database function

### Modifying Enums

1. Create migration to add enum values
2. Update TypeScript types
3. Update validation schemas
4. Update form options

### Testing

Use the test script:
```bash
node test-onboarding-integration.js
```

## Security Considerations

- RLS policies restrict data access
- Function uses `SECURITY DEFINER` with controlled search path
- Input validation at API and database levels
- Anonymous access limited to form submission only

## Monitoring

- Check advisor notices regularly for security/performance issues
- Monitor logs for function execution errors
- Track form submission success rates 