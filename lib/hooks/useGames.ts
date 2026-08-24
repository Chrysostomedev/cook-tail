"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllGames } from "@/lib/services/gameService";
import { Game } from "@/types/game";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllGames();
      setGames(data);
    } catch (err) {
      console.error("Error loading games:", err);
      setError("Impossible de charger les jeux");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  return { games, loading, error, reload: loadGames };
}