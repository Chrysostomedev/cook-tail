// app/admin/evenement/page.tsx
"use client";

import React, { useState } from "react";
import { EVENT_INFO } from "@/lib/constants";
import { Save } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function AdminEventConfigPage() {
  const { showToast } = useToast();
  const [config, setConfig] = useState({ ...EVENT_INFO });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Paramètres mis à jour avec succès !", "success");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-[#0B1B33] text-white p-6 border-3 border-black rounded-xs shadow-[6px_6px_0px_0px_#556B2F]">
        <h1 className="text-2xl font-black uppercase">Configuration Générales</h1>
        <p className="text-xs font-mono text-gray-300">Modifiez les variables publiques de l'événement</p>
      </div>

      <form onSubmit={handleSave} className="bg-[#F4EBD9] border-3 border-[#0B1B33] p-6 rounded-xs shadow-[6px_6px_0px_0px_#0B1B33] space-y-4">
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">Titre de l'Événement</label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
            className="w-full p-2.5 bg-white border-2 border-black rounded-xs font-bold text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">Capacité Maximale (Places)</label>
          <input
            type="number"
            value={config.maxCapacity}
            onChange={(e) => setConfig({ ...config, maxCapacity: Number(e.target.value) })}
            className="w-full p-2.5 bg-white border-2 border-black rounded-xs font-bold text-xs"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#556B2F] text-white font-black py-3 rounded-xs border-2 border-black uppercase text-xs shadow-[3px_3px_0px_0px_#0B1B33] flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Enregistrer les Modifications
        </button>
      </form>
    </div>
  );
}