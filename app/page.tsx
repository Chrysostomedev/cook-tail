"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import Image from "next/image";

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F5] text-slate-900 p-6 overflow-hidden">
      {/* Halos Flous d'Arrière-plan aux couleurs Cook'Tail (Vert Lime & Magenta) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-lime-300/15 rounded-full blur-2xl pointer-events-none" />

      {/* Conteneur Central */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm text-center">

        {/* Badge Logo avec Animation qui Bondit (Bounce) */}
        <div className="relative group">
          {/* Ombre portée dynamique sous le logo lors du rebond */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-3 bg-lime-950/10 rounded-full blur-sm animate-[ping_2s_infinite] pointer-events-none" />

          {/* Card Conteneur du Logo avec animation Bounce */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white/90 backdrop-blur-md border border-lime-500/20 rounded-3xl shadow-xl shadow-lime-900/10 flex items-center justify-center p-3 transition-transform duration-500 hover:scale-105 animate-[bounce_2s_infinite]">
            <img
              src="/img/logo.png"
              alt="Cook'Tail Logo"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>

          {/* Badge Sparkles Magenta Accent */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white p-2.5 rounded-xl shadow-lg shadow-fuchsia-500/30 border border-fuchsia-300/40 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Textes Stylisés */}
        <div className="space-y-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-lime-800 bg-lime-500/15 px-4 py-1.5 rounded-full border border-lime-600/20 shadow-xs">
            Brunch Récréation 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            COOK'TAIL <span className="text-fuchsia-700 font-serif italic">SERVICE</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Ouverture des portes de l'école en cours...
          </p>
        </div>

        {/* Barre de Progression aux teintes Lime -> Magenta */}
        <div className="w-full space-y-2">
          <div className="w-full h-2.5 bg-slate-200/70 rounded-full p-0.5 overflow-hidden border border-lime-900/10 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-lime-500 via-lime-600 to-fuchsia-600 rounded-full transition-all duration-100 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-400">
            <span>CHARGEMENT</span>
            <span className="text-lime-700">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}