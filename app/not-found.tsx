// app/not-found.tsx
import Link from "next/link";
import { Frown, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--theme-bgPrimary)', color: 'var(--theme-textPrimary)' }}>
      <div className="max-w-md w-full border p-8 rounded-3xl shadow-2xl text-center space-y-6 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bgSecondary)', borderColor: 'var(--theme-borderColor)', borderWidth: '1px' }}>
        <div className="absolute top-0 left-0 w-full h-2" style={{ background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary), var(--theme-accent))` }} />
        
        <div className="w-20 h-20 rounded-3xl border-2 flex items-center justify-center mx-auto shadow-inner" style={{ backgroundColor: `var(--theme-primary)20`, color: 'var(--theme-primary)', borderColor: `var(--theme-primary)40` }}>
          <Frown className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' }}>
            Erreur 404 • Page Non Trouvée
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>
            Tu t'es perdu en classe ?
          </h1>
          <p className="text-xs leading-relaxed font-serif italic" style={{ color: 'var(--theme-textSecondary)' }}>
            Cette salle de classe est fermée ou le surveillant général a déplacé cette page !
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <Link
            href="/"
            className="w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all shadow-lg" style={{ backgroundColor: 'var(--theme-primary)', color: 'white', boxShadow: `4px 4px 0px 0px var(--theme-secondary)` }}
          >
            <Home className="w-4 h-4" /> Retourner à l'Accueil
          </Link>
          
          <Link
            href="/contact"
            className="w-full font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all border-2" style={{ backgroundColor: 'transparent', color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}
          >
            <ArrowLeft className="w-4 h-4" /> Contacter le Support
          </Link>
        </div>
      </div>
    </div>
  );
}