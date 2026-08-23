"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllMenuItems, MenuItem } from "@/lib/services/menuService";

export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMenuItems();
      setItems(data);
    } catch (err) {
      console.error("Error loading menu items:", err);
      setError("Impossible de charger le menu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { items, loading, error, reload: loadItems };
}