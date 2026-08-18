# 🎒 Cook'Tail Service — Brunch Récréation

> Application web événementielle premium, mobile-first, pour l'événement nostalgique **"Brunch Récréation – Retour sur nos années collège & lycée"** à Abidjan.
> Landing page immersive + réservation avec QR Code + back-office admin.

⚠️ **Note** : aucun fichier de projet n'a été uploadé dans cette conversation, je n'ai donc pas pu lire ton code réel. Ce README documente l'**architecture de référence** correspondant exactement à ton cahier des charges (stack, dossiers, services, hooks, types). Adapte les noms si ton implémentation diffère légèrement — dis-moi si tu veux que je le régénère depuis ton vrai code (upload le zip du projet).

---

## 🧱 Stack technique

| Domaine | Techno |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Style | Tailwind CSS (thème rétro custom) |
| Animations | Framer Motion |
| Icônes | lucide-react |
| Backend | Firebase (Auth + Firestore + Functions) |
| Images | Cloudinary |
| QR Code | `qrcode` (génération) + `@yudiel/react-qr-scanner` (scan admin) |
| Déploiement | Vercel |

---

## 🎨 Identité visuelle

- **Palette** : bleu nuit `#0B1B33`, crème `#F4EBD9`, jaune moutarde `#E3A727`, bois brun `#6B4423`, rouge/rose accent `#D94F4F`
- **Univers** : cahier scolaire, tableau noir, papier kraft, polaroids, doodles manuscrits
- Constantes dans `lib/theme.ts` (voir plus bas)

---

## 📁 Arborescence du projet

```
cooktail-brunch/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                 # Landing page
│   │   ├── reservation/
│   │   │   ├── page.tsx             # Formulaire de réservation
│   │   │   └── confirmation/[ref]/page.tsx
│   │   └── mon-pass/[ref]/page.tsx  # Page "Mon Pass" imprimable
│   ├── admin/
│   │   ├── layout.tsx               # Layout protégé (auth check)
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── reservations/page.tsx
│   │   ├── participants/page.tsx
│   │   ├── evenement/page.tsx       # Gestion menu/activités/date
│   │   └── scanner/page.tsx         # Scan QR check-in
│   └── api/
│       ├── reservations/route.ts    # Création réservation (validation serveur)
│       └── checkin/route.ts         # Validation QR (anti double-scan)
│
├── components/
│   ├── sections/         # Blocs de la landing page
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ActivitiesSection.tsx
│   │   ├── MenuSection.tsx
│   │   ├── InfosSection.tsx         # date, lieu, tarif, places restantes
│   │   ├── GallerySection.tsx
│   │   └── ContactSection.tsx       # WhatsApp / Instagram
│   ├── form/
│   │   ├── ReservationForm.tsx
│   │   ├── FormField.tsx
│   │   ├── FormStepper.tsx          # infos → réservation → confirmation
│   │   └── PhoneInput.tsx
│   ├── cards/
│   │   ├── ActivityCard.tsx
│   │   ├── MenuItemCard.tsx
│   │   ├── StatCard.tsx             # dashboard admin
│   │   └── ParticipantCard.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── MobileNav.tsx
│   ├── ui/                          # primitives réutilisables
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Spinner.tsx
│   │   ├── CountdownBadge.tsx       # places restantes / compte à rebours
│   │   └── PolaroidFrame.tsx        # composant déco réutilisable
│   └── modals/
│       ├── Modal.tsx                # wrapper générique (Framer Motion)
│       ├── ConfirmationModal.tsx
│       ├── GalleryLightbox.tsx
│       └── QRCodeModal.tsx
│
├── hooks/
│   ├── useReservation.ts
│   ├── useEventStats.ts             # places restantes, revenus temps réel
│   ├── useAuth.ts
│   ├── useQRScanner.ts
│   └── useMediaQuery.ts
│
├── services/
│   ├── firebase/
│   │   ├── auth.service.ts
│   │   ├── reservations.service.ts
│   │   ├── event.service.ts
│   │   └── checkin.service.ts
│   ├── cloudinary.service.ts
│   └── qrcode.service.ts
│
├── lib/
│   ├── firebase.ts                  # init app + exports auth/db
│   ├── cloudinary.ts                # config upload
│   ├── theme.ts                     # tokens couleurs/typo
│   ├── constants.ts                 # infos événement (date, lieu, tarif, quota)
│   ├── validators.ts                # schémas Zod
│   └── utils.ts                     # cn(), formatCFA(), generateRef()
│
├── types/
│   └── index.ts
│
├── firestore.rules
├── .env.local.example
└── README.md
```

---

## 🧩 Composants clés (`components/`)

### `sections/`
Chaque section est un bloc plein écran de la landing, animé au scroll via Framer Motion (`whileInView`, `viewport={{ once: true }}`). `HeroSection` porte le CTA principal **"Réserver ma place"** et les textures kraft/tableau noir en fond SVG.

### `form/`
`ReservationForm` orchestre le parcours en 3 étapes via `FormStepper` : **Infos perso → Récap/Paiement → Confirmation**. Validation via `react-hook-form` + `zod`.

### `cards/`
Cartes réutilisables au style "polaroid/post-it" (rotation légère, ombre portée, `PolaroidFrame` en wrapper visuel).

### `ui/`
Primitives Tailwind + variants (façon shadcn maison), sans dépendance lourde.

### `modals/`
`Modal.tsx` = wrapper générique avec `AnimatePresence` + backdrop blur. Tous les autres modals l'utilisent en composition.

---

## 🪝 Hooks (`hooks/`) — signatures & types

```ts
// hooks/useReservation.ts
export interface UseReservationReturn {
  submitReservation: (data: ReservationInput) => Promise<ReservationResult>;
  isSubmitting: boolean;
  error: string | null;
}
export function useReservation(): UseReservationReturn;

// hooks/useEventStats.ts
export interface EventStats {
  totalCapacity: number;
  reservedCount: number;
  remainingSpots: number;
  revenue: number;
  loading: boolean;
}
export function useEventStats(): EventStats; // écoute Firestore en temps réel (onSnapshot)

// hooks/useAuth.ts
export interface AuthState {
  user: AdminUser | null;
  role: "admin" | "staff" | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
export function useAuth(): AuthState;

// hooks/useQRScanner.ts
export interface UseQRScannerReturn {
  scanResult: string | null;
  isScanning: boolean;
  error: string | null;
  startScan: () => void;
  stopScan: () => void;
}
export function useQRScanner(onDetect: (ref: string) => void): UseQRScannerReturn;

// hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean;
```

---

## ⚙️ Services (`services/`) — signatures & types

```ts
// services/firebase/reservations.service.ts
export interface ReservationInput {
  fullName: string;
  phone: string;
  email?: string;
  guests: number;
  instagram?: string;
}

export interface Reservation extends ReservationInput {
  id: string;
  reference: string;          // ex: BR-2026-0042
  qrCodeUrl: string;
  status: "pending" | "confirmed" | "checked_in" | "cancelled";
  amount: number;             // en FCFA
  createdAt: Timestamp;
  checkedInAt?: Timestamp;
}

export interface ReservationResult {
  reservation: Reservation;
  passUrl: string;            // /mon-pass/[ref]
}

export const reservationsService = {
  create(data: ReservationInput): Promise<ReservationResult>,
  getByReference(reference: string): Promise<Reservation | null>,
  list(filters?: ReservationFilters): Promise<Reservation[]>,
  exportToCSV(): Promise<Blob>,
};

// services/firebase/checkin.service.ts
export interface CheckinResult {
  success: boolean;
  alreadyUsed: boolean;
  reservation?: Reservation;
}
export const checkinService = {
  validate(reference: string): Promise<CheckinResult>, // détecte double-scan
};

// services/firebase/event.service.ts
export interface EventConfig {
  eventDate: string;          // "TBC" tant que non confirmée
  location: string;
  pricePerPerson: number;
  maxCapacity: number;
  menu: MenuItem[];
  activities: Activity[];
}
export const eventService = {
  getConfig(): Promise<EventConfig>,
  updateConfig(partial: Partial<EventConfig>): Promise<void>,
};

// services/firebase/auth.service.ts
export interface AdminUser {
  uid: string;
  email: string;
  role: "admin" | "staff";
}
export const authService = {
  login(email: string, password: string): Promise<AdminUser>,
  logout(): Promise<void>,
  getCurrentUser(): Promise<AdminUser | null>,
};

// services/qrcode.service.ts
export const qrcodeService = {
  generate(reference: string): Promise<string>, // → data URL sécurisé (payload signé)
  verifySignature(payload: string): boolean,
};

// services/cloudinary.service.ts
export const cloudinaryService = {
  upload(file: File, folder: string): Promise<{ url: string; publicId: string }>,
  getGalleryImages(folder: string): Promise<string[]>,
};
```

---

## 🧠 `lib/` — configuration

```ts
// lib/firebase.ts
export const app, auth, db, storage; // initializeApp() avec env vars

// lib/cloudinary.ts
export const cloudinaryConfig: { cloudName: string; uploadPreset: string };

// lib/constants.ts
export const EVENT_INFO = {
  title: "BRUNCH RÉCRÉATION",
  date: "Octobre 2026 (à confirmer)",
  location: "Yop Sapeur Pompier, chez Yop sur Yango",
  price: 10000, // FCFA
  maxCapacity: 30,
  whatsapp: "0779324187",
  instagram: "@cooktail_service",
};

// lib/validators.ts (Zod)
export const reservationSchema = z.object({ ... });

// lib/utils.ts
export function cn(...classes): string;
export function formatCFA(amount: number): string;
export function generateReference(): string; // BR-YYYY-XXXX
```

---

## 🗄️ Modèle Firestore

```
/events/{eventId}
  ├─ config: EventConfig
/reservations/{reservationId}
  ├─ Reservation
/admins/{uid}
  ├─ { role: "admin" | "staff" }
```

### `firestore.rules` (principe)
- Lecture publique **limitée** aux compteurs agrégés (places restantes) — pas d'accès direct à la liste des réservations.
- Écriture des réservations : uniquement via **Cloud Function / API route** (validation serveur, jamais côté client).
- `/admins/{uid}` : lecture/écriture réservées aux `request.auth.uid` avec `role in ["admin","staff"]`.
- Check-in : seul le rôle `admin`/`staff` peut passer `status` à `checked_in`.

---

## 🔐 Variables d'environnement (`.env.local`)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
QR_SIGNING_SECRET=
```

---

## 🚀 Scripts

```bash
npm run dev        # développement
npm run build       # build production
npm run lint         # lint
```

#   c o o k - t a i l  
 