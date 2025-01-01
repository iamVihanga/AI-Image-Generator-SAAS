import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
