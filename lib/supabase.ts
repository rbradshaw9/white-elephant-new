import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Client-side Supabase client (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key (bypasses RLS)
export const getServiceSupabase = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey || serviceRoleKey === 'placeholder-key') {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }
  
  if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
    console.error('NEXT_PUBLIC_SUPABASE_URL is not configured');
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export type RSVP = {
  id: string;
  primary_name: string;
  email: string;
  guest_count: number;
  guest_names: string[];
  elf_names: string[];
  elf_taglines?: string[];
  strategy?: string;
  life_as_gift?: string;
  created_at: string;
};
