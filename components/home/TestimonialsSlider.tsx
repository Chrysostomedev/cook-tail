// components/home/TestimonialsSlider.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GraduationCap, Quote } from "lucide-react";

export const TestimonialsSlider = () => {
  const reviews = [
    {
      name: "Marc-Antoine K.",
      promo: "Promo Lycée Classique 2012",
      text: "L'ambiance était tout simplement nostalgique ! Retrouver les jus locaux et les jeux de billes en uniforme kaki... Cook'Tail a fait un travail remarquable.",
      rating: 5,
    },
    {
      name: "Sonia Bley",
      promo: "Ancienne Élève Sainte-Marie",
      text: "Le bar à cocktails signature était au-dessus de mes attentes. Le dress code Bleu & Blanc a redonné une vraie magie au brunch.",
      rating: 5,
    },
    {
      name: "Franck A.",
      promo: "Promo 2008",
      text: "Organisation au top, la musique Rétro Coupé Décalé nous a rappelés nos meilleures années au collège. À refaire absolument !",
      rating: 5,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const current = reviews[index];

  return (
    <div className="relative bg-slate-950 text-white border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl overflow-hidden space-y-5">
      {/* Halo Décoratif Subtil */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm tracking-wide uppercase text-amber-200">
            Avis des Anciens Élèves
          </h3>
        </div>
        <div className="flex gap-1">
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      <div className="min-h-[110px] flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="relative">
              <Quote className="absolute -top-2 -left-3 w-8 h-8 text-amber-500/10 -z-10 rotate-180" />
              <p className="font-serif italic text-sm md:text-base text-slate-200 leading-relaxed pl-2">
                "{current.text}"
              </p>
            </div>
            <div className="pt-1">
              <strong className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                {current.name}
              </strong>
              <span className="text-[10px] font-mono text-slate-400">{current.promo}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};