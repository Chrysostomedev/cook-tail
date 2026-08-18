// components/sections/Footer.tsx
"use client";

import React from "react";
import { Instagram, Phone, Heart } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1B33] text-[#F4EBD9] border-t-4 border-[#556B2F] py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h4 className="font-extrabold text-lg text-white mb-2">BRUNCH RÉCRÉATION</h4>
          <p className="text-xs font-serif italic text-gray-300 max-w-sm">
            Un événement conçu par Cook'Tail Service. Célébration nostalgique des années d'école à Abidjan.
          </p>
        </div>

        <div>
          <h5 className="font-mono text-xs font-bold uppercase text-[#FEF08A] mb-3">Contacts & Infos</h5>
          <ul className="space-y-2 text-xs font-bold">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8FBC8F]" />
              WhatsApp : {EVENT_INFO.whatsapp}
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#8FBC8F]" />
              Instagram : {EVENT_INFO.instagram}
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-xs font-bold uppercase text-[#FEF08A] mb-3">Lieu & Rentrée</h5>
          <p className="text-xs text-gray-300 leading-relaxed">
            {EVENT_INFO.location}
            <br />
            Côte d'Ivoire, Abidjan
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 text-center text-[11px] font-mono text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 Cook'Tail Service. Tous droits réservés.</p>
        <p className="flex items-center gap-1">
          Fait avec <Heart className="w-3 h-3 text-red-500 fill-red-500" /> pour la nostalgia 225
        </p>
      </div>
    </footer>
  );
};