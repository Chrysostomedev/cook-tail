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
    <div className="p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group" style={{ backgroundColor: 'var(--theme-bgSecondary)' }}>

      {/* Icône décorative en arrière-plan */}
      <Clock className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" style={{ color: 'var(--theme-primary)' }} />

      {/* Section Texte */}
      <div className="space-y-4 text-center lg:text-left relative z-10 max-w-xl">
        <div className="flex items-center gap-2.5 justify-center lg:justify-start">
          <AlarmClock className="w-5 h-5 text-red-600 animate-pulse" style={{ color: 'var(--theme-danger)' }} />
          <span className="text-xs font-mono font-bold uppercase text-white px-3.5 py-1.5 rounded-full inline-block tracking-wider shadow-md" style={{ backgroundColor: 'var(--theme-primary)' }}>
            INSCRIPTIONS • DERNIER APPEL
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase leading-tight tracking-tight" style={{ color: 'var(--theme-primary)' }}>
          Le Portail Se <span style={{ color: 'var(--theme-danger)' }} className="font-extrabold">Ferme</span> Bientôt !
        </h2>
        <p className="text-sm md:text-base font-medium italic flex items-center gap-2 lg:justify-start" style={{ color: 'var(--theme-textSecondary)' }}>
          <Sparkles className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} />
          Ne manquez pas la rentrée récréative de l'année.
        </p>
      </div>

      {/* Section Compteur (Style Cartes Flottantes Modernes) */}
      <div className="flex gap-2 sm:gap-4 font-mono text-center relative z-10 items-center">
        {timeUnits.map((unit, i) => (
          <React.Fragment key={i}>
            <div className="text-white p-3 md:p-4 rounded-2xl min-w-[70px] md:min-w-[85px] shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 group/card" style={{ backgroundColor: 'var(--theme-primary)' }}>
              <span className="block text-3xl md:text-4xl font-extrabold tracking-tighter group-hover/card:scale-105 transition-transform" style={{ color: 'var(--theme-bgSecondary)' }}>
                {String(unit.val).padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-xs uppercase font-extrabold text-gray-300 tracking-widest border-t border-white/10 pt-1.5 mt-1.5 block">
                {unit.label}
              </span>
            </div>

            {/* Séparateur clignotant (exclu après le dernier élément) */}
            {i < timeUnits.length - 1 && (
              <span className="text-3xl font-black animate-pulse hidden sm:block" style={{ color: 'var(--theme-primary)' }}>
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};