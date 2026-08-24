import { Timestamp } from "firebase/firestore";

export interface Reservation {
  id: string; // = la référence Wave (COOKTAIL-XXXX)
  fullName: string;
  phone: string;
  groupSize: number;
  amountPaid: number;
  status: "pending" | "confirmed" | "cancelled";// confirmed = check-in fait à l'entrée
  paymentStatus: "unpaid" | "paid"; // paid = admin a vérifié le paiement Wave
  waveReference?: string; // référence transaction Wave saisie par le client
  qrCode: string;
  createdAt: any;
  confirmedAt?: any;
}

export interface CreateReservationDTO {
  fullName: string;
  phone: string;
  groupSize: number;
}


