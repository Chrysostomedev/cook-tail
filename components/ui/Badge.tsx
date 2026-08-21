// components/ui/Badge.tsx
"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success" | "accent";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "primary" }) => {
  const variantColors = {
    primary: { bg: "var(--theme-primary)", text: "white" },
    secondary: { bg: "var(--theme-secondary)", text: "white" },
    danger: { bg: "var(--theme-danger)", text: "white" },
    success: { bg: "var(--theme-success)", text: "white" },
    accent: { bg: "var(--theme-accent)", text: "black" }
  };

  const colors = variantColors[variant];

  return (
    <span style={{
      display: "inline-block",
      fontFamily: "var(--ff-space-mono)",
      fontWeight: 900,
      fontSize: "0.625rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      padding: "0.5rem 0.5rem",
      borderWidth: "1px",
      borderColor: "var(--theme-borderColor)",
      borderRadius: "8px",
      boxShadow: "var(--shadow-retro-sm)",
      backgroundColor: colors.bg,
      color: colors.text
    }}>
      {children}
    </span>
  );
};