// components/modals/GamePreferencesModal.tsx
// Post-registration modal for user to select game preferences

"use client";

import React, { useState, useEffect } from "react";
import { X, Heart, CheckCircle2, AlertCircle, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllGames } from "@/lib/services/gameService";
import { addGamePreference } from "@/lib/services/gameService";
import { Game, CreateUserGamePreferenceDTO } from "@/types/game";
import { cn } from "@/lib/utils";

interface GamePreferencesModalProps {
  isOpen: boolean;
  userId: string;
  userName: string;
  onClose: () => void;
  onComplete?: () => void;
}

export function GamePreferencesModal({
  isOpen,
  userId,
  userName,
  onClose,
  onComplete,
}: GamePreferencesModalProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGames, setSelectedGames] = useState<{
    [gameId: string]: "interested" | "very_interested";
  }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Load games
  useEffect(() => {
    if (isOpen) {
      loadGames();
    }
  }, [isOpen]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await getAllGames(true); // Only active games
      setGames(data);
    } catch (error) {
      console.error("Error loading games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle game selection
  const toggleGame = (
    gameId: string,
    level: "interested" | "very_interested"
  ) => {
    setSelectedGames((prev) => {
      const current = prev[gameId];
      if (current === level) {
        // Deselect if clicking same level again
        const newSelection = { ...prev };
        delete newSelection[gameId];
        return newSelection;
      }
      return { ...prev, [gameId]: level };
    });
  };

  // Submit preferences
  const handleSubmit = async () => {
    if (Object.keys(selectedGames).length === 0) {
      alert("Sélectionnez au moins un jeu");
      return;
    }

    try {
      setSubmitting(true);

      // Add all preferences
      const gameMap: { [key: string]: string } = {};
      games.forEach((g) => {
        gameMap[g.id] = g.name;
      });

      for (const [gameId, level] of Object.entries(selectedGames)) {
        const preference: CreateUserGamePreferenceDTO = {
          gameId,
          preferenceLevel: level,
        };
        await addGamePreference(userId, preference, gameMap[gameId]);
      }

      setCompleted(true);

      // Auto-close after 2 seconds
      setTimeout(() => {
        setCompleted(false);
        onClose();
        onComplete?.();
      }, 2000);
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:mx-auto sm:max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white p-5 sm:p-6 flex items-start justify-between sticky top-0">
          <div className="space-y-1 flex-1">
            <h2 className="text-lg sm:text-xl font-extrabold">
              Bienvenue {userName} ! 🎮
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Quels jeux traditionnels ivoiriens voulez-vous jouer ?
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-all flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {loading ? (
            <div className="text-center py-10">
              <Loader className="w-6 h-6 text-[var(--theme-secondary)] mx-auto animate-spin" />
              <p className="text-xs text-slate-400 mt-2">Chargement des jeux...</p>
            </div>
          ) : completed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-900 mb-1">Préférences enregistrées !</p>
              <p className="text-xs text-slate-400">
                Vous recevrez les détails des jeux bientôt
              </p>
            </motion.div>
          ) : (
            <>
              {/* Games Grid */}
              <div className="space-y-3">
                {games.length > 0 ? (
                  games.map((game) => (
                    <div
                      key={game.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-start gap-4">
                        {/* Image */}
                        {game.image?.url && (
                          <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                            <img
                              src={game.image.url}
                              alt={game.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900">{game.name}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                            {game.description}
                          </p>
                          <div className="flex gap-2 mt-2 text-[10px] text-slate-500">
                            <span>👥 {game.minPlayers}-{game.maxPlayers}</span>
                            <span>⚡ {game.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Selection Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleGame(game.id, "interested")}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                            selectedGames[game.id] === "interested"
                              ? "bg-amber-500 text-white"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          )}
                        >
                          <Heart className="w-3 h-3" />
                          Intéressé
                        </button>
                        <button
                          onClick={() => toggleGame(game.id, "very_interested")}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                            selectedGames[game.id] === "very_interested"
                              ? "bg-[var(--theme-secondary)] text-white"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          )}
                        >
                          <Heart className="w-3 h-3 fill-current" />
                          Très Intéressé
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Aucun jeu disponible pour le moment</p>
                  </div>
                )}
              </div>

              {/* Info */}
              {Object.keys(selectedGames).length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900">
                    {Object.keys(selectedGames).length} jeu(x) sélectionné(s)
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
                >
                  Passer
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    Object.keys(selectedGames).length === 0 || submitting
                  }
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2",
                    Object.keys(selectedGames).length > 0
                      ? "bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-[var(--theme-secondary)]"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader className="w-3 h-3 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Valider Choix
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
