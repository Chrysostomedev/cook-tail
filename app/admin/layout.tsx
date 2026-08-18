// app/admin/layout.tsx
import React from "react";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F4EBD9]">
      {/* 1. Navbar fixe tout en haut (Pleine largeur) */}
      <AdminNavbar />

      {/* 2. Zone principale : Sidebar à gauche + Contenu à droite */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixe verticalement */}
        <AdminSidebar />

        {/* Zone de contenu dynamique avec défilement indépendant */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}