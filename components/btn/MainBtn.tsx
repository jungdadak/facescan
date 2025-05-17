"use client";

import React from "react";

import { cn } from "@/lib/cnUtil";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function MainBtn({ children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(
        `mx-auto mt-20 flex h-[50px] w-[304px] cursor-pointer items-center justify-center gap-2 rounded-4xl bg-[#8D56FF]/80 px-8 py-4 hover:bg-[#8D56FF]`,
        className,
      )}
      {...props}
    >
      <span
        className={"tracking-0 text-center text-lg leading-none font-semibold"}
      >
        {children}
      </span>
    </button>
  );
}
