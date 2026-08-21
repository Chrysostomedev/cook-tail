// components/cards/StatCard.tsx
"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "blue" | "kaki" | "red";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "blue",
}) => {
  const bgStyles =
    variant === "blue"
      ? "bg-[var(--theme-primary)] text-white shadow-[4px_4px_0px_0px_var(--theme-secondary)]"
      : variant === "kaki"
      ? "bg-[var(--theme-secondary)] text-white shadow-[4px_4px_0px_0px_var(--theme-primary)]"
      : "bg-[var(--theme-danger)] text-white shadow-[4px_4px_0px_0px_var(--theme-primary)]";

  return (
    <div className={`p-5 rounded-xs border-2 border-[var(--theme-primary)] ${bgStyles}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
          {title}
        </span>
        <Icon className="w-6 h-6 text-[var(--theme-accent)]" />
      </div>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      {subtitle && (
        <p className="text-[11px] font-mono mt-1 opacity-70">{subtitle}</p>
      )}
    </div>
  );
};