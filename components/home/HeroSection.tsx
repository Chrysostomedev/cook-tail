// components/home/HeroSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

export const HeroSection = () => {
  const { content } = useContent();
  const hero = content?.hero ?? {
    images: [],
    badge: "",
    capacity: "",
    title: EVENT_INFO.title,
    subtitle: EVENT_INFO.subtitle,
    primaryCta: "Réserver Mon Pass",
    secondaryCta: "Programme",
    gamesCta: "Jeux",
  };
  const images = Array.isArray(hero.images) ? hero.images.filter(Boolean) : [];
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    setCurrentImg((current) => Math.min(current, Math.max(images.length - 1, 0)));
    const timer = setInterval(() => {
      if (images.length > 1) setCurrentImg((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => images.length && setCurrentImg((prev) => (prev + 1) % images.length);
  const prevSlide = () => images.length && setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <section className="relative w-full overflow-hidden my-2 md:my-4 rounded-lg md:rounded-2xl shadow-lg border"
      style={{ 
        backgroundColor: "var(--theme-secondary)",
        borderColor: "var(--theme-borderColor)"
      }}>
      
      {/* Slider d'images en arrière-plan */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: images[currentImg] ? `url('${images[currentImg]}')` : undefined }}
        />
      </AnimatePresence>

      {/* Overlay dégradé sombre pour lisibilité */}
      <div 
        className="absolute inset-0 backdrop-blur-xs"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.3))`
        }}
      />

      {/* Flèches du Slider (Desktop) */}
      <button
        onClick={prevSlide}
        aria-label="Image précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-lg text-white transition-all border hidden sm:flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)"
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Image suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-lg text-white transition-all border hidden sm:flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)"
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Contenu Central — Utilise les variables de thème */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-12 md:py-16 lg:py-20 space-y-6 md:space-y-8">

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            {hero.badge}
          </span>
          <span 
            className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider text-white border-2"
            style={{
              backgroundColor: "var(--theme-primary)",
              borderColor: "var(--theme-primary)"
            }}
          >
            {hero.capacity}
          </span>
        </div>

        {/* Titre & Sous-titre */}
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight font-serif">
            {hero.title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
            "{hero.subtitle}"
          </p>
        </div>

        {/* Boutons d'Action — Utilise thème dynamique */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/reservation"
            className="w-full sm:w-auto font-black text-xs sm:text-sm px-6 py-3 sm:py-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 border-2 uppercase tracking-wide text-white"
            style={{
              backgroundColor: "var(--theme-primary)",
              borderColor: "var(--theme-primary)",
              boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 0.3)"
            }}
          >
            {hero.primaryCta} ({formatCFA(EVENT_INFO.price)})
            <span>→</span>
          </Link>

          <Link
            href="/programme"
            className="w-full sm:w-auto font-semibold text-xs sm:text-sm px-6 py-3 sm:py-4 rounded-lg transition-all flex items-center justify-center border-2 backdrop-blur-md text-white"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            {hero.secondaryCta}
          </Link>
           <Link
            href="/jeux"
            className="w-full sm:w-auto font-semibold text-xs sm:text-sm px-6 py-3 sm:py-4 rounded-lg transition-all flex items-center justify-center border-2 backdrop-blur-md text-white"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            {hero.gamesCta}
          </Link>
        </div>

        {/* Indicateurs de Slide */}
        <div className="flex justify-center gap-2 pt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              aria-label={`Aller à l'image ${idx + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === currentImg ? "24px" : "8px",
                height: "6px",
                backgroundColor: idx === currentImg ? "var(--theme-primary)" : "rgba(255, 255, 255, 0.3)"
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};