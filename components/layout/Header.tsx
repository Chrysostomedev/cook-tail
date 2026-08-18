// components/layout/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Ticket, GraduationCap, Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/85 backdrop-blur-md border-b border-amber-900/10 px-4 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo / Badge Marque Chaleureux */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/15 text-amber-900 border border-amber-800/20 flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <GraduationCap className="w-5 h-5 text-amber-700 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base md:text-lg leading-tight text-slate-900 tracking-tight">
              BRUNCH <span className="text-amber-700 font-serif italic">RÉCRÉATION</span>
            </span>
            <span className="text-[10px] font-mono font-semibold text-amber-800/70 tracking-widest uppercase">
              Cook'Tail Service
            </span>
          </div>
        </Link>

        {/* Navigation & CTA Principal */}
        <div className="flex items-center gap-3">
          <Link
            href="/mon-pass/demo"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-800 px-3 py-2 rounded-xl hover:bg-amber-900/5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Mon Pass
          </Link>

          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm px-4 md:px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide border border-slate-800"
          >
            <Ticket className="w-4 h-4 text-amber-400" />
            Réserver
          </Link>
        </div>

      </div>
    </header>
  );
};