// app/admin/layout.tsx
import React from "react";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0B1B33]">
      {/* 1. Navbar fixe tout en haut */}
      <AdminNavbar />

      {/* 2. Zone principale : Sidebar + Contenu */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixe verticalement */}
        <AdminSidebar />

        {/* Zone de contenu dynamique */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#071324] text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}