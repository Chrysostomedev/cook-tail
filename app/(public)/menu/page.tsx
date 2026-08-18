// app/(public)/menu/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Utensils, GlassWater, Cookie, Sparkles, Flame, CheckCircle2 } from "lucide-react";

export default function MenuPage() {
  const menuCategories = [
    {
      title: "Classiques de la Cour & Buffet Salé",
      icon: Utensils,
      items: [
        {
          name: "Attiéké Poisson Thon Frit & Garba Rétro",
          desc: "Semoule de manioc légère, thon frit croustillant, piment frais pilé, oignons & tomates dés.",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
          tag: "Incontournable",
        },
        {
          name: "Alloco Chaud & Poulet Braisé",
          desc: "Bananes jaunes dorées à la perfection, accompagnées d'un piment noir/vert maison.",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
          tag: "Populaire",
        },
        {
          name: "Mini Sandwichs Pain Chien & Mayo",
          desc: "Le goût exact de la sortie des classes : pâté raffiné, condiment secret et pain croustillant.",
          image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
          tag: "Souvenir",
        },
      ],
    },
    {
      title: "Rafraîchissements & Bar Cook'Tail",
      icon: GlassWater,
      items: [
        {
          name: "Bissap Royal Glacé à la Menthe",
          desc: "Infusion d'hibiscus ambrée, parfumée aux feuilles de menthe fraîche et fleur d'oranger.",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
          tag: "Maison",
        },
        {
          name: "Gnamakoudji (Jus de Gingembre Épicé)",
          desc: "Gingembre frais pressé, peps d'agrumes et touche de miel pour réveiller les souvenirs.",
          image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
          tag: "Peps",
        },
        {
          name: "Cocktail Signature 'Délégué de Classe'",
          desc: "Création fruitée exclusive aux saveurs tropicales, disponible avec ou sans alcool.",
          image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
          tag: "Signature",
        },
      ],
    },
    {
      title: "Douceurs & Friandises d'Enfance",
      icon: Cookie,
      items: [
        {
          name: "Bonbons Torfi, Toffee & Caramel",
          desc: "Assortiment nostalgique des bonbons cultes des années 2000 qui collaient aux dents !",
          image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=80",
          tag: "100% Nostalgie",
        },
        {
          name: "Deguê au Lait Caillé Onctueux",
          desc: "Couscous de mil cuit à la vapeur, plongé dans un lait caillé doux vanillé et glacé.",
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
          tag: "Tradition",
        },
      ],
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* En-tête de la carte */}
      <div className="bg-white/80 backdrop-blur-md border border-amber-900/10 p-6 md:p-10 rounded-3xl shadow-xl shadow-amber-950/5 text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-800/10">
          <Flame className="w-3.5 h-3.5 text-amber-600" /> Buffet Récréation à Volonté
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          La Carte des <span className="text-amber-700 font-serif italic">Gourmandises</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
          Tous les plats, jus locaux, cocktails et friandises de notre enfance sont entièrement inclus dans votre Pass Droit d'Accès !
        </p>
      </div>

      {/* Categories & Items */}
      <div className="space-y-12">
        {menuCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="space-y-6">
              {/* Titre de Catégorie */}
              <div className="flex items-center gap-3 border-b border-amber-900/10 pb-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-800 rounded-2xl border border-amber-800/10">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {cat.title}
                </h2>
              </div>

              {/* Grid des Plats avec Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white/90 border border-amber-900/10 rounded-3xl overflow-hidden shadow-lg shadow-amber-950/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-white/20">
                        {item.tag}
                      </span>
                    </div>

                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-[11px] text-amber-800 font-semibold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Inclus au buffet
                        </span>
                        <span className="font-mono text-slate-400">À volonté</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}