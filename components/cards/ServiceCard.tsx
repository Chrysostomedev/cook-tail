// components/cards/ServiceCard.tsx
"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, badge }) => {
  return (
    <div style={{
      backgroundColor: "var(--theme-bgPrimary)",
      borderColor: "var(--theme-borderColor)",
      borderWidth: "2px",
      padding: "1.25rem",
      borderRadius: "8px",
      boxShadow: "var(--shadow-retro-md)",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }}>
      {badge && (
        <span style={{
          backgroundColor: "var(--theme-accent)",
          color: "white",
          fontFamily: "var(--ff-space-mono)",
          fontWeight: 700,
          fontSize: "0.5625rem",
          textTransform: "uppercase",
          padding: "0.5rem 0.5rem",
          border: "1px solid var(--theme-borderColor)",
          borderRadius: "4px",
          width: "fit-content"
        }}>
          {badge}
        </span>
      )}
      <div style={{
        width: "2.5rem",
        height: "2.5rem",
        backgroundColor: "var(--theme-primary)",
        color: "white",
        border: "1px solid var(--theme-borderColor)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Icon className="w-5 h-5" style={{ color: "var(--theme-secondary)" }} />
      </div>
      <h4 style={{
        fontWeight: 800,
        fontSize: "0.875rem",
        textTransform: "uppercase",
        color: "var(--theme-primary)"
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: "0.75rem",
        fontFamily: "var(--ff-space-mono)",
        color: "var(--theme-textSecondary)",
        lineHeight: 1.5
      }}>
        {description}
      </p>
    </div>
  );
};