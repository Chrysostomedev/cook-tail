// context/ToastContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={cn(
                "pointer-events-auto border-2 border-[#0B1B33] p-4 rounded-xs shadow-[4px_4px_0px_0px_#0B1B33] flex items-start gap-3 relative",
                toast.type === "success" && "bg-[#8FBC8F] text-[#0B1B33]",
                toast.type === "error" && "bg-[#DC2626] text-white",
                toast.type === "info" && "bg-[#FEF08A] text-[#0B1B33]"
              )}
            >
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 shrink-0" />}
              {toast.type === "error" && <AlertTriangle className="w-5 h-5 shrink-0" />}
              {toast.type === "info" && <Info className="w-5 h-5 shrink-0" />}

              <p className="text-xs font-bold font-mono leading-tight flex-1">{toast.message}</p>

              <button
                onClick={() => removeToast(toast.id)}
                className="hover:opacity-70 text-current"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast doit être utilisé dans ToastProvider");
  return context;
};