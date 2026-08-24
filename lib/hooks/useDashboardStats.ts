"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllReservations } from "@/lib/services/reservationService";
import { getAnalyticsStats, AnalyticsStats } from "@/lib/services/analyticsService";

export function useDashboardStats() {
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAnalyticsStats(7);
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { analytics, loading, reload: load };
}