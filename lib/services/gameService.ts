// lib/services/gameService.ts
// Firebase service for managing games and user preferences

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Game, CreateGameDTO, UpdateGameDTO, UserGamePreference, CreateUserGamePreferenceDTO } from "@/types/game";

// ═════════════════════════════════════════════════════════════════
// GAMES MANAGEMENT
// ═════════════════════════════════════════════════════════════════

const GAMES_COLLECTION = "games";

/**
 * Create a new game
 */
export const createGame = async (
  gameData: CreateGameDTO,
  adminId: string
): Promise<Game> => {
  try {
    const docRef = await addDoc(collection(db, GAMES_COLLECTION), {
      ...gameData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: adminId,
      isActive: true,
    });

    const docSnap = await getDoc(docRef);
    return convertGameDoc(docSnap);
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
};

/**
 * Get all games
 */
export const getAllGames = async (activeOnly = false): Promise<Game[]> => {
  try {
    let q = query(
      collection(db, GAMES_COLLECTION),
      orderBy("createdAt", "desc")
    );

    if (activeOnly) {
      q = query(
        collection(db, GAMES_COLLECTION),
        where("isActive", "==", true),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertGameDoc);
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

/**
 * Get game by ID
 */
export const getGameById = async (gameId: string): Promise<Game | null> => {
  try {
    const docSnap = await getDoc(doc(db, GAMES_COLLECTION, gameId));
    return docSnap.exists() ? convertGameDoc(docSnap) : null;
  } catch (error) {
    console.error("Error fetching game:", error);
    return null;
  }
};

/**
 * Get games by category
 */
export const getGamesByCategory = async (
  category: string
): Promise<Game[]> => {
  try {
    const q = query(
      collection(db, GAMES_COLLECTION),
      where("category", "==", category),
      where("isActive", "==", true),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertGameDoc);
  } catch (error) {
    console.error("Error fetching games by category:", error);
    return [];
  }
};

/**
 * Update game
 */
export const updateGame = async (
  gameId: string,
  updates: UpdateGameDTO
): Promise<void> => {
  try {
    await updateDoc(doc(db, GAMES_COLLECTION, gameId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
};

/**
 * Delete game
 */
export const deleteGame = async (gameId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, GAMES_COLLECTION, gameId));
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
};

/**
 * Soft delete game (mark as inactive)
 */
export const deactivateGame = async (gameId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, GAMES_COLLECTION, gameId), {
      isActive: false,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error deactivating game:", error);
    throw error;
  }
};

// ═════════════════════════════════════════════════════════════════
// USER GAME PREFERENCES
// ═════════════════════════════════════════════════════════════════

const USER_PREFERENCES_COLLECTION = "userGamePreferences";

/**
 * Add game preference for user
 */
export const addGamePreference = async (
  userId: string,
  preference: CreateUserGamePreferenceDTO,
  gameName: string
): Promise<UserGamePreference> => {
  try {
    const docRef = await addDoc(collection(db, USER_PREFERENCES_COLLECTION), {
      userId,
      gameId: preference.gameId,
      gameName,
      preferenceLevel: preference.preferenceLevel,
      selectedAt: Timestamp.now(),
    });

    const docSnap = await getDoc(docRef);
    return convertPreferenceDoc(docSnap);
  } catch (error) {
    console.error("Error adding game preference:", error);
    throw error;
  }
};

/**
 * Get user's game preferences
 */
export const getUserGamePreferences = async (
  userId: string
): Promise<UserGamePreference[]> => {
  try {
    const q = query(
      collection(db, USER_PREFERENCES_COLLECTION),
      where("userId", "==", userId),
      orderBy("selectedAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertPreferenceDoc);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return [];
  }
};

/**
 * Check if user has selected game
 */
export const hasUserSelectedGame = async (
  userId: string,
  gameId: string
): Promise<boolean> => {
  try {
    const q = query(
      collection(db, USER_PREFERENCES_COLLECTION),
      where("userId", "==", userId),
      where("gameId", "==", gameId)
    );

    const snapshot = await getDocs(q);
    return snapshot.size > 0;
  } catch (error) {
    console.error("Error checking game selection:", error);
    return false;
  }
};

/**
 * Remove game preference
 */
export const removeGamePreference = async (preferenceId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, USER_PREFERENCES_COLLECTION, preferenceId));
  } catch (error) {
    console.error("Error removing preference:", error);
    throw error;
  }
};

/**
 * Get all preferences for a game (admin use)
 */
export const getGamePreferences = async (gameId: string): Promise<UserGamePreference[]> => {
  try {
    const q = query(
      collection(db, USER_PREFERENCES_COLLECTION),
      where("gameId", "==", gameId),
      orderBy("selectedAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertPreferenceDoc);
  } catch (error) {
    console.error("Error fetching game preferences:", error);
    return [];
  }
};

// ═════════════════════════════════════════════════════════════════
// HELPERS
// ═════════════════════════════════════════════════════════════════

function convertGameDoc(doc: any): Game {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
}

function convertPreferenceDoc(doc: any): UserGamePreference {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    selectedAt: data.selectedAt?.toDate() || new Date(),
  };
}
