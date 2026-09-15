"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  QrCode,
  User,
  Ticket,
  BarChart3,
  LogOut,
  Eye,
  Palette,
  Gamepad,
  Utensils,
  BriefcaseBusiness,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/lib/services/authService";

interface NavGroup {
  groupLabel: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const navigationGroups: NavGroup[] = [
  {
    groupLabel: "Vue d'ensemble",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      // { label: "Statistiques", href: "/admin/statistics", icon: BarChart3 },
      { label: "Menu", href: "/admin/menu", icon: Utensils },
      { label: "Services", href: "/admin/services", icon: BriefcaseBusiness },
      { label: "Galerie", href: "/admin/galerie", icon: ImageIcon },
    ],
  },
  {
    groupLabel: "Gestion Billetterie",
    items: [
      { label: "Scanner Pass", href: "/admin/scanner", icon: QrCode },
      { label: "Réservations", href: "/admin/reservations", icon: Ticket },
      { label: "Evenements", href: "/admin/evenement", icon: Ticket },
    ],
  },
  {
    groupLabel: "Administration",
    items: [
      { label: "Jeux", href: "/admin/jeux", icon: Gamepad },
      { label: "Thème", href: "/admin/theme", icon: Palette },
      { label: "Modifier les Composants", href: "/admin/components", icon: Eye },
      { label: "Modifier les Pages", href: "/admin/pages", icon: FileText },
      { label: "Commandes", href: "/admin/commandes", icon: MessageSquare },
      { label: "Mon Profil", href: "/admin/profil", icon: User },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <>
      <div className="space-y-6">
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
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                        isActive
                          ? "text-slate-950 font-extrabold shadow-md"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                      style={isActive ? { backgroundColor: 'var(--theme-accent)' } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("w-4 h-4", isActive ? "text-slate-950" : "text-slate-400")} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase",
                            isActive ? "text-white" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          )}
                          style={isActive ? { backgroundColor: 'var(--theme-primary)' } : {}}
                        >
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

      <div className="pt-4 space-y-3 border-t" style={{ borderColor: 'var(--theme-borderColor)' }}>
        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg text-slate-950 font-black text-xs flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--theme-accent)' }}>
            A
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Lorraine Ade</p>
            {/* <p className="text-[10px] text-slate-300 font-mono truncate">admin@cooktail.ci</p> */}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </div>
    </>
  );
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Desktop */}
      <aside
        className="w-64 text-white hidden md:flex flex-col justify-between p-4 shrink-0 shadow-xl border-r"
        style={{ backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-borderColor)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile — drawer piloté par le hamburger du navbar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-72 z-50 p-4 flex flex-col justify-between text-white shadow-2xl overflow-y-auto"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-2 border-b" style={{ borderColor: 'var(--theme-borderColor)' }}>
                  <span className="text-xs font-black uppercase text-white">Menu Admin</span>
                  <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <SidebarContent onNavigate={onClose} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;