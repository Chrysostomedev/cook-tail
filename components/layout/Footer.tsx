// components/sections/Footer.tsx
"use client";

import React from "react";
import { Phone, MapPin, Sparkles, Heart } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full pt-12 pb-8 bg-[#FAF7F2] border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4">

        {/* Carte Principale du Footer */}
        <div className="bg-[#0B1B33] text-[#F4EBD9] rounded-3xl p-8 md:p-10 shadow-xl border border-slate-800 relative overflow-hidden">

          {/* Halo lumineux en arrière-plan */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

            {/* Colonne 1: Marque & Description */}
            <div className="md:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <span>Brunch Récréation</span>
              </div>
              <h4 className="text-xl font-extrabold text-white tracking-tight">
                COOK'TAIL <span className="text-amber-400 font-serif italic font-normal">Service</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-serif italic max-w-sm">
                Une expérience immersive dédiée aux souvenirs d'enfance et aux retrouvailles des années collèges & lycées à Abidjan.
              </p>
            </div>

            {/* Colonne 2: Contacts */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-mono text-[11px] font-bold uppercase text-amber-300 tracking-wider">
                Assistance & Réservations
              </h5>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${EVENT_INFO.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all w-fit"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>WhatsApp : {EVENT_INFO.whatsapp}</span>
                </a>
              </div>
            </div>

            {/* Colonne 3: Localisation */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-mono text-[11px] font-bold uppercase text-amber-300 tracking-wider">
                Lieu & Rentrée
              </h5>
              <div className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {EVENT_INFO.location}
                  <strong className="block text-white font-semibold mt-0.5">Côte d'Ivoire, Abidjan</strong>
                </span>
              </div>
            </div>

          </div>

          {/* Ligne de séparation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400 relative z-10">
            <p>© 2026 Cook'Tail Service. Tous droits réservés.</p>

          </div>

        </div>

      </div>
    </footer>
  );
};