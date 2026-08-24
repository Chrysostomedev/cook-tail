"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { Search, Download, Clock, CheckCircle2, Loader } from "lucide-react";
import { getReservationById } from "@/lib/services/reservationService";
import { Reservation } from "@/types";

function MonPassContent() {
  const searchParams = useSearchParams();
  const [refInput, setRefInput] = useState(searchParams.get("ref") || "");
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleSearch = async () => {
    if (!refInput) return;
    setLoading(true);
    setSearched(true);
    const data = await getReservationById(refInput.trim());
    setReservation(data);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("ref")) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `pass-cooktail-${reservation?.id}.png`;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4" style={{ borderColor: 'var(--theme-borderColor)' }}>
        <h1 className="text-xl font-extrabold text-[var(--theme-textPrimary)]">Récupérer Mon Pass</h1>
        <p className="text-xs text-[var(--theme-textSecondary)]">
          Entrez la référence reçue lors de votre réservation.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ex: COOKTAIL-172938-ABCXYZ"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-[var(--theme-bgSecondary)] border rounded-xl text-sm font-mono font-semibold"
            style={{ borderColor: 'var(--theme-borderColor)' }}
          />
          <button
            onClick={handleSearch}
            className="px-4 bg-[var(--theme-primary)] text-white rounded-xl"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      )}

      {!loading && searched && !reservation && (
        <div className="text-center py-8 bg-red-50 rounded-2xl border border-red-200">
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
        <div className="bg-[var(--theme-primary)] text-white p-8 rounded-3xl text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-[var(--theme-secondary)] text-xs font-bold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pass Validé
          </span>
          <h2 className="text-lg font-extrabold">{reservation.fullName}</h2>
          <p className="text-xs opacity-80">{reservation.groupSize} place(s)</p>

          <div className="bg-white p-6 rounded-xl inline-flex flex-col items-center gap-2">
            <QRCodeCanvas ref={qrRef} value={reservation.id} size={180} level="H" />
            <span className="text-[10px] font-mono text-slate-500">{reservation.id}</span>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-[var(--theme-secondary)] text-white font-bold py-3 rounded-xl uppercase text-xs flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Télécharger mon Pass
          </button>
        </div>
      )}
    </div>
  );
}

export default function MonPassPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <Loader className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      }
    >
      <MonPassContent />
    </Suspense>
  );
}