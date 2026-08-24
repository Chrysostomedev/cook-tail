// lib/hooks/useReservation.ts
"use client";

import type { Reservation } from "@/types";
import { useState, useEffect, useCallback } from "react";
import {
  createReservation,
  submitWaveReference,
  getAllReservations,
} from "@/lib/services/reservationService";


// Hook pour la page publique : créer une réservation + rattacher une réf Wave
export function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    data: { fullName: string; phone: string; groupSize: number },
    amount: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createReservation(data, amount);
      return result;
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la réservation");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const attachWaveRef = async (reservationId: string, waveRef: string) => {
    await submitWaveReference(reservationId, waveRef);
  };

  return { submit, attachWaveRef, loading, error };
}

// Hook pour la page admin : lister toutes les réservations
export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllReservations();
      setReservations(data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { reservations, loading, error, refresh };
}