// components/home/TestimonialsSlider.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GraduationCap, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export const TestimonialsSlider = () => {
  const reviews = [
    {
      id: 1,
      name: "Marc-Antoine K.",
      promo: "Promo Lycée Classique 2012",
      text: "L'ambiance était tout simplement nostalgique ! Retrouver les jus locaux et les jeux de billes en uniforme kaki... Cook'Tail a fait un travail remarquable.",
      rating: 5,
      avatarBg: "bg-lime-500/20 text-lime-400 border-lime-500/30",
    },
    {
      id: 2,
      name: "Sonia Bley",
      promo: "Ancienne Élève Sainte-Marie",
      text: "Le bar à cocktails signature était au-dessus de mes attentes. Le dress code Bleu & Blanc a redonné une vraie magie au brunch.",
      rating: 5,
      avatarBg: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
    },
    {
      id: 3,
      name: "Franck A.",
      promo: "Promo 2008",
      text: "Organisation au top, la musique Rétro Coupé Décalé nous a rappelés nos meilleures années au collège. À refaire absolument !",
      rating: 5,
      avatarBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
  ];

  const [[currentIndex, direction], setPage] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = (newDirection: number) => {
    setPage(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const current = reviews[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-slate-950 text-white border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl overflow-hidden space-y-6 max-w-3xl mx-auto"
    >
      {/* Halos Lumineux d'Arrière-plan */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête : Titre & Actions */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-lime-500/10 border border-lime-500/20 rounded-2xl text-lime-400 shadow-inner">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-wide uppercase text-slate-100">
              Avis des Anciens Élèves
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">SOUVENIRS & TÉMOIGNAGES</p>
          </div>
        </div>

        {/* Boutons de Navigation (Flèches) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(-1)}
            aria-label="Avis précédent"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Avis suivant"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Zone de Défilement Horizontal */}
      <div className="min-h-[140px] relative z-10 overflow-hidden flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full space-y-4"
          >
            {/* Citation & Note */}
            <div className="flex items-start justify-between gap-4">
              <div className="relative flex-1">
                <Quote className="absolute -top-3 -left-2 w-8 h-8 text-lime-500/15 -z-10 rotate-180" />
                <p className="font-sans text-sm md:text-base text-slate-200 leading-relaxed font-medium pl-2">
                  "{current.text}"
                </p>
              </div>
              <div className="flex gap-1 shrink-0 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Auteur */}
            <div className="flex items-center gap-3 pt-2">
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center font-extrabold text-xs ${current.avatarBg}`}
              >
                {current.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <strong className="block text-xs font-bold text-slate-100 tracking-wide">
                  {current.name}
                </strong>
                <span className="text-[11px] font-mono text-lime-400/90">{current.promo}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateurs (Dots) */}
      <div className="flex items-center justify-center gap-2 pt-2 relative z-10 border-t border-slate-900">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > currentIndex ? 1 : -1])}
            aria-label={`Aller à l'avis ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-lime-400 shadow-sm shadow-lime-400/50" : "w-2 bg-slate-800 hover:bg-slate-700"
              }`}
          />
        ))}
      </div>
    </div>
  );
};