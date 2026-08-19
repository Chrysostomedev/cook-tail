// app/admin/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { MOCK_STATS, MOCK_PARTICIPANTS } from "@/data";
import { ParticipantCard } from "@/components/cards/ParticipantCard";
import Link from "next/link";
import {
  Users,
  Ticket,
  CheckCircle2,
  QrCode,
  Search,
  Wallet,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { formatCFA } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [search, setSearch] = useState("");

  const handleCheckIn = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "checked_in" as const } : p))
    );
    showToast("Participant validé avec succès !", "success");
  };

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">

      {/* Banner En-tête de Contrôle */}
      <div className="bg-[#0B1B33] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Panneau d'Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tableau de Contrôle Staff
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Suivi en temps réel des encaissements, des arrivées des élèves et de l'état des Pass.
          </p>
        </div>

        <Link
          href="/admin/scanner"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <QrCode className="w-4 h-4 text-slate-950" />
          <span>Ouvrir Scanner QR</span>
        </Link>
      </div>

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
            {formatCFA(MOCK_STATS.totalRevenue)}
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
            {MOCK_STATS.reservedSpots} <span className="text-xs text-slate-400 font-normal">/ 30</span>
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
            {MOCK_STATS.checkedInCount} <span className="text-xs text-slate-400 font-normal">élèves</span>
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
            {MOCK_STATS.remainingSpots} <span className="text-xs text-amber-800 font-normal">places</span>
          </p>
        </div>

      </div>

      {/* Conteneur Liste & Recherche */}
      <div className="bg-white border border-slate-200/80 p-5 sm:p-6 rounded-3xl space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Liste des Élèves Inscrits
            </h2>
            <p className="text-xs text-slate-400">
              {filtered.length} inscription(s) trouvée(s)
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

        {/* Liste des cartes participants */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <ParticipantCard
                key={p.id}
                name={p.name}
                reference={p.ref}
                phone="07 00 00 00 00"
                guestsCount={p.guests}
                status={p.status}
                onCheckIn={() => handleCheckIn(p.id)}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-1">
              <p className="text-xs font-bold text-slate-600">Aucun élève trouvé</p>
              <p className="text-[11px] text-slate-400">Essayez de modifier votre recherche.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}