import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COLLECTION = "pageViews";

type DeviceType = "mobile" | "desktop" | "tablet";

function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobile|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const key = "cooktail_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

/**
 * Enregistre une vue de page (à appeler côté client uniquement, sur les pages publiques)
 */
export async function trackPageView(path: string): Promise<void> {
  try {
    await addDoc(collection(db, COLLECTION), {
      path,
      sessionId: getSessionId(),
      device: detectDevice(),
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    // On ne bloque jamais l'UI pour un souci de tracking
    console.warn("Analytics tracking failed:", error);
  }
}

export interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  deviceBreakdown: { device: DeviceType; count: number; percentage: number }[];
  topPages: { path: string; count: number }[];
  dailyTrend: { day: string; count: number }[];
}

/**
 * Agrège les stats sur les N derniers jours (par défaut 7)
 */
export async function getAnalyticsStats(daysBack = 7): Promise<AnalyticsStats> {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);

    // Pas d'orderBy pour éviter un index composite - tri fait côté client
    const q = query(
      collection(db, COLLECTION),
      where("timestamp", ">=", Timestamp.fromDate(cutoff))
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((d) => d.data());

    const totalPageViews = docs.length;
    const uniqueVisitors = new Set(docs.map((d) => d.sessionId)).size;

    // Répartition par appareil
    const deviceCounts: Record<string, number> = {};
    docs.forEach((d) => {
      deviceCounts[d.device] = (deviceCounts[d.device] || 0) + 1;
    });
    const deviceBreakdown = Object.entries(deviceCounts).map(([device, count]) => ({
      device: device as DeviceType,
      count,
      percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
    }));

    // Pages les plus vues
    const pageCounts: Record<string, number> = {};
    docs.forEach((d) => {
      pageCounts[d.path] = (pageCounts[d.path] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Tendance journalière
    const dayLabels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const dailyCounts: Record<string, number> = {};
    docs.forEach((d) => {
      const date = d.timestamp?.toDate?.() || new Date();
      const key = date.toISOString().slice(0, 10);
      dailyCounts[key] = (dailyCounts[key] || 0) + 1;
    });
    const dailyTrend = Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dateKey, count]) => ({
        day: dayLabels[new Date(dateKey).getDay()],
        count,
      }));

    return { totalPageViews, uniqueVisitors, deviceBreakdown, topPages, dailyTrend };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      deviceBreakdown: [],
      topPages: [],
      dailyTrend: [],
    };
  }
}