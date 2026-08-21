// app/(public)/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Utensils,
  Ticket,
  Info,
  Menu,
  X,
  ChevronDown,
  Image as GalleryIcon,
  Briefcase,
  User
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allNavTabs = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Programme", href: "/programme", icon: Calendar },
    { label: "Menu", href: "/menu", icon: Utensils },
    { label: "Pass QR", href: "/reservation", icon: Ticket },
    { label: "Services", href: "/services", icon: Briefcase },
    { label: "Contact", href: "/contact", icon: Info },
    { label: "Galerie", href: "/galerie", icon: GalleryIcon },
    { label: "Profil", href: "/profil", icon: User },
  ];

  const bottomBarTabs = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Programme", href: "/programme", icon: Calendar },
    { label: "Services", href: "/services", icon: Utensils },
    { label: "Pass QR", href: "/reservation", icon: Ticket },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--theme-bgPrimary)", color: "var(--theme-textPrimary)", display: "flex", flexDirection: "column", fontFamily: "var(--ff-manrope)", paddingBottom: "6rem" }} className="md:pb-0">

      {/* Header Haut Sticky */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: "var(--theme-bgPrimary)",
        backdropFilter: "blur(12px)",
        borderBottomWidth: "1px",
        borderBottomColor: "var(--theme-borderColor)",
        padding: "0.75rem 1rem",
        transition: "all 200ms"
      }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div style={{
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "var(--theme-primary)",
              borderRadius: "12px",
              padding: "0.375rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 200ms"
            }}
            className="group-hover:scale-105"
            >
              <Image
                src="/img/logo.png"
                alt="Logo Cook'Tail"
                width={36}
                height={36}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 style={{
                fontWeight: 800,
                fontSize: "1rem",
                lineHeight: "1.2",
                color: "var(--theme-textPrimary)",
                textTransform: "uppercase",
                margin: 0
              }} className="text-base md:text-xl tracking-tight leading-none">
                COOK'TAIL <span style={{ color: "var(--theme-secondary)", fontFamily: "var(--ff-fraunces)", fontStyle: "italic", fontWeight: 400, textTransform: "lowercase" }} className="text-secondary font-serif italic lowercase">Service</span>
              </h1>
              <p style={{
                fontSize: "0.625rem",
                fontFamily: "var(--ff-space-mono)",
                color: "var(--theme-secondary)",
                opacity: 0.8,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0.125rem 0 0 0"
              }} className="text-[10px] font-mono text-secondary/80 font-semibold uppercase tracking-widest mt-0.5">
                Brunch Récréation
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
            {allNavTabs.slice(0, 6).map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  style={{
                    padding: "0.5rem 0.875rem",
                    borderRadius: "12px",
                    transition: "all 200ms",
                    color: isActive ? "var(--theme-primary)" : "var(--theme-textSecondary)",
                    backgroundColor: isActive ? "rgba(236, 72, 153, 0.15)" : "transparent",
                    border: isActive ? "1px solid rgba(236, 72, 153, 0.2)" : "none"
                  }}
                  className="px-3.5 py-2 rounded-xl transition-all hover:text-textPrimary hover:bg-bgSecondary/50"
                >
                  {tab.label}
                </Link>
              );
            })}

            <Link
              href="/reservation"
              style={{
                marginLeft: "0.5rem",
                backgroundColor: "var(--theme-primary)",
                color: "white",
                padding: "0.625rem 1.25rem",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                borderRadius: "12px",
                boxShadow: "var(--shadow-soft-md)",
                transition: "all 200ms"
              }}
              className="ml-2 px-5 py-2.5 font-bold text-xs uppercase rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              Prendre Mon Pass
            </Link>
          </div>

          {/* Hamburger Button Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{
              backgroundColor: "var(--theme-primary)",
              color: "white",
              padding: "0.625rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow-soft-sm)",
              border: "none",
              cursor: "pointer",
              transition: "all 200ms"
            }}
            onMouseDown={(e) => (e.currentTarget as any).style.transform = "scale(0.95)"}
            onMouseUp={(e) => (e.currentTarget as any).style.transform = "scale(1)"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Footer Desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Bar Mobile */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div style={{
          backgroundColor: "var(--theme-primary)",
          color: "white",
          backdropFilter: "blur(20px)",
          borderRadius: "1rem",
          padding: "0.375rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "var(--shadow-soft-lg)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}>
          {bottomBarTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 relative"
                style={{
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  color: "white"
                }}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? "var(--theme-secondary)" : "rgba(255, 255, 255, 0.7)" }} />
                <span className="text-[10px] font-medium tracking-tight mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl p-5 z-50 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
              style={{
                backgroundColor: "var(--theme-bgPrimary)",
                borderTopWidth: "1px",
                borderTopColor: "var(--theme-borderColor)"
              }}
            >
              <div className="flex items-center justify-between border-b border-borderColor pb-3">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "12px",
                    backgroundColor: "var(--theme-primary)",
                    padding: "0.375rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Image
                      src="/img/logo.png"
                      alt="Logo Mobile"
                      width={32}
                      height={32}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--theme-textPrimary)", margin: 0 }} className="font-bold text-sm">
                      Navigation Générale
                    </h3>
                    <p style={{ fontSize: "0.6875rem", color: "var(--theme-textSecondary)", margin: "0.125rem 0 0 0" }} className="text-[11px]">
                      Toutes les sections de l'événement
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-bgSecondary/80 hover:bg-bgSecondary text-textPrimary p-2 rounded-xl active:scale-95 transition-all flex items-center gap-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--theme-bgSecondary)",
                    color: "var(--theme-textPrimary)",
                    border: "none",
                    cursor: "pointer"
                  }}
                  aria-label="Réduire"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Réduire</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {allNavTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname === tab.href;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: isActive ? "rgba(236, 72, 153, 0.15)" : "white",
                        borderColor: isActive ? "rgba(236, 72, 153, 0.3)" : "var(--theme-borderColor)",
                        color: isActive ? "var(--theme-primary)" : "var(--theme-textPrimary)"
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "var(--theme-secondary)" }} />
                      <span className="truncate">{tab.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/reservation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full font-bold py-3.5 px-4 rounded-xl shadow-md text-center uppercase text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
                  style={{
                    backgroundColor: "var(--theme-primary)",
                    color: "white"
                  }}
                >
                  <Ticket className="w-4 h-4" />
                  Réserver Mon Pass QR (30 Places)
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
