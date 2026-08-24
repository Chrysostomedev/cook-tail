// lib/constants.ts
export const EVENT_INFO = {
  title: "BRUNCH RÉCRÉATION",
  subtitle: "Retour sur nos années primaire, collège & lycée",
  date: "Octobre 2026 ",
  location: "Cocody, Abidjan",
  city: "Abidjan, Côte d'Ivoire",
  price: 10000, // FCFA
  maxCapacity: 30,
  whatsapp: "0779324187",
  instagram: "@cooktail_service",
  dressCode: "Tenue d'écolier (Mille carreaux Bleu & Blanc filles / Kaki pour les hommes)",

  wavePhoneNumber: "07 79 32 41 87", // <-- TON vrai numéro Wave marchand
  waveDisplayName: "Cook'Tail Service", // nom affiché sur Wave si tu as un compte Business

} as const;

export const ADMIN_ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
} as const;
