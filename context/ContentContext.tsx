"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { defaultContent, type ContentConfig } from "@/lib/content";
import { saveContent, subscribeToContent } from "@/lib/services/contentService";

interface ContentContextValue {
  content: ContentConfig;
  contentSource: "fallback" | "firebase";
  contentError: string | null;
  updateSection: (section: keyof ContentConfig, value: ContentConfig[keyof ContentConfig]) => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentConfig>(defaultContent);
  const contentRef = useRef(defaultContent);
  const [contentSource, setContentSource] = useState<"fallback" | "firebase">("fallback");
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeContent = subscribeToContent((remote) => {
    if (!remote) {
      setContentSource("fallback");
      return;
    }

    const nextContent: ContentConfig = {
      ...contentRef.current,
      ...remote,
      hero: {
        ...defaultContent.hero,
        ...contentRef.current.hero,
        ...(remote.hero || {}),
        images: Array.isArray(remote.hero?.images)
          ? remote.hero.images.filter((image): image is string => typeof image === "string" && image.trim().length > 0)
          : contentRef.current.hero.images,
      },
      countdown: { ...defaultContent.countdown, ...contentRef.current.countdown, ...(remote.countdown || {}) },
      program: { ...defaultContent.program, ...contentRef.current.program, ...(remote.program || {}) },
      features: Array.isArray(remote.features) ? remote.features : contentRef.current.features,
      testimonials: Array.isArray(remote.testimonials) ? remote.testimonials : contentRef.current.testimonials,
      regulation: { ...defaultContent.regulation, ...contentRef.current.regulation, ...(remote.regulation || {}) },
      menuHeader: { ...defaultContent.menuHeader, ...contentRef.current.menuHeader, ...(remote.menuHeader || {}) },
      programmePage: { ...defaultContent.programmePage, ...contentRef.current.programmePage, ...(remote.programmePage || {}) },
    };
    contentRef.current = nextContent;
    setContent(nextContent);
    setContentSource("firebase");
    setContentError(null);
    }, (error) => {
    setContentError(error.message);
    });
    return () => {
      unsubscribeContent();
    };
  }, []);

  const updateSection: ContentContextValue["updateSection"] = async (section, value) => {
    const next = { ...contentRef.current, [section]: value } as ContentConfig;
    contentRef.current = next;
    setContent(next);
    await saveContent(next);
  };

  const value = useMemo(() => ({ content, contentSource, contentError, updateSection }), [content, contentSource, contentError]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export const useContent = (): ContentContextValue => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent doit être utilisé à l'intérieur d'un ContentProvider");
  return context;
};