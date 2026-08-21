// app/(public)/galerie/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, X, Tag } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: "cocktails" | "traiteur" | "evenements";
  tag: string;
  src: string;
  desc: string;
}

export default function GaleriePage() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Cocktail Signature Bissap-Gingembre",
      category: "cocktails",
      tag: "Bar Mobile",
      src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
      desc: "Création rafraîchissante aux saveurs locales d'Afrique de l'Ouest infusées à froid.",
    },
    {
      id: 2,
      title: "Buffet Classique Récréation",
      category: "evenements",
      tag: "Brunch",
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
      desc: "Présentation de nos plats signatures lors du grand brunch thématique.",
    },
    {
      id: 3,
      title: "Atelier Mixologie & Dégustation",
      category: "cocktails",
      tag: "Atelier",
      src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
      desc: "Session d'apprentissage et de création de mocktails pour événements privés.",
    },
    {
      id: 4,
      title: "Scénographie Rétro-Scolaire",
      category: "evenements",
      tag: "Décor",
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      desc: "Ambiance vintage sur-mesure avec tableaux en bois et mobilier d'époque.",
    },
    {
      id: 5,
      title: "Bouchées Traiteur Ivoiriennes",
      category: "traiteur",
      tag: "Buffet",
      src: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop",
      desc: "Mini-brochettes et tapas réinventés pour les réceptions d'entreprise.",
    },
    {
      id: 6,
      title: "Soirée Boum & Ambiance Retro",
      category: "evenements",
      tag: "Soirée",
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      desc: "Éclairage chaleureux et musique d'époque pour clore la récréation.",
    },
  ];

  const categories = [
    { key: "all", label: "Tous les souvenirs" },
    { key: "cocktails", label: "Cocktails & Bar" },
    { key: "traiteur", label: "Service Traiteur" },
    { key: "evenements", label: "Événements & Décor" },
  ];

  const filteredItems =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Banner Titre & Filtres */}
      <div className="bg-[var(--theme-primary)] text-white p-6 md:p-8 border-3 border-black rounded-xs shadow-[8px_8px_0px_0px_var(--theme-secondary)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-[var(--theme-accent)] text-[var(--theme-primary)] px-2.5 py-0.5 rounded-xs border border-black flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Album Souvenirs
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase text-[var(--theme-accent)]">Galerie de nos Créations</h1>
          <p className="text-xs font-mono text-gray-300">
            Retour en images sur nos buffets, nos cocktails signatures et nos décors thématiques.
          </p>
        </div>

        {/* Boutons Filtres Neobrutalistes */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-3.5 py-2 font-mono text-xs font-black uppercase rounded-xs border-2 border-black transition-all ${
                filter === cat.key
                  ? "bg-[var(--theme-accent)] text-[var(--theme-primary)] shadow-[3px_3px_0px_0px_var(--theme-secondary)] -translate-y-0.5"
                  : "bg-[var(--theme-primary)] text-white hover:bg-white/10 border-white/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de Galerie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="bg-[var(--theme-bgPrimary)] border-3 border-[var(--theme-primary)] p-4 rounded-xs shadow-[6px_6px_0px_0px_var(--theme-primary)] space-y-3 group cursor-pointer hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_var(--theme-primary)] transition-all"
          >
            {/* Conteneur Image */}
            <div className="h-56 w-full relative border-2 border-black rounded-xs overflow-hidden bg-[var(--theme-primary)]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Tag flottant */}
              <span className="absolute top-3 right-3 bg-[var(--theme-primary)] text-[var(--theme-accent)] font-mono text-[10px] font-black px-2.5 py-1 rounded-xs border border-black shadow-[2px_2px_0px_0px_var(--theme-secondary)] flex items-center gap-1 z-10">
                <Tag className="w-3 h-3 text-[var(--theme-accent)]" /> {item.tag}
              </span>

              {/* Overlay Survol */}
              <div className="absolute inset-0 bg-[var(--theme-primary)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="bg-[var(--theme-accent)] text-[var(--theme-primary)] text-xs font-mono font-black px-3 py-1.5 rounded-xs border border-black flex items-center gap-1.5 shadow-[3px_3px_0px_0px_var(--theme-primary)]">
                  <Maximize2 className="w-4 h-4" /> Agrandir
                </span>
              </div>
            </div>

            {/* Titre & Info */}
            <div className="space-y-1">
              <h3 className="font-black text-sm text-[var(--theme-primary)] uppercase group-hover:text-[var(--theme-secondary)] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] font-mono text-gray-700 line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modale d'Agrandissement Rétro */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--theme-bgPrimary)] border-4 border-black max-w-2xl w-full p-6 rounded-xs shadow-[12px_12px_0px_0px_var(--theme-accent)] space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Bouton Fermer */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-[var(--theme-primary)] text-white p-2 border-2 border-black rounded-xs hover:bg-[var(--theme-danger)] transition-colors shadow-[3px_3px_0px_0px_var(--theme-primary)]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Grand Affichage Image */}
            <div className="h-80 md:h-96 w-full relative border-3 border-black rounded-xs overflow-hidden bg-black">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Détails */}
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="bg-[var(--theme-secondary)] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-xs uppercase border border-black">
                  {selectedImage.tag}
                </span>
                <span className="text-[10px] font-bold text-gray-600 uppercase">
                  Cook'Tail Service — Collection 2026
                </span>
              </div>

              <h2 className="text-xl font-black text-[var(--theme-primary)] uppercase">{selectedImage.title}</h2>
              <p className="text-xs text-gray-800 leading-relaxed">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}