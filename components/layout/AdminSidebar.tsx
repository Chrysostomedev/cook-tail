// components/layout/AdminSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  QrCode,
  User,
  Ticket,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavGroup {
  groupLabel: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navigationGroups: NavGroup[] = [
    {
      groupLabel: "Vue d'ensemble",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Statistiques", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      groupLabel: "Gestion Billetterie",
      items: [
        { label: "Scanner Pass", href: "/admin/scanner", icon: QrCode, badge: "Live" },
        { label: "Réservations", href: "/admin/reservations", icon: Ticket },
        { label: "Participants", href: "/admin/participants", icon: Users },
      ],
    },
    {
      groupLabel: "Administration",
      items: [
        { label: "Mon Profil", href: "/admin/profil", icon: User },
        { label: "Paramètres", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#0B1B33] border-r border-slate-800 text-white hidden md:flex flex-col justify-between p-4 shrink-0 shadow-xl">
      <div className="space-y-6">
        {/* Banner statut terminal */}
        <div className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-slate-300">Terminal Actif</span>
          </div>
          <span className="text-[10px] font-mono font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
            v2.0
          </span>
        </div>

        {/* Groupes de navigation */}
        <div className="space-y-5">
          {navigationGroups.map((group) => (
            <div key={group.groupLabel} className="space-y-1.5">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                {group.groupLabel}
              </span>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                        isActive
                          ? "bg-amber-400 text-slate-950 font-extrabold shadow-md shadow-amber-400/10"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-slate-950" : "text-slate-400 group-hover:text-amber-400")} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={cn(
                          "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase",
                          isActive ? "bg-slate-950 text-amber-400" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Zone Profil Rapide & Déconnexion */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
            A
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Awa Koffi</p>
            <p className="text-[10px] text-slate-300 font-mono truncate">admin@cooktail.ci</p>
          </div>
        </div>

        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" /> Déconnexion
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;