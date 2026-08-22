import { Timestamp } from "firebase/firestore";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type DietaryRestriction = "vegetarian" | "vegan" | "gluten-free" | "lactose-free" | "halal" | "kosher";

export interface Reservation {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  groupSize: number;
  specialRequests: string;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  qrCode: string;
  amountPaid: number;
  dietaryRestrictions: DietaryRestriction[];

  createdAt: Timestamp;
  confirmedAt?: Timestamp;
  cancelledAt?: Timestamp;
  updatedAt?: Timestamp;

  source: "website" | "contact" | "direct" | "admin";
  notes: string;
}

export interface CreateReservationDTO {
  email: string;
  phone: string;
  fullName: string;
  groupSize: number;
  specialRequests?: string;
  dietaryRestrictions?: DietaryRestriction[];
}

export interface UpdateReservationDTO {
  status?: ReservationStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
  amountPaid?: number;
  specialRequests?: string;
  dietaryRestrictions?: DietaryRestriction[];
}
