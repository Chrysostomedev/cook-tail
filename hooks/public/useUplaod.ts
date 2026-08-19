// lib/hooks/useImageUpload.ts
// Hook d'upload d'image avec 3 stratégies selon ce qui est disponible :
// 1. Cloudinary (recommandé — gratuit 25GB, pas d'abonnement Firebase requis)
// 2. ImgBB (gratuit, simple, API key gratuite)
// 3. Base64 localStorage (fallback dev — NE PAS utiliser en prod, trop lourd)
"use client"

import { useState, useCallback } from "react"

export type UploadStrategy = "cloudinary" | "imgbb" | "base64"

interface UseImageUploadReturn {
    upload: (file: File, folder?: string) => Promise<string>
    progress: number
    uploading: boolean
    error: string | null
    reset: () => void
}

// ── Cloudinary (recommandé) ───────────────────────────────────────────────────
// 1. Créer un compte gratuit sur cloudinary.com
// 2. Récupérer ton cloud_name dans le Dashboard
// 3. Créer un "Upload Preset" non signé : Settings → Upload → Add upload preset → Unsigned
// 4. Ajouter dans .env.local :
//    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ton_cloud_name
//    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ton_preset
async function uploadToCloudinary(file: File, folder = "mila"): Promise<string> {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
        throw new Error("Variables Cloudinary manquantes dans .env")
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)
    formData.append("folder", `mila/${folder}`)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) throw new Error("Erreur Cloudinary : " + res.statusText)
    const data = await res.json()
    return data.secure_url as string
}

// ── ImgBB (alternative simple) ───────────────────────────────────────────────
// 1. Créer un compte sur imgbb.com
// 2. Récupérer l'API key depuis le Dashboard
// 3. Ajouter dans .env.local :
//    NEXT_PUBLIC_IMGBB_API_KEY=ton_api_key
async function uploadToImgBB(file: File): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
    if (!apiKey) throw new Error("NEXT_PUBLIC_IMGBB_API_KEY manquant dans .env")

    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) throw new Error("Erreur ImgBB : " + res.statusText)
    const data = await res.json()
    return data.data.url as string
}

// ── Base64 (dev uniquement) ───────────────────────────────────────────────────
// Convertit l'image en base64 — stocké directement dans Firestore
// ⚠️ Limite : 1MB par document Firestore — réserver aux petites images
// ⚠️ NE PAS utiliser en production avec beaucoup de photos
async function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

// ── Hook principal ────────────────────────────────────────────────────────────
export function useImageUpload(strategy: UploadStrategy = "cloudinary"): UseImageUploadReturn {
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const upload = useCallback(async (file: File, folder = "galerie"): Promise<string> => {
        setUploading(true)
        setProgress(10)
        setError(null)

        try {
            let url: string

            if (strategy === "cloudinary") {
                setProgress(30)
                url = await uploadToCloudinary(file, folder)
                setProgress(100)
            } else if (strategy === "imgbb") {
                setProgress(30)
                url = await uploadToImgBB(file)
                setProgress(100)
            } else {
                // base64 — dev uniquement
                setProgress(50)
                url = await toBase64(file)
                setProgress(100)
            }

            return url
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setUploading(false)
        }
    }, [strategy])

    const reset = useCallback(() => {
        setProgress(0)
        setUploading(false)
        setError(null)
    }, [])

    return { upload, progress, uploading, error, reset }
}