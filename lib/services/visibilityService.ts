import { doc, onSnapshot, serverTimestamp, setDoc, type Unsubscribe } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type RemoteVisibility = Record<string, boolean>;
const VISIBILITY_DOCUMENT = doc(db, "settings", "visibility");

export const subscribeToVisibility = (
  onVisibility: (visibility: RemoteVisibility | null) => void,
  onError?: (error: Error) => void
): Unsubscribe => onSnapshot(VISIBILITY_DOCUMENT, (snapshot) => {
  onVisibility(snapshot.exists() ? snapshot.data().visibility as RemoteVisibility : null);
}, (error) => {
  console.error("Unable to subscribe to remote visibility:", error);
  onError?.(error);
});

export const saveVisibility = async (visibility: RemoteVisibility): Promise<void> => {
  await setDoc(VISIBILITY_DOCUMENT, { visibility, updatedAt: serverTimestamp() }, { merge: true });
};