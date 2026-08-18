// app/(public)/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { GlassWater, Music, ShieldAlert } from "lucide-react";
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
      color: "bg-[#FEF08A]",
      desc: "Bar à cocktails signature Cook'Tail, jus locaux artisanaux et rafraîchissements d'époque servis en continu.",
    },
    {
      title: "Mix 2000-2015",
      icon: Music,
      color: "bg-[#8FBC8F]",
      desc: "Un voyage musical rétro rythmé par les meilleurs sons Coupé-Décalé, R&B old school et pépites du lycée.",
    },
    {
      title: "Dress Code Obligatoire",
      icon: ShieldAlert,
      color: "bg-[#DC2626]",
      desc: "Blue & Blanc pour les filles / Uniforme Kaki pour les garçons. Accessoires de classe fortement conseillés !",
    },
  ].map((item, index) => (
    <div
      key={index}
      className="bg-[#F4EBD9] border-3 border-[#0B1B33] p-6 rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] space-y-4 hover:-translate-y-1.5 transition-transform"
    >
      <div className={`w-14 h-14 ${item.color} border-2 border-black rounded-xs flex items-center justify-center font-black text-[#0B1B33] shadow-[4px_4px_0px_0px_#0B1B33]`}>
        <item.icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-black uppercase text-[#0B1B33] tracking-tight">{item.title}</h3>
      <p className="text-sm font-mono text-gray-800 leading-relaxed">
        {item.desc}
      </p>
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

      {/* Banner Dresscode Info */}
      <section className="bg-[#FEF08A] border-3 border-[#0B1B33] p-6 rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-extrabold uppercase bg-[#0B1B33] text-white px-2 py-0.5 rounded-xs">
            Avertissement du Conseiller d'Éducation
          </span>
          <h2 className="text-xl font-black text-[#0B1B33] uppercase">
            Tenue Réglementaire Exigée à l'Entrée
          </h2>
          <p className="text-xs font-serif italic text-black/80">
            Tout élève ne respectant pas le dresscode se verra attribuer une heure de colle dans l'ambiance !
          </p>
        </div>
        <Link
          href="/reglement"
          className="shrink-0 bg-[#0B1B33] text-white font-black text-xs uppercase px-6 py-3 rounded-xs border-2 border-black shadow-[3px_3px_0px_0px_#556B2F] hover:bg-[#1E3A8A]"
        >
          Consulter le Règlement
        </Link>
      </section>
    </div>
  );
}