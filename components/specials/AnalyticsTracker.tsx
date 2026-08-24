"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/services/analyticsService";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return; // Ne jamais tracker l'admin
    trackPageView(pathname);
  }, [pathname]);

  return null;
}