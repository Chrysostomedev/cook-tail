// components/cards/ActivityCard.tsx
"use client";

import React from "react";
import { Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "relative p-6 rounded-md border-2 border-[#0B1B33] transition-all duration-200",
        "shadow-[4px_4px_0px_0px_#0B1B33] hover:shadow-[7px_7px_0px_0px_#0B1B33] hover:-translate-y-1",
        isEven ? "bg-[#F4EBD9] rotate-[-1deg]" : "bg-white rotate-[1deg]"
      )}
    >
      {/* Ligne Marge Rouge style cahier d'écolier */}
      <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400/40 pointer-events-none" />

      <div className="pl-4">
        {/* En-tête : Badge Horaire & Categorie */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold bg-[#0B1B33] text-[#F4EBD9] px-2 py-1 rounded-xs">
            <Clock className="w-3 h-3" />
            {timeSlot}
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#556B2F] bg-[#556B2F]/10 px-2 py-1 border border-[#556B2F]/30 rounded-xs">
            {category}
          </span>
        </div>

        {/* Titre style raturé/surligné */}
        <h3 className="text-lg md:text-xl font-extrabold text-[#0B1B33] mb-2 leading-tight">
          <span className="bg-[#FEF08A] px-1 py-0.5 rounded-xs box-decoration-clone">
            {title}
          </span>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#0B1B33]/80 leading-relaxed font-sans">
          {description}
        </p>

        {/* Tampon / Badge exclusif si spécifié */}
        {badgeText && (
          <div className="mt-4 pt-3 border-t border-dashed border-[#0B1B33]/20 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-black text-red-600 uppercase tracking-widest border border-red-600 px-2 py-0.5 rounded-xs rotate-[-3deg]">
              <Sparkles className="w-3 h-3" />
              {badgeText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};