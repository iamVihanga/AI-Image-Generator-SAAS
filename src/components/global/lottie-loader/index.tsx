"use client";

import { useLottie } from "lottie-react";
import * as animationData from "./animationData.json";
import { cn } from "@/lib/utils";

interface LottieLoaderProps {
  className?: string;
}

export const LottieLoader = ({ className }: LottieLoaderProps) => {
  const defaultOptions = {
    animationData: JSON.parse(JSON.stringify(animationData)),
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <div className={cn("", className)}>
      <div className="w-full h-full">{View}</div>
    </div>
  );
};
