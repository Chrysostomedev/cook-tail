// app/admin/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { MOCK_STATS, MOCK_PARTICIPANTS } from "@/data";
import { ParticipantCard } from "@/components/cards/ParticipantCard";
import Link from "next/link";
import { Users, Ticket, CheckCircle2, TrendingUp, QrCode, Search } from "lucide-react";
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
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* En-tête de contrôle */}
      <div className="bg-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Tableau de Contrôle Staff</h1>
          <p className="text-xs text-slate-400 mt-1">
            Suivi en direct des entrées et encaissements du Brunch Cook'Tail.
          </p>
        </div>
        <Link
          href="/admin/scanner"
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
        >
          <QrCode className="w-4 h-4" /> Ouvrir Scanner QR
        </Link>
      </div>

      {/* Cartes Métriques Épurées */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Total Recouvré</span>
          <span className="text-xl font-extrabold text-slate-900">{formatCFA(MOCK_STATS.totalRevenue)}</span>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Pass Réservés</span>
          <span className="text-xl font-extrabold text-amber-800">{MOCK_STATS.reservedSpots} / 30</span>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Présents en Classe</span>
          <span className="text-xl font-extrabold text-emerald-700">{MOCK_STATS.checkedInCount} pers.</span>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-900 block">Places Restantes</span>
          <span className="text-xl font-extrabold text-amber-900">{MOCK_STATS.remainingSpots} places</span>
        </div>
      </div>

      {/* Recherche & Liste Participants */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Liste des Élèves Inscrits</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom ou ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((p) => (
            <ParticipantCard
              key={p.id}
              name={p.name}
              reference={p.ref}
              phone="07 00 00 00 00"
              guestsCount={p.guests}
              status={p.status}
              onCheckIn={() => handleCheckIn(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}