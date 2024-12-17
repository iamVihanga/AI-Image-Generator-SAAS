import Image from "next/image";
import React from "react";

import AuthImage from "$/public/AuthBG.jpeg";
import { Logo } from "@/components/global/logo";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="h-screen grid md:grid-cols-4 lg:grid-cols-5 relative">
      <div className="relative hidden md:flex md:col-span-2 lg:col-span-3 w-full flex-col bg-muted p-10 text-primary-foreground">
        <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10" />
        <div className="w-full h-[40%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10" />

        {/* Image Area */}
        <Image
          alt=""
          src={AuthImage}
          fill
          className="w-full h-full object-cover"
        />

        <div className="relative z-20 items-center">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;“Pictoria AI is a game changer for me. I have been able to
              generate high quality professional headshots within minutes. It
              has saved me countless hours of work and cost as well.”&rdquo;
            </p>

            <footer className="text-sm">David S.</footer>
          </blockquote>
        </div>
      </div>
      <ScrollArea className="relative md:col-span-2 lg:col-span-2">
        <div className="py-12 px-8 h-screen flex flex-col items-center justify-center">
          {children}
        </div>
      </ScrollArea>
    </main>
  );
}
