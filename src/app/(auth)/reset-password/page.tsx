import React from "react";

import { Logo } from "@/components/global/logo";
import { ResetPasswordForm } from "@/features/authentication/components/reset-password-form";

interface Props {}

export default function ForgotPasswordPage({}: Props) {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <Logo />
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-heading">
          Forgot your Password ?
        </h1>
        <p className="text-base text-muted-foreground">
          Enter your email to reset your password
        </p>
      </div>
      <div className="max-w-xl w-[350px] mx-auto">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
