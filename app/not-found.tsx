// app/not-found.tsx
"use client";

import Link from "next/link";
import { Compass, Home, ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  const content = {
    badge: "Erreur 404 • Page introuvable",
    title: "Accès non autorisé ou lien expiré",
    description: "Le pass ou la section que vous cherchez n'existe pas ou a été déplacé par l'administration Cook'Tail.",
    primaryBtn: "Retour au Dashboard",
    primaryHref: "/admin/dashboard",
    secondaryBtn: "Centre d'Assistance",
    secondaryHref: "/contact",
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4" style={{ backgroundColor: 'var(--theme-bgSecondary)' }}>
      <div className="max-w-md w-full rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-xl" style={{ backgroundColor: 'var(--theme-bgPrimary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)' }}>
        {/* Accent Ligne Supérieure */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ backgroundImage: `linear-to-right, var(--theme-secondary), var(--theme-secondary)` }} />
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20" style={{ backgroundColor: 'var(--theme-secondary)' }} />

        {/* Icone Centrale Épurée */}
        <div className="w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-inner" style={{ backgroundColor: `var(--theme-secondary)20`, borderColor: `var(--theme-secondary)40`, color: 'var(--theme-secondary)' }}>
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        {/* Textes */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block" style={{ backgroundColor: `var(--theme-secondary)20`, color: 'var(--theme-secondary)', borderWidth: '1px', borderColor: `var(--theme-secondary)40` }}>
            {content.badge}
          </span>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>
            {content.title}
          </h1>
          <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--theme-textSecondary)' }}>
            {content.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-2.5">
          <Link
            href={content.primaryHref}
            className="w-full font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'white' }}
          >
            <Home className="w-4 h-4" /> {content.primaryBtn}
          </Link>

          <Link
            href={content.secondaryHref}
            className="w-full font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all active:scale-95"
            style={{ backgroundColor: `var(--theme-bgSecondary)`, color: 'var(--theme-textPrimary)', borderWidth: '1px', borderColor: 'var(--theme-borderColor)' }}
          >
            <HelpCircle className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} /> {content.secondaryBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}