import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_API_KEY, VITE_SUPABASE_URL } = import.meta.env;
export const supabase = createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_API_KEY
);
