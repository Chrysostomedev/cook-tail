// components/scanner/QRScanner.tsx
"use client";

import React, { useState } from "react";
import { QrCode, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (code: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  const [inputCode, setInputCode] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      onScanSuccess(inputCode.trim());
      setInputCode("");
    }
  };

  return (
    <div className="bg-[#1C2826] text-white border-3 border-[#0B1B33] p-6 rounded-xs shadow-[8px_8px_0px_0px_#556B2F] space-y-6">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 bg-[#FEF08A] text-[#0B1B33] border-2 border-black rounded-xs flex items-center justify-center mx-auto mb-2 shadow-[2px_2px_0px_0px_#0B1B33]">
          <QrCode className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-black uppercase text-white">Scanner de Pass QR</h3>
        <p className="text-xs font-mono text-gray-400">Vérification instantanée des billets</p>
      </div>

      {/* Animation Viseur Caméra Virtuelle */}
      <div className="relative w-full h-48 bg-black/60 border-2 border-dashed border-[#FEF08A] rounded-xs flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FEF08A]/10 to-transparent animate-pulse" />
        <span className="text-xs font-mono text-gray-400">Viseur Caméra Actif...</span>
      </div>

      {/* Saisie Manuelle de Sécurité */}
      <form onSubmit={handleManualSubmit} className="space-y-3 pt-2">
        <label className="block text-[10px] font-mono font-bold uppercase text-gray-300">
          Saisie Manuelle Code Référence (ex: BR-2026-0012)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="BR-2026-XXXX"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-1 px-3 py-2 bg-black/40 border border-white/30 rounded-xs font-mono text-xs font-bold text-white focus:border-[#FEF08A] focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-[#556B2F] text-white font-black px-4 py-2 rounded-xs border border-white text-xs uppercase shadow-[2px_2px_0px_0px_#0B1B33]"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};