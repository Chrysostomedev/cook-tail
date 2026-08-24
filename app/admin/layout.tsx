"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { onAuthStateChange } from "@/lib/services/authService";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: "var(--theme-bgSecondary)" }}>
        <AdminNavbar onMenuClick={() => setSidebarOpen((v) => !v)} />

        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main className="flex-1 overflow-y-auto p-4 md:p-8" style={{ backgroundColor: "var(--theme-bgPrimary)", color: "var(--theme-textPrimary)" }}>
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}