// components/ui/Modal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#F4EBD9] border-3 border-[#0B1B33] p-6 max-w-lg w-full rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] relative"
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-[#0B1B33] hover:opacity-70">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-black uppercase text-[#0B1B33] mb-4 pb-2 border-b-2 border-black">{title}</h3>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};