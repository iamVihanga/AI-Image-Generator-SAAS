import React from "react";

import { Logo } from "@/components/global/logo";
import { LoginForm } from "@/features/authentication/components/login-form";

interface Props {}

export default function LoginPage({}: Props) {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <Logo />
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-3xl font-bold tracking-tight font-heading">
          Welcome Back!
        </h1>
        <p className="text-base text-muted-foreground">
          Sign in to your account
        </p>
      </div>
      <div className="max-w-xl w-[350px] mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
