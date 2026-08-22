// app/admin/reservations/page.tsx
"use client";

import React, { useState } from "react";
import { MOCK_PARTICIPANTS } from "@/data";
import { Search, Plus, Ticket, Users, CheckCircle2, Clock, Filter, Download } from "lucide-react";
import { formatCFA } from "@/lib/utils";

export default function AdminReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_PARTICIPANTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header avec action */}
      <div className="border rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-borderColor)' }}>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-10" style={{ backgroundColor: 'var(--theme-secondary)' }} />
        
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5" style={{ color: 'var(--theme-secondary)' }} />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: 'white' }}>Registre des Inscriptions</h1>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Gestion centralisée des billets et réservations du Cook'Tail Service
          </p>
        </div>

        <button className="text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 shrink-0 relative z-10" style={{ backgroundColor: 'var(--theme-secondary)', color: 'white' }}>
          <Plus className="w-4 h-4" /> Ajouter Manuel
        </button>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, référence ou code Billet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-semibold placeholder-opacity-50 focus:outline-none transition-all shadow-inner"
            style={{ backgroundColor: 'var(--theme-bgSecondary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)', color: 'var(--theme-textPrimary)' }}
          />
        </div>

        <button className="font-semibold px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shrink-0" style={{ backgroundColor: 'var(--theme-bgSecondary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)', color: 'var(--theme-textPrimary)' }}>
          <Download className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} /> Exporter (CSV)
        </button>
      </div>

      {/* Tableau Épuré */}
      <div className="rounded-3xl shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--theme-bgPrimary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--theme-borderColor)', backgroundColor: `var(--theme-bgSecondary)`, color: 'var(--theme-textSecondary)' }}>
                <th className="py-3.5 px-4">Référence Billet</th>
                <th className="py-3.5 px-4">Participant</th>
                <th className="py-3.5 px-4">Nombre de places</th>
                <th className="py-3.5 px-4">Statut Pass</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--theme-textPrimary)' }}>
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const isValidated = item.status.toLowerCase().includes("valid") || item.status.toLowerCase().includes("payé");
                  return (
                    <tr key={item.id} className="text-xs font-medium transition-colors hover:opacity-80" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--theme-borderColor)' }}>
                      <td className="py-3.5 px-4 font-mono font-bold" style={{ color: 'var(--theme-secondary)' }}>
                        {item.ref}
                      </td>
                      <td className="py-3.5 px-4 font-semibold" style={{ color: 'var(--theme-textPrimary)' }}>
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono" style={{ color: 'var(--theme-textSecondary)' }}>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px]" style={{ backgroundColor: `var(--theme-bgSecondary)`, borderWidth: '1px', borderColor: 'var(--theme-borderColor)' }}>
                          <Users className="w-3 h-3" /> {item.guests} pers.
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: isValidated ? `var(--theme-success)20` : `var(--theme-accent)20`,
                            color: isValidated ? 'var(--theme-success)' : 'var(--theme-accent)',
                            borderWidth: '1px',
                            borderColor: isValidated ? `var(--theme-success)40` : `var(--theme-accent)40`
                          }}
                        >
                          {isValidated ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center font-mono text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
                    Aucune réservation ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}