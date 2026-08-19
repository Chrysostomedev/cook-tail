// components/home/HeroSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA } from "@/lib/utils";

// Images d'ambiance chaleureuse & rétro
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=80",
];

export const HeroSection = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevSlide = () => setCurrentImg((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));

  return (
    <section className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl my-2 md:my-4 shadow-xl border border-white/10 bg-slate-950">
      {/* Slider d'images en arrière-plan */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGES[currentImg]}')` }}
        />
      </AnimatePresence>

      {/* Overlay dégradé sombre pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 backdrop-blur-[1px]" />

      {/* Flèches du Slider (Desktop) */}
      <button
        onClick={prevSlide}
        aria-label="Image précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/40 text-white backdrop-blur-md hover:bg-slate-900/60 transition-all border border-white/20 hidden sm:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Image suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/40 text-white backdrop-blur-md hover:bg-slate-900/60 transition-all border border-white/20 hidden sm:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Contenu Central Épuré */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-8 sm:py-12 md:py-16 space-y-5 md:space-y-6">

        {/* Badges Élégants et Compacts */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-300 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-amber-400/20">

            Événement Exclusif Abidjan
          </span>
          <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider">
            30 Places Uniquement
          </span>
        </div>

        {/* Titre Principal & Sous-titre */}
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            {EVENT_INFO.title}
          </h1>
          <p className="text-sm sm:text-lg text-slate-200/90 font-serif italic max-w-xl mx-auto leading-relaxed">
            "{EVENT_INFO.subtitle}"
          </p>
        </div>

        {/* Encadré Infos (Date & Lieu) - Format Compact */}
        {/* <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto text-xs sm:text-sm text-slate-200">
          <div className="bg-white/10 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/15 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium truncate">{EVENT_INFO.date}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/15 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium truncate">{EVENT_INFO.location}</span>
          </div>
        </div> */}

        {/* Boutons d'Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
          <Link
            href="/reservation"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Réserver Mon Pass ({formatCFA(EVENT_INFO.price)})
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/programme"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center active:scale-95"
          >
            Programme
          </Link>
        </div>

        {/* Indicateurs de Slide */}
        <div className="flex justify-center gap-1.5 pt-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              aria-label={`Aller à l'image ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImg ? "w-6 bg-amber-400" : "w-1.5 bg-white/30"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};