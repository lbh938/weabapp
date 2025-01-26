import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using fallback values.')
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://vfuwqxhldukstzrwfjjf.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdXdxeGhsZHVrc3R6cndmampmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NzgxMzQsImV4cCI6MjA1MjM1NDEzNH0.RZoksEFRT_BmYfu8j0OfG-1WBTCOSTMeodU6cZOBFQo'
) 