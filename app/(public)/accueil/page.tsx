// app/(public)/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, GlassWater, Music, ShieldAlert, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProgramSlider } from "@/components/home/ProgramSlider";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { CountdownSection } from "@/components/home/CountdownSection";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* 1. Hero Section Complète */}
      <HeroSection />

      {/* 2. Compte à Rebours */}
      <CountdownSection />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Cocktails à Volonté",
            icon: GlassWater,
            bgColor: "bg-lime-400/15",
            textColor: "text-lime-700",
            iconBg: "bg-lime-400",
            desc: "Bar à cocktails signature Cook'Tail, jus locaux artisanaux et rafraîchissements d'époque servis en continu.",
            badge: "Gourmand & Frais",
          },
          {
            title: "Mix 2000-2015",
            icon: Music,
            bgColor: "bg-emerald-400/15",
            textColor: "text-emerald-700",
            iconBg: "bg-emerald-400",
            desc: "Un voyage musical rétro rythmé par les meilleurs sons Coupé-Décalé, R&B old school et pépites du lycée.",
            badge: "Nostalgie & Ambiance",
          },
          {
            title: "Dress Code Obligatoire",
            icon: ShieldAlert,
            bgColor: "bg-rose-500/15",
            textColor: "text-rose-600",
            iconBg: "bg-rose-500",
            desc: "Bleu & Blanc pour les filles / Uniforme Kaki pour les garçons. Accessoires de classe fortement conseillés !",
            badge: "Thème Récréation",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/90 backdrop-blur-md border border-slate-200/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50 space-y-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300 overflow-hidden"
          >
            {/* Halo lumineux d'arrière-plan au survol */}
            <div className={`absolute -right-12 -top-12 w-32 h-32 ${item.bgColor} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

            {/* En-tête : Icône + Badge */}
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 ${item.iconBg} text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7" />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${item.bgColor} ${item.textColor}`}>
                {item.badge}
              </span>
            </div>

            {/* Titre & Description */}
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-fuchsia-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Carousel Programme & Témoignages */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProgramSlider />
        </div>
        <div>
          <TestimonialsSlider />
        </div>
      </section>

      <section className="group relative bg-amber-300 border-3 border-[#0B1B33] p-5 sm:p-6 rounded-2xl shadow-[6px_6px_0px_0px_#0B1B33] md:shadow-[8px_8px_0px_0px_#0B1B33] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:shadow-[10px_10px_0px_0px_#0B1B33]">
        {/* Motif rétro/pop en tâche d'arrière-plan */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-rose-400/20 rounded-full blur-xl pointer-events-none" />

        {/* Bloc d'informations */}
        <div className="space-y-2 relative z-10 max-w-2xl">

          <h2 className="text-xl sm:text-2xl font-black text-[#0B1B33] uppercase tracking-tight leading-snug">
            Tenue Uniforme Obligatoire : <span className="underline decoration-rose-500 decoration-4 underline-offset-4">Pas de Blâme !</span>
          </h2>

          <p className="text-xs sm:text-sm font-medium text-[#0B1B33]/90 leading-relaxed">
            <strong className="font-black text-[#0B1B33]">Rappel :</strong> Bleu & Blanc pour les filles, Khaki pour les garçons. Tout contrevenant se verra attribuer 2 heures de colle... directement au Bar à Cocktails ! 🍹
          </p>
        </div>

        {/* Bouton d'action interactif */}
        <Link
          href="/reglement"
          className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#0B1B33] text-white font-black text-xs uppercase px-6 py-3.5 rounded-xl border-2 border-[#0B1B33] shadow-[4px_4px_0px_0px_#rose-500] hover:bg-rose-600 hover:border-rose-600 transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 group/btn"
        >
          <span>Consulter le Règlement Intérieur</span>
          <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </section>
    </div>
  );
}