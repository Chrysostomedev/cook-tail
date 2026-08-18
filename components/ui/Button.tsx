// components/ui/Button.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "font-black uppercase tracking-wider rounded-xs border-2 border-[#0B1B33] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-3 text-sm shadow-[3px_3px_0px_0px_#0B1B33] hover:translate-x-0.5 hover:translate-y-0.5",
    lg: "px-7 py-4 text-base shadow-[5px_5px_0px_0px_#0B1B33] hover:translate-x-1 hover:translate-y-1",
  };

  const variantStyles = {
    primary: "bg-[#FEF08A] text-[#0B1B33] hover:bg-yellow-200",
    secondary: "bg-[#0B1B33] text-white hover:bg-[#1E3A8A]",
    danger: "bg-[#DC2626] text-white hover:bg-red-700",
    ghost: "bg-transparent border-transparent shadow-none hover:bg-black/5",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};