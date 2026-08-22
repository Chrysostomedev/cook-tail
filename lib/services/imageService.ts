// lib/services/imageService.ts
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
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface CloudinaryImage {
  url: string;
  cloudinaryId: string;
  alt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  cloudinaryId: string;
  title: string;
  description: string;
  category: "event" | "menu" | "testimonial" | "general";
  thumbnail: string;
  order: number;
  isPublished: boolean;
  uploadedAt: Timestamp;
  uploadedBy: string;
}

export const imageService = {
  /**
   * Ajouter image à la galerie
   */
  async addGalleryImage(
    imageData: Omit<GalleryImage, "id" | "uploadedAt" | "uploadedBy">
  ): Promise<GalleryImage> {
    try {
      const docRef = await addDoc(collection(db, "gallery"), {
        ...imageData,
        uploadedAt: Timestamp.now(),
        uploadedBy: "current_user_id", // À remplacer par auth context
      });

      return {
        id: docRef.id,
        ...imageData,
        uploadedAt: Timestamp.now(),
        uploadedBy: "current_user_id",
      };
    } catch (error) {
      console.error("Error adding gallery image:", error);
      throw error;
    }
  },

  /**
   * Récupérer images galerie
   */
  async getGalleryImages(category?: string, onlyPublished = true): Promise<GalleryImage[]> {
    try {
      const conditions = [];

      if (category) {
        conditions.push(where("category", "==", category));
      }
      if (onlyPublished) {
        conditions.push(where("isPublished", "==", true));
      }

      const q = query(
        collection(db, "gallery"),
        ...conditions,
        orderBy("order", "asc")
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as GalleryImage));
    } catch (error) {
      console.error("Error getting gallery images:", error);
      throw error;
    }
  },

  /**
   * Mettre à jour image galerie
   */
  async updateGalleryImage(id: string, data: Partial<GalleryImage>): Promise<void> {
    try {
      await updateDoc(doc(db, "gallery", id), {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating gallery image:", error);
      throw error;
    }
  },

  /**
   * Supprimer image galerie
   */
  async deleteGalleryImage(id: string, cloudinaryId?: string): Promise<void> {
    try {
      // Supprimer doc Firestore
      await deleteDoc(doc(db, "gallery", id));

      // Optionnel: supprimer de Cloudinary aussi (nécessite API backend)
      if (cloudinaryId) {
        console.log("Cloudinary deletion handled via backend API");
      }
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      throw error;
    }
  },

  /**
   * Ajouter photo à événement
   */
  async addEventPhoto(
    eventId: string,
    imageData: Omit<any, "id" | "uploadedAt" | "uploadedBy">
  ) {
    try {
      const docRef = await addDoc(collection(db, `events/${eventId}/photos`), {
        ...imageData,
        uploadedAt: Timestamp.now(),
        uploadedBy: "current_user_id",
      });

      return {
        id: docRef.id,
        ...imageData,
        uploadedAt: Timestamp.now(),
        uploadedBy: "current_user_id",
      };
    } catch (error) {
      console.error("Error adding event photo:", error);
      throw error;
    }
  },

  /**
   * Récupérer photos événement
   */
  async getEventPhotos(eventId: string, onlyPublished = true) {
    try {
      const conditions = [];
      if (onlyPublished) {
        conditions.push(where("isPublished", "==", true));
      }

      const q = query(
        collection(db, `events/${eventId}/photos`),
        ...conditions,
        orderBy("order", "asc")
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting event photos:", error);
      throw error;
    }
  },

  /**
   * Supprimer photo événement
   */
  async deleteEventPhoto(eventId: string, photoId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, `events/${eventId}/photos`, photoId));
    } catch (error) {
      console.error("Error deleting event photo:", error);
      throw error;
    }
  },

  /**
   * Réorganiser galerie (bulk update order)
   */
  async reorderGallery(items: Array<{ id: string; order: number }>): Promise<void> {
    try {
      for (const item of items) {
        await updateDoc(doc(db, "gallery", item.id), {
          order: item.order,
          updatedAt: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error("Error reordering gallery:", error);
      throw error;
    }
  },

  /**
   * Publier/dépublier image
   */
  async togglePublish(id: string, isPublished: boolean): Promise<void> {
    try {
      await updateDoc(doc(db, "gallery", id), {
        isPublished,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error toggling publish:", error);
      throw error;
    }
  },
};
