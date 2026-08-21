// app/(public)/programme/page.tsx
"use client";

import React from "react";
import { PROGRAMME_DATA } from "@/data/programme";
import { Clock, Camera, Utensils, Trophy, Music, Sparkles, Flame, Bell } from "lucide-react";

export default function ProgrammePage() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Camera": return <Camera className="w-5 h-5 text-amber-900" />;
      case "Utensils": return <Utensils className="w-5 h-5 text-amber-900" />;
      case "Trophy": return <Trophy className="w-5 h-5 text-amber-900" />;
      case "Music": return <Music className="w-5 h-5 text-amber-900" />;
      default: return <Clock className="w-5 h-5 text-amber-900" />;
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Banner En-tête */}
      <div className="text-white p-6 md:p-10 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden animate-fade-in" style={{ backgroundColor: 'var(--theme-primary)' }}>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: 'var(--theme-accent)' }} />
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)', borderColor: 'var(--theme-accent)' }}>
            <Bell className="w-3.5 h-3.5 animate-bounce" /> Emploi du Temps Officiel
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Le Programme de la <span className="font-serif italic" style={{ color: 'var(--theme-accent)' }}>Récré</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
          Quand la cloche sonne, c’est le moment de réjouissance ! Découvrez l'enchaînement exact des cours gourmands et des Olympiades d'enfance.
        </p>
      </div>

      {/* Timeline Chronologique Immersive */}
      <div className="relative border-l-2 ml-4 md:ml-36 space-y-8 pl-6 md:pl-10" style={{ borderColor: 'var(--theme-secondary)' }}>
        {PROGRAMME_DATA.map((item, idx) => (
          <div
            key={item.id || idx}
            className="relative group transition-all duration-300 hover:translate-x-1"
          >
            {/* Badge Horaires Flottant Desktop */}
            <div className="md:absolute md:-left-40 md:top-4 mb-2 md:mb-0">
              <span className="inline-block text-slate-950 font-mono font-black text-xs px-3 py-1.5 rounded-xl shadow-md border-2" style={{ backgroundColor: 'var(--theme-accent)', borderColor: 'var(--theme-accent)' }}>
                {item.time}
              </span>
            </div>

            {/* Pastille de repère sur la ligne */}
            <div className="absolute -left-[31px] top-5 w-4 h-4 rounded-full border-2 border-white ring-4 group-hover:scale-125 transition-transform" style={{ backgroundColor: 'var(--theme-secondary)', borderColor: 'white', boxShadow: `0 0 0 4px var(--theme-secondary)40` }} />

            {/* Carte de Cours / Activité */}
            <div className="bg-white/90 backdrop-blur-md border border-amber-900/10 p-6 rounded-3xl shadow-lg shadow-amber-950/5 hover:shadow-xl transition-all space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-amber-800/10 flex items-center gap-1" style={{ backgroundColor: 'var(--theme-bgSecondary)', color: 'var(--theme-secondary)' }}>
                  <Sparkles className="w-3 h-3" style={{ color: 'var(--theme-secondary)' }} /> {item.category}
                </span>
                <div className="w-10 h-10 border border-amber-200 rounded-2xl flex items-center justify-center shadow-xs" style={{ backgroundColor: 'var(--theme-bgSecondary)', color: 'var(--theme-secondary)' }}>
                  {getIcon(item.iconName)}
                </div>
              </div>

              <h3 className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed font-normal" style={{ color: 'var(--theme-textSecondary)' }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}