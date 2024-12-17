import React from "react";
import { FaDiscord } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  mode: "login" | "signup";
  className?: string;
};

export function DiscordAuthButton({ mode = "login", className }: Props) {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      variant={"outline"}
    >
      <FaDiscord className="size-3" />
      {mode === "login" ? "Sign in" : "Sign up"} with Discord
    </Button>
  );
}
