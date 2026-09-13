import { collection, addDoc, Timestamp, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ContactService = "brunch" | "traiteur" | "bar" | "autre";

export interface ContactMessageDTO {
  name: string;
  email: string;
  phone?: string;
  service: ContactService;
  message: string;
}

export interface ContactMessage extends ContactMessageDTO {
  id: string;
  status: "new" | "read" | "closed";
  createdAt: Date;
}

const COLLECTION = "contactMessages";

export const submitContactMessage = async (data: ContactMessageDTO): Promise<void> => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "new",
    createdAt: Timestamp.now(),
  });
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const snapshot = await getDocs(query(collection(db, COLLECTION)));
  return snapshot.docs.map((item) => {
    const data = item.data();
    return { id: item.id, ...data, status: data.status || "new", createdAt: data.createdAt?.toDate?.() || new Date() } as ContactMessage;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const updateContactMessageStatus = async (id: string, status: ContactMessage["status"]): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), { status });
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};