// components/ui/CountdownBadge.tsx
"use client";

import React from "react";
import { Flame, Sparkles } from "lucide-react";

interface CountdownBadgeProps {
  remainingSpots: number;
  maxCapacity: number;
}

export const CountdownBadge: React.FC<CountdownBadgeProps> = ({
  remainingSpots,
  maxCapacity,
}) => {
  const percentage = Math.min(
    100,
    Math.max(0, Math.round(((maxCapacity - remainingSpots) / maxCapacity) * 100))
  );

  return (
    <div className="bg-white/80 backdrop-blur-md border border-amber-900/10 p-4 rounded-2xl shadow-lg shadow-amber-950/5 max-w-xs transition-all">
      <div className="flex items-center justify-between mb-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
          <Flame className="w-4 h-4 text-amber-600 fill-amber-500/20" />
          Remplissage
        </span>
        <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          {remainingSpots} places dispo
        </span>
      </div>

      {/* Barre de Progression Épurée */}
      <div className="w-full bg-amber-950/5 h-2.5 rounded-full p-0.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-700 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2.5 text-[10px] font-medium text-slate-500 text-center flex items-center justify-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-600" />
        Fermeture automatique dès épuisement du quota
      </p>
    </div>
  );
};