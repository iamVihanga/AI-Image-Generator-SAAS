import { z } from "zod";

export const password_regex = new RegExp(
  '^(?=.*d)(?=.*[!@#$%^&*(),.?":{}|<>])(.{6,})$'
);

export const signupSchema = z
  .object({
    fullName: z.string().min(3, {
      message: "Your name must be at least 3 characters long !",
    }),
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
  });

export type SignupSchemaT = z.infer<typeof signupSchema>;
