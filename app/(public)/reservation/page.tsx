// app/(public)/reservation/page.tsx
"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Ticket,
  Copy,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Zap,
  CreditCard,
  X,
  PhoneCall,
  Lock,
  ArrowRight
} from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA, generateReference } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationPage() {
  const { showToast } = useToast();

  // États Formulaire & Modale
  const [formData, setFormData] = useState({ name: "", phone: "", guests: 1 });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<"wave" | "om" | "momo" | "moov">("wave");
  const [paymentPhone, setPaymentPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // État du Pass Généré
  const [passData, setPassData] = useState<{ ref: string; name: string; guests: number; amount: number } | null>(null);

  const totalAmount = EVENT_INFO.price * formData.guests;

  // 1. Déclenche l'ouverture du modal de paiement
  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Veuillez remplir votre nom et numéro WhatsApp.", "error");
      return;
    }
    setPaymentPhone(formData.phone);
    setIsPaymentModalOpen(true);
  };

  // 2. Simulation du paiement API et génération du Pass QR
  const handleConfirmPayment = () => {
    if (!paymentPhone) {
      showToast("Veuillez saisir le numéro pour le prélèvement.", "error");
      return;
    }

    setIsProcessing(true);
    showToast("Initialisation de la transaction Mobile Money...", "info");

    // Simulation de l'appel API de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);

      const ref = generateReference();
      setPassData({
        ref,
        name: formData.name,
        guests: formData.guests,
        amount: totalAmount,
      });

      showToast("Paiement validé ! Votre Pass QR est généré.", "success");
    }, 2000);
  };

  const handleCopyRef = () => {
    if (passData) {
      navigator.clipboard.writeText(passData.ref);
      showToast("Référence copiée dans le presse-papier !", "info");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">

      {!passData ? (
        /* Grille Formulaire & Détails */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Gauche : Avantages du Pass */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-500/20">
                <Zap className="w-3.5 h-3.5 text-amber-700" />
                <span>Pass Tout Inclus</span>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                Ce qui vous attend au <span className="text-amber-800 font-serif italic">Brunch</span>
              </h2>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Accès illimité au buffet chaud (Garba, Attiéké, Alloco...)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Bar à boissons traditionnelles & Cocktails signature</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Olympiades Rétro & Grande Boum nostalgique</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Badge de classe personnalisé et bonbons d'enfance</span>
                </li>
              </ul>
            </div>


          </div>

          {/* Droite : Formulaire de Réservation */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full">
                Étape 1 sur 2 — Identité
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-1">
                Réserver Mes Pass
              </h1>
              <p className="text-xs text-slate-500">
                Tarif unique : <strong className="text-slate-900 font-bold">{formatCFA(EVENT_INFO.price)}</strong> / personne
              </p>
            </div>

            <form onSubmit={handleOpenPayment} className="space-y-4">
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre de Places Déclarées
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} Personne{n > 1 ? "s" : ""} ({formatCFA(EVENT_INFO.price * n)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Récapitulatif Tarif */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Total à régler :</span>
                <span className="text-base font-extrabold text-slate-900">{formatCFA(totalAmount)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B1B33] hover:bg-slate-800 text-amber-300 font-bold py-4 rounded-2xl shadow-md transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 active:scale-98"
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                Proceed To Payment ({formatCFA(totalAmount)})
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* Écran Billet QR Généré */
        <div className="max-w-md mx-auto bg-[#0B1B33] text-white border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <span className="inline-flex items-center gap-1 bg-amber-400/10 text-amber-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-amber-400/20">
              <GraduationCap className="w-3.5 h-3.5" /> Pass Élève Validé
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-white mt-1">
              {EVENT_INFO.title}
            </h2>
            <p className="text-sm font-bold text-amber-300">{passData.name}</p>
            <p className="text-xs text-slate-300 font-mono">
              {passData.guests} Entrée{passData.guests > 1 ? "s" : ""} • {formatCFA(passData.amount)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 shadow-xl relative z-10">
            <QRCodeSVG value={passData.ref} size={170} level="H" />
            <div className="text-center pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Référence Pass</span>
              <span className="text-xl font-mono font-black text-slate-900 tracking-wider">{passData.ref}</span>
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
              className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Nouveau Pass
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE PAIEMENT MOBILE MONEY (Prêt API) */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setIsPaymentModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 z-50 shadow-2xl space-y-6"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Guichet de Paiement</h3>
                    <p className="text-xs text-slate-500">Montant total : <strong className="text-slate-900">{formatCFA(totalAmount)}</strong></p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  disabled={isProcessing}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sélection de l'Opérateur */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Choisissez votre moyen de paiement
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "wave", label: "Wave", color: "bg-cyan-50 border-cyan-200 text-cyan-900" },
                    { id: "om", label: "Orange Money", color: "bg-orange-50 border-orange-200 text-orange-900" },
                    { id: "momo", label: "MTN MoMo", color: "bg-yellow-50 border-yellow-200 text-yellow-900" },
                    { id: "moov", label: "Moov Money", color: "bg-blue-50 border-blue-200 text-blue-900" },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setPaymentProvider(op.id as any)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${paymentProvider === op.id
                        ? `${op.color} ring-2 ring-slate-900`
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      <span>{op.label}</span>
                      {paymentProvider === op.id && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Saisie du Numéro de Débit */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Numéro à débiter
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    placeholder="07 00 00 00 00"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                  />
                </div>
              </div>

              {/* Bouton de Confirmation */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full bg-[#0B1B33] hover:bg-slate-800 text-amber-300 font-bold py-4 rounded-2xl shadow-md transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                    Validation en cours...
                  </span>
                ) : (
                  <>
                    <span>Payer {formatCFA(totalAmount)}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}