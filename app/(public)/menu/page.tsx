"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import { Utensils, GlassWater, Cookie, Flame, Sparkles, CheckCircle2, Loader } from "lucide-react";
import { VisibilityWrapper } from "@/components/VisibilityWrapper";
import { useContent } from "@/context/ContentContext";
import { useMenuItems } from "@/lib/hooks/useMenuItems";
import type { MenuItem } from "@/lib/services/menuService";

type CategoryConfig = {
  title: string;
  icon: typeof Utensils;
  order: number;
};

const CATEGORY_CONFIG: Record<MenuItem["category"], CategoryConfig> = {
  appetizer: { title: "Classiques de la Cour & Buffet Salé", icon: Utensils, order: 0 },
  main: { title: "Plats Principaux", icon: Flame, order: 1 },
  beverage: { title: "Rafraîchissements & Bar Cook'Tail", icon: GlassWater, order: 2 },
  dessert: { title: "Douceurs & Friandises d'Enfance", icon: Cookie, order: 3 },
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

export default function MenuPage() {
  const { content } = useContent();
  const { items, loading, error } = useMenuItems();

  // Regroupe les items par catégorie, dans l'ordre défini par CATEGORY_CONFIG
  const groupedCategories = Object.entries(CATEGORY_CONFIG)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([categoryKey, config]) => ({
      key: categoryKey,
      title: config.title,
      icon: config.icon,
      items: items.filter((item) => item.category === categoryKey),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* En-tête de la carte */}
      <VisibilityWrapper componentId="menu.header">
        <div className="backdrop-blur-md border border-amber-900/10 p-6 md:p-10 rounded-3xl shadow-xl shadow-amber-950/5 text-center space-y-3 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bgPrimary)' }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: 'var(--theme-secondary)' }} />
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)', borderColor: 'var(--theme-secondary)' }}>
            <Flame className="w-3.5 h-3.5" style={{ color: 'var(--theme-secondary)' }} /> {content.menuHeader.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>
            {content.menuHeader.title.replace(content.menuHeader.accent, "")} <span className="font-serif italic" style={{ color: 'var(--theme-secondary)' }}>{content.menuHeader.accent}</span>
          </h1>
          <p className="text-xs md:text-sm max-w-xl mx-auto" style={{ color: 'var(--theme-textSecondary)' }}>
            {content.menuHeader.description}
          </p>
        </div>
      </VisibilityWrapper>

      {/* Categories & Items */}
      <VisibilityWrapper componentId="menu.categories">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader className="w-6 h-6 animate-spin" style={{ color: 'var(--theme-secondary)' }} />
              <p className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Chargement du menu...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-dashed border-red-200">
            <p className="text-xs font-bold text-red-600">{error}</p>
          </div>
        ) : groupedCategories.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-600">Le menu est en cours de préparation</p>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.key} className="space-y-6">
                  {/* Titre de Catégorie */}
                  <div className="flex items-center gap-3 pb-3" style={{ borderBottom: `1px solid rgba(0,0,0,0.1)` }}>
                    <div className="p-2.5 rounded-2xl border" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)', borderColor: 'var(--theme-secondary)' }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--theme-textPrimary)' }}>
                      {cat.title}
                    </h2>
                  </div>

                  {/* Grid des Plats avec Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/90 border border-amber-900/10 rounded-3xl overflow-hidden shadow-lg shadow-amber-950/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={item.image?.url || FALLBACK_IMAGE}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                              {item.name}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-[11px] text-amber-800 font-semibold">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Inclus au buffet
                            </span>
                            <span className="font-mono text-slate-400">
                              {item.price ? `${item.price.toLocaleString("fr-FR")} FCFA` : "Prix sur demande"}
                            </span>
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </VisibilityWrapper>
    </div>
  );
}