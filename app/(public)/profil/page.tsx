// app/(public)/profil/page.tsx
"use client";

import React, { useState } from "react";
import { User, Printer, CheckCircle2, QrCode, Sparkles, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

export default function ProfilPage() {
  const { showToast } = useToast();
  const [userData] = useState({
    name: "Kouassi Amenan Jean",
    phone: "+225 07 79 32 41 87",
    ref: "BR-2026-0045",
    datePayment: "14 Oct. 2026 - 14:32",
    guests: 2,
    total: 20000,
    status: "Validé",
  });

  const handlePrint = () => {
    showToast("Impression du reçu en cours...", "info");
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* En-tête Carnet Scolaire */}
      <div className="bg-[#0B1B33] text-white p-6 md:p-8 border-3 border-black rounded-xs shadow-[8px_8px_0px_0px_#556B2F] flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase bg-[#FEF08A] text-[#0B1B33] px-2.5 py-0.5 rounded-xs border border-black">
            Dossier d'Inscription
          </span>
          <h1 className="text-2xl md:text-3xl font-black uppercase text-white">Carnet d'Élève</h1>
          <p className="text-xs font-mono text-gray-300">Vos pass d'accès pour la Récréation Cook'Tail</p>
        </div>
        <div className="w-14 h-14 bg-[#556B2F] border-2 border-black rounded-xs flex items-center justify-center text-[#FEF08A] shadow-[4px_4px_0px_0px_#FEF08A] shrink-0">
          <User className="w-7 h-7" />
        </div>
      </div>

      {/* Ticket Reçu Rétro Style Billet d'Entrée */}
      <div className="bg-[#FEF08A] border-3 border-[#0B1B33] p-6 md:p-8 rounded-xs shadow-[10px_10px_0px_0px_#0B1B33] space-y-6 relative overflow-hidden">
        {/* Fanion Statut */}
        <div className="border-b-2 border-dashed border-[#0B1B33] pb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-mono font-bold text-[10px] uppercase text-gray-700 block">
              Cook'Tail Service — Billet d'Entrée
            </span>
            <h2 className="text-xl md:text-2xl font-black text-[#0B1B33] uppercase">{EVENT_INFO.title}</h2>
          </div>
          <span className="bg-[#556B2F] text-[#FEF08A] text-xs font-mono font-black uppercase px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#0B1B33] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> {userData.status}
          </span>
        </div>

        {/* Détails du Billet & QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3.5 text-xs font-mono text-[#0B1B33]">
            <div className="bg-white/60 p-2.5 border border-black rounded-xs">
              <span className="text-gray-500 block text-[9px] uppercase font-bold">Nom & Prénom de l'Élève</span>
              <strong className="text-sm font-black uppercase">{userData.name}</strong>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/60 p-2.5 border border-black rounded-xs">
                <span className="text-gray-500 block text-[9px] uppercase font-bold">Téléphone</span>
                <strong className="font-bold">{userData.phone}</strong>
              </div>
              <div className="bg-white/60 p-2.5 border border-black rounded-xs">
                <span className="text-gray-500 block text-[9px] uppercase font-bold">Référence Pass</span>
                <strong className="text-[#DC2626] font-black">{userData.ref}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/60 p-2.5 border border-black rounded-xs">
                <span className="text-gray-500 block text-[9px] uppercase font-bold">Places</span>
                <strong className="font-bold">{userData.guests} Personnes</strong>
              </div>
              <div className="bg-white/60 p-2.5 border border-black rounded-xs">
                <span className="text-gray-500 block text-[9px] uppercase font-bold">Montant Réglé</span>
                <strong className="font-black text-[#0B1B33]">{formatCFA(userData.total)}</strong>
              </div>
            </div>

            <div className="text-[10px] text-gray-700 italic pt-1">
              Horodatage paiement : {userData.datePayment}
            </div>
          </div>

          <div className="md:col-span-5 bg-white border-2 border-black p-5 rounded-xs text-center flex flex-col items-center justify-center space-y-3 shadow-[6px_6px_0px_0px_#0B1B33]">
            <QRCodeSVG value={userData.ref} size={150} level="H" includeMargin />
            <span className="text-[10px] font-mono font-bold text-[#0B1B33] uppercase bg-[#FEF08A] px-2 py-0.5 border border-black">
              Scanner à l'Entrée
            </span>
          </div>
        </div>

        {/* Bouton d'Action */}
        <div className="border-t-2 border-dashed border-[#0B1B33] pt-4">
          <button
            onClick={handlePrint}
            className="w-full bg-[#0B1B33] hover:bg-[#1a2f50] text-white font-black py-3.5 rounded-xs border-2 border-black flex items-center justify-center gap-2 text-xs uppercase shadow-[4px_4px_0px_0px_#556B2F] transition-all"
          >
            <Printer className="w-4 h-4 text-[#FEF08A]" /> Imprimer le Reçu d'Inscription
          </button>
        </div>
      </div>
    </div>
  );
}