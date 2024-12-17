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
  loginSchema,
  type LoginSchemaT,
} from "@/features/authentication/schemas/login-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GoogleAuthButton } from "./google-auth-button";
import { AppleAuthButton } from "./apple-auth-button";
import { Separator } from "@/components/ui/separator";

type Props = {
  className?: string;
};

export function LoginForm({ className }: Props) {
  const form = useForm<LoginSchemaT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchemaT) {
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>

      {/* Option texts */}
      <div className="flex items-center text-center justify-between">
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/signup"}>Need an account ? Sign Up</Link>
        </Button>
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/reset-password"}>Forgot Password</Link>
        </Button>
      </div>

      <Separator />

      {/* Auth Provider Buttons */}
      <div className="flex flex-col space-y-4">
        <GoogleAuthButton mode="login" />
        <AppleAuthButton mode="login" />
      </div>
    </div>
  );
}
