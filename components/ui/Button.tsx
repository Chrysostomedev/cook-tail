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
    "font-extrabold uppercase tracking-wider rounded-lg border-2 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 duration-200 ease-out";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-3 text-sm shadow-retro-md hover:translate-x-0.5 hover:translate-y-0.5",
    lg: "px-7 py-4 text-base shadow-retro-lg hover:translate-x-1 hover:translate-y-1",
  };

  const variantStyles = {
    primary: "text-white border-2 hover:opacity-90",
    secondary: "text-white border-2 hover:opacity-90",
    danger: "text-white border-2 shadow-retro-md hover:opacity-90",
    ghost: "bg-transparent border-transparent shadow-none hover:opacity-70",
  };

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    primary: {
      backgroundColor: "var(--theme-primary)",
      borderColor: "var(--theme-primary)",
    },
    secondary: {
      backgroundColor: "var(--theme-secondary)",
      borderColor: "var(--theme-secondary)",
    },
    danger: {
      backgroundColor: "var(--theme-danger)",
      borderColor: "var(--theme-danger)",
    },
    ghost: {
      color: "var(--theme-textPrimary)",
    },
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      style={dynamicStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
};