import type { Metadata } from "next";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ContentProvider } from "@/context/ContentContext";
import { VisibilityProvider } from "@/context/VisibilityContext";
import { NotificationInitializer } from "@/components/NotificationInitializer";
import { AnalyticsTracker } from "@/components/specials/AnalyticsTracker";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cook'Tail Service - Brunch Récréation 2026",
  description: "Retrouvailles nostalgiques des années primaire, collège & lycée • Pass QR exclusif • 50 places • Abidjan",
  keywords: ["brunch", "récréation", "événement", "Abidjan"],
  authors: [{ name: "Cook'Tail Service" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={fontVariables}>
        <ThemeProvider>
          <ContentProvider>
            <VisibilityProvider>
              <ToastProvider>
                <NotificationInitializer />
                <AnalyticsTracker />
                {children}
              </ToastProvider>
            </VisibilityProvider>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
