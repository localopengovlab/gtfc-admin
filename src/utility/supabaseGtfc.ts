import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL_GTFC;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY_GTFC;

export const supabaseGtfc = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
