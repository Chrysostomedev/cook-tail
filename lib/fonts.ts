// lib/fonts.ts
import { Fraunces, Manrope, Space_Mono } from "next/font/google";

// Fraunces - Serif (titres, accents)
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

// Manrope - Sans-serif moderne (corps de texte)
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Space Mono - Monospace (codes, métadonnées)
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Combiner toutes les polices pour utilisation dans className
export const fontVariables = `${fraunces.variable} ${manrope.variable} ${spaceMono.variable}`;
