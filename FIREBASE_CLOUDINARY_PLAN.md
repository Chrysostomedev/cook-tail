# Plan d'Implémentation Firebase + Cloudinary

## 📋 Objectif
Intégrer Firebase (authentification, base de données, stockage) et Cloudinary (gestion images) à l'application Cook'Tail Service.

---

## 🎯 Phase 1: Configuration Firebase (Semaine 1)

### 1.1 Setup Firebase Console
```
1. Aller sur https://console.firebase.google.com
2. Créer nouveau projet "Cook'Tail Service"
3. Activer les services:
   - Firebase Authentication
   - Cloud Firestore
   - Cloud Storage
   - Cloud Functions (optionnel)
```

### 1.2 Installation & Configuration
```bash
npm install firebase
```

**Créer `lib/firebase.ts`:**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 1.3 Variables d'Environnement (`.env.local`)
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cooktail-service.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cooktail-service
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cooktail-service.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef1234567890
```

---

## 🔐 Phase 2: Firestore Setup (Semaine 1-2)

### 2.1 Collections & Structure

#### `reservations` Collection
```javascript
{
  id: "BR-2026-0001" // Auto-généré
  fullName: "Kouassi Jean-Philippe"
  phone: "+225 07 XX XX XX XX"
  email: "kouassi@email.ci"
  guests: 3
  instagram: "@kouassi_jp" // Optionnel
  totalAmount: 30000
  qrCode: "https://api.qrserver.com/v1/create-qr-code?size=200x200&data=BR-2026-0001"
  status: "confirmed" // "pending" | "confirmed" | "scanned" | "cancelled"
  createdAt: 2026-08-21T14:30:00Z
  updatedAt: 2026-08-21T14:30:00Z
  scannedAt: null // Rempli lors du scan QR
  paymentMethod: "orange_money" // "orange_money" | "wave" | "cash"
  notes: "" // Notes admin
}
```

#### `admins` Collection
```javascript
{
  uid: "firebase_uid_xxxx" // De Firebase Auth
  email: "admin@cooktail.ci"
  name: "Awa Koffi"
  role: "super_admin" // "super_admin" | "staff"
  permissions: ["view_stats", "manage_reservations", "edit_theme"]
  avatar: "https://res.cloudinary.com/xxx/image/upload/xxx.jpg"
  createdAt: 2026-08-21T00:00:00Z
  lastLogin: 2026-08-21T14:30:00Z
}
```

#### `events` Collection
```javascript
{
  id: "brunch-2026"
  name: "Brunch Récréation 2026"
  date: 2026-09-15T12:00:00Z
  location: "Palais de la Culture, Abidjan"
  totalPlaces: 30
  placesBooked: 28
  price: 10000
  imageUrl: "https://res.cloudinary.com/xxx/image/upload/xxx.jpg"
  description: "Retrouvailles nostalgiques avec buffet rétro..."
  status: "active" // "active" | "full" | "cancelled"
  createdAt: 2026-08-21T00:00:00Z
}
```

#### `statistics` Collection
```javascript
{
  id: "stats-2026-08-21"
  date: 2026-08-21T00:00:00Z
  totalReservations: 28
  totalRevenue: 280000
  averageGuests: 2.8
  conversionRate: 0.65
  scannedCount: 12
  pendingCount: 3
  cancellationRate: 0.05
  topHour: "12:00" // Heure avec plus de réservations
}
```

### 2.2 Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Réservations: Lecture public, écriture authentifiée
    match /reservations/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null || true; // Créer sans auth (formulaire public)
      allow update, delete: if request.auth != null && request.auth.customClaims.admin == true;
    }
    
    // Admins: Accès admin seulement
    match /admins/{document=**} {
      allow read: if request.auth != null && request.auth.customClaims.admin == true;
      allow write: if request.auth != null && request.auth.customClaims.super_admin == true;
    }
    
    // Events: Lecture publique, écriture admin
    match /events/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.customClaims.admin == true;
    }
    
    // Statistics: Accès admin
    match /statistics/{document=**} {
      allow read: if request.auth != null && request.auth.customClaims.admin == true;
      allow write: if false; // Cloud Function write only
    }
  }
}
```

### 2.3 Services/Functions

**`services/reservationService.ts`:**
```typescript
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Créer réservation
export async function createReservation(data: {
  fullName: string;
  phone: string;
  email?: string;
  guests: number;
  instagram?: string;
}) {
  try {
    const totalAmount = data.guests * 10000;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code?size=200x200&data=${data.phone}-${Date.now()}`;
    
    const docRef = await addDoc(collection(db, 'reservations'), {
      ...data,
      totalAmount,
      qrCode,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erreur création réservation:', error);
    throw error;
  }
}

// Récupérer réservations par téléphone
export async function getReservationsByPhone(phone: string) {
  try {
    const q = query(
      collection(db, 'reservations'),
      where('phone', '==', phone)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erreur récupération réservations:', error);
    throw error;
  }
}

// Confirmer réservation
export async function confirmReservation(id: string) {
  try {
    const ref = doc(db, 'reservations', id);
    await updateDoc(ref, {
      status: 'confirmed',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erreur confirmation:', error);
    throw error;
  }
}

// Scanner QR
export async function scanReservation(id: string) {
  try {
    const ref = doc(db, 'reservations', id);
    await updateDoc(ref, {
      status: 'scanned',
      scannedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erreur scan:', error);
    throw error;
  }
}
```

**`services/statsService.ts`:**
```typescript
import { 
  collection, 
  query, 
  where, 
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getStatistics(startDate: Date, endDate: Date) {
  try {
    const q = query(
      collection(db, 'reservations'),
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      where('createdAt', '<=', Timestamp.fromDate(endDate))
    );
    
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(d => d.data());
    
    const totalReservations = docs.length;
    const totalRevenue = docs.reduce((sum, d) => sum + (d.totalAmount || 0), 0);
    const totalGuests = docs.reduce((sum, d) => sum + (d.guests || 0), 0);
    const scannedCount = docs.filter(d => d.status === 'scanned').length;
    
    return {
      totalReservations,
      totalRevenue,
      averageGuests: totalGuests / totalReservations || 0,
      conversionRate: totalReservations / 100, // À adapter
      scannedCount,
      pendingCount: docs.filter(d => d.status === 'pending').length,
    };
  } catch (error) {
    console.error('Erreur statistiques:', error);
    throw error;
  }
}
```

---

## 🖼️ Phase 3: Cloudinary Setup (Semaine 2)

### 3.1 Installation
```bash
npm install cloudinary next-cloudinary
```

### 3.2 Configuration

**Aller sur https://cloudinary.com:**
1. Créer compte gratuit
2. Aller à Dashboard → Settings
3. Copier Cloud Name
4. Créer Upload Preset (Settings → Upload)
   - Name: `cooktail_events`
   - Unsigned: YES
   - Allowed formats: jpg, png, webp

### 3.3 Variables d'Environnement
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=cooktail_events
```

### 3.4 Upload Component

**`components/CloudinaryUpload.tsx`:**
```typescript
'use client';

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, Check } from 'lucide-react';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  onError?: (error: any) => void;
}

export function CloudinaryUpload({ onUpload, onError }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result: any) => {
        const imageUrl = result.info.secure_url;
        onUpload(imageUrl);
        setUploaded(true);
        setTimeout(() => setUploaded(false), 2000);
      }}
      onError={(error: any) => {
        console.error('Upload error:', error);
        onError?.(error);
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          disabled={uploading}
          className="px-4 py-2 rounded-lg font-bold text-sm uppercase flex items-center gap-2 transition-all"
          style={{
            backgroundColor: uploaded ? 'var(--theme-secondary)' : 'var(--theme-primary)',
            color: 'white',
            opacity: uploading ? 0.7 : 1,
          }}
        >
          {uploaded ? (
            <>
              <Check className="w-4 h-4" /> Uploadé
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Télécharger image
            </>
          )}
        </button>
      )}
    </CldUploadWidget>
  );
}
```

### 3.5 Intégration dans Formulaires

**Exemple: Galerie Admin**
```typescript
import { CloudinaryUpload } from '@/components/CloudinaryUpload';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function GalleryUpload() {
  const handleUpload = async (imageUrl: string) => {
    try {
      await addDoc(collection(db, 'gallery'), {
        imageUrl,
        uploadedBy: 'admin@cooktail.ci',
        uploadedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erreur enregistrement galerie:', error);
    }
  };

  return <CloudinaryUpload onUpload={handleUpload} />;
}
```

---

## 🔑 Phase 4: Authentication Admin (Semaine 2-3)

### 4.1 Setup Firebase Auth

**`lib/auth.ts`:**
```typescript
import { 
  signInWithEmailAndPassword,
  signOut,
  User 
} from 'firebase/auth';
import { auth } from './firebase';

export async function signInAdmin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  return signOut(auth);
}

export function onAuthStateChanged(callback: (user: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}
```

### 4.2 Login Page

**`app/admin/login/page.tsx`:**
```typescript
'use client';

import { useState } from 'react';
import { signInAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInAdmin(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      
      {error && <p className="text-red-600">{error}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded font-bold"
      >
        Se connecter
      </button>
    </form>
  );
}
```

---

## 📊 Phase 5: Admin Dashboard (Semaine 3)

Déjà créé: `/app/admin/statistics/page.tsx` ✅

**Prochaines étapes:**
- [ ] Intégrer données Firestore réelles
- [ ] Ajouter graphiques avec Chart.js ou Recharts
- [ ] Pagination des réservations
- [ ] Filtres par date/statut

---

## ☑️ Checklist d'Implémentation

### Firebase
- [ ] Créer projet Firebase Console
- [ ] Configurer `lib/firebase.ts`
- [ ] Créer collections Firestore
- [ ] Configurer Firestore Rules
- [ ] Créer services Firebase (reservationService, statsService)
- [ ] Implémenter Firebase Auth
- [ ] Setup Cloud Functions pour génération statistiques (optionnel)

### Cloudinary
- [ ] Créer compte Cloudinary
- [ ] Configurer Upload Preset
- [ ] Créer `CloudinaryUpload` component
- [ ] Intégrer dans formulaires (galerie, événement)

### Admin Pages
- [ ] `/admin/login` avec Firebase Auth
- [ ] `/admin/statistics` avec données Firestore (déjà créé)
- [ ] `/admin/reservations` - Gestion liste + filtres
- [ ] `/admin/dashboard` - Vue d'ensemble

### Public Pages
- [ ] Enregistrer réservations dans Firestore
- [ ] Générer QR codes
- [ ] Afficher statut réservation

---

## 📈 Évolutivité Future

### Phase 4+
- [ ] Cloud Functions pour emails automatiques
- [ ] Système de paiement (Orange Money, Wave)
- [ ] Intégration SMS (Twilio)
- [ ] Rapports PDF exportables
- [ ] Analytics avancées
- [ ] Multi-événements support

---

## 🚨 Points d'Attention

1. **Sécurité**: Ne jamais commit `.env.local` - ajouter à `.gitignore`
2. **Images**: Optimiser avec Cloudinary transformations
3. **Quotas**: Firebase Firestore gratuit = 50k lectures/jour
4. **Coûts**: Cloudinary gratuit = 25GB/mois de stockage
5. **GDPR**: Implémenter droit à l'oubli

---

## 📚 Ressources

- [Firebase Docs](https://firebase.google.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Next.js Firebase](https://github.com/vercel/next.js/tree/canary/examples/with-firebase)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

---

**Durée estimée**: 3-4 semaines  
**Priorité**: HAUTE  
**Prochaine étape**: Commencer Phase 1 avec création projet Firebase
