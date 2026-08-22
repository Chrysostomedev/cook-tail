// components/VisibilityWrapper.tsx
"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useVisibility } from "@/context/VisibilityContext";

interface VisibilityWrapperProps {
  componentId: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function VisibilityWrapper({ componentId, children, fallback = null }: VisibilityWrapperProps) {
  const [mounted, setMounted] = useState(false);
  
  let visibilityContext: any = null;
  try {
    visibilityContext = useVisibility();
  } catch (e) {
    // Context not available (SSR or outside provider)
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or initial render, show children
  if (!mounted || !visibilityContext) {
    return <>{children}</>;
  }

  const { visibility } = visibilityContext;
  
  // Par défaut, afficher le composant si pas défini dans la visibilité
  const isVisible = visibility[componentId] !== false;

  if (!isVisible) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
