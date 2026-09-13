import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ThemeConfig } from "@/context/ThemeContext";

const THEME_DOCUMENT = doc(db, "settings", "theme");

export interface RemoteThemeConfig {
  theme?: Partial<ThemeConfig>;
  preset?: string;
}

export const subscribeToTheme = (
  onTheme: (config: RemoteThemeConfig | null) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  return onSnapshot(
    THEME_DOCUMENT,
    (snapshot) => {
      if (!snapshot.exists()) {
        onTheme(null);
        return;
      }

      const data = snapshot.data();
      onTheme({
        theme: data.theme as Partial<ThemeConfig> | undefined,
        preset: typeof data.preset === "string" ? data.preset : undefined,
      });
    },
    (error) => {
      console.error("Unable to subscribe to remote theme:", error);
      onError?.(error);
    }
  );
};

export const saveThemeConfig = async (
  theme: ThemeConfig,
  preset: string
): Promise<void> => {
  await setDoc(
    THEME_DOCUMENT,
    {
      theme,
      preset,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};