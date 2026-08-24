// lib/services/reservationService.ts
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc, 
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  DocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Reservation, CreateReservationDTO } from "@/types";

type UpdateReservationDTO = Partial<Reservation>;
const COLLECTION = "reservations";

/**
 * Get all reservations
 */
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTION), orderBy("createdAt", "desc"))
    );
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Reservation));
    
    // TEMPORAIRE — à retirer après debug
    data.forEach((r) => {
      if (!r.fullName) console.warn("⚠️ Réservation sans fullName:", r.id, r);
    });
    
    return data;
  } catch (error: any) {
    console.error("Error getting all reservations:", error.message || error);
    return [];
  }
};

/**
 * Update reservation
 */
export const updateReservation = async (
  id: string,
  data: Partial<UpdateReservationDTO>
): Promise<void> => {
  try {
    await updateDoc(doc(db, COLLECTION, id), {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const reservationService = {
  /**
   * Créer une nouvelle réservation
   */
  async create(data: CreateReservationDTO): Promise<Reservation> {
    try {
      // Générer QR code ID
      const qrCode = `COOKTAIL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        status: "pending",
        paymentStatus: "unpaid",
        qrCode,
        amountPaid: 0,
        source: "website",
        notes: "",
        createdAt: Timestamp.now(),
      });

      return {
        id: docRef.id,
        ...data,
        status: "pending",
        paymentStatus: "unpaid",
        qrCode,
        amountPaid: 0,
        source: "website",
        notes: "",
        createdAt: Timestamp.now(),
      } as Reservation;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  },

  /**
   * Récupérer une réservation par ID
   */
  async getById(id: string): Promise<Reservation | null> {
    try {
      const docSnap = await getDoc(doc(db, COLLECTION, id));
      return docSnap.exists() ? (docSnap.data() as Reservation) : null;
    } catch (error) {
      console.error("Error getting reservation:", error);
      throw error;
    }
  },

  /**
   * Récupérer réservation par email
   */
  async getByEmail(email: string): Promise<Reservation | null> {
    try {
      const q = query(collection(db, COLLECTION), where("email", "==", email), limit(1));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.length > 0 ? (querySnapshot.docs[0].data() as Reservation) : null;
    } catch (error) {
      console.error("Error getting reservation by email:", error);
      throw error;
    }
  },

  /**
   * Récupérer toutes réservations avec filtres
   */
  async getAll(filters?: { status?: string; paymentStatus?: string }): Promise<Reservation[]> {
    try {
      let q = collection(db, COLLECTION);
      const conditions = [];

      if (filters?.status) {
        conditions.push(where("status", "==", filters.status));
      }
      if (filters?.paymentStatus) {
        conditions.push(where("paymentStatus", "==", filters.paymentStatus));
      }

      const querySnapshot = await getDocs(
        query(q, ...conditions, orderBy("createdAt", "desc"))
      );

      return querySnapshot.docs.map((doc) => doc.data() as Reservation);
    } catch (error) {
      console.error("Error getting all reservations:", error);
      throw error;
    }
  },

  /**
   * Réservations paginées
   */
  async getPaginated(pageSize: number = 10, lastDoc?: DocumentSnapshot) {
    try {
      let q = query(
        collection(db, COLLECTION),
        orderBy("createdAt", "desc"),
        limit(pageSize + 1)
      );

      if (lastDoc) {
        q = query(
          collection(db, COLLECTION),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      const data = docs.map((doc) => doc.data() as Reservation);
      const hasMore = data.length > pageSize;

      return {
        data: data.slice(0, pageSize),
        hasMore,
        lastDoc: docs[pageSize - 1],
      };
    } catch (error) {
      console.error("Error getting paginated reservations:", error);
      throw error;
    }
  },

  /**
   * Mettre à jour une réservation
   */
  async update(id: string, data: UpdateReservationDTO): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTION, id), {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw error;
    }
  },

  /**
   * Supprimer une réservation
   */
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  },

  /**
   * Mettre à jour statut
   */
  async updateStatus(id: string, status: string): Promise<void> {
    try {
      const timestamp = status === "confirmed" ? Timestamp.now() : undefined;
      const updateData: any = { status, updatedAt: Timestamp.now() };
      if (timestamp) updateData.confirmedAt = timestamp;

      await updateDoc(doc(db, COLLECTION, id), updateData);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  /**
   * Statistiques réservations
   */
  async getStats() {
    try {
      const all = await this.getAll();
      return {
        total: all.length,
        pending: all.filter((r) => r.status === "pending").length,
        confirmed: all.filter((r) => r.status === "confirmed").length,
        cancelled: all.filter((r) => r.status === "cancelled").length,
        revenue: all.reduce((sum, r) => sum + (r.amountPaid || 0), 0),
        avgGroupSize: all.length > 0 ? all.reduce((sum, r) => sum + r.groupSize, 0) / all.length : 0,
      };
    } catch (error) {
      console.error("Error getting stats:", error);
      throw error;
    }
  },

  /**
   * Vérifier email existant
   */
  async checkEmailExists(email: string, excludeId?: string): Promise<boolean> {
    try {
      const existing = await this.getByEmail(email);
      if (!existing) return false;
      if (excludeId && existing.id === excludeId) return false;
      return true;
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  },
};





/**
 * Créer une réservation avec un ID personnalisé = la référence
 */
export const createReservation = async (
  data: { fullName: string; phone: string; groupSize: number },
  amount: number
): Promise<{ id: string; qrCode: string }> => {
  const ref = `COOKTAIL-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  await setDoc(doc(db, COLLECTION, ref), {
    fullName: data.fullName,
    phone: data.phone,
    groupSize: data.groupSize,
    amountPaid: amount,
    status: "pending",
    paymentStatus: "unpaid",
    qrCode: ref,
    waveReference: "",
    createdAt: Timestamp.now(),
  });

  return { id: ref, qrCode: ref };
};
/**
 * Le client peut ajouter sa référence de transaction Wave après paiement
 */
export const submitWaveReference = async (
  reservationId: string,
  waveReference: string
): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, reservationId), { waveReference });
};


/**
 * Récupérer une réservation par sa référence (lecture publique autorisée par les rules)
 */
export const getReservationById = async (id: string): Promise<Reservation | null> => {
  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Reservation;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return null;
  }
};

/**
 * Admin: confirmer qu'un paiement Wave a bien été reçu
 */
export const confirmPayment = async (reservationId: string): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, reservationId), {
    paymentStatus: "paid",
  });
};

/**
 * Admin: récupérer uniquement les paiements en attente de vérification
 */
export const getPendingPayments = async (): Promise<Reservation[]> => {
  const all = await getAllReservations();
  return all.filter((r) => r.paymentStatus === "unpaid");
};