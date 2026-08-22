// app/(public)/services/page.tsx
"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { GlassWater, Utensils, PartyPopper, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { VisibilityWrapper } from "@/components/VisibilityWrapper";

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
      <VisibilityWrapper componentId="services.header">
        <div className="text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden" style={{ backgroundColor: 'var(--theme-primary)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: 'var(--theme-secondary)' }} />
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--theme-bgSecondary)', borderColor: 'rgba(255,255,255,0.2)' }}>
          Cook'Tail Service Abidjan
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-3">
          Nos Prestations <span className="font-serif italic" style={{ color: 'var(--theme-bgSecondary)' }}>Sur-Mesure</span>
        </h1>
        <p className="text-xs md:text-sm mt-2 max-w-xl leading-relaxed opacity-90">
          Pour vos réceptions privées, mariages et événements d'entreprise à Abidjan, offrez le savoir-faire Cook'Tail.
        </p>
      </div>
      </VisibilityWrapper>

      {/* Grid Services */}
      <VisibilityWrapper componentId="services.cards">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md border p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300" style={{ borderColor: 'var(--theme-primary)', boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 border-2 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `var(--theme-primary)20`, color: 'var(--theme-primary)', borderColor: `var(--theme-primary)20` }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--theme-bgSecondary)', color: 'var(--theme-primary)' }}>
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>
                  {srv.title}
                </h3>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-textSecondary)' }}>
                  {srv.desc}
                </p>

                <div className="p-3 border-2 rounded-2xl font-mono text-xs font-bold" style={{ backgroundColor: `var(--theme-bgSecondary)`, color: 'var(--theme-primary)', borderColor: `var(--theme-primary)` }}>
                  {srv.price}
                </div>

                <ul className="space-y-2.5 pt-2">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs flex items-start gap-2" style={{ color: 'var(--theme-textSecondary)' }}>
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--theme-secondary)' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="w-full font-bold py-3.5 rounded-2xl text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all" style={{ backgroundColor: 'var(--theme-primary)', color: 'white', boxShadow: `4px 4px 0px 0px var(--theme-secondary)` }}
              >
                Demander un Devis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
        </div>
      </VisibilityWrapper>
    </div>
  );
}