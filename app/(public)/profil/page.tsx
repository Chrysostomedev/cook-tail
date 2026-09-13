// app/(public)/profil/page.tsx
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  User,
  Printer,
  CheckCircle2,
  Download,
  Ticket,
  Calendar,
  Phone,
  Search,
  Clock,
  Loader,
  AlertCircle,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { getReservationById } from "@/lib/services/reservationService";
import { Reservation } from "@/types";
import { formatCFA, cn } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

const LAST_REF_KEY = "cooktail_last_ref";

function formatDate(ts: any): string {
  if (!ts) return "-";
  const date = typeof ts?.toDate === "function" ? ts.toDate() : new Date(ts);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ProfilContent() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const qrRef = useRef<HTMLCanvasElement>(null);

  const [refInput, setRefInput] = useState(searchParams.get("ref") || "");
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (refToSearch?: string) => {
    const ref = (refToSearch ?? refInput).trim();
    if (!ref) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await getReservationById(ref);
      setReservation(data);
      if (data) {
        localStorage.setItem(LAST_REF_KEY, ref);
      } else {
        showToast("Aucune réservation trouvée avec cette référence.", "error");
      }
    } catch (error) {
      console.error("Error fetching reservation:", error);
      showToast("Erreur lors de la recherche", "error");
    } finally {
      setLoading(false);
    }
  };

  // Au chargement : priorité au ?ref= dans l'URL, sinon dernière réf mémorisée
  useEffect(() => {
    const urlRef = searchParams.get("ref");
    if (urlRef) {
      setRefInput(urlRef);
      void handleSearch(urlRef);
      return;
    }
    const savedRef = localStorage.getItem(LAST_REF_KEY);
    if (savedRef) {
      setRefInput(savedRef);
      void handleSearch(savedRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = () => {
    showToast(`Préparation du pass pour impression...`, "info");
    window.print();
  };

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas || !reservation) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `pass-cooktail-${reservation.id}.png`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* En-tête */}
      <div className="bg-[var(--theme-primary)] text-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Mon Profil & Pass</h1>
          <p className="text-xs md:text-sm text-slate-300">
            Retrouvez votre pass d'accès à partir de votre référence de réservation.
          </p>
        </div>
        <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
          <User className="w-7 h-7" />
        </div>
      </div>

      {/* Recherche par référence */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
          Référence de réservation
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ex: COOKTAIL-172938-ABCXYZ"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/20"
          />
          <button
            onClick={() => handleSearch()}
            className="px-4 bg-[var(--theme-primary)] text-white rounded-xl flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      )}

      {!loading && searched && !reservation && (
        <div className="text-center py-8 bg-red-50 rounded-2xl border border-red-200 flex flex-col items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <p className="text-xs font-bold text-red-600">Aucune réservation trouvée avec cette référence.</p>
        </div>
      )}

      {!loading && reservation && reservation.paymentStatus === "unpaid" && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-center space-y-2">
          <Clock className="w-8 h-8 mx-auto text-amber-600" />
          <p className="text-sm font-bold text-amber-900">Paiement en cours de vérification</p>
          <p className="text-xs text-amber-700">
            Votre pass sera disponible dès que votre paiement Wave sera confirmé par notre équipe.
          </p>
        </div>
      )}

      {!loading && reservation && reservation.paymentStatus === "paid" && (
        <>
          {/* Infos personnelles */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Nom & Prénom</span>
              <p className="text-sm font-bold text-slate-900">{reservation.fullName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Contact Téléphonique</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                {reservation.phone}
              </p>
            </div>
          </div>

          {/* Pass actif */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-600" />
                <span>Votre Pass</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">
                Réf : <strong className="text-slate-900">{reservation.id}</strong>
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-[#0B1B33] to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="space-y-4 flex-1 w-full">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-semibold">
                        Cook'Tail Service — Billet Officiel
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                        {reservation.fullName}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-bold px-3 py-1 rounded-full border",
                        reservation.status === "confirmed"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {reservation.status === "confirmed" ? "Entrée Validée" : "Prêt pour l'entrée"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-slate-400 block text-[10px] uppercase">Participants</span>
                      <strong className="text-white text-sm font-bold">{reservation.groupSize} Personne(s)</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-slate-400 block text-[10px] uppercase">Montant Réglé</span>
                      <strong className="text-amber-400 text-sm font-bold">{formatCFA(reservation.amountPaid)}</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      Réservé le : {formatDate(reservation.createdAt)}
                      {reservation.confirmedAt && ` • Entrée validée le : ${formatDate(reservation.confirmedAt)}`}
                    </span>
                  </div>
                </div>

                {/* QR Code réel */}
                <div className="bg-white p-4 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center space-y-2 shrink-0 border border-slate-100">
                  <QRCodeCanvas ref={qrRef} value={reservation.id} size={130} level="H" />
                  <span className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-md">
                    Scanner à l'entrée
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Printer className="w-4 h-4" />
                  Imprimer le Reçu
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase flex items-center justify-center gap-2 transition-all border border-white/10 active:scale-98"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  Télécharger le Pass (PNG)
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProfilPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <Loader className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      }
    >
      <ProfilContent />
    </Suspense>
  );
}