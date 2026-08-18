// components/layout/AdminNavbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, ShieldCheck, Search, Check, Sparkles } from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const notifications = [
    { id: 1, text: "Nouvelle réservation : Pass Élève VIP", time: "Il y a 5 min", read: false },
    { id: 2, text: "QR Pass #BR-2026-0045 scanné avec succès", time: "Il y a 12 min", read: false },
    { id: 3, text: "Rapport des ventes du Brunch disponible", time: "Il y a 1h", read: false },
  ];

  return (
    <header className="bg-[#0B1B33] border-b-3 border-black text-white px-4 md:px-8 py-3.5 flex items-center justify-between shadow-[0px_4px_0px_0px_#556B2F] z-30 sticky top-0">
      {/* Search Bar / Fil d'Ariane Rétro */}
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un billet, un nom..."
            className="pl-9 pr-4 py-1.5 bg-white/10 border-2 border-white/20 rounded-xs text-xs font-mono text-white placeholder-gray-400 focus:outline-none focus:border-[#FEF08A] focus:bg-white/20 transition-all w-64 md:w-80"
          />
        </div>
      </div>

      {/* Actions Navbar (Notifs + Profil) */}
      <div className="flex items-center gap-4">
        {/* Dropdown Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-[#F4EBD9] text-[#0B1B33] border-2 border-black rounded-xs shadow-[2px_2px_0px_0px_#FEF08A] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#DC2626] text-white text-[9px] font-mono font-black w-5 h-5 rounded-full border border-black flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Panneau de Notification Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#F4EBD9] border-3 border-black text-[#0B1B33] rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] p-4 space-y-3 z-50">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-mono font-black text-xs uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#556B2F]" /> Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setUnreadCount(0)}
                    className="text-[10px] font-mono font-bold text-[#556B2F] hover:underline"
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white border border-black p-2.5 rounded-xs space-y-1 font-mono text-xs shadow-[2px_2px_0px_0px_#0B1B33]"
                  >
                    <p className="font-bold text-[#0B1B33] leading-snug">{notif.text}</p>
                    <span className="text-[9px] text-gray-500 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profil Administrateur avec Icône Lettre */}
        <Link
          href="/admin/profil"
          className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border-2 border-white/30 px-3 py-1.5 rounded-xs transition-all group"
        >
          {/* Avatar Lettre Neobrutaliste */}
          <div className="w-8 h-8 bg-[#FEF08A] text-[#0B1B33] font-black text-sm border-2 border-black rounded-xs flex items-center justify-center shadow-[2px_2px_0px_0px_#556B2F] group-hover:bg-[#556B2F] group-hover:text-white transition-colors">
            A
          </div>

          <div className="hidden md:block text-left font-mono">
            <span className="text-xs font-black text-white block uppercase leading-tight">
              Admin Cook'Tail
            </span>
            <span className="text-[9px] text-[#FEF08A] uppercase font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#556B2F]" /> Directrice
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};