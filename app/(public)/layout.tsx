// app/(public)/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Utensils,
  Ticket,
  Info,
  Menu,
  X,
  ChevronDown,
  Image as GalleryIcon,
  Briefcase,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allNavTabs = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Programme", href: "/programme", icon: Calendar },
    { label: "Menu", href: "/menu", icon: Utensils },
    { label: "Pass QR", href: "/reservation", icon: Ticket },
    { label: "Services", href: "/services", icon: Briefcase },
    { label: "Contact", href: "/contact", icon: Info },
    { label: "Galerie", href: "/galerie", icon: GalleryIcon },
    { label: "Profil", href: "/profil", icon: User },
  ];

  const bottomBarTabs = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Programme", href: "/programme", icon: Calendar },
    { label: "Services", href: "/services", icon: Utensils },
    { label: "Pass QR", href: "/reservation", icon: Ticket },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-amber-950 pb-24 md:pb-0">

      {/* Header Haut Épuré & Moderne */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/85 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0B1B33] rounded-2xl p-1.5 shadow-md shadow-slate-900/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/img/logo.png"
                alt="Logo Cook'Tail"
                width={36}
                height={36}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-base md:text-xl tracking-tight leading-none text-slate-900 uppercase">
                COOK'TAIL <span className="text-amber-700 font-serif italic lowercase">Service</span>
              </h1>
              <p className="text-[10px] font-mono text-amber-800/80 font-semibold uppercase tracking-widest mt-0.5">
                Brunch Récréation
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
            {allNavTabs.slice(0, 6).map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-200/50",
                    isActive && "bg-amber-500/15 text-amber-900 font-bold border border-amber-500/20"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}

            <Link
              href="/reservation"
              className="ml-2 bg-[#0B1B33] hover:bg-slate-800 text-amber-300 px-5 py-2.5 font-bold text-xs uppercase rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              Prendre Mon Pass
            </Link>
          </div>

          {/* Unique Bouton Hamburger (Haut Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden bg-[#0B1B33] text-amber-300 p-2.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Contenu Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Footer affiché uniquement sur PC/Desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Bar Flottante Moderne (Mobile uniquement) */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-[#0B1B33]/95 text-white backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-xl flex justify-around items-center">
          {bottomBarTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 relative",
                  isActive
                    ? "bg-amber-400 text-slate-950 font-bold shadow-md"
                    : "text-slate-300 hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-slate-950" : "text-amber-300/90")} />
                <span className="text-[10px] font-medium tracking-tight mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Modale / Tiroir Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FAF7F2] border-t border-slate-200 rounded-t-3xl p-5 z-50 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B1B33] p-1.5 shadow-sm">
                    <Image
                      src="/img/logo.png"
                      alt="Logo Mobile"
                      width={32}
                      height={32}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Navigation Générale</h3>
                    <p className="text-[11px] text-slate-500">Toutes les sections de l'événement</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-slate-200/80 hover:bg-slate-200 text-slate-700 p-2 rounded-xl active:scale-95 transition-all flex items-center gap-1 text-xs font-semibold"
                  aria-label="Réduire"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Réduire</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {allNavTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname === tab.href;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all",
                        isActive
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-950 font-bold shadow-xs"
                          : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/reservation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[#0B1B33] text-amber-300 font-bold py-3.5 px-4 rounded-xl shadow-md text-center uppercase text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  Réserver Mon Pass QR (30 Places)
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}