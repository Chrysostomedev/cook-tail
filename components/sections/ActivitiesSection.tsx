// components/sections/ActivitiesSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ActivityCard } from "@/components/cards/ActivityCard";

const TIMETABLE = [
  {
    timeSlot: "11H00 - 12H30",
    category: "L'Appel de la Rentrée",
    title: "Accueil, Badging & Photo de Classe",
    description: "Remise des livrets de présence, photo souvenir en tenue (Bleu/Blanc ou Kaki) devant le tableau noir géant.",
    badgeText: "Incontournable",
  },
  {
    timeSlot: "12H30 - 15H00",
    category: "La Cantine Exécutive",
    title: "Grand Brunch & Station Cocktail Cook'Tail",
    description: "Buffet chaud & froid à volonté, pâtisseries nostalgiques, douceurs d'antan et mélanges exclusifs de jus de fruits locaux.",
    badgeText: "Gourmand",
  },
  {
    timeSlot: "15H00 - 17H30",
    category: "Les Heures de Colle",
    title: "Tournois & Jeux de Cour de Récré",
    description: "Quizz culture pop 2000s, chifoumi géant, saut à la corde, blind-test Rap/Zoblazo/Coupe-Décalé vintage.",
    badgeText: "Lots à Gagner",
  },
  {
    timeSlot: "17H30 - 20H00",
    category: "La Boum de Fin d'Année",
    title: "DJ Set Rétro & Ambiance Clubbing",
    description: "Session nostalgia pure : le meilleur des années collège/lycée mixé en direct pour finir la journée en feu.",
    badgeText: "Show Exclusive",
  },
];

export const ActivitiesSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B1B33] text-[#F4EBD9] relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest bg-[#FEF08A] text-[#0B1B33] px-3 py-1 rounded-xs border border-black">
            Planning officiel
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 text-white">
            Emploi du Temps de la Journée
          </h2>
          <p className="mt-2 text-sm md:text-base font-serif italic text-gray-300">
            Un déroulé minutieusement orchestré pour zéro temps mort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TIMETABLE.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <ActivityCard
                index={index}
                timeSlot={item.timeSlot}
                category={item.category}
                title={item.title}
                description={item.description}
                badgeText={item.badgeText}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};