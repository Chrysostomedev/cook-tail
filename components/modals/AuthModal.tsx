// components/modals/AuthModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, KeyRound, ArrowRight, X, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess();
        onClose();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1C2826] text-[#F4EBD9] border-3 border-[#0B1B33] p-6 md:p-8 max-w-sm w-full rounded-xs shadow-[8px_8px_0px_0px_#556B2F] relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#556B2F] text-[#FEF08A] border-2 border-white rounded-xs flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_#0B1B33]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white">Espace Responsable</h3>
            <p className="text-xs font-mono text-gray-400 mt-1">Connexion sécurisée Staff & Admin</p>
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-300 mb-1">
                    Adresse Email Identifiant
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="admin@cooktail.ci"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-black/40 border-2 border-white/20 rounded-xs font-bold text-white text-sm focus:border-[#FEF08A] focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-5 bg-[#556B2F] text-white font-black py-3 rounded-xs border-2 border-black flex items-center justify-center gap-2 uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#0B1B33]"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="password-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-300 mb-1">
                    Mot de Passe Secrétaire
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-black/40 border-2 border-white/20 rounded-xs font-bold text-white text-sm focus:border-[#FEF08A] focus:outline-hidden"
                    />
                  </div>
                  <div className="flex gap-2 mt-5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 bg-gray-700 text-white font-bold py-3 rounded-xs border border-white/20 text-xs"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 bg-[#FEF08A] text-[#0B1B33] font-black py-3 rounded-xs border-2 border-black uppercase text-xs shadow-[3px_3px_0px_0px_#DC2626] flex items-center justify-center gap-2"
                    >
                      {loading ? "Vérification..." : "Accéder"}
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};