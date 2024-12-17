import { z } from "zod";

import { password_regex } from "./signup-schema";

export const resetPasswordSchema = z.union([
  z.object({
    mode: z.literal("initiate"),
    email: z.string().email({
      message: "Please enter a valid email address !",
    }),
  }),
  z
    .object({
      mode: z.literal("update"),
      email: z.string().email({
        message: "Please enter a valid email address !",
      }),
      password: z
        .string({ required_error: "Password is required !" })
        .min(6, {
          message: "Password must be at least 6 characters long !",
        })
        .regex(password_regex, {
          message:
            "Password must contain at least one number & special character !",
        }),
      confirmPassword: z.string({
        required_error: "Confirm password is required !",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match !",
      path: ["confirmPassword"],
    }),
]);

export type ResetPasswordSchemaT = z.infer<typeof resetPasswordSchema>;
