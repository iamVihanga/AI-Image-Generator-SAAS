import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

type Props = { className?: string };

export function Logo({ className }: Props) {
  return (
    <Link
      href={"/"}
      className={`flex items-center gap-2 text-foreground w-fit ${className}`}
    >
      <Sparkles className="size-8" strokeWidth={1.5} />
      <span className="text-lg font-semibold">Pictoria AI</span>
    </Link>
  );
}
