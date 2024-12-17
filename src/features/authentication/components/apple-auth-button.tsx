import React from "react";
import { FaApple } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  mode: "login" | "signup";
  className?: string;
};

export function AppleAuthButton({ mode = "login", className }: Props) {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      variant={"outline"}
    >
      <FaApple className="size-3" />
      {mode === "login" ? "Sign in" : "Sign up"} with Apple
    </Button>
  );
}
