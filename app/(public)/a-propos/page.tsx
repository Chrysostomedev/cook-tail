// app/(public)/a-propos/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Heart, Trophy, Sparkles, Utensils, GlassWater, BookOpen, GraduationCap, Star } from "lucide-react";
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
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Banner Titre */}
      <div className="bg-[var(--theme-primary)] text-white p-8 md:p-12 border-3 border-black rounded-xs shadow-[10px_10px_0px_0px_var(--theme-secondary)] relative overflow-hidden">
        <span className="text-[10px] font-mono font-bold uppercase bg-[var(--theme-accent)] text-[var(--theme-primary)] px-3 py-1 rounded-xs border border-black">
          Histoire & Vision
        </span>
        <h1 className="text-3xl md:text-5xl font-black uppercase text-[var(--theme-accent)] mt-3">
          Derrière la Cloche de Récréation
        </h1>
        <p className="text-xs md:text-sm font-mono text-gray-300 mt-2 max-w-2xl leading-relaxed">
          Découvrez le parcours de Marie Lorraine Ade, fondatrice de Cook'Tail Service, et la passion qui anime chaque plat et cocktail de nos événements.
        </p>
      </div>

      {/* Profil Fondatrice */}
      <div className="bg-[var(--theme-bgPrimary)] border-3 border-[var(--theme-primary)] p-6 md:p-10 rounded-xs shadow-[10px_10px_0px_0px_var(--theme-primary)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Photo Fondatrice */}
        <div className="md:col-span-5 relative">
          <div className="aspect-4/5 bg-[var(--theme-primary)] border-3 border-black rounded-xs shadow-[8px_8px_0px_0px_var(--theme-secondary)] overflow-hidden relative group">
            <Image
              src="/images/marie-lorraine.jpg"
              alt="Marie Lorraine Ade - Fondatrice Cook'Tail"
              fill
              className="object-cover object-top filter contrast-105 transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-primary)] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono uppercase bg-[var(--theme-accent)] text-[var(--theme-primary)] font-black px-2 py-0.5 border border-black">
                Fondatrice & Chef
              </span>
              <h3 className="text-lg font-black uppercase text-white mt-1">Marie Lorraine Ade</h3>
            </div>
          </div>
        </div>

        {/* Storytelling Text */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--theme-secondary)]">
            <GraduationCap className="w-5 h-5" /> <span>L'Âme Gastronomique de Cook'Tail</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[var(--theme-primary)] uppercase leading-tight">
            "Rendre Hommage à Nos Souvenirs à Travers la Table"
          </h2>

          <p className="text-xs md:text-sm font-mono text-gray-800 leading-relaxed">
            Passionnée par l'art d'accueillir et la richesse du terroir ivoirien, Marie Lorraine Ade a façonné Cook'Tail avec une vision claire : créer des expériences culinaires où la gourmandise se mêle à l'émotion.
          </p>

          <p className="text-xs md:text-sm font-mono text-gray-800 leading-relaxed">
            Pour elle, le brunch ne se limite pas à un repas : c’est une véritable réunion de famille, un retour aux jeux de billes, aux gâteaux à la cuillère et aux rires spontanés de la cour d’école.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 border-t-2 border-dashed border-[var(--theme-primary)]">
            <div className="p-3 bg-white border border-black rounded-xs">
              <span className="text-xl font-black text-[var(--theme-primary)]">5+ Ans</span>
              <span className="text-[10px] font-mono block text-gray-600 uppercase">D'Excellence Service</span>
            </div>
            <div className="p-3 bg-[var(--theme-accent)] border border-black rounded-xs">
              <span className="text-xl font-black text-[var(--theme-primary)]">100%</span>
              <span className="text-[10px] font-mono block text-gray-700 uppercase">Fait Maison & Local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline du Parcours */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[var(--theme-primary)] uppercase text-center flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-[var(--theme-secondary)]" /> Les Grandes Étapes de Cook'Tail
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {etapes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border-3 border-[var(--theme-primary)] p-6 rounded-xs shadow-[6px_6px_0px_0px_var(--theme-primary)] space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black bg-[var(--theme-secondary)] text-white px-2.5 py-1 rounded-xs border border-black">
                    {item.year}
                  </span>
                  <div className="w-10 h-10 bg-[var(--theme-accent)] border border-black rounded-xs flex items-center justify-center text-[var(--theme-primary)]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-black text-[var(--theme-primary)] uppercase">{item.title}</h3>
                <p className="text-xs font-mono text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[var(--theme-accent)] border-3 border-[var(--theme-primary)] p-8 rounded-xs shadow-[8px_8px_0px_0px_var(--theme-primary)] text-center space-y-4">
        <h3 className="text-2xl font-black text-[var(--theme-primary)] uppercase">Envie de Célébrer avec Nous ?</h3>
        <p className="text-xs font-mono text-gray-800 max-w-lg mx-auto">
          Rejoignez-nous lors du prochain Brunch Récréation ou confiez-nous la restauration de votre futur événement.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/reservation"
            className="bg-[var(--theme-primary)] text-white font-black px-6 py-3.5 rounded-xs border-2 border-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--theme-secondary)]"
          >
            Réserver mon Pass Élève
          </Link>
          <Link
            href="/contact"
            className="bg-white text-[var(--theme-primary)] font-black px-6 py-3.5 rounded-xs border-2 border-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--theme-primary)]"
          >
            Demander un Devis Traiteur
          </Link>
        </div>
      </div>
    </div>
  );
}