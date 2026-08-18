// components/ui/Input.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33]">{label}</label>}
      <input
        className={cn(
          "w-full px-3 py-2.5 bg-white border-2 border-[#0B1B33] rounded-xs font-mono text-xs font-bold text-[#0B1B33] focus:bg-[#FEF08A]/20 focus:outline-hidden",
          className
        )}
        {...props}
      />
    </div>
  );
};