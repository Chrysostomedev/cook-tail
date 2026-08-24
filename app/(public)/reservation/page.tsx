"use client";

import React, { useState } from "react";
import { Copy, CreditCard, PhoneCall, CheckCircle2 } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { useReservation } from "@/lib/hooks/useReservation";
import Link from "next/link";

export default function ReservationPage() {
  const { showToast } = useToast();
  const { submit, attachWaveRef, loading } = useReservation();

  const [formData, setFormData] = useState({ name: "", phone: "", guests: 1 });
  const [step, setStep] = useState<"form" | "payment" | "done">("form");
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [waveRefInput, setWaveRefInput] = useState("");

  const totalAmount = EVENT_INFO.price * formData.guests;

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Veuillez remplir votre nom et numéro WhatsApp.", "error");
      return;
    }

    const result = await submit(
      { fullName: formData.name, phone: formData.phone, groupSize: formData.guests },
      totalAmount
    );

    if (result) {
      setReservationId(result.id);
      setStep("payment");
    } else {
      showToast("Erreur lors de la création de la réservation", "error");
    }
  };

  const handleCopyRef = () => {
    if (reservationId) {
      navigator.clipboard.writeText(reservationId);
      showToast("Référence copiée !", "info");
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(EVENT_INFO.wavePhoneNumber);
    showToast("Numéro Wave copié !", "info");
  };

  const handleSubmitWaveRef = async () => {
    if (!reservationId || !waveRefInput) {
      showToast("Renseignez la référence de votre transaction Wave", "error");
      return;
    }
    await attachWaveRef(reservationId, waveRefInput);
    setStep("done");
    showToast("Merci ! Votre paiement sera vérifié sous peu.", "success");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {step === "form" && (
        <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm" style={{ borderColor: 'var(--theme-borderColor)' }}>
          <span className="text-[10px] font-mono font-bold uppercase text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-3 py-1 rounded-full inline-block mb-3">
            Étape 1 sur 2
          </span>
          <h1 className="text-2xl font-extrabold text-[var(--theme-textPrimary)]">Réserver Mes Pass</h1>

          <form onSubmit={handleSubmitForm} className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-[var(--theme-textPrimary)]">
                Nom & Prénoms *
              </label>
              <input
                type="text"
                required
                placeholder="ex: Kouassi Amenan Jean"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--theme-bgSecondary)] border rounded-xl text-sm font-semibold"
                style={{ borderColor: 'var(--theme-borderColor)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-[var(--theme-textPrimary)]">
                Numéro WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="ex: 07 00 00 00 00"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--theme-bgSecondary)] border rounded-xl text-sm font-semibold"
                style={{ borderColor: 'var(--theme-borderColor)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-[var(--theme-textPrimary)]">
                Nombre de Places
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-[var(--theme-bgSecondary)] border rounded-xl text-sm font-semibold"
                style={{ borderColor: 'var(--theme-borderColor)' }}
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} Personne{n > 1 ? "s" : ""} ({formatCFA(EVENT_INFO.price * n)})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[var(--theme-bgSecondary)] p-4 rounded-xl flex justify-between text-sm font-bold">
              <span className="text-[var(--theme-textSecondary)]">Total :</span>
              <span className="text-[var(--theme-textPrimary)]">{formatCFA(totalAmount)}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--theme-primary)] text-white font-bold py-4 rounded-xl uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              {loading ? "Création..." : "Continuer vers le paiement"}
            </button>
          </form>
        </div>
      )}

      {step === "payment" && reservationId && (
        <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm space-y-5" style={{ borderColor: 'var(--theme-borderColor)' }}>
          <span className="text-[10px] font-mono font-bold uppercase text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-3 py-1 rounded-full inline-block">
            Étape 2 sur 2 — Paiement Wave
          </span>
          <h1 className="text-xl font-extrabold text-[var(--theme-textPrimary)]">
            Payez {formatCFA(totalAmount)} sur Wave
          </h1>

          <div className="bg-[var(--theme-bgSecondary)] p-5 rounded-2xl space-y-3">
            <p className="text-xs font-semibold text-[var(--theme-textSecondary)]">
              1. Ouvrez l'application Wave sur votre téléphone
            </p>
            <p className="text-xs font-semibold text-[var(--theme-textSecondary)]">
              2. Envoyez exactement <strong>{formatCFA(totalAmount)}</strong> au numéro :
            </p>
            <div className="flex items-center gap-2 bg-white border rounded-xl p-3" style={{ borderColor: 'var(--theme-borderColor)' }}>
              <PhoneCall className="w-4 h-4 text-[var(--theme-primary)]" />
              <span className="font-mono font-bold text-lg flex-1">{EVENT_INFO.wavePhoneNumber}</span>
              <button onClick={handleCopyPhone} className="p-2 hover:bg-slate-100 rounded-lg">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-semibold text-[var(--theme-textSecondary)]">
              3. Notez votre référence de transaction Wave et collez-la ci-dessous :
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1.5">
              Référence transaction Wave (dans votre historique Wave)
            </label>
            <input
              type="text"
              placeholder="ex: TXN123456789"
              value={waveRefInput}
              onChange={(e) => setWaveRefInput(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--theme-bgSecondary)] border rounded-xl text-sm font-semibold"
              style={{ borderColor: 'var(--theme-borderColor)' }}
            />
          </div>

          <button
            onClick={handleSubmitWaveRef}
            className="w-full bg-[var(--theme-primary)] text-white font-bold py-4 rounded-xl uppercase text-xs"
          >
            J'ai payé — Envoyer ma référence
          </button>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-800">
            ⚠️ Votre référence de réservation : <strong className="font-mono">{reservationId}</strong> — gardez-la précieusement, elle sert à récupérer votre pass.
          </div>
        </div>
      )}

      {step === "done" && reservationId && (
        <div className="bg-[var(--theme-primary)] text-white p-8 rounded-3xl text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 mx-auto text-[var(--theme-secondary)]" />
          <h2 className="text-xl font-extrabold">Paiement en cours de vérification</h2>
          <p className="text-sm opacity-90">
            Nous vérifions votre paiement Wave. Votre Pass QR sera disponible dans quelques instants.
          </p>
          <div className="bg-white/10 p-3 rounded-xl font-mono text-sm flex items-center justify-center gap-2">
            {reservationId}
            <button onClick={handleCopyRef}><Copy className="w-4 h-4" /></button>
          </div>
          <Link
            href={`/mon-pass?ref=${reservationId}`}
            className="block w-full bg-[var(--theme-secondary)] text-white font-bold py-3 rounded-xl uppercase text-xs"
          >
            Voir l'état de mon pass
          </Link>
        </div>
      )}
    </div>
  );
}