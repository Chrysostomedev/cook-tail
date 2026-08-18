// app/(public)/reservation/page.tsx
"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Ticket, Copy, Sparkles, CheckCircle2, ShieldCheck, GraduationCap, Utensils, Zap } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA, generateReference } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

export default function ReservationPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", guests: 1 });
  const [passData, setPassData] = useState<{ ref: string; name: string; guests: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    const ref = generateReference();
    setPassData({ ref, name: formData.name, guests: formData.guests });
    showToast("Votre Pass Droit d'Accès a été généré !", "success");
  };

  const handleCopyRef = () => {
    if (passData) {
      navigator.clipboard.writeText(passData.ref);
      showToast("Référence copiée dans le presse-papier", "info");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!passData ? (
        /* Formulaire & Récapitulatif Double Colonne */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne de gauche : Avantages */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-amber-500/10 border border-amber-800/15 p-6 rounded-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-white px-3 py-1 rounded-full border border-amber-800/10">
                <Zap className="w-3 h-3 text-amber-600" /> Pass Tout Inclus
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Ce qui vous attend au <span className="text-amber-700 font-serif italic">Brunch</span>
              </h2>
              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Accès illimité au buffet chaud (Garba, Attiéké Poisson, Alloco...)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Bar à boissons traditionnelles (Bissap, Gnamakoudji) & Cocktails</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Participation aux Olympiades Rétro & Grande Boum de Fin d'Année</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Badge de classe personnalisé et bonbons nostalgiques inclus</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/60 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-amber-700 shrink-0" />
              <p className="text-[11px] text-slate-500 leading-tight">
                Validation instantanée par QR Code à l'entrée. Conservez votre référence une fois générée.
              </p>
            </div>
          </div>

          {/* Colonne de droite : Formulaire */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-md border border-amber-900/10 p-6 md:p-8 rounded-3xl shadow-xl shadow-amber-950/5 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full">
                Réservation Officielle
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Obtenir Mon Pass Élève
              </h1>
              <p className="text-xs text-slate-500">
                Tarif unique : <strong className="text-slate-900 font-bold">{formatCFA(EVENT_INFO.price)}</strong> / personne
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nom & Prénoms (Identité Élève) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Kouassi Amenan Jean"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-amber-900/15 rounded-2xl font-semibold text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Numéro WhatsApp Joignable *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="ex: 07 00 00 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-amber-900/15 rounded-2xl font-semibold text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre de Places Déclarées
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-amber-900/15 rounded-2xl font-semibold text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Personne{n > 1 ? "s" : ""} ({formatCFA(EVENT_INFO.price * n)})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                Générer Mon Pass D'Accès QR
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* Ticket Pass QR Élégant VIP */
        <div className="max-w-md mx-auto bg-slate-950 text-white border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          {/* Halos lumineux */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-amber-400/20">
              <GraduationCap className="w-3.5 h-3.5" /> Pass Élève Officiel
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-white mt-1">
              {EVENT_INFO.title}
            </h2>
            <p className="text-sm font-bold text-amber-400">{passData.name}</p>
            <p className="text-xs text-slate-400 font-mono">
              {passData.guests} Entrée{passData.guests > 1 ? "s" : ""} Incluses
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-xl relative z-10">
            <QRCodeSVG value={passData.ref} size={170} level="H" />
            <div className="text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Référence Délégué</span>
              <span className="text-xl font-mono font-black text-slate-950 tracking-wider">{passData.ref}</span>
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <button
              onClick={handleCopyRef}
              className="flex-1 bg-white/10 hover:bg-white/15 text-white font-semibold py-3 rounded-2xl border border-white/10 flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all"
            >
              <Copy className="w-4 h-4 text-amber-400" /> Copier Ref.
            </button>
            <button
              onClick={() => setPassData(null)}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Nouveau Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}