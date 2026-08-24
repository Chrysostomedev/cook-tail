// app/(public)/a-propos/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Heart, Trophy, Sparkles, GlassWater, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function AProposPage() {
  const etapes = [
    {
      year: "2018 - 2020",
      title: "La Passion Culinaire & Les Débuts",
      desc: "Autodidacte passionnée de gastronomie ivoirienne et de mixologie, Marie Lorraine Ade commence à orchestrer des réceptions privées pour son cercle d'amis à Abidjan.",
      icon: Heart,
    },
    {
      year: "2021",
      title: "Création de Cook'Tail Service",
      desc: "Lancement officiel de Cook'Tail : une marque née de l'alliance audacieuse entre le savoir-faire traiteur traditionnel et l'art des cocktails locaux revisités (Bissap infusé, Gnamakoudji au miel).",
      icon: GlassWater,
    },
    {
      year: "2023",
      title: "L'Expansion Événementielle",
      desc: "Cook'Tail devient une référence pour les mariages VIP, galas et banquets d'entreprises en Côte d'Ivoire, réputé pour son service chaleureux et son esthétique épurée.",
      icon: Trophy,
    },
    {
      year: "2026",
      title: "Le Concept 'Brunch Récréation'",
      desc: "Marie Lorraine lance le concept événementiel immersif 'Récréation' : un brunch nostalgique célébrant la cuisine de rue ivoirienne et les souvenirs d'enfance de notre génération.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-14">
      {/* Banner Titre */}
      <div
        className="text-white p-8 md:p-14 rounded-[2rem] shadow-2xl relative overflow-hidden"
        style={{ backgroundColor: 'var(--theme-primary)' }}
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ backgroundColor: 'var(--theme-secondary)' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />

        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border relative z-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--theme-accent)', borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <Sparkles className="w-3.5 h-3.5" /> Histoire & Vision
        </span>

        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mt-4 relative z-10">
          Derrière la <span className="font-serif italic" style={{ color: 'var(--theme-accent)' }}>Cloche</span> de Récréation
        </h1>

        <p className="text-xs md:text-sm text-white/80 mt-3 max-w-2xl leading-relaxed relative z-10">
          Découvrez le parcours de Marie Lorraine Ade, fondatrice de Cook'Tail Service, et la passion qui anime chaque plat et cocktail de nos événements.
        </p>
      </div>

      {/* Profil Fondatrice */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
        {/* Photo Fondatrice */}
        <div className="md:col-span-5">
          <div className="aspect-4/5 rounded-3xl overflow-hidden relative shadow-lg group">
            <Image
              src="/img/lolo.jpeg"
              alt="Marie Lorraine Ade - Fondatrice Cook'Tail"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span
                className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' }}
              >
                Fondatrice & Chef
              </span>
              <h3 className="text-xl font-extrabold mt-2 tracking-tight">Marie Lorraine Ade</h3>
            </div>
          </div>
        </div>

        {/* Storytelling Text */}
        <div className="md:col-span-7 space-y-5">
          <div
            className="inline-flex items-center gap-2 text-xs font-mono font-bold"
            style={{ color: 'var(--theme-secondary)' }}
          >
            <GraduationCap className="w-4.5 h-4.5" /> <span>L'Âme Gastronomique de Cook'Tail</span>
          </div>

          <h2
            className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight"
            style={{ color: 'var(--theme-primary)' }}
          >
            « Rendre Hommage à Nos Souvenirs à Travers la Table »
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Passionnée par l'art d'accueillir et la richesse du terroir ivoirien, Marie Lorraine Ade a façonné Cook'Tail avec une vision claire : créer des expériences culinaires où la gourmandise se mêle à l'émotion.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            Pour elle, le brunch ne se limite pas à un repas : c'est une véritable réunion de famille, un retour aux jeux de billes, aux gâteaux à la cuillère et aux rires spontanés de la cour d'école.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-2xl font-extrabold block" style={{ color: 'var(--theme-primary)' }}>5+ Ans</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">D'Excellence Service</span>
            </div>
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--theme-accent)' }}>
              <span className="text-2xl font-extrabold block" style={{ color: 'var(--theme-primary)' }}>100%</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--theme-primary)', opacity: 0.8 }}>
                Fait Maison & Local
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline du Parcours */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2
            className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2.5"
            style={{ color: 'var(--theme-primary)' }}
          >
            <BookOpen className="w-6 h-6" style={{ color: 'var(--theme-secondary)' }} />
            Les Grandes Étapes de Cook'Tail
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {etapes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 md:p-7 space-y-4 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono font-bold text-white px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--theme-secondary)' }}
                  >
                    {item.year}
                  </span>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--theme-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="rounded-[2rem] p-8 md:p-12 text-center space-y-5 relative overflow-hidden"
        style={{ backgroundColor: 'var(--theme-accent)' }}
      >
        <div
          className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        />
        <h3
          className="text-2xl md:text-3xl font-extrabold tracking-tight relative z-10"
          style={{ color: 'var(--theme-primary)' }}
        >
          Envie de Célébrer avec Nous ?
        </h3>
        <p className="text-xs md:text-sm max-w-lg mx-auto relative z-10" style={{ color: 'var(--theme-primary)', opacity: 0.75 }}>
          Rejoignez-nous lors du prochain Brunch Récréation ou confiez-nous la restauration de votre futur événement.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
          <Link
            href="/reservation"
            className="text-white font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Réserver mon Pass Élève
          </Link>
          <Link
            href="/contact"
            className="bg-white font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ color: 'var(--theme-primary)' }}
          >
            Demander un Devis Traiteur
          </Link>
        </div>
      </div>
    </div>
  );
}