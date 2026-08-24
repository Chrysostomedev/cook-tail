import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ContactService = "brunch" | "traiteur" | "bar" | "autre";

export interface ContactMessageDTO {
  name: string;
  email: string;
  phone?: string;
  service: ContactService;
  message: string;
}

const COLLECTION = "contactMessages";

export const submitContactMessage = async (data: ContactMessageDTO): Promise<void> => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "new",
    createdAt: Timestamp.now(),
  });
};