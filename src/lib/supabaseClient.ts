import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.warn('Supabase URL is missing. Defaulting to placeholder. Check your .env.local file.');
}
if (!supabaseAnonKey) {
  console.warn('Supabase Anon Key is missing. Defaulting to placeholder. Check your .env.local file.');
}

// Provide placeholder values if the actual ones are missing, to avoid crashing the app
// In a real app, you might throw an error or handle this differently based on your needs for client-side/server-side rendering.
const finalSupabaseUrl = supabaseUrl || "https://your-supabase-url.supabase.co";
const finalSupabaseAnonKey = supabaseAnonKey || "your-supabase-anon-key";


export const supabase = createClient(finalSupabaseUrl, finalSupabaseAnonKey);
