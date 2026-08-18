// app/(public)/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Utensils, 
  Ticket, 
  Info, 
  Sparkles,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navTabs = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Programme", href: "/programme", icon: Calendar },
    { label: "Menu", href: "/menu", icon: Utensils },
    { label: "Pass QR", href: "/reservation", icon: Ticket },
    { label: "Services", href: "/services", icon: Home },
    { label: "Contact", href: "/contact", icon: Info },
    { label: "Galerie", href: "/galerie", icon: Utensils },
    // { label: "Règles", href: "/reglement", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-amber-950 pb-28 md:pb-0">
      
      {/* Banner D'Annonce Marquee Discret & Chic */}
      <div className="bg-amber-900 text-amber-100 font-mono text-[11px] font-medium tracking-wider py-1.5 overflow-hidden whitespace-nowrap border-b border-amber-800/30">
        <div className="animate-marquee flex gap-12 shrink-0">
          <span className="inline-flex items-center gap-2">🎉 BRUNCH RÉCRÉATION 2026</span>
          <span className="text-amber-400">✦</span>
          <span>RETOUR DANS NOS ANNÉES COLLÈGE & LYCÉE</span>
          <span className="text-amber-400">✦</span>
          <span>📍 YOPOUGON SAPEUR-POMPIER</span>
          <span className="text-amber-400">✦</span>
          <span>🍹 SERVICE COOK'TAIL OFFICIEL</span>
        </div>
      </div>

      {/* Header Principal Épuré */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-slate-900/5">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-800 border border-amber-800/20 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base md:text-xl tracking-tight leading-none text-slate-900">
                COOK'TAIL <span className="text-amber-700 font-serif italic">SERVICE</span>
              </h1>
              <p className="text-[10px] font-mono text-amber-800/70 font-semibold uppercase tracking-widest mt-0.5">
                Brunch Récréation
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-2 font-semibold text-xs tracking-wide">
            {navTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl transition-all relative text-slate-700 hover:text-amber-900 hover:bg-amber-900/5",
                    isActive && "text-amber-900 font-bold bg-amber-500/15 border border-amber-700/20"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}

            <Link
              href="/reservation"
              className="ml-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:shadow-lg transition-all border border-amber-400/50 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Prendre Mon Pass
            </Link>
          </div>

        </div>
      </header>

      {/* Contenu Principal avec conteneur aéré */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Navigation Mobile Moderne (Floating Bottom Dock) */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-slate-950/90 text-white backdrop-blur-xl border border-white/15 rounded-3xl p-2 shadow-2xl flex justify-around items-center">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-200",
                  isActive
                    ? "bg-amber-400 text-slate-950 font-bold shadow-lg scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-slate-950" : "text-white/80")} />
                <span className="text-[9px] font-medium tracking-tight mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}