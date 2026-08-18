// components/sections/MenuSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { MenuItemCard } from "@/components/cards/MenuItemCard";

const MENU_ITEMS = [
  {
    name: "Pain Chien Revisité & Sauce Maison",
    category: "Plat" as const,
    ingredients: ["Baguette croustillante", "Saucisse fumée", "Oignons caramélisés", "Sauce secrète Cook'Tail"],
    isNostalgicFav: true,
  },
  {
    name: "Alloco & Poulet Braisé de la Récré",
    category: "Plat" as const,
    ingredients: ["Banane plantain frite", "Poulet épicé", "Piment vert broyé", "Crudités"],
    isNostalgicFav: fontFav(),
  },
  {
    name: "Beignets Gbofloto & Caramel Beurre Salé",
    category: "Dessert" as const,
    ingredients: ["Pâte traditionnelle", "Sucre glace", "Coulis de chocolat local"],
    isNostalgicFav: true,
  },
  {
    name: "Cocktail Classé 'Délégué de Classe'",
    category: "Boisson" as const,
    ingredients: ["Jus de Bissap infusé à la menthe", "Gingembre", "Zeste de citron vert"],
    isNostalgicFav: false,
  },
];

function fontFav() { return true; }

export const MenuSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#1C2826] text-[#F4EBD9] relative border-t-4 border-b-4 border-[#0B1B33]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#556B2F] text-white px-3 py-1 rounded-xs">
            Gastronomie Nostalgique
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-white">
            Le Menu du Réfectoire
          </h2>
          <p className="mt-2 text-sm md:text-base font-serif italic text-emerald-200/80">
            Préparé avec amour par Cook'Tail Service — Ingrédients frais & saveurs d'antan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MenuItemCard
                name={item.name}
                category={item.category}
                ingredients={item.ingredients}
                isNostalgicFav={item.isNostalgicFav}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};