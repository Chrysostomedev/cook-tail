// data/programme.ts
export interface ProgrammeItem {
  id: string;
  time: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export const PROGRAMME_DATA: ProgrammeItem[] = [
  {
    id: "p1",
    time: "11H00",
    title: "Appel de la Rentrée & Photos Souvenirs",
    category: "Protocole",
    description: "Installation, contrôle des pass QR et séance photo officielle devant le grand tableau noir.",
    iconName: "Camera",
  },
  {
    id: "p2",
    time: "12H30",
    title: "Ouverture du Réfectoire & Buffet Gourmand",
    category: "Gastronomie",
    description: "Buffet chaud/froid à volonté, station cocktail Cook'Tail et dégustation de douceurs locales.",
    iconName: "Utensils",
  },
  {
    id: "p3",
    time: "15H00",
    title: "Grands Jeux de la Cour de Récréation",
    category: "Animations",
    description: "Chifoumi géant, Quizz Nostalgie Collège/Lycée et défis d'équipes inter-classes.",
    iconName: "Trophy",
  },
  {
    id: "p4",
    time: "18H00",
    title: "La Boum de Fin d'Année (Mix Rétro)",
    category: "Soirée",
    description: "DJ Set collector : le meilleur des sons 2000-2015 (Coupe-décalé, Rap, Zoblazo).",
    iconName: "Music",
  },
];