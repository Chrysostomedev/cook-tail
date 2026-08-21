// components/ui/Input.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {label && (
        <label style={{
          fontSize: "0.75rem",
          fontFamily: "var(--ff-space-mono)",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--theme-textPrimary)"
        }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: "100%",
          padding: "0.75rem 0.75rem",
          backgroundColor: "var(--theme-bgSecondary)",
          borderWidth: "2px",
          borderColor: "var(--theme-borderColor)",
          borderRadius: "8px",
          fontFamily: "var(--ff-space-mono)",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--theme-textPrimary)",
          transition: "all 200ms ease-out"
        }}
        onFocus={(e) => {
          e.currentTarget.style.backgroundColor = "var(--theme-bgPrimary)";
          e.currentTarget.style.borderColor = "var(--theme-primary)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(236, 72, 153, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.backgroundColor = "var(--theme-bgSecondary)";
          e.currentTarget.style.borderColor = "var(--theme-borderColor)";
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />
    </div>
  );
};