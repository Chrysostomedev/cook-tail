// app/admin/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { EVENT_INFO } from "@/lib/constants"
import { ParticipantCard } from "@/components/cards/ParticipantCard";
import { EnhancedDashboard } from "./enhanced";
import Link from "next/link";
import {
  Users,
  Ticket,
  CheckCircle2,
  QrCode,
  Search,
  Wallet,
  Sparkles,
  ArrowUpRight,
  Loader
} from "lucide-react";
import type { Reservation } from "@/types";
import { formatCFA } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { getAllReservations, updateReservation, getPendingPayments, confirmPayment } from "@/lib/services/reservationService";

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pendingPayments, setPendingPayments] = useState<Reservation[]>([]);

  // Load reservations on mount
  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await getAllReservations();
      setReservations(data);

      const pending = await getPendingPayments();
      setPendingPayments(pending);
    } catch (error) {
      console.error("Error loading reservations:", error);
      showToast("Erreur lors du chargement des réservations", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (id: string) => {
    try {
      await confirmPayment(id);
      setPendingPayments((prev) => prev.filter((r) => r.id !== id));
      // Reflète aussi le changement dans la liste principale sans recharger
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, paymentStatus: "paid" } : r))
      );
      showToast("Paiement confirmé, le pass est maintenant actif", "success");
    } catch (error) {
      console.error("Error confirming payment:", error);
      showToast("Erreur lors de la confirmation du paiement", "error");
    }
  };

  const handleCheckIn = async (id: string) => {
    try {
      await updateReservation(id, { status: "confirmed" });
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "confirmed" } : r))
      );
      showToast("Participant validé avec succès !", "success");
    } catch (error) {
      console.error("Error checking in:", error);
      showToast("Erreur lors de la validation", "error");
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm("Refuser cette réservation ? Cette action peut annuler le pass.")) return;
    try {
      await updateReservation(id, { status: "cancelled" });
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: "cancelled" } : r));
      showToast("Réservation refusée", "info");
    } catch (error) {
      console.error("Error rejecting reservation:", error);
      showToast("Erreur lors du refus", "error");
    }
  };

  const stats = {
    totalRevenue: reservations.reduce((sum, r) => sum + (r.amountPaid || 0), 0),
    reservedSpots: reservations.filter(r => r.status !== "pending").length,
    checkedInCount: reservations.filter(r => r.status === "confirmed").length,
    remainingSpots: Math.max(0, 30 - reservations.length),
  };

  const filtered = reservations.filter(
    (r) =>
      (r.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.qrCode || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">

      {/* Banner En-tête de Contrôle */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tableau de Contrôle Staff
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Suivi en temps réel des encaissements, des arrivées des élèves et de l'état des Pass.
          </p>
        </div>

        <Link
          href="/admin/scanner"
          className="bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <QrCode className="w-4 h-4" />
          <span>Ouvrir Scanner QR</span>
        </Link>
      </div>

      {/* Enhanced Analytics */}
      <EnhancedDashboard />

      {/* Cartes Métriques Repensées */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        {/* Total Recouvré */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Total Recouvré
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {formatCFA(stats.totalRevenue)}
          </p>
        </div>

        {/* Pass Réservés */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Pass Réservés
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.reservedSpots} <span className="text-xs text-slate-400 font-normal">/ 30</span>
          </p>
        </div>

        {/* Présents en Classe */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Présents en Classe
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.checkedInCount} <span className="text-xs text-slate-400 font-normal">inscrits</span>
          </p>
        </div>

        {/* Places Restantes */}
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900">
              Places Restantes
            </span>
            <div className="p-2 bg-amber-500/20 text-amber-900 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg sm:text-2xl font-extrabold text-amber-950 tracking-tight">
            {stats.remainingSpots} <span className="text-xs text-amber-800 font-normal">places</span>
          </p>
        </div>

      </div>

      {/* Conteneur Liste & Recherche */}
      <div className="bg-white border border-slate-200/80 p-5 sm:p-6 rounded-3xl space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Liste des Réservations
            </h2>
            <p className="text-xs text-slate-400">
              {filtered.length} réservation(s) trouvée(s)
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Nom ou référence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all w-full sm:w-64"
            />
          </div>
        </div>

        {/* Paiements Wave à vérifier */}
        {pendingPayments.length > 0 && (
          <div className="bg-white border border-amber-200 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-amber-900">
              ⚠️ Paiements Wave à vérifier ({pendingPayments.length})
            </h2>
            <div className="space-y-2">
              {pendingPayments.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div>
                    <p className="font-bold text-sm">{r.fullName} — {r.amountPaid.toLocaleString("fr-FR")} FCFA</p>
                    <p className="text-xs text-slate-500 font-mono">
                      Réf: {r.id} {r.waveReference && `• Wave TXN: ${r.waveReference}`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleConfirmPayment(r.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    Confirmer paiement
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10">
            <Loader className="w-6 h-6 text-slate-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Chargement des réservations...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((r) => (
              <ParticipantCard
                key={r.id}
                name={r.fullName || "—"}
                reference={r.qrCode || r.id.slice(0, 8)}
                phone={r.phone || "—"}
                guestsCount={r.groupSize || 0}
                status={
                  r.status === "confirmed"
                    ? "checked_in"
                    : r.status === "cancelled"
                    ? "cancelled"
                    : "pending"
                }
                paymentStatus={r.paymentStatus}
                onCheckIn={() => handleCheckIn(r.id)}
                onReject={() => handleReject(r.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-1">
            <p className="text-xs font-bold text-slate-600">Aucune réservation trouvée</p>
            <p className="text-[11px] text-slate-400">Essayez de modifier votre recherche.</p>
          </div>
        )}
      </div>

    </div>
  );
}