"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Zap, Loader, Gamepad2, ChevronDown } from "lucide-react";
import { useGames } from "@/lib/hooks/useGames";

const CATEGORY_LABELS: Record<string, string> = {
  traditional: "Traditionnel",
  board: "Jeu de Plateau",
  card: "Jeu de Cartes",
  outdoor: "Extérieur",
};

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "Facile", color: "bg-emerald-100 text-emerald-700" },
  medium: { label: "Moyen", color: "bg-amber-100 text-amber-700" },
  hard: { label: "Difficile", color: "bg-rose-100 text-rose-700" },
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80";

export default function GamesPage() {
  const { games, loading, error } = useGames();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: 'var(--theme-secondary)' }} />
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
          <Gamepad2 className="w-3.5 h-3.5" /> Animations & Récréation
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3">
          Jeux <span className="font-serif italic" style={{ color: 'var(--theme-bgSecondary)' }}>Traditionnels</span>
        </h1>
        <p className="text-xs md:text-sm mt-2 max-w-xl opacity-90">
          Osselets, awalé, dames, et bien d'autres classiques de la récréation pour animer votre événement.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader className="w-6 h-6 animate-spin text-[var(--theme-primary)]" />
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-red-50 rounded-2xl border border-dashed border-red-200">
          <p className="text-xs font-bold text-red-600">{error}</p>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-xs font-bold text-slate-600">Les jeux sont en cours de préparation</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const isExpanded = expandedId === game.id;
            const diff = DIFFICULTY_LABELS[game.difficulty];
            return (
              <div
                key={game.id}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={game.image?.url || FALLBACK_IMAGE}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">
                    {CATEGORY_LABELS[game.category] || game.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-slate-900">{game.name}</h3>
                    {diff && (
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg shrink-0 ${diff.color}`}>
                        {diff.label}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">{game.description}</p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Users className="w-3.5 h-3.5" />
                    {game.minPlayers === game.maxPlayers
                      ? `${game.minPlayers} joueurs`
                      : `${game.minPlayers} à ${game.maxPlayers} joueurs`}
                  </div>

                  {game.rules && (
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : game.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-[var(--theme-secondary)]"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Règles du jeu
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      {isExpanded && (
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                          {game.rules}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}