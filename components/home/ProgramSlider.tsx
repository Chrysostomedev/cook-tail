// components/home/ProgramSlider.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Award, PartyPopper, Utensils } from "lucide-react";

export const ProgramSlider = () => {
  const steps = [
    {
      time: "12H00 - 13H30",
      title: "Rassemblement & Appel des Élèves",
      desc: "Accueil au portail, remise des badges de classe, mocktail de bienvenue et photo de classe d'époque.",
      icon: Clock,
      badge: "Accent Ambré",
    },
    {
      time: "13H30 - 15H30",
      title: "Buffet Récréation & Service Cook'Tail",
      desc: "Dégustation gastronomique rétro, grillades, amuse-bouches d'enfance et bar à cocktails signatures à volonté.",
      icon: Utensils,
      badge: "Gourmand",
    },
    {
      time: "15H30 - 17H30",
      title: "Jeux de Cour & Olympiades Rétro",
      desc: "Concours de Marelle, Ludo, Baoulé, Quiz de culture générale 2000s et remise du Prix du Major de Promotion.",
      icon: Award,
      badge: "Compétition",
    },
    {
      time: "17H30 - 20H00",
      title: "La Grande Boum de Fin d'Année",
      desc: "Piste de danse enflammée par DJ Mix Coupé-Décalé Rétro, Zoblazo & R&B old school. Ambiance garantie !",
      icon: PartyPopper,
      badge: "Soirée",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((idx) => (idx === 0 ? steps.length - 1 : idx - 1));
  const next = () => setCurrentIndex((idx) => (idx === steps.length - 1 ? 0 : idx + 1));

  const current = steps[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-amber-900/10 p-6 md:p-8 rounded-3xl shadow-xl shadow-amber-950/5 space-y-6">
      <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-800/10">
            Emploi du Temps
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Déroulement de la <span className="text-amber-700 font-serif italic">Journée</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2.5 bg-amber-50/50 border border-amber-900/10 rounded-2xl hover:bg-amber-500 hover:text-white transition-all text-slate-700 active:scale-95"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2.5 bg-amber-50/50 border border-amber-900/10 rounded-2xl hover:bg-amber-500 hover:text-white transition-all text-slate-700 active:scale-95"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full border border-amber-900/10 p-6 rounded-2xl bg-[#FAF7F2] space-y-3 shadow-inner"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-slate-900 text-amber-300 rounded-full shadow-sm">
                {current.time}
              </span>
              <div className="p-2 bg-amber-500/10 text-amber-800 rounded-xl">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">{current.title}</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">{current.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 pt-1">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-8 bg-amber-600" : "w-2 bg-amber-900/20 hover:bg-amber-900/40"
            }`}
            aria-label={`Aller au créneau ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};