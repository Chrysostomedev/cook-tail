// components/VisibilityWrapper.tsx
"use client";

import React, { ReactNode } from "react";
import { useVisibility } from "@/context/VisibilityContext";

interface VisibilityWrapperProps {
  componentId: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function VisibilityWrapper({ componentId, children, fallback = null }: VisibilityWrapperProps) {
  const { visibility } = useVisibility();
  
  // Par défaut, afficher le composant si pas défini dans la visibilité
  const isVisible = visibility[componentId] !== false;

  if (!isVisible) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
