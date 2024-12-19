"use server";

import { createClient } from "@/lib/supabase/server";

import { signupSchema, type SignupSchemaT } from "../schemas/signup-schema";
import { type AuthResponse } from "../types";

/**
 * Signup User - Server Action
 */
export async function signup(formData: SignupSchemaT): Promise<AuthResponse> {
  // Form data validation : (Handelling form validation in server-action because it is more secure)
  const validated = signupSchema.safeParse(formData);

  if (!validated.success) {
    return {
      error: validated.error.message || "Invalid form data",
      success: false,
      data: null,
    };
  }

  // Supabase signup
  const supabase = await createClient();

  const { data: signupData, error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        full_name: validated.data.fullName,
      },
    },
  });

  return {
    error: error?.message || null,
    success: !error,
    data: signupData || null,
  };
}
