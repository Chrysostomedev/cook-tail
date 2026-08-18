// app/(public)/services/page.tsx
"use client";

import React from "react";
import { GlassWater, Utensils, PartyPopper, Check, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Bar Mobile & Cocktails Signature",
      desc: "Bar événementiel nomade avec mixologie locale (Bissap, Gnamakoudji revisités) et barmans en uniforme scolaire rétro.",
      price: "À partir de 150 000 FCFA",
      icon: GlassWater,
      features: [
        "Mixologie sur-mesure & jus locaux",
        "Mise en place du bar complète & verrerie",
        "Barmans qualifiés et animateurs",
        "Options Mocktails (100% Sans Alcool)",
      ],
      tag: "Événementiel",
    },
    {
      title: "Service Traiteur & Buffet Rétro",
      desc: "Buffets thématiques à l'ancienne : Garba royal, Alloco party, grillades en direct et stands de friandises d'enfance.",
      price: "À partir de 5 000 FCFA / pers.",
      icon: Utensils,
      features: [
        "Service à la louche ou dressages épurés",
        "Ateliers culinaires en direct (Live Cooking)",
        "Nappage & vaisselle événementielle",
        "Adapté de 20 à 500 convives",
      ],
      tag: "Gastronomie",
    },
    {
      title: "Organisation Clé en Main & Privatisation",
      desc: "Prise en charge intégrale de vos anniversaires, mariages, galas ou soirées d'entreprise dans l'esprit récréation.",
      price: "Sur Devis Personnalisé",
      icon: PartyPopper,
      features: [
        "Décoration thématique & scénographie",
        "Sonorisation, DJ & éclairage ambiance",
        "Animation jeux rétro & photobooth",
        "Gestion logistique et hôte(sse)s",
      ],
      tag: "Clé en Main",
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* En-tête */}
      <div className="bg-amber-800 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
          Cook'Tail Service Abidjan
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-3">
          Nos Prestations <span className="font-serif italic text-amber-300">Sur-Mesure</span>
        </h1>
        <p className="text-xs md:text-sm text-amber-100 mt-2 max-w-xl leading-relaxed">
          Pour vos réceptions privées, mariages et événements d'entreprise à Abidjan, offrez le savoir-faire Cook'Tail.
        </p>
      </div>

      {/* Grid Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md border border-amber-900/10 p-6 rounded-3xl shadow-lg shadow-amber-950/5 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-800 border border-amber-800/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.desc}
                </p>

                <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-2xl font-mono text-xs font-bold text-amber-900">
                  {srv.price}
                </div>

                <ul className="space-y-2.5 pt-2">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="w-full bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold py-3.5 rounded-2xl text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
              >
                Demander un Devis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}