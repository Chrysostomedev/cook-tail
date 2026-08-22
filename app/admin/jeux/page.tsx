// app/admin/jeux/page.tsx
// Admin page for managing games

"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Upload,
  Sparkles,
  Zap,
  Save,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "@/lib/cloudinary";
import { createGame, getAllGames, updateGame, deleteGame } from "@/lib/services/gameService";
import { Game, CreateGameDTO } from "@/types/game";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "traditional", label: "Traditionnel" },
  { value: "board", label: "Jeu de Plateau" },
  { value: "card", label: "Jeu de Cartes" },
  { value: "outdoor", label: "Extérieur" },
];

const DIFFICULTIES = [
  { value: "easy", label: "Facile" },
  { value: "medium", label: "Moyen" },
  { value: "hard", label: "Difficile" },
];

interface FormData {
  name: string;
  description: string;
  rules: string;
  category: "traditional" | "board" | "card" | "outdoor";
  minPlayers: number;
  maxPlayers: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string;
}

export default function AdminGamesPage() {
  const { showToast } = useToast();

  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    rules: "",
    category: "traditional",
    minPlayers: 2,
    maxPlayers: 2,
    difficulty: "medium",
  });

  // Load games
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await getAllGames();
      setGames(data);
    } catch (error) {
      console.error("Error loading games:", error);
      showToast("Erreur lors du chargement des jeux", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);

      // Upload to Cloudinary
      const result = await uploadImageToCloudinary(file, "games");
      setFormData((prev) => ({
        ...prev,
        imageUrl: result.secure_url,
      }));

      showToast("Image téléchargée avec succès", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Erreur lors du téléchargement", "error");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Open modal for new game
  const handleNewGame = () => {
    setSelectedGame(null);
    setFormData({
      name: "",
      description: "",
      rules: "",
      category: "traditional",
      minPlayers: 2,
      maxPlayers: 2,
      difficulty: "medium",
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditGame = (game: Game) => {
    setSelectedGame(game);
    setFormData({
      name: game.name,
      description: game.description,
      rules: game.rules,
      category: game.category,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
      difficulty: game.difficulty,
      imageUrl: game.image?.url,
    });
    setImagePreview(game.image?.url || null);
    setIsModalOpen(true);
  };

  // Save game
  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.imageUrl) {
      showToast("Le nom et l'image sont obligatoires", "error");
      return;
    }

    try {
      setUploading(true);

      if (selectedGame) {
        // Update existing
        await updateGame(selectedGame.id, formData);
        showToast("Jeu modifié avec succès", "success");
      } else {
        // Create new
        const gameData: CreateGameDTO = {
          ...formData,
          imageUrl: formData.imageUrl,
        };
        await createGame(gameData, "admin");
        showToast("Jeu créé avec succès", "success");
      }

      setIsModalOpen(false);
      await loadGames();
    } catch (error) {
      console.error("Error saving game:", error);
      showToast("Erreur lors de la sauvegarde", "error");
    } finally {
      setUploading(false);
    }
  };

  // Delete game
  const handleDeleteGame = async (gameId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce jeu ?")) return;

    try {
      await deleteGame(gameId);
      showToast("Jeu supprimé avec succès", "success");
      await loadGames();
    } catch (error) {
      console.error("Error deleting game:", error);
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const filteredGames = games.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[var(--theme-secondary)]/10 border border-[var(--theme-secondary)]/20 px-3 py-1 rounded-full text-[var(--theme-secondary)] text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Gestion des Jeux</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Jeux Traditionnels Ivoiriens
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Gérez les jeux disponibles lors de l'événement
          </p>
        </div>

        <button
          onClick={handleNewGame}
          className="bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Jeu</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
          />
        </div>
      </div>

      {/* Games Grid */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-slate-400">Chargement...</p>
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Image */}
              {game.image?.url && (
                <div className="w-full h-32 bg-slate-100 overflow-hidden">
                  <img
                    src={game.image.url}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-extrabold text-slate-900">{game.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {game.description}
                  </p>
                </div>

                {/* Info */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Joueurs:</span>
                    <span className="font-semibold">
                      {game.minPlayers}-{game.maxPlayers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Difficulté:</span>
                    <span className="font-semibold capitalize">{game.difficulty}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleEditGame(game)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
                  >
                    <Edit2 className="w-3 h-3" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400">Aucun jeu trouvé</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[5%] sm:mx-auto sm:max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="bg-[var(--theme-primary)] text-white p-5 flex items-center justify-between sticky top-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[var(--theme-secondary)] text-white rounded-xl">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm">
                    {selectedGame ? "Modifier" : "Créer"} un Jeu
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveGame} className="p-6 space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Image du Jeu *
                  </label>
                  <div className="relative">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-xl mb-2"
                      />
                    )}
                    <label className="block w-full p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-[var(--theme-secondary)] transition-all cursor-pointer text-center">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-slate-600">
                        {uploading ? "Téléchargement..." : "Cliquez ou déposez une image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nom du Jeu *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all resize-none"
                  />
                </div>

                {/* Rules */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Règles du Jeu
                  </label>
                  <textarea
                    value={formData.rules}
                    onChange={(e) =>
                      setFormData({ ...formData, rules: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Catégorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Players & Difficulty */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Min Joueurs
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.minPlayers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minPlayers: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Max Joueurs
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.maxPlayers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxPlayers: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Difficulté
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    >
                      {DIFFICULTIES.map((diff) => (
                        <option key={diff.value} value={diff.value}>
                          {diff.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-4 py-2.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-[var(--theme-secondary)] rounded-xl text-xs font-bold uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {uploading ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
