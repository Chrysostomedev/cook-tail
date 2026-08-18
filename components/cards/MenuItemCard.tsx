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
    <div className="relative bg-[#1C2826] text-[#F4EBD9] border-2 border-[#0B1B33] p-5 rounded-sm shadow-[4px_4px_0px_0px_#556B2F]">
      {/* Coin plié rétro */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-t-[#0B1B33] border-l-[16px] border-l-transparent" />

      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#556B2F] text-[#F4EBD9] rounded-xs font-bold">
          {category}
        </span>
        {isNostalgicFav && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-yellow-300 bg-yellow-950/60 border border-yellow-500/40 px-2 py-0.5 rounded-full">
            <Heart className="w-3 h-3 fill-yellow-300" />
            Classique Récré
          </span>
        )}
      </div>

      {/* Nom du plat style écriture craie */}
      <h4 className="text-base md:text-lg font-bold tracking-wide text-white mb-2 flex items-center gap-2">
        <Utensils className="w-4 h-4 text-[#8FBC8F] shrink-0" />
        {name}
      </h4>

      {/* Liste des ingrédients sous forme d'étiquettes */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {ingredients.map((ing, i) => (
          <span
            key={i}
            className="text-xs bg-[#0B1B33]/80 border border-white/10 px-2 py-0.5 rounded-xs text-neutral-300"
          >
            {ing}
          </span>
        ))}
      </div>
    </div>
  );
};