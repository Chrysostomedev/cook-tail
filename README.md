# Cook'Tail Service - Brunch Récréation 2026

## 📋 Vue d'ensemble

**Cook'Tail Service** est une plateforme événementielle complète pour gérer un brunch récréatif exclusif avec billetterie, thème personnalisable, et services traiteur à la demande.

- **Tech Stack**: Next.js 16 + React + TypeScript + Tailwind CSS
- **Déploiement**: Production-ready avec Turbopack
- **Thème**: Système dynamique avec presets personnalisables

---

## 🏗️ Architecture du Projet

```
cocktail-site/
├── app/                           # App Router (Next.js 16)
│   ├── (public)/                  # Routes publiques (layout groupé)
│   │   ├── accueil/               # Landing page
│   │   ├── programme/             # Timeline événementiel
│   │   ├── menu/                  # Carte gourmandises
│   │   ├── services/              # Prestations traiteur
│   │   ├── contact/               # Formulaire contact
│   │   ├── galerie/               # Photos événement
│   │   ├── reservation/           # Billetterie (4 étapes)
│   │   ├── profil/                # Profil utilisateur
│   │   ├── a-propos/              # À propos
│   │   ├── reglement/             # Règlement intérieur
│   │   ├── cgu/                   # Conditions générales
│   │   └── layout.tsx             # Header + bottom nav mobile
│   │
│   ├── admin/                     # Routes protégées admin
│   │   ├── dashboard/             # Vue d'ensemble
│   │   ├── theme/                 # Gestionnaire de thème (couleurs dynamiques)
│   │   ├── statistics/            # Statistiques & tracking
│   │   ├── scanner/               # Scan QR Pass
│   │   ├── reservations/          # Gestion billets
│   │   ├── evenement/             # Événement
│   │   ├── login/                 # Authentification
│   │   ├── profil/                # Profil admin
│   │   └── layout.tsx             # AdminNavbar + AdminSidebar
│   │
│   ├── globals-tokens.css         # Design tokens CSS (--theme-*)
│   ├── globals.css                # Styles globaux + overrides
│   ├── layout.tsx                 # Root layout (ThemeProvider)
│   └── page.tsx                   # Accueil par défaut
│
├── components/                    # Composants réutilisables
│   ├── cards/                     # Cartes (ActivityCard, MenuItemCard, StatCard)
│   ├── form/                      # Formulaires (ReservationForm, FormStepper)
│   ├── home/                      # Sections accueil (HeroSection, ProgramSlider)
│   ├── layout/                    # Navigation (Header, Footer, AdminNavbar, AdminSidebar)
│   ├── modals/                    # Modales (AuthModal, MessageModal, QRCodeModal)
│   ├── sections/                  # Sections réutilisables
│   ├── specials/                  # Composants spéciaux (QRScanner)
│   └── ui/                        # Composants primitifs (Button, Input, Badge)
│
├── context/                       # Contexts React
│   ├── ThemeContext.tsx           # Gestion thème global + presets
│   └── ToastContext.tsx           # Notifications toast
│
├── lib/                           # Utilitaires
│   ├── fonts.ts                   # Import Google Fonts (Fraunces, Manrope, Space Mono)
│   ├── constants.ts               # Constantes (EVENT_INFO, etc.)
│   ├── utils.ts                   # Helpers (formatCFA, cn, etc.)
│   └── firebase.ts                # [FUTUR] Firebase config
│
├── data/                          # Données statiques
│   └── programme.ts               # Données timeline événement
│
├── hooks/                         # Custom hooks
│   └── [hooks réutilisables]
│
├── services/                      # Services API
│   └── [appels API externes]
│
├── public/                        # Assets statiques
│   ├── img/                       # Images (logo.png, etc.)
│   └── ...
│
├── .env                           # Variables d'environnement
├── next.config.ts                 # Config Next.js
├── tsconfig.json                  # Config TypeScript
├── package.json                   # Dépendances
└── README.md                      # Ce fichier

```

---

## 🎨 Système de Thème

### Variables CSS Dynamiques
Tous les composants utilisent `var(--theme-*)` au lieu de couleurs en dur:
- `var(--theme-primary)` - Couleur primaire (Magenta/Bleu)
- `var(--theme-secondary)` - Couleur secondaire (Vert/Kaki)
- `var(--theme-accent)` - Accent (Or/Jaune)
- `var(--theme-textPrimary)` - Texte principal
- `var(--theme-bgPrimary)` - Fond principal
- `var(--theme-danger)` - Rouge danger

### Presets
- **default**: Magenta (#EC4899) + Vert (#4ADE80)
- **retro**: Bleu (#0B1B33) + Kaki (#556B2F) - Recommandé
- **dark**: Sombre avec accents néons
- **minimal**: Noir & blanc

### Utilisation
```tsx
// ✅ BON - Utilise variables de thème
style={{ backgroundColor: 'var(--theme-primary)' }}

// ❌ MAUVAIS - Couleurs en dur
style={{ backgroundColor: '#0B1B33' }}
```

---

## 📦 Dépendances Clés

```json
{
  "next": "16.2.12",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.344.0"
}
```

---

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
# http://localhost:3000
```

### Build Production
```bash
npm run build
npm start
```

### Vérifier les erreurs
```bash
npm run lint
```

---

## 📱 Pages Principales

### Public (Accès libre)
| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Landing page avec hero + countdown |
| Programme | `/programme` | Timeline chronologique événement |
| Menu | `/menu` | Carte gourmandises & cocktails |
| Services | `/services` | Prestations traiteur sur-mesure |
| Réservation | `/reservation` | Billetterie (formulaire 3 étapes) |
| Contact | `/contact` | Formulaire contact + WhatsApp |
| Galerie | `/galerie` | Photos événement |
| Profil | `/profil` | Profil utilisateur connecté |

### Admin (Protégé)
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/admin/dashboard` | Vue d'ensemble |
| Thème | `/admin/theme` | Éditeur couleurs dynamiques |
| Statistiques | `/admin/statistics` | Tracking & métriques |
| Scanner | `/admin/scanner` | Scan QR Pass |
| Réservations | `/admin/reservations` | Gestion billets |
| Profil | `/admin/profil` | Profil administrateur |

---

## 🎯 Features

### ✅ Implémenté
- [x] Système de thème dynamique avec localStorage
- [x] Tous les composants utilisent variables CSS
- [x] Menu hamburger mobile admin
- [x] Billetterie 3 étapes
- [x] Bottom navigation bar mobile
- [x] Responsive design (mobile/tablet/desktop)
- [x] Formulaire contact avec validation
- [x] Interface admin navbar/sidebar

### 🔄 En Cours / Futur
- [ ] Firebase Auth (authentification admin)
- [ ] Firebase Firestore (base de données)
- [ ] Cloudinary (gestion images)
- [ ] Admin statistiques & dashboard
- [ ] QR Scanner fonctionnel
- [ ] Email notifications
- [ ] Paiement en ligne (Orange Money, etc.)

---

## 📊 Plan Firebase + Cloudinary

### 1️⃣ Firebase Setup

#### Installation
```bash
npm install firebase
```

#### Configuration (`lib/firebase.ts`)
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

#### Collections Firestore
```
firestore/
├── reservations/
│   ├── id: string (auto)
│   ├── fullName: string
│   ├── phone: string
│   ├── guests: number
│   ├── instagram: string (optional)
│   ├── totalAmount: number
│   ├── qrCode: string (URL)
│   ├── status: "pending" | "confirmed" | "scanned"
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
│
├── admins/
│   ├── uid: string (from auth)
│   ├── email: string
│   ├── name: string
│   ├── role: "super_admin" | "staff"
│   ├── permissions: string[]
│   └── createdAt: timestamp
│
├── events/
│   ├── id: string
│   ├── name: string
│   ├── date: timestamp
│   ├── location: string
│   ├── totalPlaces: number
│   ├── placesBooked: number
│   ├── price: number
│   └── imageUrl: string (Cloudinary)
│
└── statistics/
    ├── id: string (auto)
    ├── date: timestamp
    ├── totalReservations: number
    ├── totalRevenue: number
    ├── averageGuests: number
    └── conversionRate: number
```

### 2️⃣ Cloudinary Setup

#### Installation
```bash
npm install cloudinary next-cloudinary
```

#### Configuration (`.env.local`)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Upload Composant
```tsx
// components/CloudinaryUpload.tsx
import { CldUploadWidget } from 'next-cloudinary';

export function CloudinaryUpload({ onUpload }: { onUpload: (url: string) => void }) {
  return (
    <CldUploadWidget
      uploadPreset="your_preset"
      onSuccess={(result: any) => {
        onUpload(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <button onClick={() => open()}>
          Télécharger une image
        </button>
      )}
    </CldUploadWidget>
  );
}
```

### 3️⃣ Services API

#### `services/reservationService.ts`
```typescript
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function createReservation(data: ReservationData) {
  const docRef = await addDoc(collection(db, 'reservations'), {
    ...data,
    status: 'pending',
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function getReservationsByPhone(phone: string) {
  const q = query(
    collection(db, 'reservations'),
    where('phone', '==', phone)
  );
  return getDocs(q);
}
```

#### `services/statsService.ts`
```typescript
import { collection, query, where, getDocs, sum, average } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getStatistics(startDate: Date, endDate: Date) {
  const q = query(
    collection(db, 'reservations'),
    where('createdAt', '>=', startDate),
    where('createdAt', '<=', endDate)
  );
  
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  
  return {
    totalReservations: docs.length,
    totalRevenue: docs.reduce((sum, doc) => sum + doc.data().totalAmount, 0),
    averageGuests: docs.reduce((sum, doc) => sum + doc.data().guests, 0) / docs.length,
  };
}
```

### 4️⃣ Admin Statistics Page

#### `app/admin/statistics/page.tsx`
```typescript
'use client';

import React, { useEffect, useState } from 'react';
import { getStatistics } from '@/services/statsService';
import { StatCard } from '@/components/cards/StatCard';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const endDate = new Date();
      
      const data = await getStatistics(startDate, endDate);
      setStats(data);
    };
    
    fetchStats();
  }, []);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ color: 'var(--theme-textPrimary)' }}>
        Statistiques & Tracking
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Réservations"
          value={stats?.totalReservations || 0}
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Revenu Total"
          value={`${stats?.totalRevenue || 0} FCFA`}
          icon={DollarSign}
          variant="kaki"
        />
        <StatCard
          title="Moyenne par groupe"
          value={stats?.averageGuests?.toFixed(1) || 0}
          icon={Target}
          variant="blue"
        />
        <StatCard
          title="Taux conversion"
          value={`${((stats?.conversionRate || 0) * 100).toFixed(1)}%`}
          icon={TrendingUp}
          variant="red"
        />
      </div>
      
      {/* Graphiques & détails supplémentaires */}
    </div>
  );
}
```

### 5️⃣ Variables d'Environnement (`.env.local`)

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

## 🔐 Sécurité

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/admins).data.uids;
    }
    match /events/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📝 Checklist Implémentation

### Firebase
- [ ] Créer projet Firebase Console
- [ ] Ajouter credentials au `.env.local`
- [ ] Configurer `lib/firebase.ts`
- [ ] Créer collections Firestore
- [ ] Implémenter `services/reservationService.ts`
- [ ] Implémenter `services/statsService.ts`
- [ ] Ajouter Firebase Auth pour admin
- [ ] Configurer Firestore Rules

### Cloudinary
- [ ] Créer compte Cloudinary
- [ ] Ajouter credentials au `.env.local`
- [ ] Créer upload preset
- [ ] Implémenter `CloudinaryUpload` component
- [ ] Intégrer dans formulaires (menu, événement, galerie)

### Admin Pages
- [ ] `/admin/statistics` - Dashboard avec graphiques
- [ ] Authentification admin avec Firebase
- [ ] Upload image galerie avec Cloudinary
- [ ] Gestion réservations en temps réel

---

## 🎓 Ressources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Support

Pour des questions ou des bugs, veuillez ouvrir une issue GitHub.

---

**Last Updated**: August 2026 | **Version**: 1.0.0
