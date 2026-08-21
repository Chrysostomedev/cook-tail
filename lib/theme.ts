// lib/theme.ts
export const RETRO_THEME = {
  colors: {
    // Tenue des filles
    blouseBlue: "#0b0369",
    blouseBlueLight: "#12053b",
    // Tenue des garçons
    kakiBoys: "#f5c566ff",
    kakiLight: "#e5ca86ff",
    // Fond papier & cahier
    creamPaper: "#F4EBD9",
    chalkboard: "#1C2826",
    kraftPaper: "#FEF08A",
    // Accents d'écolier
    penRed: "#DC2626",
    highlightYellow: "#ad8653",
    notebookGrid: "#E2D8C3",
  },
  shadows: {
    brutal: "4px 4px 0px 0px #0B1B33",
    brutalLg: "6px 6px 0px 0px #0B1B33",
    brutalRed: "4px 4px 0px 0px #DC2626",
  },
  rotations: {
    postIt: "rotate-[-2deg]",
    polaroid: "rotate-[1.5deg]",
    stamp: "rotate-[-12deg]",
  },
} as const;