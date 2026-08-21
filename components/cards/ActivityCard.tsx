// components/cards/ActivityCard.tsx
"use client";

import React from "react";
import { Sparkles, Clock } from "lucide-react";

export interface ActivityCardProps {
  title: string;
  category: string;
  timeSlot: string;
  description: string;
  badgeText?: string;
  index: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  category,
  timeSlot,
  description,
  badgeText,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div style={{
      position: "relative",
      padding: "1.5rem",
      borderRadius: "8px",
      borderWidth: "2px",
      backgroundColor: isEven ? "var(--theme-bgPrimary)" : "var(--theme-bgSecondary)",
      borderColor: "var(--theme-borderColor)",
      transition: "all 200ms ease-out",
      boxShadow: "var(--shadow-retro-md)",
      transform: isEven ? "rotate(-1deg)" : "rotate(1deg)",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "var(--shadow-retro-lg)";
      e.currentTarget.style.transform = isEven ? "rotate(-1deg) translateY(-4px)" : "rotate(1deg) translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "var(--shadow-retro-md)";
      e.currentTarget.style.transform = isEven ? "rotate(-1deg)" : "rotate(1deg)";
    }}>
      {/* Ligne Marge style cahier */}
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "1.5rem",
        width: "2px",
        backgroundColor: "var(--theme-danger)",
        opacity: 0.4,
        pointerEvents: "none"
      }} />

      <div style={{ paddingLeft: "1rem" }}>
        {/* En-tête : Horaire & Catégorie */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          marginBottom: "0.75rem"
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.75rem",
            fontFamily: "var(--ff-space-mono)",
            fontWeight: 700,
            backgroundColor: "var(--theme-primary)",
            color: "white",
            padding: "0.5rem",
            borderRadius: "8px"
          }}>
            <Clock className="w-3 h-3" />
            {timeSlot}
          </span>
          <span style={{
            fontSize: "0.75rem",
            fontFamily: "var(--ff-space-mono)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--theme-secondary)",
            backgroundColor: "rgba(74, 222, 128, 0.1)",
            padding: "0.25rem 0.5rem",
            borderRadius: "8px",
            border: "1px solid var(--theme-secondary)"
          }}>
            {category}
          </span>
        </div>

        {/* Titre */}
        <h3 style={{
          fontSize: "1.125rem",
          fontWeight: 800,
          color: "var(--theme-primary)",
          marginBottom: "0.5rem",
          lineHeight: 1.2,
          backgroundColor: "var(--theme-accent)",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          display: "inline-block",
          boxDecorationBreak: "clone"
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "0.875rem",
          color: "var(--theme-textPrimary)",
          opacity: 0.8,
          lineHeight: 1.5,
          marginTop: "0.5rem"
        }}>
          {description}
        </p>

        {/* Badge exclusif */}
        {badgeText && (
          <div style={{
            marginTop: "1rem",
            paddingTop: "0.75rem",
            borderTop: "1px dashed var(--theme-borderColor)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.75rem",
              fontWeight: 900,
              color: "var(--theme-danger)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              border: "1px solid var(--theme-danger)",
              padding: "0.25rem 0.5rem",
              borderRadius: "8px",
              transform: "rotate(-3deg)"
            }}>
              <Sparkles className="w-3 h-3" />
              {badgeText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};