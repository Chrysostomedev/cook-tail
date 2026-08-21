// components/cards/MenuItemCard.tsx
"use client";

import React from "react";
import { Utensils, Heart } from "lucide-react";

export interface MenuItemCardProps {
  name: string;
  category: "Entrée" | "Plat" | "Dessert" | "Boisson";
  ingredients: string[];
  isNostalgicFav?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  name,
  category,
  ingredients,
  isNostalgicFav = false,
}) => {
  return (
    <div style={{
      position: "relative",
      backgroundColor: "var(--theme-bgSecondary)",
      color: "var(--theme-textPrimary)",
      borderWidth: "2px",
      borderColor: "var(--theme-borderColor)",
      padding: "1.25rem",
      borderRadius: "8px",
      boxShadow: "4px 4px 0px 0px var(--theme-shadowColor)"
    }}>
      {/* Coin plié rétro */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderTop: "16px solid var(--theme-primary)",
        borderLeft: "16px solid transparent"
      }} />

      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "0.75rem",
        marginBottom: "0.5rem"
      }}>
        <span style={{
          fontSize: "0.625rem",
          fontFamily: "var(--ff-space-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          padding: "0.25rem 0.5rem",
          backgroundColor: "var(--theme-secondary)",
          color: "white",
          borderRadius: "8px",
          fontWeight: 700
        }}>
          {category}
        </span>
        {isNostalgicFav && (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--theme-accent)",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid var(--theme-accent)",
            padding: "0.25rem 0.5rem",
            borderRadius: "9999px"
          }}>
            <Heart className="w-3 h-3" style={{ fill: "var(--theme-accent)" }} />
            Classique Récré
          </span>
        )}
      </div>

      {/* Nom du plat */}
      <h4 style={{
        fontSize: "1rem",
        fontWeight: 700,
        letterSpacing: "0.025em",
        color: "var(--theme-textPrimary)",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <Utensils className="w-4 h-4" style={{ color: "var(--theme-secondary)" }} />
        {name}
      </h4>

      {/* Ingrédients */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.375rem",
        marginTop: "0.75rem"
      }}>
        {ingredients.map((ing, i) => (
          <span
            key={i}
            style={{
              fontSize: "0.75rem",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              border: "1px solid var(--theme-borderColor)",
              padding: "0.25rem 0.5rem",
              borderRadius: "8px",
              color: "var(--theme-textSecondary)"
            }}
          >
            {ing}
          </span>
        ))}
      </div>
    </div>
  );
};