import { doc, onSnapshot, serverTimestamp, setDoc, type Unsubscribe } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ContentConfig } from "@/lib/content";

const CONTENT_DOCUMENT = doc(db, "settings", "content");

export const subscribeToContent = (
  onContent: (content: Partial<ContentConfig> | null) => void,
  onError?: (error: Error) => void
): Unsubscribe => onSnapshot(CONTENT_DOCUMENT, (snapshot) => {
  if (!snapshot.exists()) {
    onContent(null);
    return;
  }

  const data = snapshot.data();
  const nestedContent = data.content && typeof data.content === "object" ? data.content : {};
  // Prefer the flat fields: older documents may contain a stale nested `content` map.
  const remoteContent = { ...nestedContent, ...data };
  delete (remoteContent as Record<string, unknown>).content;
  delete (remoteContent as Record<string, unknown>).updatedAt;
  onContent(remoteContent as Partial<ContentConfig>);
}, (error) => {
  console.error("Unable to subscribe to remote content. Check settings/content Firestore rules:", error);
  onError?.(error);
});

export const saveContent = async (content: ContentConfig): Promise<void> => {
  await setDoc(CONTENT_DOCUMENT, { ...content, content, updatedAt: serverTimestamp() }, { merge: true });
};