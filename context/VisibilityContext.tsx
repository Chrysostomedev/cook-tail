// context/VisibilityContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

export interface ComponentVisibility {
  [key: string]: boolean;
}

interface VisibilityContextType {
  visibility: ComponentVisibility;
  toggleComponent: (componentName: string) => void;
  setVisibility: (visibility: ComponentVisibility) => void;
  resetVisibility: () => void;
}

const defaultVisibility: ComponentVisibility = {
  // Pages Accueil
  "home.hero": true,
  "home.countdown": true,
  "home.features": true,
  "home.program": true,
  "home.testimonials": true,
  "home.cta": true,

  // Pages Programme
  "programme.header": true,
  "programme.timeline": true,

  // Pages Menu
  "menu.header": true,
  "menu.categories": true,

  // Pages Services
  "services.header": true,
  "services.cards": true,

  // Pages Contact
  "contact.header": true,
  "contact.form": true,
  "contact.info": true,

  // Pages Galerie
  "galerie.header": true,
  "galerie.gallery": true,

  // Pages Profil
  "profil.header": true,
  "profil.content": true,

  // Pages A-Propos
  "about.header": true,
  "about.content": true,

  // Pages Règlement
  "reglement.header": true,
  "reglement.content": true,

  // Pages CGU
  "cgu.header": true,
  "cgu.content": true,

  // Pages Réservation
  "reservation.form": true,
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const VisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visibility, setVisibilityState] = useState<ComponentVisibility>(defaultVisibility);
  const [mounted, setMounted] = useState(false);

  // Charger depuis localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem("cooktail-visibility");
    if (savedVisibility) {
      try {
        setVisibilityState(JSON.parse(savedVisibility));
      } catch {
        setVisibilityState(defaultVisibility);
      }
    }
    setMounted(true);
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cooktail-visibility", JSON.stringify(visibility));
    }
  }, [visibility, mounted]);

  const toggleComponent = (componentName: string) => {
    setVisibilityState((prev) => ({
      ...prev,
      [componentName]: !prev[componentName],
    }));
  };

  const setVisibility = (newVisibility: ComponentVisibility) => {
    setVisibilityState(newVisibility);
  };

  const resetVisibility = () => {
    setVisibilityState(defaultVisibility);
  };

   // Mémoïser la valeur du Provider — appelé à chaque render, avant tout return
  const value = useMemo(
    () => ({
      visibility,
      toggleComponent,
      setVisibility,
      resetVisibility,
    }),
    [visibility]
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = (): VisibilityContextType => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error("useVisibility doit être utilisé à l'intérieur d'un VisibilityProvider");
  }
  return context;
};
