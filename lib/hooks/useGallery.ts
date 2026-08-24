"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllGalleryItems, GalleryItem } from "@/lib/services/galleryService";

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllGalleryItems();
      setItems(data);
    } catch (err) {
      console.error("Error loading gallery items:", err);
      setError("Impossible de charger la galerie");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { items, loading, error, reload: loadItems };
}