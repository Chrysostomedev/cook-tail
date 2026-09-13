import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
  setDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type GalleryCategory = "cocktails" | "traiteur" | "evenements";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  tag: string;
  description: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGalleryItemDTO {
  title: string;
  category: GalleryCategory;
  tag: string;
  description: string;
  imageUrl: string;
  cloudinaryId: string;
}

const COLLECTION = "galleryItems";

export const subscribeToHeroImages = (
  onImages: (images: string[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => onSnapshot(collection(db, COLLECTION), (snapshot) => {
  const images = snapshot.docs
    .filter((item) => item.data().isHero === true)
    .sort((a, b) => (a.data().order ?? 0) - (b.data().order ?? 0))
    .map((item) => item.data().image?.url)
    .filter((url): url is string => typeof url === "string" && url.length > 0);
  onImages(images);
}, (error) => {
  console.error("Error subscribing to Hero images:", error);
  onError?.(error);
});

export const saveHeroImages = async (images: string[]): Promise<void> => {
  const existing = await getDocs(collection(db, COLLECTION));
  const heroDocs = existing.docs.filter((item) => item.data().isHero === true);
  const activeIds = new Set(images.map((_, index) => `hero_${index}`));

  await Promise.all(heroDocs
    .filter((item) => !activeIds.has(item.id))
    .map((item) => deleteDoc(doc(db, COLLECTION, item.id))));

  await Promise.all(images.map((url, index) => setDoc(doc(db, COLLECTION, `hero_${index}`), {
    title: `Hero ${index + 1}`,
    category: "evenements",
    tag: "hero",
    description: "Image du Hero principal",
    image: { url, cloudinaryId: "" },
    isHero: true,
    order: index,
    updatedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
  }, { merge: true })));
};

export const createGalleryItem = async (
  data: CreateGalleryItemDTO
): Promise<GalleryItem> => {
  try {
    const { imageUrl, cloudinaryId, ...rest } = data;

    const docRef = await addDoc(collection(db, COLLECTION), {
      ...rest,
      image: { url: imageUrl, cloudinaryId },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const docSnap = await getDoc(docRef);
    return convertGalleryDoc(docSnap);
  } catch (error) {
    console.error("Error creating gallery item:", error);
    throw error;
  }
};

export const getAllGalleryItems = async (): Promise<GalleryItem[]> => {
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertGalleryDoc);
  } catch (error: any) {
    console.error("Error fetching gallery items:", error.message || error);
    return [];
  }
};

export const updateGalleryItem = async (
  itemId: string,
  updates: Partial<CreateGalleryItemDTO>
): Promise<void> => {
  try {
    const { imageUrl, cloudinaryId, ...rest } = updates;
    const payload: Record<string, any> = { ...rest, updatedAt: Timestamp.now() };

    if (imageUrl !== undefined) {
      payload.image = { url: imageUrl, cloudinaryId: cloudinaryId || "" };
    }

    await updateDoc(doc(db, COLLECTION, itemId), payload);
  } catch (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }
};

export const deleteGalleryItem = async (itemId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION, itemId));
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }
};

function convertGalleryDoc(doc: any): GalleryItem {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    category: data.category,
    tag: data.tag,
    description: data.description,
    image: data.image,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
}