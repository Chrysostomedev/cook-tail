import type { Metadata } from "next";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cook'Tail Service - Brunch Récréation 2026",
  description: "Retrouvailles nostalgiques des années collège & lycée • Pass QR exclusif • 30 places • Abidjan",
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
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
