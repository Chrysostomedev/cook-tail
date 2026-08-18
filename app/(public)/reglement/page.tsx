// app/(public)/reglement/page.tsx
"use client";

import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle, Scale } from "lucide-react";

export default function ReglementPage() {
  const rules = [
    {
      article: "Article 01 — Tenue Vestimentaire",
      desc: "L'accès au domaine est rigoureusement conditionné au respect du dresscode (Bleu/Blanc pour les filles, Kaki pour les garçons). Les contrevenants seront soumis aux gages amusants du comité.",
    },
    {
      article: "Article 02 — Heure d'Arrivée (Ponctualité)",
      desc: "L'appel de la rentrée débute à 11h00 précises. Tout retard d'une heure entraînera un passage obligatoire par le contrôle des récréations.",
    },
    {
      article: "Article 03 — Droit de Réserve & Respect",
      desc: "La convivialité et l'esprit fraternel d'antan prévalent. Aucun comportement agressif ou irrespectueux ne sera toléré au sein de l'établissement.",
    },
    {
      article: "Article 04 — Pass QR & Inscription",
      desc: "Seuls les titulaires d'une référence QR valide nominative pourront accéder au buffet et aux stands de dégustation Cook'Tail.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#DC2626] text-white p-6 border-3 border-black rounded-xs shadow-[6px_6px_0px_0px_#0B1B33]">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="w-6 h-6 text-[#FEF08A]" />
          <span className="text-[10px] font-mono font-bold uppercase bg-black text-[#FEF08A] px-2 py-0.5 rounded-xs">
            Règlement Intérieur
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black uppercase">
          Dispositions Générales du Brunch
        </h1>
        <p className="text-xs font-mono text-red-100 mt-1">
          Ce règlement assure la sécurité, l'ambiance et la fluidité de la journée.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="bg-[#F4EBD9] border-3 border-[#0B1B33] p-6 rounded-xs shadow-[6px_6px_0px_0px_#0B1B33] space-y-3"
          >
            <span className="text-[10px] font-mono font-black uppercase bg-[#0B1B33] text-[#FEF08A] px-2 py-0.5 rounded-xs">
              {rule.article}
            </span>
            <p className="text-xs font-mono text-gray-800 leading-relaxed pt-2">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}