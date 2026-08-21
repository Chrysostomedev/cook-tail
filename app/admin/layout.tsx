"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: "var(--theme-bgSecondary)" }}>
        <AdminNavbar />

        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />

          <main className="flex-1 overflow-y-auto p-4 md:p-8" style={{ backgroundColor: "var(--theme-bgPrimary)", color: "var(--theme-textPrimary)" }}>
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}