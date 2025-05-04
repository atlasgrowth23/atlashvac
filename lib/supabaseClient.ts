import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check CodeSandbox Secrets.");
  // Optionally provide non-functional defaults to avoid hard crash during build/dev startup
  // throw new Error("Supabase URL or Anon Key is missing from environment variables.");
}

// Initialize client - use || operator for fallback ONLY if keys might be temporarily missing
// Ensure Secrets ARE set in CodeSandbox UI for actual operation!
export const supabase = createClient(
    supabaseUrl || "http://invalid.url", // Provide invalid fallback
    supabaseAnonKey || "invalid.key"     // Provide invalid fallback
);

// console.log("Supabase client potentially initialized."); // Optional debug log
