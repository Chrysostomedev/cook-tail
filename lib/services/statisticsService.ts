// lib/services/statisticsService.ts
// Firebase service for statistics

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Statistics {
  totalReservations: number;
  confirmedReservations: number;
  totalRevenue: number;
  averagePartySize: number;
  totalVisitors: number;
  gamesTally: number;
  menuItemsTally: number;
  servicesAvailable: number;
  lastUpdated: Date;
}

const COLLECTION = "statistics";

/**
 * Get statistics overview
 */
export const getStatistics = async (): Promise<Statistics> => {
  try {
    const docRef = doc(db, COLLECTION, "overview");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("Statistics document not found, calculating from data...");
      return calculateStatistics();
    }

    const data = docSnap.data();
    return {
      totalReservations: data.totalReservations || 0,
      confirmedReservations: data.confirmedReservations || 0,
      totalRevenue: data.totalRevenue || 0,
      averagePartySize: data.averagePartySize || 0,
      totalVisitors: data.totalVisitors || 0,
      gamesTally: data.gamesTally || 0,
      menuItemsTally: data.menuItemsTally || 0,
      servicesAvailable: data.servicesAvailable || 0,
      lastUpdated: data.lastUpdated?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return await calculateStatistics();
  }
};

/**
 * Calculate statistics from actual data
 */
export const calculateStatistics = async (): Promise<Statistics> => {
  try {
    console.log("Calculating statistics from Firebase...");
    
    // Get reservations
    const reservationsSnap = await getDocs(collection(db, "reservations"));
    const reservations = reservationsSnap.docs.map((d) => d.data());
    console.log(`Found ${reservations.length} reservations`);

    // Get games
    const gamesSnap = await getDocs(collection(db, "games"));
    console.log(`Found ${gamesSnap.docs.length} games`);
    
    // Get menu items
    const menuSnap = await getDocs(collection(db, "menuItems"));
    console.log(`Found ${menuSnap.docs.length} menu items`);
    
    // Get services
    const servicesSnap = await getDocs(collection(db, "services"));
    console.log(`Found ${servicesSnap.docs.length} services`);

    const totalReservations = reservations.length;
    const confirmedReservations = reservations.filter(
      (r) => r.status === "confirmed"
    ).length;
    const totalRevenue = reservations.reduce((sum, r) => sum + (r.amountPaid || 0), 0);
    const totalVisitors = reservations.reduce((sum, r) => sum + (r.groupSize || 0), 0);
    const averagePartySize = totalReservations > 0 ? Math.round((totalVisitors / totalReservations) * 10) / 10 : 0;

    return {
      totalReservations,
      confirmedReservations,
      totalRevenue,
      averagePartySize,
      totalVisitors,
      gamesTally: gamesSnap.docs.length,
      menuItemsTally: menuSnap.docs.length,
      servicesAvailable: servicesSnap.docs.length,
      lastUpdated: new Date(),
    };
  } catch (error: any) {
    console.error("Error calculating statistics:", error.message || error);
    if (error.message?.includes("permission")) {
      console.warn("⚠️ Firebase permissions issue - ensure Firestore rules allow read access");
    }
    return {
      totalReservations: 0,
      confirmedReservations: 0,
      totalRevenue: 0,
      averagePartySize: 0,
      totalVisitors: 0,
      gamesTally: 0,
      menuItemsTally: 0,
      servicesAvailable: 0,
      lastUpdated: new Date(),
    };
  }
};
