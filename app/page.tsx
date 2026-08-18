// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Sparkles } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    const timer = setTimeout(() => {
      router.replace("/accueil");
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] text-slate-900 p-6 overflow-hidden">
      {/* Halos Flous d'Arrière-plan */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-700/5 rounded-full blur-2xl pointer-events-none" />

      {/* Conteneur Central */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm text-center">
        
        {/* Badge Élégant Lumineux */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white border border-amber-900/10 rounded-3xl shadow-2xl shadow-amber-950/10 flex items-center justify-center p-5 transition-transform duration-500 hover:scale-105">
            <GraduationCap className="w-12 h-12 text-amber-700" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-xl shadow-lg border border-amber-300/50">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Textes */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-800/10">
            Brunch Récréation 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            COOK'TAIL <span className="text-amber-700 font-serif italic">SERVICE</span>
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Ouverture des portes de l'école en cours...
          </p>
        </div>

        {/* Barre de Progression Minimale & Minimaliste */}
        <div className="w-full space-y-2">
          <div className="w-full h-2 bg-amber-950/5 rounded-full p-0.5 overflow-hidden border border-amber-900/5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full transition-all duration-100 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono font-semibold text-slate-400">
            <span>CHARGEMENT</span>
            <span className="text-amber-700">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}