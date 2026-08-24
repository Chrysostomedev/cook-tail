"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import { GlassWater, Utensils, PartyPopper, Check, ArrowRight, Sparkles, Loader } from "lucide-react";
import Link from "next/link";
import { VisibilityWrapper } from "@/components/VisibilityWrapper";
import { useServices } from "@/lib/hooks/useServices";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80";

export default function ServicesPage() {
  const { services, loading, error } = useServices();

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
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader className="w-6 h-6 animate-spin" style={{ color: 'var(--theme-secondary)' }} />
              <p className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Chargement des services...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-dashed border-red-200">
            <p className="text-xs font-bold text-red-600">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-600">Les services sont en cours de préparation</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white/90 backdrop-blur-md border rounded-3xl shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ borderColor: 'var(--theme-primary)', boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)` }}
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={srv.image?.url || FALLBACK_IMAGE}
                    alt={srv.name}
                    fill
                    className="object-cover"
                  />
                  {srv.isPopular && (
                    <span className="absolute top-3 right-3 bg-[var(--theme-secondary)] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">
                      ⭐ Populaire
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-extrabold tracking-tight flex items-center gap-1.5" style={{ color: 'var(--theme-textPrimary)' }}>
                      <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-secondary)' }} />
                      {srv.name}
                    </h3>

                    <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-textSecondary)' }}>
                      {srv.description}
                    </p>

                    <div className="p-3 border-2 rounded-2xl font-mono text-xs font-bold" style={{ backgroundColor: `var(--theme-bgSecondary)`, color: 'var(--theme-primary)', borderColor: `var(--theme-primary)` }}>
                      {srv.price.toLocaleString("fr-FR")} FCFA
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
                    className="w-full font-bold py-3.5 rounded-2xl text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    style={{ backgroundColor: 'var(--theme-primary)', color: 'white', boxShadow: `4px 4px 0px 0px var(--theme-secondary)` }}
                  >
                    Demander un Devis <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </VisibilityWrapper>
    </div>
  );
}