// app/(public)/scan/page.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScannerState } from "html5-qrcode";
import { CheckCircle2, AlertCircle, RotateCcw, Wallet, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { getAllReservations } from "@/lib/services/reservationService";
import Link from "next/link";

interface ReservationData {
  id: string;
  fullName: string;
  groupSize: number;
  status: "pending" | "confirmed" | "cancelled";
  qrCode?: string;
}

const WAVE_PHONE = "0779324187";
const WAVE_REDIRECT_URL = `https://wave.com/send?to=${WAVE_PHONE}`;

export default function PublicScanPage() {
  const { showToast } = useToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [lastScannedId, setLastScannedId] = useState<string | null>(null);
  const [scannedResult, setScannedResult] = useState<ReservationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isScanning) return;

    const qrcodeRegion = document.getElementById("qr-reader");
    if (!qrcodeRegion) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        disableFlip: false,
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        handleQrScan(decodedText);
      },
      (error) => {
        // Silently handle errors
      }
    );

    return () => {
      if (
        scannerRef.current &&
        scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        scannerRef.current.pause();
      }
    };
  }, [isScanning]);

  const handleQrScan = async (decodedText: string) => {
    if (lastScannedId === decodedText) {
      return;
    }

    setLastScannedId(decodedText);
    setLoading(true);
    setError(null);
    setScannedResult(null);

    try {
      const allReservations = await getAllReservations();
      const reservation = allReservations.find(
        (r) => r.qrCode === decodedText || r.id === decodedText || r.qrCode?.includes(decodedText)
      ) as ReservationData | undefined;

      if (!reservation) {
        setError("⚠️ Réservation introuvable. Veuillez contacter l'organisateur.");
        showToast("Réservation introuvable", "error");
        return;
      }

      if (reservation.status !== "confirmed") {
        setError("⚠️ Votre réservation n'est pas confirmée. Veuillez effectuer le paiement.");
        showToast("Réservation non confirmée", "error");
        return;
      }

      setScannedResult(reservation);
      showToast(`✓ Bienvenue ${reservation.fullName}!`, "success");
    } catch (err) {
      console.error("Error scanning QR:", err);
      setError("Erreur lors de la vérification. Réessayez.");
      showToast("Erreur lors du scan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    window.open(WAVE_REDIRECT_URL, "_blank");
  };

  const resetScan = () => {
    setScannedResult(null);
    setError(null);
    setLastScannedId(null);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10 px-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Vérifier Votre Accès</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Scanner votre Permit
          </h1>
          <p className="text-xs text-white/80 max-w-lg leading-relaxed font-serif italic">
            Scannez le code QR de votre réservation pour vérifier l'accès
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-2">
        <p className="text-xs font-semibold text-blue-900">
          💡 Comment ça marche ?
        </p>
        <p className="text-xs text-blue-800">
          Scannez votre QR code pour vérifier votre statut. Si vous devez payer, vous serez redirigé vers Wave.
        </p>
      </div>

      {/* Scanner */}
      {isScanning && !scannedResult && !error && (
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div id="qr-reader" style={{ width: "100%" }} className="rounded-2xl overflow-hidden" />

          <button
            onClick={() => setIsScanning(false)}
            className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Fermer Scanner
          </button>
        </div>
      )}

      {/* Success Result */}
      {scannedResult && (
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <div>
              <p className="font-extrabold text-lg text-green-900">
                ✓ Accès Autorisé!
              </p>
              <p className="text-sm text-green-800 mt-1">
                Bienvenue {scannedResult.fullName}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600">Nom</span>
              <span className="text-sm font-bold text-slate-900">{scannedResult.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600">Statut</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                scannedResult.status === "confirmed"
                  ? "bg-green-100 text-green-900"
                  : "bg-blue-100 text-blue-900"
              }`}>
                {scannedResult.status === "confirmed" ? "✓ Confirmé" : "En attente"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600">Personnes</span>
              <span className="text-sm font-bold text-slate-900">{scannedResult.groupSize}</span>
            </div>
          </div>

          <button
            onClick={resetScan}
            className="w-full px-4 py-3 bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white rounded-xl font-bold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Scanner Un Autre Code
          </button>
        </div>
      )}

      {/* Error Result */}
      {error && (
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
            <div>
              <p className="font-extrabold text-lg text-red-900">
                ✗ Accès Refusé
              </p>
              <p className="text-sm text-red-800 mt-1">
                {error}
              </p>
            </div>
          </div>

          {error.includes("paiement") && (
            <button
              onClick={handlePaymentRedirect}
              className="w-full px-4 py-4 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Payer avec Wave ({WAVE_PHONE})
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={resetScan}
            className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Réessayer
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm text-center py-10">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[var(--theme-secondary)] rounded-full" />
          </div>
          <p className="text-sm text-slate-600 mt-3">Vérification en cours...</p>
        </div>
      )}

      {/* Info Card - Payment */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl space-y-2">
        <p className="text-xs font-semibold text-yellow-900">
          💰 Paiement Wave
        </p>
        <p className="text-xs text-yellow-800">
          Pour payer votre réservation, envoyez le montant à <strong>{WAVE_PHONE}</strong> via Wave
        </p>
      </div>

      {/* Back Link */}
      <div className="text-center">
        <Link
          href="/"
          className="text-xs font-semibold text-[var(--theme-secondary)] hover:text-[var(--theme-primary)] transition-colors"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
