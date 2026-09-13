// components/home/ProgramSlider.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Award, PartyPopper, Utensils } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export const ProgramSlider = () => {
  const { content } = useContent();
  const program = content.program;
  const iconMap = { clock: Clock, utensils: Utensils, award: Award, party: PartyPopper };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((idx) => (idx === 0 ? program.steps.length - 1 : idx - 1));
  const next = () => setCurrentIndex((idx) => (idx === program.steps.length - 1 ? 0 : idx + 1));

  const current = program.steps[currentIndex] || program.steps[0];
  const Icon = iconMap[current.icon];

  return (
    <div className="backdrop-blur-md border border-amber-900/10 p-6 md:p-8 rounded-3xl shadow-xl shadow-amber-950/5 space-y-6" style={{ backgroundColor: 'var(--theme-bgPrimary)' }}>
      <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid rgba(0,0,0,0.1)` }}>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-amber-800/10" style={{ backgroundColor: 'var(--theme-bgSecondary)', color: 'var(--theme-secondary)' }}>
            {program.eyebrow}
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mt-1.5" style={{ color: 'var(--theme-textPrimary)' }}>
            {program.title.replace(program.accent, "")}<span className="font-serif italic" style={{ color: 'var(--theme-secondary)' }}>{program.accent}</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2.5 border-2 rounded-2xl transition-all text-slate-700 active:scale-95 hover:text-white" style={{ backgroundColor: 'var(--theme-bgSecondary)', borderColor: 'var(--theme-secondary)', '--hover-bg': 'var(--theme-secondary)' } as any}
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2.5 border-2 rounded-2xl transition-all text-slate-700 active:scale-95 hover:text-white" style={{ backgroundColor: 'var(--theme-bgSecondary)', borderColor: 'var(--theme-secondary)', '--hover-bg': 'var(--theme-secondary)' } as any}
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
            className="w-full border border-amber-900/10 p-6 rounded-2xl space-y-3 shadow-inner" style={{ backgroundColor: 'var(--theme-bgSecondary)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full shadow-sm text-white" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-bgSecondary)' }}>
                {current.time}
              </span>
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'var(--theme-secondary)', color: 'var(--theme-textPrimary)' }}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>{current.title}</h3>
            <p className="text-xs md:text-sm leading-relaxed font-sans" style={{ color: 'var(--theme-textSecondary)' }}>{current.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 pt-1">
        {program.steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="h-2 rounded-full transition-all duration-300"
            aria-label={`Aller au créneau ${i + 1}`}
            style={i === currentIndex ? { width: '32px', backgroundColor: 'var(--theme-secondary)' } : { width: '8px', backgroundColor: 'var(--theme-secondary)', opacity: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};