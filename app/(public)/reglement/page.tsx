// app/(public)/reglement/page.tsx
"use client";

import React from "react";
import {
  ShieldCheck,
  Shirt,
  Clock,
  HeartHandshake,
  QrCode,
  AlertCircle
} from "lucide-react";

export default function ReglementPage() {
  const rules = [
    {
      id: "01",
      title: "Tenue Vestimentaire (Dresscode)",
      icon: Shirt,
      desc: "L'accès au domaine est conditionné au respect du dresscode : Bleu & Blanc pour les filles, Kaki pour les garçons. Les contrevenants participeront aux gages ludiques du comité.",
      tag: "Obligatoire",
    },
    {
      id: "02",
      title: "Ponctualité & Appel",
      icon: Clock,
      desc: "L'appel de la rentrée débute à 11h00 précises. Arrivez tôt pour profiter pleinement du buffet et éviter l'attente aux contrôles d'accès.",
      tag: "Horaires",
    },
    {
      id: "03",
      title: "Esprit Récréation & Respect",
      icon: HeartHandshake,
      desc: "La convivialité et l'esprit fraternel d'antan prévalent. Aucun comportement agressif ou incivilité ne sera toléré au sein du domaine.",
      tag: "Savoir-vivre",
    },
    {
      id: "04",
      title: "Pass QR & Accès Buffet",
      icon: QrCode,
      desc: "Seuls les titulaires d'un Pass QR valide et nominatif pourront accéder au buffet à volonté et aux comptoirs de dégustation Cook'Tail.",
      tag: "Accès",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">

      {/* Hero Header Épuré */}
      <div className="bg-[#0B1B33] text-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Consignes de l'Établissement</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Règlement Intérieur du Brunch
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Afin de garantir une expérience mémorable, sécurisée et fluide à tous les camarades, merci de prendre connaissance des règles de vie de l'événement.
          </p>
        </div>
      </div>

      {/* Grille des Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                    Article {rule.id}
                  </span>
                </div>

                <div>
                  <h2 className="font-bold text-slate-900 text-base">
                    {rule.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                    {rule.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{rule.tag}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note d'Information Complémentaire */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <p className="font-bold">Information importante</p>
          <p className="text-amber-900/90 leading-relaxed">
            L'organisation se réserve le droit de refuser l'accès à toute personne ne disposant pas d'un Pass validé ou ne respectant pas les règles élémentaires de courtoisie.
          </p>
        </div>
      </div>

    </div>
  );
}