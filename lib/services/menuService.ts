// lib/services/menuService.ts
// Firebase service for menu management

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
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface MenuItem {
  id: string;
  name: string;
  category: "appetizer" | "main" | "dessert" | "beverage";
  price: number;
  description: string;
  image?: {
    url: string;
    cloudinaryId: string;
  };
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMenuItemDTO {
  name: string;
  category: "appetizer" | "main" | "dessert" | "beverage";
  price: number;
  description: string;
  imageUrl?: string;
}

const COLLECTION = "menuItems";

/**
 * Create menu item
 */
export const createMenuItem = async (data: CreateMenuItemDTO): Promise<MenuItem> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      isAvailable: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const docSnap = await getDoc(docRef);
    return convertMenuItemDoc(docSnap);
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
};

/**
 * Get all menu items
 */
export const getAllMenuItems = async (): Promise<MenuItem[]> => {
  try {
    console.log("Fetching menu items from Firebase...");
    const q = query(
      collection(db, COLLECTION),
      where("isAvailable", "==", true),
      orderBy("category")
    );

    const snapshot = await getDocs(q);
    console.log(`Found ${snapshot.docs.length} menu items`);
    return snapshot.docs.map(convertMenuItemDoc);
  } catch (error: any) {
    console.error("Error fetching menu items:", error.message || error);
    if (error.message?.includes("permission")) {
      console.warn("⚠️ Firebase permissions issue - ensure Firestore rules allow read access");
      return [];
    }
    return [];
  }
};

/**
 * Get menu items by category
 */
export const getMenuItemsByCategory = async (
  category: string
): Promise<MenuItem[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("category", "==", category),
      where("isAvailable", "==", true)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertMenuItemDoc);
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    return [];
  }
};

/**
 * Update menu item
 */
export const updateMenuItem = async (
  itemId: string,
  updates: Partial<CreateMenuItemDTO>
): Promise<void> => {
  try {
    await updateDoc(doc(db, COLLECTION, itemId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

/**
 * Delete menu item
 */
export const deleteMenuItem = async (itemId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION, itemId));
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

/**
 * Helper: Convert Firestore doc to MenuItem
 */
function convertMenuItemDoc(doc: any): MenuItem {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    category: data.category,
    price: data.price,
    description: data.description,
    image: data.image,
    isAvailable: data.isAvailable,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
}
