// app/admin/scanner/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AdminScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        setStatus("success");
        scanner.clear();
      },
      (errorMessage) => {
        // scan error continu
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  const handleReset = () => {
    setScanResult(null);
    setStatus("idle");
    window.location.reload();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" /> Retour Dashboard
        </Link>
        <span className="text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full">
          Caméra Active
        </span>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl space-y-6 text-center">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Scan du Pass Élève</h1>
          <p className="text-xs text-slate-500 mt-1">
            Pointez l'appareil photo vers le QR Code du participant.
          </p>
        </div>

        {status === "idle" && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-2">
            <div id="reader" className="w-full text-white" />
          </div>
        )}

        {status === "success" && (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-700 block font-bold">Pass Validé !</span>
              <p className="text-lg font-mono font-black text-slate-900 mt-1">{scanResult}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full bg-slate-950 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Scanner un Autre Pass
            </button>
          </div>
        )}
      </div>
    </div>
  );
}