// components/form/ReservationForm.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Users, Share2, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { FormStepper } from "@/components/form/FormStepper";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA } from "@/lib/utils";

export const ReservationForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    guests: 1,
    instagram: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = formData.guests * EVENT_INFO.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep((s) => (s + 1) as any);
      return;
    }
    setIsSubmitting(true);
    // Simulation enregistrement API
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto border-3 p-6 md:p-10 rounded-sm relative" style={{ backgroundColor: 'var(--theme-bgPrimary)', borderColor: 'var(--theme-primary)', boxShadow: `8px 8px 0px 0px var(--theme-primary)` }}>
      {/* Pince à dessin décorative en haut */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-20 h-6 rounded-xs flex items-center justify-center" style={{ backgroundColor: 'var(--theme-primary)' }}>
        <div className="w-12 h-1 bg-neutral-400 rounded-full" />
      </div>

      <FormStepper currentStep={step} />

      <form onSubmit={handleSubmit} className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--theme-primary)' }}>
                  Nom & Prénom Complexe *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Kouassi Jean-Philippe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xs font-bold focus:outline-hidden focus:ring-2" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-secondary)` } as any}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--theme-primary)' }}>
                  Numéro WhatsApp (Pour le Pass) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    required
                    placeholder="07XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xs font-bold focus:outline-hidden focus:ring-2" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-secondary)` } as any}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--theme-primary)' }}>
                  Compte Instagram (Optionnel)
                </label>
                <div className="relative">
                  <Share2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="@ton_pseudo"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xs font-bold focus:outline-hidden focus:ring-2" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-secondary)` } as any}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full text-white font-black py-4 px-6 rounded-xs border-2 border-black uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 transition-all" style={{ backgroundColor: 'var(--theme-primary)', boxShadow: `4px 4px 0px 0px var(--theme-secondary)` }}
                >
                  Étape Suivante : Sélection des Places
                  <ArrowRight className="w-5 h-5" style={{ color: 'var(--theme-bgSecondary)' }} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-2" style={{ color: 'var(--theme-primary)' }}>
                  Nombre d'Accès / Billets (10 000 CFA / Pers.)
                </label>
                <div className="flex items-center gap-4 bg-white p-3 border-2 rounded-xs" style={{ borderColor: 'var(--theme-primary)' }}>
                  <Users className="w-6 h-6" style={{ color: 'var(--theme-secondary)' }} />
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-20 font-black text-xl focus:outline-hidden" style={{ color: 'var(--theme-primary)' }}
                  />
                  <span className="text-xs font-mono text-gray-600">Max 5 pass par réservation</span>
                </div>
              </div>

              {/* Récapitulatif Tarif */}
              <div className="text-yellow-100 p-5 rounded-xs border-2" style={{ backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}>
                <p className="text-xs font-mono uppercase text-gray-400 mb-1">Récapitulatif de la commande</p>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>{formData.guests}x Billet(s) Brunch Récréation</span>
                  <span style={{ color: 'var(--theme-bgSecondary)' }}>{formatCFA(totalAmount)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-gray-200 font-bold py-4 rounded-xs border-2" style={{ color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 text-white font-black py-4 rounded-xs border-2 uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer hover:translate-x-0.5 transition-all" style={{ backgroundColor: 'var(--theme-danger)', borderColor: 'var(--theme-primary)', boxShadow: `4px 4px 0px 0px var(--theme-primary)` }}
                >
                  {isSubmitting ? "Validation..." : "Confirmer la Réservation"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto border-2" style={{ backgroundColor: 'var(--theme-secondary)', borderColor: 'var(--theme-primary)', boxShadow: `4px 4px 0px 0px var(--theme-primary)` }}>
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black uppercase" style={{ color: 'var(--theme-primary)' }}>Réservation Enregistrée !</h3>
              <p className="text-sm font-serif italic max-w-md mx-auto" style={{ color: `var(--theme-primary)80` }}>
                Votre référence de pass est <span className="font-mono font-bold px-1" style={{ backgroundColor: 'var(--theme-bgSecondary)' }}>BR-2026-0089</span>. Présentez ce code QR à l'entrée.
              </p>
              <div className="pt-4">
                <a
                  href="/mon-pass/BR-2026-0089"
                  className="inline-block text-white font-extrabold px-6 py-3 rounded-xs border-2 border-black" style={{ backgroundColor: 'var(--theme-primary)', boxShadow: `4px 4px 0px 0px var(--theme-danger)` }}
                >
                  Télécharger mon Pass QR
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};