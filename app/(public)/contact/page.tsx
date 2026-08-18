// app/(public)/contact/page.tsx
"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Sparkles } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "traiteur", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Votre mot d'excuse / demande de devis a été envoyé à la direction !", "success");
    setForm({ name: "", email: "", phone: "", service: "traiteur", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* En-tête Tableau */}
      <div className="bg-[#0B1B33] text-white p-6 md:p-8 border-3 border-black rounded-xs shadow-[8px_8px_0px_0px_#556B2F] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold uppercase bg-[#FEF08A] text-[#0B1B33] px-2.5 py-0.5 rounded-xs border border-black">
            Bureau des Surveillants
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#FEF08A]">Secrétariat Cook'Tail</h1>
        <p className="text-xs md:text-sm font-mono text-gray-300 mt-1 max-w-xl">
          Une question sur le Brunch Récréation, une réservation de groupe ou une envie de privatiser notre service traiteur ?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Formulaire Cahier de Texte */}
        <div className="md:col-span-7 bg-[#F4EBD9] border-3 border-[#0B1B33] p-6 md:p-8 rounded-xs shadow-[8px_8px_0px_0px_#0B1B33] space-y-6">
          <div className="border-b-2 border-dashed border-[#0B1B33] pb-4">
            <h2 className="text-xl font-black uppercase text-[#0B1B33] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#556B2F]" /> Écrire un Mot d'Excuse / Devis
            </h2>
            <p className="text-xs font-mono text-gray-700 mt-1">Remplissez les champs ci-dessous avec soin.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">
                Nom & Prénom de l'Élève *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Koffi Kouadio"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xs font-bold text-xs text-[#0B1B33] focus:outline-none focus:bg-[#FEF08A]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleve@ecole.ci"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xs font-bold text-xs text-[#0B1B33] focus:outline-none focus:bg-[#FEF08A]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">
                  Téléphone WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+225 07..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xs font-bold text-xs text-[#0B1B33] focus:outline-none focus:bg-[#FEF08A]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">
                Objet de la Demande
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xs font-bold text-xs text-[#0B1B33] focus:outline-none focus:bg-[#FEF08A]/20"
              >
                <option value="brunch">Pass Brunch Récréation (Questions / Groupes)</option>
                <option value="traiteur">Service Traiteur Mariage / Gala</option>
                <option value="bar">Bar Mobile & Cocktails Sur-Mesure</option>
                <option value="autre">Autre Demande Spéciale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1">
                Votre Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Rédigez votre message ici..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3.5 bg-white border-2 border-black rounded-xs font-bold text-xs text-[#0B1B33] focus:outline-none focus:bg-[#FEF08A]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FEF08A] hover:bg-[#fde047] text-[#0B1B33] font-black py-4 rounded-xs border-2 border-black shadow-[4px_4px_0px_0px_#0B1B33] uppercase text-xs flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <Send className="w-4 h-4" /> Envoyer la Demande
            </button>
          </form>
        </div>

        {/* Bloc Infobox Coordonnées */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#0B1B33] text-white p-6 border-3 border-black rounded-xs shadow-[8px_8px_0px_0px_#556B2F] space-y-6">
            <h3 className="text-xl font-black uppercase text-[#FEF08A] border-b-2 border-[#556B2F] pb-3">
              Coordonnées Directes
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xs border border-white/10">
                <Phone className="w-5 h-5 text-[#FEF08A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">WhatsApp & Infoline</span>
                  <strong className="text-sm font-bold text-white">{EVENT_INFO.whatsapp}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xs border border-white/10">
                <Mail className="w-5 h-5 text-[#FEF08A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Courrier Électronique</span>
                  <strong className="text-sm font-bold text-white">contact@cooktail.ci</strong>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xs border border-white/10">
                <MapPin className="w-5 h-5 text-[#FEF08A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Lieu de la Récréation</span>
                  <strong className="text-sm font-bold text-white">{EVENT_INFO.location}</strong>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#556B2F]/20 border border-[#556B2F] rounded-xs text-xs font-mono text-[#FEF08A] flex items-center gap-3">
              <Clock className="w-5 h-5 shrink-0" />
              <span>Horaires du secrétariat : Lun - Sam de 08h00 à 18h00 GMT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}