// components/layout/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Ticket,
  Sparkles,
  Menu,
  X,
  BookOpen,
  Phone,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const NAV_LINKS = [
    { href: "/programme", label: "Programme", icon: BookOpen },
    { href: "/reglement", label: "Règlement Intérieur", icon: ShieldCheck },
    { href: "/contact", label: "Secrétariat / Contact", icon: Phone },
    { href: "/faq", label: "Foire Aux Questions", icon: HelpCircle },
  ];

  return (
    <>
      {/* Header Desktop & Tablette */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b-2 border-[#0B1B33]/10 px-4 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Brand Logo - Remplacement du texte "Cook'Tail" */}
          <Link href="/" className="group flex items-center gap-3 active:scale-95 transition-transform">
            <div className="relative w-12 h-12 rounded-xl bg-[#0B1B33] border-2 border-[#0B1B33] p-1 shadow-[3px_3px_0px_0px_#FEF08A] overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/logo.png" // Remplace par le chemin exact de ton logo
                alt="Logo Brunch Récréation Cook'Tail"
                width={44}
                height={44}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base leading-tight text-[#0B1B33] tracking-tight uppercase">
                BRUNCH <span className="text-amber-600 font-serif italic lowercase">Récréation</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Édition Exclusive
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0B1B33]/5 p-1.5 rounded-2xl border border-[#0B1B33]/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-bold text-[#0B1B33] hover:bg-white rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Principal */}
          <div className="flex items-center gap-2">
            <Link
              href="/mon-pass/demo"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B33] hover:text-amber-600 px-3 py-2 rounded-xl hover:bg-amber-100/50 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Mon Pass
            </Link>

            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 bg-[#0B1B33] hover:bg-amber-400 hover:text-[#0B1B33] text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl border-2 border-[#0B1B33] shadow-[3px_3px_0px_0px_#FEF08A] transition-all uppercase tracking-wide active:translate-x-0.5 active:translate-y-0.5"
            >
              <Ticket className="w-4 h-4 text-amber-300" />
              Réserver
            </Link>
          </div>

        </div>
      </header>

      {/* Bouton Hamburger Flottant sur Mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
          className="bg-[#0B1B33] text-[#FEF08A] p-4 rounded-full border-3 border-black shadow-[4px_4px_0px_0px_#FEF08A] active:scale-95 transition-all flex items-center justify-center"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Tiroir de Navigation Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />

            {/* Modal / Menu Tiroir */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F8F6F0] border-t-3 border-[#0B1B33] rounded-t-3xl p-6 z-40 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#0B1B33]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B1B33] p-1 border border-black">
                    <Image
                      src="/logo.png"
                      alt="Logo Mobile"
                      width={36}
                      height={36}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase text-[#0B1B33]">Menu de la Récré</h3>
                    <p className="text-[10px] font-mono text-slate-600">Sélectionnez une rubrique</p>
                  </div>
                </div>
              </div>

              {/* Liens du Menu Mobile */}
              <nav className="space-y-2">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between bg-white border-2 border-[#0B1B33] p-3.5 rounded-xl font-bold text-xs uppercase text-[#0B1B33] shadow-[3px_3px_0px_0px_#0B1B33] active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-amber-600" />
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bouton de réservation dans le menu mobile */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/reservation"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-[#FEF08A] text-[#0B1B33] font-black py-3.5 px-4 rounded-xl border-2 border-[#0B1B33] shadow-[4px_4px_0px_0px_#0B1B33] text-center uppercase text-xs flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  Réserver Mon Pass Maintenant
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};