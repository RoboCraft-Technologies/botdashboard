import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Runtime warning for development if env vars are missing
  // DO NOT commit secrets into the repo. Use repository secrets (CI) and Vercel env vars (hosting).
  // eslint-disable-next-line no-console
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Set them in repo secrets or host env.');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export default supabase;
