// app/not-found.tsx
import Link from "next/link";
import { Frown, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-slate-900">
      <div className="max-w-md w-full bg-white border border-amber-900/10 p-8 rounded-3xl shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-900" />
        
        <div className="w-20 h-20 bg-amber-500/10 text-amber-800 rounded-3xl border border-amber-800/10 flex items-center justify-center mx-auto shadow-inner">
          <Frown className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full">
            Heure de Retenue • Erreur 404
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Tu t'es perdu en classe ?
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed font-serif italic">
            Cette salle de classe est fermée ou le surveillant général a déplacé cette page !
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="w-full bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all shadow-lg"
          >
            <Home className="w-4 h-4 text-amber-400" /> Retourner à la Cour de Récré
          </Link>
        </div>
      </div>
    </div>
  );
}