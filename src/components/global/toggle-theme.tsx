"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
  };

  return (
    <Button
      onClick={handleToggle}
      className="w-full"
      size={"sm"}
      variant={"secondary"}
    >
      {theme !== "light" ? (
        <>
          <Sun size={24} />
          <span>Switch to Light</span>
        </>
      ) : (
        <>
          <Moon size={24} />
          <span>Switch to Dark</span>
        </>
      )}
    </Button>
  );
}
