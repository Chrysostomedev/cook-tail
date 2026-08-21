// app/admin/scanner/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Zap,
  ShieldCheck,
  User,
  Ticket,
  Clock,
  Sparkles,
  Camera,
  Volume2,
  VolumeX,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminScannerPage() {
  const [scanResult, setScanResult] = useState<{
    code: string;
    holderName: string;
    passType: string;
    timestamp: string;
  } | null>(null);

  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setStatus("scanning");
    setScanResult(null);
    setErrorMessage(null);

    try {
      const html5Qrcode = new Html5Qrcode("reader");
      scannerRef.current = html5Qrcode;

      await html5Qrcode.start(
        { facingMode: "environment" },
        {
          fps: 15,
          qrbox: { width: 260, height: 260 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleSuccessScan(decodedText);
        },
        () => {
          // Erreur courante lors de la recherche de frame (silencieuse)
        }
      );
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Impossible d'accéder à la caméra. Vérifiez les autorisations.");
    }
  };

  const handleSuccessScan = (decodedText: string) => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => { });
    }

    // Simulation de décodage du Pass
    if (decodedText.includes("INVALID") || decodedText.includes("EXPIRED")) {
      setStatus("error");
      setErrorMessage("Ce Pass est invalide ou a déjà été utilisé !");
    } else {
      setScanResult({
        code: decodedText,
        holderName: "Jean-Eudes Marc",
        passType: "Pass Élève VIP - Brunch Cook'Tail",
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      });
      setStatus("success");
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => { });
      }
    };
  }, []);

  const handleReset = () => {
    startScanner();
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> Annuler
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl border border-white/10 transition-all"
            title="Sons de validation"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Verification
          </span>
        </div>
      </div>

      {/* Main Terminal Scanner */}
      <div className="bg-[var(--theme-primary)] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
        {/* En-tête HUD */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" /> Validation des Pass
          </h1>
          <p className="text-xs text-slate-400">
            Pointez le QR Code du client à l'intérieur du cadre
          </p>
        </div>

        {/* Zone de scan vidéo / HUD */}
        <div className="relative mx-auto w-full max-w-sm aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-inner flex items-center justify-center">

          {/* Composant Caméra HTML5QRCode */}
          <div id="reader" className="w-full h-full object-cover" />

          {/* Calque Overlay HUD Viseur Fintech */}
          {status === "scanning" && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Masque Sombre Ambiant */}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />

              {/* Zone de découpe du viseur */}
              <div className="relative w-64 h-64 border-2 border-amber-400/30 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] flex items-center justify-center">

                {/* Coins Lumineux Viseur Fintech */}
                <div className="absolute -top-1 -left-1 w-7 h-7 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl" />
                <div className="absolute -top-1 -right-1 w-7 h-7 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl" />
                <div className="absolute -bottom-1 -left-1 w-7 h-7 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl" />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-4 border-r-4 border-amber-400 rounded-br-2xl" />

                {/* Laser de balayage animé */}
                <motion.div
                  initial={{ top: "5%" }}
                  animate={{ top: "90%" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                  className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#FBBF24]"
                />

                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest bg-slate-950/80 px-2.5 py-1 rounded-md border border-amber-400/20 backdrop-blur-md">
                  Aligner QR Code
                </span>
              </div>
            </div>
          )}

          {/* VUE DE SUCCÈS (Pass Valide) */}
          <AnimatePresence>
            {status === "success" && scanResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col justify-between text-center z-30"
              >
                <div className="space-y-4 my-auto">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase font-black tracking-widest bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 inline-block mb-2">
                      Pass Autorisé & Validé
                    </span>
                    <h2 className="text-xl font-black text-white">{scanResult.holderName}</h2>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">{scanResult.passType}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-left space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Code Billet:</span>
                      <span className="text-white font-bold">{scanResult.code}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Heure de Scan:</span>
                      <span className="text-white font-bold">{scanResult.timestamp}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" /> Scanner un Autre Billet
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* VUE D'ERREUR (Pass Invalide / Expiré) */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col justify-between text-center z-30"
              >
                <div className="space-y-4 my-auto">
                  <div className="w-16 h-16 bg-red-500/20 text-red-400 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    <XCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase font-black tracking-widest bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30 inline-block mb-2">
                      Accès Refusé
                    </span>
                    <h2 className="text-lg font-bold text-white">Scan Non Reconnu</h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      {errorMessage || "Le code scanné n'est pas répertorié dans la base Cook'Tail Service."}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/20"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" /> Réessayer le Scan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info terminal */}
        <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Moteur Optique 2.0
          </span>
          <span className="text-[10px] text-slate-300">Fast-Check Enabled</span>
        </div>
      </div>
    </div>
  );
}