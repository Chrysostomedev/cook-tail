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
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80", // Table extérieure / fête
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80", // Ambiance festive
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=80", // Amis / Rires / Brunch
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
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden rounded-3xl my-4 shadow-2xl border border-amber-900/10">
      {/* Slider d'images en arrière-plan */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImg}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGES[currentImg]}')` }}
        />
      </AnimatePresence>

      {/* Overlay dégradé chaleureux pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-slate-950/30 backdrop-blur-[2px]" />

      {/* Flèches du Slider */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-all border border-white/30 hidden sm:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-all border border-white/30 hidden sm:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Contenu Central */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-16 space-y-8">
        
        {/* Badges Élégants */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-400/30 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Événement Exclusif Abidjan
          </span>
          <span className="bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Places Limitées : 30 Élèves
          </span>
        </div>

        {/* Titre Principal & Sous-titre */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase drop-shadow-md leading-tight">
            {EVENT_INFO.title}
          </h1>
          <p className="text-lg sm:text-2xl text-amber-100/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
            "{EVENT_INFO.subtitle}" — Une parenthèse de joie, de retrouvailles et de saveurs gourmandes.
          </p>
        </div>

        {/* Encadré Infos (Date & Lieu) avec Effet Verre (Glassmorphism) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-white/90 text-sm">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center justify-center gap-3 shadow-xl">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-medium">{EVENT_INFO.date}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center justify-center gap-3 shadow-xl">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-medium">{EVENT_INFO.location}</span>
          </div>
        </div>

        {/* Boutons d'Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reservation"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base uppercase px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            Réserver Mon Pass ({formatCFA(EVENT_INFO.price)})
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/programme"
            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white backdrop-blur-md font-semibold text-base uppercase px-8 py-4 rounded-2xl border border-white/30 transition-all flex items-center justify-center"
          >
            Découvrir le Programme
          </Link>
        </div>

        {/* Indicateurs de Slide */}
        <div className="flex justify-center gap-2 pt-6">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentImg ? "w-8 bg-amber-400" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};