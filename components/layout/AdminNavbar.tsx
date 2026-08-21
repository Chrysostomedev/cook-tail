"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, ShieldCheck, Search, Sparkles, Palette, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AdminNavbar: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const notifications = [
    { id: 1, text: "Nouvelle réservation : Pass Élève VIP", time: "Il y a 5 min" },
    { id: 2, text: "QR Pass #BR-2026-0045 scanné", time: "Il y a 12 min" },
    { id: 3, text: "Rapport des ventes du Brunch disponible", time: "Il y a 1h" },
  ];

  return (
    <header className="text-white px-4 md:px-8 py-3.5 flex items-center justify-between z-30 sticky top-0 border-b" style={{ backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-borderColor)' }}>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un billet, un nom..."
            className="pl-9 pr-4 py-1.5 bg-white/10 border border-white/20 rounded-xl text-xs font-mono text-white placeholder-gray-400 focus:outline-none transition-all w-64 md:w-80" style={{ '--focus-color': 'var(--theme-accent)' } as any}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Button */}
        <Link
          href="/admin/theme"
          className="p-2 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
          aria-label="Gestionnaire de thème"
          title="Personnaliser les couleurs"
        >
          <Palette className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} />
        </Link>

        {/* Notifications */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-slate-950 text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--theme-accent)' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 text-white rounded-2xl shadow-2xl p-4 space-y-3 z-50 border" style={{ backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-borderColor)' }}>
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--theme-borderColor)' }}>
                <span className="font-mono font-bold text-xs uppercase flex items-center gap-1.5" style={{ color: 'var(--theme-accent)' }}>
                  <Sparkles className="w-3.5 h-3.5" /> Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setUnreadCount(0)}
                    className="text-[10px] font-mono font-bold hover:underline"
                    style={{ color: 'var(--theme-accent)' }}
                  >
                    Marquer comme lu
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white/5 border border-white/10 p-2.5 rounded-xl space-y-1 font-mono text-xs"
                  >
                    <p className="font-bold text-slate-200 leading-snug">{notif.text}</p>
                    <span className="text-[9px] text-slate-400 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Link Desktop */}
        <Link
          href="/admin/profil"
          className="hidden md:flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-xl transition-all group"
        >
          <div className="w-8 h-8 text-slate-950 font-black text-sm rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-accent)' }}>
            A
          </div>
          <div className="text-left font-mono">
            <span className="text-xs font-black text-white block uppercase leading-tight">
              Admin Cook'Tail
            </span>
            <span className="text-[9px] uppercase font-bold flex items-center gap-1" style={{ color: 'var(--theme-accent)' }}>
              <ShieldCheck className="w-3 h-3" /> Directrice
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all"
          aria-label="Menu mobile"
        >
          {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 z-40 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
              style={{ backgroundColor: 'var(--theme-primary)', borderTopWidth: '1px', borderTopColor: 'var(--theme-borderColor)' }}
            >
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--theme-borderColor)' }}>
                <h3 className="font-bold text-sm uppercase" style={{ color: 'var(--theme-bgSecondary)' }}>
                  Menu Admin
                </h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
  <Link
                href="/admin/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' }}>
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Tableau de bord</p>
                 
                </div>
              </Link>

              <Link
                href="/admin/statistiques"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all"
              >
                <div className="w-8 h-8 text-slate-950 font-black text-sm rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-accent)' }}>
                  A
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Mon Profil</p>
                  <p className="text-[10px] text-slate-300">Paramètres personnels</p>
                </div>
              </Link>

            
              <Link
                href="/admin/statistqiues"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-secondary)' }}>
                  <span className="text-white font-bold"></span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Statistiques</p>
                  <p className="text-[10px] text-slate-300">Vue d'ensemble</p>
                </div>
              </Link>
              
              <Link
                href="/admin/scanner"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-secondary)' }}>
                  <span className="text-white font-bold"></span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Scanner les Qr Code</p>
                 
                </div>
              </Link>
              
              <Link
                href="/admin/evenement"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-secondary)' }}>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Evenement</p>
                  <p className="text-[10px] text-slate-300">Vue d'ensemble</p>
                </div>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminNavbar;