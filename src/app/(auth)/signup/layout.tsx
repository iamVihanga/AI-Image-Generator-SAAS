import React from "react";

type Props = { children: React.ReactNode };

export default function SignupLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      {children}
    </div>
  );
}
