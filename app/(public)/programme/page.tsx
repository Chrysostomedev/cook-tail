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
      <div className="bg-slate-950 text-white p-6 md:p-10 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden animate-fade-in">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Bell className="w-3.5 h-3.5 animate-bounce" /> Emploi du Temps Officiel
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Le Programme de la <span className="text-amber-400 font-serif italic">Récré</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
          Quand la cloche sonne, c’est le moment de réjouissance ! Découvrez l'enchaînement exact des cours gourmands et des Olympiades d'enfance.
        </p>
      </div>

      {/* Timeline Chronologique Immersive */}
      <div className="relative border-l-2 border-amber-800/20 ml-4 md:ml-36 space-y-8 pl-6 md:pl-10">
        {PROGRAMME_DATA.map((item, idx) => (
          <div
            key={item.id || idx}
            className="relative group transition-all duration-300 hover:translate-x-1"
          >
            {/* Badge Horaires Flottant Desktop */}
            <div className="md:absolute md:-left-40 md:top-4 mb-2 md:mb-0">
              <span className="inline-block bg-amber-500 text-slate-950 font-mono font-black text-xs px-3 py-1.5 rounded-xl shadow-md border border-amber-400">
                {item.time}
              </span>
            </div>

            {/* Pastille de repère sur la ligne */}
            <div className="absolute -left-[31px] top-5 w-4 h-4 bg-amber-600 rounded-full border-2 border-white ring-4 ring-amber-500/20 group-hover:scale-125 transition-transform" />

            {/* Carte de Cours / Activité */}
            <div className="bg-white/90 backdrop-blur-md border border-amber-900/10 p-6 rounded-3xl shadow-lg shadow-amber-950/5 hover:shadow-xl transition-all space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full border border-amber-800/10 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> {item.category}
                </span>
                <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center shadow-xs">
                  {getIcon(item.iconName)}
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}