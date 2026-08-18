// app/admin/reservations/page.tsx
"use client";

import React, { useState } from "react";
import { MOCK_PARTICIPANTS } from "@/data";
import { Search, Filter, Download, Plus } from "lucide-react";
import { formatCFA } from "@/lib/utils";

export default function AdminReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_PARTICIPANTS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#0B1B33] text-white p-6 border-3 border-black rounded-xs shadow-[6px_6px_0px_0px_#556B2F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase">Registre des Inscriptions</h1>
          <p className="text-xs font-mono text-gray-300">Base de données des billets émis</p>
        </div>
        <button className="bg-[#FEF08A] text-[#0B1B33] font-black px-4 py-2.5 rounded-xs border-2 border-black text-xs uppercase shadow-[2px_2px_0px_0px_#8FBC8F] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Ajouter Manuel
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom ou référence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-black rounded-xs font-mono text-xs font-bold"
          />
        </div>
      </div>

      <div className="bg-[#F4EBD9] border-3 border-[#0B1B33] rounded-xs shadow-[6px_6px_0px_0px_#0B1B33] overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#0B1B33] text-white uppercase border-b-2 border-black">
            <tr>
              <th className="p-3">Référence</th>
              <th className="p-3">Participant</th>
              <th className="p-3">Places</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-[#0B1B33]/20">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-white/50">
                <td className="p-3 font-bold text-[#DC2626]">{item.ref}</td>
                <td className="p-3 font-extrabold text-[#0B1B33]">{item.name}</td>
                <td className="p-3 font-bold">{item.guests} pers.</td>
                <td className="p-3">
                  <span className="bg-[#8FBC8F] text-[#0B1B33] px-2 py-0.5 rounded-xs border border-black font-bold uppercase text-[10px]">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}