// components/modals/Modal.tsx
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
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)"
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            backgroundColor: "var(--theme-bgPrimary)",
            borderWidth: "3px",
            borderColor: "var(--theme-borderColor)",
            padding: "1.5rem",
            maxWidth: "32rem",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "var(--shadow-retro-lg)",
            position: "relative"
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              color: "var(--theme-textPrimary)",
              cursor: "pointer",
              opacity: 0.7,
              transition: "opacity 200ms"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
          >
            <X className="w-5 h-5" />
          </button>
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--theme-textPrimary)",
            marginBottom: "1rem",
            paddingBottom: "0.5rem",
            borderBottomWidth: "2px",
            borderBottomColor: "var(--theme-borderColor)"
          }}>
            {title}
          </h3>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};