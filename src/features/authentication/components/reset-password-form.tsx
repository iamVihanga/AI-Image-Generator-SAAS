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
  type ResetPasswordSchemaT,
  resetPasswordSchema,
} from "@/features/authentication/schemas/reset-password-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

type Props = {
  className?: string;
};

export function ResetPasswordForm({ className }: Props) {
  const form = useForm<ResetPasswordSchemaT>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ResetPasswordSchemaT) {
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
          <Button type="submit" className="w-full">
            Send password reset link
          </Button>
        </form>
      </Form>

      <Separator />

      {/* Option texts */}
      <div className="flex items-center text-center justify-between">
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/login"}>
            <ArrowLeft className="size-3" /> Back to Login
          </Link>
        </Button>
      </div>
    </div>
  );
}
