import { EVENT_INFO } from "@/lib/constants"; // en haut du fichier

export interface FooterContent {
  badge: string;
  brandName: string;
  brandSuffix: string;
  description: string;
  contactsTitle: string;
  whatsappNumber: string;
  locationTitle: string;
  locationText: string;
  locationCity: string;
  eventDate: string;        // ← ajouté
  socialTitle: string;      // ← ajouté (titre de la nouvelle colonne)
  instagramHandle: string;  // ← ajouté
  waveNumber: string;       // ← ajouté
  waveDisplayName: string;  // ← ajouté
  copyright: string;
}

export interface ContentConfig {
  hero: HeroContent;
  countdown: CountdownContent;
  program: ProgramContent;
  features: FeatureContent[];
  testimonials: TestimonialContent[];
  regulation: RegulationContent;
  menuHeader: { badge: string; title: string; accent: string; description: string };
  programmePage: ProgrammePageContent;
  footer: FooterContent; // ← ajouté
}

export interface HeroContent {
  images: string[];
  badge: string;
  capacity: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  gamesCta: string;
}

export interface CountdownContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  targetDate: string;
}

export interface ProgramStepContent {
  time: string;
  title: string;
  desc: string;
  badge: string;
  icon: "clock" | "utensils" | "award" | "party";
}

export interface ProgramContent {
  eyebrow: string;
  title: string;
  accent: string;
  steps: ProgramStepContent[];
}

export interface FeatureContent {
  title: string;
  desc: string;
  badge: string;
  tone: "primary" | "secondary" | "accent" | "danger";
}

export interface TestimonialContent {
  id: string;
  name: string;
  promo: string;
  text: string;
  rating: number;
  image?: string;
}

export interface RegulationContent {
  title: string;
  highlight: string;
  description: string;
  buttonLabel: string;
}

export interface ProgrammePageContent {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  items: {
    id: string;
    time: string;
    title: string;
    category: string;
    description: string;
    iconName: string;
  }[];
}

export interface ContentConfig {
  hero: HeroContent;
  countdown: CountdownContent;
  program: ProgramContent;
  features: FeatureContent[];
  testimonials: TestimonialContent[];
  regulation: RegulationContent;
  menuHeader: {
    badge: string;
    title: string;
    accent: string;
    description: string;
  };
  programmePage: ProgrammePageContent;
}

export const defaultContent: ContentConfig = {
  footer: {
  badge: "Brunch Récréation",
  brandName: "COOK'TAIL",
  brandSuffix: "Service",
  description: "Une expérience immersive dédiée aux souvenirs d'enfance et aux retrouvailles des années collèges & lycées à Abidjan.",
  contactsTitle: "Assistance & Réservations",
  whatsappNumber: EVENT_INFO.whatsapp,
  locationTitle: "Lieu & Rentrée",
  locationText: EVENT_INFO.location,
  locationCity: "Abidjan, Yopougon",
  eventDate: EVENT_INFO.date,                    // ← ajouté
  socialTitle: "Réseaux & Paiement",              // ← ajouté
  instagramHandle: EVENT_INFO.instagram,          // ← ajouté
  waveNumber: EVENT_INFO.wavePhoneNumber,         // ← ajouté
  waveDisplayName: EVENT_INFO.waveDisplayName,    // ← ajouté
  copyright: "© 2026 Cook'Tail Service. Tous droits réservés.",
},
  hero: {
    // Les images viennent de Firestore; aucune image mockée n'est utilisée par défaut.
    images: [],
    badge: "Événement Exclusif Abidjan",
    capacity: "",
    title: "Brunch Récréation 2026",
    subtitle: "",
    primaryCta: "Réserver Mon Pass",
    secondaryCta: "Programme",
    gamesCta: "Jeux",
  },
  countdown: {
    badge: "INSCRIPTIONS • DERNIER APPEL",
    title: "Le Portail Se Ferme Bientôt !",
    highlight: "Ferme",
    description: "Ne manquez pas la rentrée récréative de l'année.",
    targetDate: "2026-09-15T12:00:00+00:00",
  },
  program: {
    eyebrow: "Emploi du Temps",
    title: "Déroulement de la Journée",
    accent: "Journée",
    steps: [
      { time: "12H00 - 13H30", title: "Rassemblement & Appel des Élèves", desc: "Accueil au portail, remise des badges de classe, mocktail de bienvenue et photo de classe d'époque.", badge: "Accent Ambré", icon: "clock" },
      { time: "13H30 - 15H30", title: "Buffet Récréation & Service Cook'Tail", desc: "Dégustation gastronomique rétro, grillades, amuse-bouches d'enfance et bar à cocktails signatures à volonté.", badge: "Gourmand", icon: "utensils" },
      { time: "15H30 - 17H30", title: "Jeux de Cour & Olympiades Rétro", desc: "Concours de Marelle, Ludo, Baoulé, Quiz de culture générale 2000s et remise du Prix du Major de Promotion.", badge: "Compétition", icon: "award" },
      { time: "17H30 - 20H00", title: "La Grande Boum de Fin d'Année", desc: "Piste de danse enflammée par DJ Mix Coupé-Décalé Rétro, Zoblazo & R&B old school.", badge: "Soirée", icon: "party" },
    ],
  },
  features: [
    { title: "Cocktails à Volonté", desc: "Bar à cocktails signature Cook'Tail, jus locaux artisanaux et rafraîchissements d'époque servis en continu.", badge: "Gourmand & Frais", tone: "secondary" },
    { title: "Mix 2000-2015", desc: "Un voyage musical rétro rythmé par les meilleurs sons Coupé-Décalé, R&B old school et pépites du lycée.", badge: "Nostalgie & Ambiance", tone: "primary" },
    { title: "Dress Code Obligatoire", desc: "Bleu & Blanc pour les filles / Uniforme Kaki pour les garçons. Accessoires de classe fortement conseillés !", badge: "Thème Récréation", tone: "danger" },
  ],
  testimonials: [
    { id: "testimonial-1", name: "Marc-Antoine K.", promo: "Promo Lycée Classique 2012", text: "L'ambiance était tout simplement nostalgique ! Retrouver les jus locaux et les jeux de billes en uniforme kaki... Cook'Tail a fait un travail remarquable.", rating: 5 },
    { id: "testimonial-2", name: "Sonia Bley", promo: "Ancienne Élève Sainte-Marie", text: "Le bar à cocktails signature était au-dessus de mes attentes. Le dress code Bleu & Blanc a redonné une vraie magie au brunch.", rating: 5 },
    { id: "testimonial-3", name: "Franck A.", promo: "Promo 2008", text: "Organisation au top, la musique Rétro Coupé Décalé nous a rappelés nos meilleures années au collège. À refaire absolument !", rating: 5 },
  ],
  regulation: {
    title: "Tenue Uniforme Obligatoire",
    highlight: "Pas de Blâme !",
    description: "Bleu & Blanc pour les filles, Khaki pour les garçons. Tout contrevenant se verra attribuer 2 heures de colle... directement au Bar à Cocktails !",
    buttonLabel: "Consulter le Règlement Intérieur",
  },
  menuHeader: {
    badge: "Buffet Récréation à Volonté",
    title: "La Carte des Gourmandises",
    accent: "Gourmandises",
    description: "Tous les plats, jus locaux, cocktails et friandises de notre enfance sont entièrement inclus dans votre Pass Droit d'Accès !",
  },
  programmePage: {
    eyebrow: "Emploi du Temps Officiel",
    title: "Le Programme de la Récré",
    accent: "Récré",
    description: "Quand la cloche sonne, c’est le moment de réjouissance ! Découvrez l'enchaînement exact des cours gourmands et des Olympiades d'enfance.",
    items: [
      { id: "p1", time: "11H00", title: "Appel de la Rentrée & Photos Souvenirs", category: "Protocole", description: "Installation, contrôle des pass QR et séance photo officielle devant le grand tableau noir.", iconName: "Camera" },
      { id: "p2", time: "12H30", title: "Ouverture du Réfectoire & Buffet Gourmand", category: "Gastronomie", description: "Buffet chaud/froid à volonté, station cocktail Cook'Tail et dégustation de douceurs locales.", iconName: "Utensils" },
      { id: "p3", time: "15H00", title: "Grands Jeux de la Cour de Récréation", category: "Animations", description: "Chifoumi géant, Quizz Nostalgie Collège/Lycée et défis d'équipes inter-classes.", iconName: "Trophy" },
      { id: "p4", time: "18H00", title: "La Boum de Fin d'Année (Mix Rétro)", category: "Soirée", description: "DJ Set collector : le meilleur des sons 2000-2015 (Coupe-décalé, Rap, Zoblazo).", iconName: "Music" },
    ],
  },
};