"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  signupSchema,
  type SignupSchemaT,
} from "@/features/authentication/schemas/signup-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GoogleAuthButton } from "./google-auth-button";
import { AppleAuthButton } from "./apple-auth-button";
import { Separator } from "@/components/ui/separator";

type Props = {
  className?: string;
};

export function SignupForm({ className }: Props) {
  const form = useForm<SignupSchemaT>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignupSchemaT) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John R. Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Signup
          </Button>
        </form>
      </Form>

      {/* Option texts */}
      <div className="flex items-center text-center justify-between">
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/login"}>Already have an account ? Sign In</Link>
        </Button>
      </div>

      <Separator />

      {/* Auth Provider Buttons */}
      <div className="flex flex-col space-y-4 mb-5">
        <GoogleAuthButton mode="signup" />
        <AppleAuthButton mode="signup" />
      </div>

      <div className="mb-5">
        <p className="text-sm text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <Link href={"/terms"} className="hover:underline" target="_blank">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"/privacy"} className="hover:underline" target="_blank">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
