"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllServices } from "@/lib/services/servicesService";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: {
    url: string;
    cloudinaryId: string;
  };
  features: string[];
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      console.error("Error loading services:", err);
      setError("Impossible de charger les services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return { services, loading, error, reload: loadServices };
}