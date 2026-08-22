// app/admin/scanner/page.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScannerState } from "html5-qrcode";
import { CheckCircle2, AlertCircle, RotateCcw, X, Sparkles } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { updateReservation, getAllReservations } from "@/lib/services/reservationService";

interface ScannedData {
  reservationId: string;
  timestamp: Date;
  success: boolean;
}

export default function AdminScannerPage() {
  const { showToast } = useToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [scannedData, setScannedData] = useState<ScannedData[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [lastScannedId, setLastScannedId] = useState<string | null>(null);
  const [scannedCount, setScannedCount] = useState(0);

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
    if (lastScannedId === decodedText && Date.now() - (new Date(scannedData[scannedData.length - 1]?.timestamp || 0).getTime()) < 2000) {
      return;
    }

    setLastScannedId(decodedText);

    try {
      // Try to find reservation by qrCode or ID
      const allReservations = await getAllReservations();
      const reservation = allReservations.find(
        (r) => r.qrCode === decodedText || r.id === decodedText || r.qrCode?.includes(decodedText)
      );

      if (!reservation) {
        showToast("⚠️ Réservation introuvable", "error");
        setScannedData((prev) => [
          ...prev,
          { reservationId: decodedText, timestamp: new Date(), success: false },
        ]);
        return;
      }

      if (reservation.status === "confirmed") {
        showToast("✓ Déjà validé", "info");
        return;
      }

      // Update reservation status
      await updateReservation(reservation.id, { status: "confirmed" });

      showToast(
        `✓ ${reservation.fullName} validé (${reservation.groupSize} personne${reservation.groupSize > 1 ? "s" : ""})`,
        "success"
      );

      setScannedData((prev) => [
        ...prev,
        { reservationId: reservation.id, timestamp: new Date(), success: true },
      ]);

      setScannedCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error scanning QR:", error);
      showToast("Erreur lors du scan", "error");
    }
  };

  const resetScanner = () => {
    setScannedData([]);
    setScannedCount(0);
    setLastScannedId(null);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.pause();
    }
    setIsScanning(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[var(--theme-secondary)]/10 border border-[var(--theme-secondary)]/20 px-3 py-1 rounded-full text-[var(--theme-secondary)] text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Scanner QR Code</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Validation des Participants
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Scannez les codes QR des participants pour valider leur accès
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200/80 p-4 rounded-2xl">
          <p className="text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
            Scannés Aujourd'hui
          </p>
          <p className="text-3xl font-extrabold text-green-600">{scannedCount}</p>
        </div>
        <div className="bg-white border border-slate-200/80 p-4 rounded-2xl">
          <p className="text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
            Historique
          </p>
          <p className="text-3xl font-extrabold text-slate-900">{scannedData.length}</p>
        </div>
      </div>

      {/* Scanner */}
      {isScanning && (
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div id="qr-reader" style={{ width: "100%" }} className="rounded-2xl overflow-hidden" />

          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              onClick={resetScanner}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Réinitialiser
            </button>
            <button
              onClick={stopScanner}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm transition-all"
            >
              <X className="w-4 h-4" />
              Arrêter
            </button>
          </div>
        </div>
      )}

      {/* Start Scanner Button */}
      {!isScanning && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsScanning(true)}
            className="px-6 py-3 bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white rounded-2xl font-bold text-sm transition-all"
          >
            Relancer le Scanner
          </button>
        </div>
      )}

      {/* History */}
      {scannedData.length > 0 && (
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900">Historique du Scan</h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {[...scannedData].reverse().map((data, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  data.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {data.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${data.success ? "text-green-900" : "text-red-900"}`}>
                    {data.success ? "✓ Validé" : "✗ Erreur"}
                  </p>
                  <p className="text-xs text-slate-500">{data.reservationId}</p>
                </div>
                <span className="text-xs text-slate-500">
                  {data.timestamp.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
