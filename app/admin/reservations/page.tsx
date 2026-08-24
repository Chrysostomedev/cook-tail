"use client";

import React, { useState } from "react";
import { Search, Ticket, Users, CheckCircle2, Clock, Download, Loader } from "lucide-react";
import { useReservations } from "@/lib/hooks/useReservation";

export default function AdminReservationsPage() {
  const { reservations, loading, error } = useReservations();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = reservations.filter(
    (p) =>
      p.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.qrCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["Référence", "Nom", "Téléphone", "Places", "Montant", "Statut"];
    const rows = reservations.map((r) => [
      r.qrCode || r.id,
      r.fullName,
      r.phone,
      r.groupSize,
      r.amountPaid,
      r.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reservations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-borderColor)' }}>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-10" style={{ backgroundColor: 'var(--theme-secondary)' }} />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5" style={{ color: 'var(--theme-secondary)' }} />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">Registre des Inscriptions</h1>
          </div>
          <p className="text-xs text-white/70">
            Gestion centralisée des billets et réservations du Cook'Tail Service
          </p>
        </div>
      </div>

      {/* Recherche + Export */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou référence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-semibold focus:outline-none transition-all shadow-inner"
            style={{ backgroundColor: 'var(--theme-bgSecondary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)', color: 'var(--theme-textPrimary)' }}
          />
        </div>
        <button
          onClick={handleExportCSV}
          className="font-semibold px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shrink-0"
          style={{ backgroundColor: 'var(--theme-bgSecondary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)', color: 'var(--theme-textPrimary)' }}
        >
          <Download className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} /> Exporter (CSV)
        </button>
      </div>

      {/* Tableau */}
      <div className="rounded-3xl shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--theme-bgPrimary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)' }}>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="py-8 text-center text-xs text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--theme-borderColor)', backgroundColor: `var(--theme-bgSecondary)`, color: 'var(--theme-textSecondary)' }}>
                  <th className="py-3.5 px-4">Référence Billet</th>
                  <th className="py-3.5 px-4">Participant</th>
                  <th className="py-3.5 px-4">Places</th>
                  <th className="py-3.5 px-4">Montant</th>
                  <th className="py-3.5 px-4">Statut</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--theme-textPrimary)' }}>
                {filtered.length > 0 ? (
                  filtered.map((item) => {
                    const isValidated = item.status === "confirmed";
                    return (
                      <tr key={item.id} className="text-xs font-medium" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--theme-borderColor)' }}>
                        <td className="py-3.5 px-4 font-mono font-bold" style={{ color: 'var(--theme-secondary)' }}>
                          {item.qrCode || item.id.slice(0, 8)}
                        </td>
                        <td className="py-3.5 px-4 font-semibold">{item.fullName}</td>
                        <td className="py-3.5 px-4 font-mono">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px]" style={{ backgroundColor: `var(--theme-bgSecondary)`, borderWidth: '1px', borderColor: 'var(--theme-borderColor)' }}>
                            <Users className="w-3 h-3" /> {item.groupSize} pers.
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono">{item.amountPaid?.toLocaleString("fr-FR")} FCFA</td>
                        <td className="py-3.5 px-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: isValidated ? `var(--theme-success)20` : `var(--theme-accent)20`,
                              color: isValidated ? 'var(--theme-success)' : 'var(--theme-accent)',
                            }}
                          >
                            {isValidated ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {isValidated ? "Validé" : "En attente"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center font-mono text-xs text-slate-400">
                      Aucune réservation trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}