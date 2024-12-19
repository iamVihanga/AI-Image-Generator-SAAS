"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

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

import { GoogleAuthButton } from "./google-auth-button";
import { AppleAuthButton } from "./apple-auth-button";
import { Separator } from "@/components/ui/separator";
import { login } from "../actions/login-action";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { redirect } from "next/navigation";

type Props = {
  className?: string;
};

export function LoginForm({ className }: Props) {
  const [isPending, startLoginAction] = useTransition();

  const form = useForm<LoginSchemaT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission action with useTransition
  async function handleFormSubmit(formData: LoginSchemaT) {
    startLoginAction(async () => {
      const loginResponse = await login(formData);

      if (loginResponse.error) {
        toast.error(loginResponse.error);
        return;
      }

      toast.success("Successfully logged in !");
      form.reset();

      redirect("/dashboard");
    });
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    {...field}
                  />
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
                  <PasswordInput
                    disabled={isPending}
                    placeholder="***********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" loading={isPending}>
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
