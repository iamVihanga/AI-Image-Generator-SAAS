"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { logout } from "../actions/logout-action";
import { toast } from "sonner";

type Props = {
  className?: string;
  isIcon?: boolean;
};

export function LogoutButton({ className, isIcon }: Props) {
  const [isPending, startLogoutAction] = useTransition();

  async function handleLogout() {
    startLogoutAction(async () => {
      await logout();
      toast.success("Successfully logged out !");
    });
  }

  return (
    <Button
      size={isIcon ? "icon" : "default"}
      onClick={handleLogout}
      loading={isPending}
      className={className}
    >
      Logout
    </Button>
  );
}
