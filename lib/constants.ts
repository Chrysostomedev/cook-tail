// lib/constants.ts
export const EVENT_INFO = {
  title: "BRUNCH RÉCRÉATION",
  subtitle: "Retour sur nos années collège & lycée",
  date: "Octobre 2026 (À confirmer)",
  location: "Yop Sapeur Pompier, chez Yop sur Yango",
  city: "Abidjan, Côte d'Ivoire",
  price: 10000, // FCFA
  maxCapacity: 30,
  whatsapp: "0779324187",
  instagram: "@cooktail_service",
  dressCode: "Tenue d'écolier (Bleu & Blanc filles / Kaki garçons)",
} as const;

export const ADMIN_ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
} as const;