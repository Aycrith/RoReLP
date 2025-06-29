import { z } from 'zod';

// Equipment category validation using actual database enum
export const equipmentCategorySchema = z.enum([
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
])

// Equipment categories derived from the schema
export const EQUIPMENT_CATEGORIES = equipmentCategorySchema.options;

// Contact information schema - matches form field names
export const contactInfoSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address_line1: z.string().min(5, "Address is required"),
  address_line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postal_code: z.string().min(5, "Postal code is required"),
  preferred_contact_method: z.enum(["phone", "email", "text"]).optional(),
  marketing_opt_in: z.boolean().optional().default(false),
})

// Equipment details schema - matches form field names
export const equipmentDetailsSchema = z.object({
  category: equipmentCategorySchema,
  make: z.string().min(1, "Equipment make is required"),
  model: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  serial_number: z.string().optional(),
})

// Problem description schema - matches form field names
export const problemDescriptionSchema = z.object({
  issue_description: z.string().min(10, "Please describe the problem in detail"),
  service_requested: z.string().optional(),
  urgency_level: z.enum(["low", "medium", "high"]).default("medium"),
})

// Service preferences schema - matches form field names
export const servicePreferencesSchema = z.object({
  preferred_drop_off_date: z.string().optional(),
  preferred_time_window: z.enum(["morning", "afternoon", "evening", ""]).optional(),
  preferred_contact_method: z.enum(["phone", "email", "text"]),
})

// Review and terms schema - matches form field names
export const reviewTermsSchema = z.object({
  terms_accepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
  privacy_policy_accepted: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy"
  }),
  marketing_consent: z.boolean().default(false),
})

// Complete onboarding form schema - matches frontend form structure
export const onboardingFormSchema = z.object({
  // Customer information
  customer: contactInfoSchema,
  // Equipment information
  equipment: equipmentDetailsSchema,
  // Problem details
  problem: problemDescriptionSchema,
  // Service preferences
  service: servicePreferencesSchema,
  // Terms and conditions
  terms: reviewTermsSchema,
})

// Individual step schemas for multi-step validation
export const stepSchemas = {
  contact: z.object({ customer: contactInfoSchema }),
  equipment: z.object({ equipment: equipmentDetailsSchema }),
  problem: z.object({ problem: problemDescriptionSchema }),
  service: z.object({ service: servicePreferencesSchema }),
  review: z.object({ terms: reviewTermsSchema }),
} as const

// API request schema that matches what the frontend actually sends
export const onboardingApiSchema = z.object({
  customer: z.object({
    full_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address_line1: z.string(),
    address_line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postal_code: z.string(),
    preferred_contact_method: z.string().optional(),
    marketing_opt_in: z.boolean().optional().default(false),
  }),
  equipment: z.object({
    category: equipmentCategorySchema,
    make: z.string(),
    model: z.string().optional(),
    year: z.number().optional(),
    serial_number: z.string().optional(),
  }),
  problem: z.object({
    issue_description: z.string(),
    service_requested: z.string().optional(),
    urgency_level: z.string().optional(),
  }),
  service: z.object({
    preferred_drop_off_date: z.string().optional(),
    preferred_time_window: z.string().optional(),
    preferred_contact_method: z.string(),
  }),
  terms: z.object({
    terms_accepted: z.boolean(),
    privacy_policy_accepted: z.boolean(),
    marketing_consent: z.boolean().default(false),
  }),
})

// Type exports
export type ContactInfo = z.infer<typeof contactInfoSchema>
export type EquipmentDetails = z.infer<typeof equipmentDetailsSchema>
export type ProblemDescription = z.infer<typeof problemDescriptionSchema>
export type ServicePreferences = z.infer<typeof servicePreferencesSchema>
export type ReviewTerms = z.infer<typeof reviewTermsSchema>
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>
export type OnboardingApiRequest = z.infer<typeof onboardingApiSchema>
