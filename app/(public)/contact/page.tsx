// app/(public)/contact/page.tsx
"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  FaceAngry,
  InspectIcon
} from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "traiteur", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Votre mot d'excuse / demande a bien été envoyé à la direction !", "success");
    setForm({ name: "", email: "", phone: "", service: "traiteur", message: "" });
  };

  // Formattage du numéro WhatsApp pour le lien direct
  const cleanPhone = EVENT_INFO.whatsapp.replace(/[^0-9+]/g, "");

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-10 px-3 sm:px-6 py-4 md:py-8">

      {/* En-tête Neo-Brutalist Pop */}
      <div className="relative bg-[#0B1B33] text-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_#FEF08A] md:shadow-[8px_8px_0px_0px_#FEF08A] overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase bg-[#FEF08A] text-[#0B1B33] px-3 py-1 rounded-lg border border-black shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Secrétariat & Bureau des Surveillants
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-[#FEF08A] tracking-tight">
            Besoin d'un Mot d'Excuse ?
          </h1>
          <p className="text-xs sm:text-base font-medium text-slate-200 max-w-2xl leading-relaxed">
            Une question sur le <strong className="text-amber-300">Brunch Récréation</strong>, une réservation de groupe ou une envie de privatiser notre service traiteur ? Contactez-nous directement !
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

        {/* Colonne Gauche : Formulaire Cahier de Texte */}
        <div className="lg:col-span-7 bg-[#F8F6F0] border-3 border-[#0B1B33] p-5 sm:p-8 rounded-2xl md:rounded-3xl shadow-[6px_6px_0px_0px_#0B1B33] space-y-6">
          <div className="border-b-2 border-dashed border-[#0B1B33]/30 pb-4">
            <h2 className="text-lg sm:text-xl font-black uppercase text-[#0B1B33] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              Rédiger un Mot à la Direction
            </h2>
            <p className="text-xs font-mono text-slate-600 mt-1">Remplissez la feuille de correspondance ci-dessous.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1.5">
                Nom & Prénom de l'Élève / Client *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Koffi Kouadio"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-[#0B1B33] rounded-xl font-medium text-sm text-[#0B1B33] focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1.5">
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleve@ecole.ci"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#0B1B33] rounded-xl font-medium text-sm text-[#0B1B33] focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1.5">
                  Téléphone WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+225 07 00 00 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#0B1B33] rounded-xl font-medium text-sm text-[#0B1B33] focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1.5">
                Objet de la Demande
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-[#0B1B33] rounded-xl font-bold text-xs text-[#0B1B33] focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
              >
                <option value="brunch">Pass Brunch Récréation (Groupes / Pass)</option>
                <option value="traiteur">Service Traiteur sur-mesure</option>
                <option value="bar">Bar Mobile & Cocktails Sur-Mesure</option>
                <option value="autre">Autre Demande Spéciale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0B1B33] mb-1.5">
                Votre Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ex: Bonjour, nous aimerions réserver une table de 6 personnes..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-4 bg-white border-2 border-[#0B1B33] rounded-xl font-medium text-sm text-[#0B1B33] focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FEF08A] hover:bg-amber-300 text-[#0B1B33] font-black py-4 rounded-xl border-2 border-[#0B1B33] shadow-[4px_4px_0px_0px_#0B1B33] uppercase text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <Send className="w-4 h-4" /> Transmettre à la Direction
            </button>
          </form>
        </div>

        {/* Colonne Droite : Cartes d'Action Directes (Appel, WhatsApp, Mail, Réseaux) */}
        <div className="lg:col-span-5 space-y-4">

          {/* Bloc Contact Direct */}
          <div className="bg-[#0B1B33] text-white p-5 sm:p-6 rounded-2xl md:rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_#0B1B33] space-y-4">
            <h3 className="text-lg font-black uppercase text-[#FEF08A] border-b-2 border-white/10 pb-3 flex items-center justify-between">
              <span>Lignes Directes</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                En Ligne
              </span>
            </h3>

            <div className="space-y-2.5">
              {/* WhatsApp & Téléphone Cliquable */}
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/5 hover:bg-white/15 p-3.5 rounded-xl border border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">WhatsApp & Infoline</span>
                    <strong className="text-sm font-bold text-white group-hover:text-[#FEF08A] transition-colors">
                      {EVENT_INFO.whatsapp}
                    </strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </a>

              {/* Email Cliquable */}
              <a
                href="mailto:contact@cooktail.ci"
                className="flex items-center justify-between bg-white/5 hover:bg-white/15 p-3.5 rounded-xl border border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Courrier Électronique</span>
                    <strong className="text-sm font-bold text-white group-hover:text-[#FEF08A] transition-colors">
                      contact@cooktail.ci
                    </strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </a>

              {/* Localisation Cliquable */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(EVENT_INFO.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/5 hover:bg-white/15 p-3.5 rounded-xl border border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Lieu du Rassemblement</span>
                    <strong className="text-sm font-bold text-white group-hover:text-[#FEF08A] transition-colors">
                      {EVENT_INFO.location}
                    </strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </a>
            </div>

            {/* Horaires */}
            <div className="p-3.5 bg-amber-400/10 border border-amber-400/20 rounded-xl text-xs font-mono text-amber-300 flex items-center gap-3">
              <Clock className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Réponse garantie du Lundi au Samedi (08h00 - 18h00 GMT)</span>
            </div>
          </div>

          {/* Bloc Réseaux Sociaux Directs */}
          <div className="bg-amber-300 border-3 border-[#0B1B33] p-5 rounded-2xl shadow-[6px_6px_0px_0px_#0B1B33] space-y-3">
            <h4 className="text-xs font-mono font-black uppercase text-[#0B1B33] tracking-wider">
              Suivre l'Actualité de l'Établissement
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0B1B33] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase hover:bg-rose-600 transition-colors"
              >
                <InspectIcon className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0B1B33] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase hover:bg-blue-600 transition-colors"
              >
                <FaceAngry className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}