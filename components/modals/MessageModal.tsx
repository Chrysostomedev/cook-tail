// components/modals/MessageModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="bg-[#FEF08A] border-3 border-[#0B1B33] p-6 max-w-sm w-full rounded-xs shadow-[6px_6px_0px_0px_#0B1B33] rotate-[-1deg] relative"
        >
          {/* Scotch adhésif supérieur */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/80 border border-amber-400 rotate-1 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-[#0B1B33] hover:opacity-70"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-[#0B1B33]" />
            <h4 className="text-base font-extrabold text-[#0B1B33]">{title}</h4>
          </div>

          <p className="text-sm font-serif italic text-[#0B1B33]/90 leading-relaxed mb-5">
            {content}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-[#0B1B33] text-[#FEF08A] font-black py-2.5 rounded-xs border-2 border-black uppercase text-xs shadow-[2px_2px_0px_0px_#556B2F]"
          >
            J'ai compris
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};