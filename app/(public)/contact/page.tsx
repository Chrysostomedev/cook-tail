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
      <div className="relative text-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border-3 border-black overflow-hidden" style={{ backgroundColor: 'var(--theme-primary)', boxShadow: `6px 6px 0px 0px var(--theme-bgSecondary)` }}>
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-20" style={{ backgroundColor: 'var(--theme-accent)' }} />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase px-3 py-1 rounded-lg border border-black" style={{ backgroundColor: 'var(--theme-bgSecondary)', color: 'var(--theme-primary)' }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--theme-secondary)' }} />
              Secrétariat & Bureau des Surveillants
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight" style={{ color: 'var(--theme-bgSecondary)' }}>
            Besoin d'un Mot d'Excuse ?
          </h1>
          <p className="text-xs sm:text-base font-medium max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Une question sur le <strong className="text-yellow-300">Brunch Récréation</strong>, une réservation de groupe ou une envie de privatiser notre service traiteur ? Contactez-nous directement !
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

        {/* Colonne Gauche : Formulaire Cahier de Texte */}
        <div className="border-3 p-5 sm:p-8 rounded-2xl md:rounded-3xl space-y-6" style={{ backgroundColor: 'var(--theme-bgPrimary)', borderColor: 'var(--theme-primary)', boxShadow: `6px 6px 0px 0px var(--theme-primary)` }}>
          <div className="pb-4" style={{ borderBottom: `2px dashed var(--theme-primary)` }}>
            <h2 className="text-lg sm:text-xl font-black uppercase flex items-center gap-2" style={{ color: 'var(--theme-primary)' }}>
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--theme-secondary)' }} />
              Rédiger un Mot à la Direction
            </h2>
            <p className="text-xs font-mono text-slate-600 mt-1">Remplissez la feuille de correspondance ci-dessous.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1.5" style={{ color: 'var(--theme-primary)' }}>
                Nom & Prénom de l'Élève / Client *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Koffi Kouadio"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 shadow-sm" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-accent)` } as any}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1.5" style={{ color: 'var(--theme-primary)' }}>
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleve@ecole.ci"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 shadow-sm" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-accent)` } as any}
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1.5" style={{ color: 'var(--theme-primary)' }}>
                  Téléphone WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+225 07 00 00 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 shadow-sm" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-accent)` } as any}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1.5" style={{ color: 'var(--theme-primary)' }}>
                Objet de la Demande
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 rounded-xl font-bold text-xs focus:outline-none focus:ring-2 shadow-sm" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-accent)` } as any}
              >
                <option value="brunch">Pass Brunch Récréation (Groupes / Pass)</option>
                <option value="traiteur">Service Traiteur sur-mesure</option>
                <option value="bar">Bar Mobile & Cocktails Sur-Mesure</option>
                <option value="autre">Autre Demande Spéciale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1.5" style={{ color: 'var(--theme-primary)' }}>
                Votre Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ex: Bonjour, nous aimerions réserver une table de 6 personnes..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-4 bg-white border-2 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 shadow-sm" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)', '--focus-ring': `var(--theme-accent)` } as any}
              />
            </div>

            <button
              type="submit"
              className="w-full hover:text-slate-950 font-black py-4 rounded-xl border-2 uppercase text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5" style={{ backgroundColor: 'var(--theme-bgSecondary)', color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)', boxShadow: `4px 4px 0px 0px var(--theme-primary)` }}
            >
              <Send className="w-4 h-4" /> Transmettre à la Direction
            </button>
          </form>
        </div>

        {/* Colonne Droite : Cartes d'Action Directes (Appel, WhatsApp, Mail, Réseaux) */}
        <div className="lg:col-span-5 space-y-4">

          {/* Bloc Contact Direct */}
          <div className="text-white p-5 sm:p-6 rounded-2xl md:rounded-3xl border-3 border-black space-y-4" style={{ backgroundColor: 'var(--theme-primary)', boxShadow: `6px 6px 0px 0px var(--theme-primary)` }}>
            <h3 className="text-lg font-black uppercase pb-3 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)', borderBottom: `2px solid rgba(255,255,255,0.1)`, color: 'var(--theme-bgSecondary)' }}>
              <span>Lignes Directes</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ backgroundColor: 'var(--theme-secondary)', color: 'var(--theme-primary)', borderColor: 'var(--theme-secondary)' }}>
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
                  <div className="p-2.5 rounded-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--theme-secondary)', color: 'var(--theme-primary)' }}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">WhatsApp & Infoline</span>
                    <strong className="text-sm font-bold text-white group-hover:transition-colors" style={{ '--hover-color': 'var(--theme-bgSecondary)' } as any}>
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
                  <div className="p-2.5 rounded-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' }}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Courrier Électronique</span>
                    <strong className="text-sm font-bold text-white group-hover:transition-colors" style={{ '--hover-color': 'var(--theme-bgSecondary)' } as any}>
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
                  <div className="p-2.5 rounded-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--theme-danger)', color: 'white' }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Lieu du Rassemblement</span>
                    <strong className="text-sm font-bold text-white group-hover:transition-colors" style={{ '--hover-color': 'var(--theme-bgSecondary)' } as any}>
                      {EVENT_INFO.location}
                    </strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </a>
            </div>

            {/* Horaires */}
            <div className="p-3.5 rounded-xl text-xs font-mono flex items-center gap-3 border" style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)', borderColor: 'var(--theme-accent)' }}>
              <Clock className="w-4 h-4 shrink-0" />
              <span>Réponse garantie du Lundi au Samedi (08h00 - 18h00 GMT)</span>
            </div>
          </div>

          {/* Bloc Réseaux Sociaux Directs */}
          <div className="border-3 p-5 rounded-2xl space-y-3" style={{ backgroundColor: 'var(--theme-accent)', borderColor: 'var(--theme-primary)', boxShadow: `6px 6px 0px 0px var(--theme-primary)` }}>
            <h4 className="text-xs font-mono font-black uppercase tracking-wider" style={{ color: 'var(--theme-primary)' }}>
              Suivre l'Actualité de l'Établissement
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase transition-colors" style={{ backgroundColor: 'var(--theme-primary)' }}
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