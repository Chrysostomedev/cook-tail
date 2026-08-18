// components/ui/Badge.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: "kaki" | "blue" | "red" | "yellow";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = "kaki", className }) => {
  const colorStyles = {
    kaki: "bg-[#556B2F] text-white",
    blue: "bg-[#0B1B33] text-white",
    red: "bg-[#DC2626] text-white",
    yellow: "bg-[#FEF08A] text-[#0B1B33]",
  };

  return (
    <span
      className={cn(
        "inline-block font-mono font-black text-[10px] uppercase tracking-widest px-2 py-0.5 border border-black rounded-xs shadow-[2px_2px_0px_0px_#0B1B33]",
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
};