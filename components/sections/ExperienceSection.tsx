// components/sections/ExperienceSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { PolaroidFrame } from "@/components/ui/PolaroidFrame";

const EXPERIENCE_PHOTOS = [
  {
    caption: "Tenues réglementaires & nostalgie !",
    rotation: "left" as const,
    bgGradient: "from-blue-600 to-indigo-900",
    tag: "Dress Code",
  },
  {
    caption: "Buffet gastronomique Cook'Tail",
    rotation: "right" as const,
    bgGradient: "from-amber-700 to-yellow-900",
    tag: "Gourmandise",
  },
  {
    caption: "Jeux de cour de récréation 2000s",
    rotation: "left" as const,
    bgGradient: "from-emerald-700 to-teal-900",
    tag: "Animations",
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[var(--theme-bgPrimary)] text-[var(--theme-primary)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Titre de Section Style Cahier */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--theme-secondary)] bg-[var(--theme-secondary)]/15 px-3 py-1 rounded-xs border border-[var(--theme-secondary)]/30">
            L'Atmosphère Unique
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-[var(--theme-primary)]">
            Une journée d'exception hors du temps
          </h2>
          <p className="mt-3 text-base md:text-lg font-serif italic text-[var(--theme-primary)]/80 max-w-2xl mx-auto">
            Revivez les blagues de comptoir, le goût de la cantine revisitée et les tubes de notre adolescence.
          </p>
        </div>

        {/* Grille de Polaroids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {EXPERIENCE_PHOTOS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <PolaroidFrame caption={item.caption} rotation={item.rotation}>
                <div className={`w-full h-full bg-gradient-to-br ${item.bgGradient} flex flex-col items-center justify-center p-6 text-white text-center relative`}>
                  <span className="absolute top-2 right-2 bg-black/40 text-[10px] font-mono px-2 py-0.5 rounded-xs border border-white/20 uppercase">
                    {item.tag}
                  </span>
                  <p className="font-extrabold text-xl tracking-tight leading-snug">
                    {item.caption}
                  </p>
                </div>
              </PolaroidFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};