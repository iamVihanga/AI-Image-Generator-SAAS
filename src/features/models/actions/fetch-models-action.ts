"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchModels() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      data: null,
      success: false,
      error: authError?.message || "User not found",
      count: 0,
    };
  }

  // Fetch models
  const { data, error, count } = await supabase
    .from("models")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return {
    data: data ?? null,
    count: count || 0,
    success: !error,
    error: error?.message || null,
  };
}
