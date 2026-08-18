// components/home/CountdownSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlarmClock, Sparkles } from "lucide-react";

export const CountdownSection = () => {
  // Temps statique pour l'exemple
  const [timeLeft, setTimeLeft] = useState({ jours: 12, heures: 8, minutes: 45, secondes: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secondes > 0) return { ...prev, secondes: prev.secondes - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, secondes: 59 };
        if (prev.heures > 0) return { ...prev, heures: prev.heures - 1, minutes: 59, secondes: 59 };
        if (prev.jours > 0) return { ...prev, jours: prev.jours - 1, heures: 23, minutes: 59, secondes: 59 };
        return prev; // Compte à rebours terminé
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Jours", val: timeLeft.jours },
    { label: "Heures", val: timeLeft.heures },
    { label: "Min", val: timeLeft.minutes },
    { label: "Sec", val: timeLeft.secondes },
  ];

  return (
    <div className="bg-gradient-to-br from-[#FEF08A] to-[#fde047] border-4 border-[#0B1B33] p-6 md:p-8 rounded-xs shadow-inner flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
      
      {/* Icône décorative en arrière-plan */}
      <Clock className="absolute -bottom-6 -right-6 w-32 h-32 text-[#0B1B33] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />

      {/* Section Texte */}
      <div className="space-y-3 text-center lg:text-left relative z-10 max-w-xl">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <AlarmClock className="w-5 h-5 text-[#DC2626] animate-pulse" />
          <span className="text-xs font-mono font-black uppercase bg-[#0B1B33] text-white px-3 py-1 rounded-xs inline-block tracking-wider">
            INSCRIPTIONS • DERNIER APPEL
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#0B1B33] uppercase leading-tight tracking-tight">
          Le Portail Se <span className="text-[#DC2626]">Ferme</span> Bientôt !
        </h2>
        <p className="text-sm md:text-base font-serif italic text-black/80 flex items-center gap-2 justify-center lg:justify-start">
          <Sparkles className="w-4 h-4 text-[#556B2F]" />
          Ne manquez pas la rentrée récréative de l'année.
        </p>
      </div>

      {/* Section Compteur (Style Cartes Flottantes) */}
      <div className="flex gap-2 sm:gap-4 font-mono text-center relative z-10 items-center">
        {timeUnits.map((unit, i) => (
          <React.Fragment key={i}>
            <div className="bg-[#0B1B33] text-white p-3 md:p-4 rounded-xs border-3 border-black min-w-[70px] md:min-w-[85px] shadow-[6px_6px_0px_0px_#0B1B33] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0B1B33] transition-all duration-200 group/card">
              <span className="block text-3xl md:text-4xl font-black text-[#FEF08A] tracking-tighter group-hover/card:scale-105 transition-transform">
                {String(unit.val).padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-xs uppercase font-extrabold text-gray-300 tracking-widest border-t border-white/20 pt-1 mt-1 block">
                {unit.label}
              </span>
            </div>
            
            {/* Séparateur clignotant (exclu après le dernier élément) */}
            {i < timeUnits.length - 1 && (
              <span className="text-3xl font-black text-[#0B1B33] animate-pulse hidden sm:block">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};