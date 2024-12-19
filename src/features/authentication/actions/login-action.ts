"use server";

import { createClient } from "@/lib/supabase/server";

import { loginSchema, type LoginSchemaT } from "../schemas/login-schema";
import { type AuthResponse } from "../types";

/**
 * Login User - Server Action
 */
export async function login(formData: LoginSchemaT): Promise<AuthResponse> {
  // Form data validation : (Handelling form validation in server-action because it is more secure)
  const validated = loginSchema.safeParse(formData);

  if (!validated.success) {
    return {
      error: validated.error.message || "Invalid form data",
      success: false,
      data: null,
    };
  }

  // Supabase login
  const supabase = await createClient();

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  // return test successfull response
  return {
    error: error?.message || null,
    success: !error,
    data: signInData,
  };
}
