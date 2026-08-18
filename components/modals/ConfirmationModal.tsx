// components/modals/ConfirmationModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#F4EBD9] border-3 border-[#0B1B33] p-6 max-w-md w-full rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] relative"
        >
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-[#0B1B33] hover:opacity-70"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 text-[#DC2626] mb-3">
            <AlertCircle className="w-7 h-7 shrink-0" />
            <h3 className="text-lg font-black uppercase text-[#0B1B33]">{title}</h3>
          </div>

          <p className="text-sm font-sans text-[#0B1B33]/80 leading-relaxed mb-6">
            {message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-white text-[#0B1B33] font-bold py-3 rounded-xs border-2 border-[#0B1B33] hover:bg-gray-100 uppercase text-xs"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#DC2626] text-white font-black py-3 rounded-xs border-2 border-[#0B1B33] shadow-[3px_3px_0px_0px_#0B1B33] hover:translate-x-0.5 uppercase text-xs"
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};