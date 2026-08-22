// context/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

/**
 * Theme Configuration
 * Définit la palette de couleurs de toute l'application
 */
export interface ThemeConfig {
  // Primary color (Logo Magenta)
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Secondary color (Logo Vert)
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // Text & Background
  textPrimary: string;
  textSecondary: string;
  bgPrimary: string;
  bgSecondary: string;

  // Accents
  accent: string;
  danger: string;
  success: string;

  // Borders & Shadows
  borderColor: string;
  shadowColor: string;
}

interface ThemeContextType {
  theme: ThemeConfig;
  presetThemes: Record<string, ThemeConfig>;
  currentPreset: string;
  setTheme: (theme: ThemeConfig) => void;
  switchPreset: (presetName: string) => void;
  resetToDefault: () => void;
}

const defaultTheme: ThemeConfig = {
  // Primary: Magenta du logo (#EC4899)
  primary: "#EC4899",
  primaryLight: "#F472B6",
  primaryDark: "#BE185D",

  // Secondary: Vert du logo (#4ADE80)
  secondary: "#4ADE80",
  secondaryLight: "#86EFAC",
  secondaryDark: "#16A34A",

  // Text & Background
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F9FAFB",

  // Accents
  accent: "#F59E0B",
  danger: "#DC2626",
  success: "#10B981",

  // Borders & Shadows
  borderColor: "#E5E7EB",
  shadowColor: "#000000",
};

// Presets alternatifs pour l'administration
const presetThemes: Record<string, ThemeConfig> = {
  default: defaultTheme,

  // Thème Classic Rétro (Bleu/Kaki original)
  retro: {
    primary: "#0B1B33", // Bleu foncé
    primaryLight: "#1E3A5F",
    primaryDark: "#050d1a",
    secondary: "#556B2F", // Kaki
    secondaryLight: "#8FBC8F",
    secondaryDark: "#3d4d20",
    textPrimary: "#0B1B33",
    textSecondary: "#556B2F",
    bgPrimary: "#F4EBD9", // Crème
    bgSecondary: "#FEF08A", // Jaune surligneur
    accent: "#ad8653", // Or
    danger: "#DC2626",
    success: "#10B981",
    borderColor: "#0B1B33",
    shadowColor: "#0B1B33",
  },

  // Thème Dark
  dark: {
    primary: "#EC4899",
    primaryLight: "#F472B6",
    primaryDark: "#BE185D",
    secondary: "#4ADE80",
    secondaryLight: "#86EFAC",
    secondaryDark: "#16A34A",
    textPrimary: "#FFFFFF",
    textSecondary: "#E5E7EB",
    bgPrimary: "#111827",
    bgSecondary: "#1F2937",
    accent: "#FBBF24",
    danger: "#EF4444",
    success: "#10B981",
    borderColor: "#374151",
    shadowColor: "#000000",
  },

  // Thème Minimalist
  minimal: {
    primary: "#000000",
    primaryLight: "#404040",
    primaryDark: "#000000",
    secondary: "#E5E7EB",
    secondaryLight: "#F3F4F6",
    secondaryDark: "#D1D5DB",
    textPrimary: "#000000",
    textSecondary: "#6B7280",
    bgPrimary: "#FFFFFF",
    bgSecondary: "#F9FAFB",
    accent: "#000000",
    danger: "#DC2626",
    success: "#10B981",
    borderColor: "#000000",
    shadowColor: "#000000",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider — Enveloppe l'app pour fournir le thème global
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);
  const [currentPreset, setCurrentPreset] = useState<string>("default");
  const [mounted, setMounted] = useState(false);

  // Charger le thème sauvegardé depuis localStorage (client-side seulement)
  useEffect(() => {
    const savedPreset = localStorage.getItem("cooktail-theme-preset") || "default";
    const savedTheme = localStorage.getItem("cooktail-theme-custom");

    if (savedTheme) {
      try {
        setThemeState(JSON.parse(savedTheme));
      } catch {
        setThemeState(presetThemes[savedPreset] || defaultTheme);
      }
    } else {
      setThemeState(presetThemes[savedPreset] || defaultTheme);
    }

    setCurrentPreset(savedPreset);
    setMounted(true);
  }, []);

  // Appliquer le thème aux variables CSS
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      const cssVarName = `--theme-${key}`;
      root.style.setProperty(cssVarName, value);
    });

    // Sauvegarder dans localStorage
    localStorage.setItem("cooktail-theme-custom", JSON.stringify(theme));
  }, [theme, mounted]);

  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    setCurrentPreset("custom");
    localStorage.setItem("cooktail-theme-preset", "custom");
  };

  const switchPreset = (presetName: string) => {
    if (presetThemes[presetName]) {
      const preset = presetThemes[presetName];
      setThemeState(preset);
      setCurrentPreset(presetName);
      localStorage.setItem("cooktail-theme-preset", presetName);
      localStorage.removeItem("cooktail-theme-custom");
    }
  };

  const resetToDefault = () => {
    setThemeState(defaultTheme);
    setCurrentPreset("default");
    localStorage.setItem("cooktail-theme-preset", "default");
    localStorage.removeItem("cooktail-theme-custom");
  };

  // Mémoïser la valeur du Provider — DOIT être appelé à chaque render, avant tout return
  const value = useMemo(
    () => ({
      theme,
      presetThemes,
      currentPreset,
      setTheme,
      switchPreset,
      resetToDefault,
    }),
    [theme, currentPreset]
  );

  // Éviter hydration mismatch — le return conditionnel vient APRÈS tous les hooks
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook pour utiliser le thème dans les composants
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider");
  }
  return context;
};
