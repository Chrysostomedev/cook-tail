// app/(public)/profil/page.tsx
"use client";

import React, { useState } from "react";
import {
  User,
  Printer,
  CheckCircle2,
  QrCode,
  Sparkles,
  Download,
  History,
  Ticket,
  Calendar,
  Phone,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA, cn } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

export default function ProfilPage() {
  const { showToast } = useToast();

  // Simulation de l'historique des pass et du profil utilisateur
  const [userProfile] = useState({
    name: "Kouassi Amenan Jean",
    phone: "+225 07 79 32 41 87",
    email: "amenan.jean@dev.ci",
    status: "Élève Actif",
  });

  const [ticketsHistory] = useState([
    {
      id: "BR-2026-0045",
      eventName: EVENT_INFO.title,
      datePayment: "14 Oct. 2026 - 14:32",
      guests: 2,
      total: 20000,
      status: "Validé",
      isCurrent: true,
      location: "Yopougon Sapeur-Pompier",
    },
    {
      id: "BR-2025-0112",
      eventName: "Brunch Récréation — Édition 2025",
      datePayment: "10 Oct. 2025 - 09:15",
      guests: 1,
      total: 10000,
      status: "Utilisé",
      isCurrent: false,
      location: "Cocody Ambassades",
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(ticketsHistory[0]);

  const handlePrint = (ref: string) => {
    showToast(`Préparation du pass ${ref} pour impression...`, "info");
    window.print();
  };

  const handleDownloadPDF = (ref: string) => {
    showToast(`Téléchargement du Pass ${ref} en cours...`, "success");
    // Logique de génération/téléchargement du reçu
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">

      {/* En-tête Carnet Scolaire Moderne */}
      <div className="bg-[#0B1B33] text-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-2 relative z-10">

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Carnet de Correspondance</h1>
          <p className="text-xs md:text-sm text-slate-300">
            Retrouvez l'ensemble de vos pass d'accès, téléchargez vos reçus et suivez vos réservations.
          </p>
        </div>

        <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
          <User className="w-7 h-7" />
        </div>
      </div>

      {/* Informations Personnelles de l'Élève */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Nom & Prénom</span>
          <p className="text-sm font-bold text-slate-900">{userProfile.name}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Contact Téléphonique</span>
          <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            {userProfile.phone}
          </p>
        </div>

      </div>

      {/* Section Principale : Billet Actif / Sélectionné */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-amber-600" />
            <span>Pass Actif Sélectionné</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Réf : <strong className="text-slate-900">{selectedTicket.id}</strong>
          </span>
        </div>

        {/* Billet d'Entrée Moderne & Épuré */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0B1B33] to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">

          {/* Éléments décoratifs d'arrière-plan */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center">

            {/* Détails du Pass */}
            <div className="space-y-4 flex-1 w-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-semibold">
                    Cook'Tail Service — Billet Officiel
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                    {selectedTicket.eventName}
                  </h3>
                </div>
                <span className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full border",
                  selectedTicket.status === "Validé"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-slate-700 text-slate-300 border-slate-600"
                )}>
                  {selectedTicket.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 block text-[10px] uppercase">Participants</span>
                  <strong className="text-white text-sm font-bold">{selectedTicket.guests} Personnes</strong>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 block text-[10px] uppercase">Montant Réglé</span>
                  <strong className="text-amber-400 text-sm font-bold">{formatCFA(selectedTicket.total)}</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Validé le : {selectedTicket.datePayment} • Lieu : {selectedTicket.location}</span>
              </div>
            </div>

            {/* Bloc QR Code stylisé */}
            <div className="bg-white p-4 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center space-y-2 shrink-0 border border-slate-100">
              <QRCodeSVG value={selectedTicket.id} size={130} level="H" includeMargin={false} />
              <span className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-md">
                Scanner à l'entrée
              </span>
            </div>

          </div>

          {/* Boutons d'Action Rapide */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-3">
            <button
              onClick={() => handlePrint(selectedTicket.id)}
              className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <Printer className="w-4 h-4" />
              Imprimer le Reçu
            </button>
            <button
              onClick={() => handleDownloadPDF(selectedTicket.id)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase flex items-center justify-center gap-2 transition-all border border-white/10 active:scale-98"
            >
              <Download className="w-4 h-4 text-amber-400" />
              Télécharger le Pass (PDF)
            </button>
          </div>

        </div>
      </div>

      {/* Historique des Billets & Pass Précédents */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-amber-600" />
            <span>Historique des Pass & Éditions Précédentes</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">{ticketsHistory.length} pass enregistrés</span>
        </div>

        <div className="space-y-3">
          {ticketsHistory.map((ticket) => {
            const isSelected = selectedTicket.id === ticket.id;
            return (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white",
                  isSelected
                    ? "border-amber-500 ring-1 ring-amber-500/50 shadow-sm"
                    : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0",
                    ticket.isCurrent ? "bg-amber-500/15 text-amber-800" : "bg-slate-100 text-slate-600"
                  )}>
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{ticket.eventName}</h4>
                      {ticket.isCurrent && (
                        <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Actuel
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Réf : {ticket.id} • {ticket.datePayment}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-900">{formatCFA(ticket.total)}</span>
                    <span className="text-[11px] text-slate-500">{ticket.guests} pers.</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicket(ticket);
                    }}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",
                      isSelected
                        ? "bg-[#0B1B33] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    <span>{isSelected ? "Sélectionné" : "Voir Pass"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}