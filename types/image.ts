import { Timestamp } from "firebase/firestore";

export interface CloudinaryImage {
  url: string;
  cloudinaryId: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  cloudinaryId: string;
  title: string;
  description: string;
  category: "event" | "menu" | "testimonial" | "general" | "atmosphere";
  thumbnail: string;
  order: number;
  isPublished: boolean;

  uploadedAt: Timestamp;
  uploadedBy: string;
  updatedAt?: Timestamp;

  tags?: string[];
  featured?: boolean;
  likes?: number;
}

export interface EventPhoto {
  id: string;
  eventId: string;
  url: string;
  cloudinaryId: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;

  uploadedAt: Timestamp;
  uploadedBy: string;
  updatedAt?: Timestamp;

  tags?: string[];
}

export interface ProfileImage extends CloudinaryImage {
  userId: string;
  uploadedAt: Timestamp;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
