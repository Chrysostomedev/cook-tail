// components/modals/QRCodeModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Check } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  guestName: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  reference,
  guestName,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-[#F4EBD9] border-4 border-[#0B1B33] p-6 max-w-sm w-full rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] relative"
        >
          {/* Bouton Fermer */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-[#DC2626] text-white flex items-center justify-center border-2 border-black rounded-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center pt-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-[#0B1B33] text-white px-2 py-0.5 rounded-xs">
              Pass VIP Officiel
            </span>
            <h3 className="text-xl font-black text-[#0B1B33] mt-2">{guestName}</h3>
            <p className="text-xs font-mono font-bold text-[#556B2F]">{reference}</p>

            {/* Faux Cadre QR Code Brutaliste */}
            <div className="my-6 bg-white p-4 border-2 border-[#0B1B33] inline-block shadow-[4px_4px_0px_0px_#0B1B33]">
              <div className="w-44 h-44 bg-neutral-900 flex items-center justify-center text-white font-mono text-xs text-center p-2">
                [ QR CODE INTERACTIF ]
                <br />
                {reference}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#0B1B33] text-white py-2.5 font-bold text-xs rounded-xs border-2 border-black flex items-center justify-center gap-1.5">
                <Download className="w-4 h-4" /> Sauvegarder
              </button>
              <button className="bg-[#556B2F] text-white p-2.5 rounded-xs border-2 border-black">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};