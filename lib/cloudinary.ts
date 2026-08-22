// lib/cloudinary.ts
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
};

// Dossiers de stockage Cloudinary
export const cloudinaryFolders = {
  events: "cooktail/events",
  gallery: "cooktail/gallery",
  profiles: "cooktail/profiles",
  testimonials: "cooktail/testimonials",
  menu: "cooktail/menu",
  games: "cooktail/games",
  backup: "cooktail/backup",
} as const;

// Transformations d'images prédéfinies
export const cloudinaryTransforms = {
  thumbnail: "c_fill,g_face,h_200,w_200,q_auto",
  card: "c_fill,h_400,w_600,q_auto",
  hero: "c_fill,h_600,w_1200,q_auto",
  profile: "c_fill,g_face,h_150,w_150,q_auto",
  gallery: "c_fill,h_500,w_500,q_auto",
  menu: "c_fill,h_300,w_300,q_auto",
} as const;

/**
 * Générer URL Cloudinary avec transformations
 * @param publicId - Cloudinary public ID
 * @param transform - Transformation key
 * @returns URL complète
 */
export function getCloudinaryUrl(
  publicId: string,
  transform?: keyof typeof cloudinaryTransforms
): string {
  if (!publicId) return "";

  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  const transformation = transform ? cloudinaryTransforms[transform] : "q_auto";

  return `${baseUrl}/${transformation}/v1/${publicId}`;
}

/**
 * Générer URL pour multiple transformations
 */
export function getCloudinaryUrlCustom(
  publicId: string,
  width?: number,
  height?: number,
  quality: string = "auto"
): string {
  if (!publicId) return "";

  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  let transform = `q_${quality}`;

  if (width && height) {
    transform += `,c_fill,w_${width},h_${height}`;
  } else if (width) {
    transform += `,w_${width}`;
  } else if (height) {
    transform += `,h_${height}`;
  }

  return `${baseUrl}/${transform}/v1/${publicId}`;
}

/**
 * Parser Cloudinary response
 */
export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
}

/**
 * Extraire info depuis réponse Cloudinary
 */
export function parseCloudinaryResponse(response: CloudinaryUploadResponse) {
  return {
    publicId: response.public_id,
    url: response.secure_url,
    width: response.width,
    height: response.height,
    format: response.format,
    size: response.bytes,
    createdAt: new Date(response.created_at),
  };
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImageToCloudinary(
  file: File,
  folder: keyof typeof cloudinaryFolders = "gallery"
): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadPreset || "");
  formData.append("folder", cloudinaryFolders[folder]);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    // Note: Deletion requires authentication with API key
    // This is typically done on the backend
    console.warn("Direct deletion requires server-side authentication");
    // In production, call your backend endpoint instead
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
}
