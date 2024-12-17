import React from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  mode: "login" | "signup";
  className?: string;
};

export function GoogleAuthButton({ mode = "login", className }: Props) {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      variant={"outline"}
    >
      <FcGoogle className="size-3" />
      {mode === "login" ? "Sign in" : "Sign up"} with Google
    </Button>
  );
}
