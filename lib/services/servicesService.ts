// lib/services/servicesService.ts
// Firebase service for services management

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export interface CreateServiceDTO {
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  imageUrl?: string;
}

const COLLECTION = "services";

/**
 * Create service
 */
export const createService = async (data: CreateServiceDTO): Promise<Service> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      isPopular: data.isPopular || false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const docSnap = await getDocs(collection(db, COLLECTION)); // Reload to get new doc
    const newDoc = docSnap.docs.find((d) => d.id === docRef.id);
    
    if (newDoc) {
      return convertServiceDoc(newDoc);
    }
    
    throw new Error("Failed to retrieve created service");
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

/**
 * Get all services
 */
export const getAllServices = async (): Promise<Service[]> => {
  try {
    console.log("Fetching services from Firebase...");
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    console.log(`Found ${snapshot.docs.length} services`);
    return snapshot.docs.map(convertServiceDoc);
  } catch (error: any) {
    console.error("Error fetching services:", error.message || error);
    if (error.message?.includes("permission")) {
      console.warn("⚠️ Firebase permissions issue - ensure Firestore rules allow read access");
      return [];
    }
    return [];
  }
};

/**
 * Update service
 */
export const updateService = async (
  serviceId: string,
  updates: Partial<CreateServiceDTO>
): Promise<void> => {
  try {
    await updateDoc(doc(db, COLLECTION, serviceId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

/**
 * Delete service
 */
export const deleteService = async (serviceId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION, serviceId));
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

/**
 * Helper: Convert Firestore doc to Service
 */
function convertServiceDoc(doc: any): Service {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    image: data.image,
    features: data.features || [],
    isPopular: data.isPopular || false,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
}
