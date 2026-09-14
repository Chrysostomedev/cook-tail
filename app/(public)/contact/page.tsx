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
  Share2,
  Loader2,
} from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { useToast } from "@/context/ToastContext";
import { useContactForm } from "@/lib/hooks/useContactForm";
import type { ContactService } from "@/lib/services/contactService";

export default function ContactPage() {
  const { showToast } = useToast();
  const { submit, loading } = useContactForm();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "traiteur" as ContactService,
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submit(form);
    if (ok) {
      showToast("Votre message a bien été transmis à la direction !", "success");
      setForm({ name: "", email: "", phone: "", service: "traiteur", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } else {
      showToast("Erreur lors de l'envoi, réessayez.", "error");
    }
  };

  const cleanPhone = EVENT_INFO.whatsapp.replace(/[^0-9+]/g, "");

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
      {/* En-tête */}
      <div
        className="relative text-white p-8 md:p-12 rounded-[2rem] shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--theme-primary)" }}
      >
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ backgroundColor: "var(--theme-secondary)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ backgroundColor: "var(--theme-accent)" }}
        />

        <div className="relative z-10 space-y-4">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "var(--theme-accent)",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            
            Secrétariat &amp; Bureau des Surveillants
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Contactez{" "}
            <span className="font-serif italic" style={{ color: "var(--theme-accent)" }}>
              Cook'Tail
            </span>
          </h1>
          <p className="text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed">
            Une question sur le Brunch Récréation, une réservation de groupe ou une envie de
            privatiser notre service traiteur ? Contactez-nous directement !
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Formulaire */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2
              className="text-lg sm:text-xl font-extrabold flex items-center gap-2"
              style={{ color: "var(--theme-primary)" }}
            >
              <MessageSquare className="w-5 h-5" style={{ color: "var(--theme-secondary)" }} />
              Envoyer un Message
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Remplissez le formulaire ci-dessous, nous répondons rapidement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Nom &amp; Prénom *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Koffi Kouadio"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="vous@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Téléphone WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+225 07 00 00 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Objet de la Demande
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value as ContactService })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
              >
                <option value="brunch">Pass Brunch Récréation (Groupes / Pass)</option>
                <option value="traiteur">Service Traiteur sur-mesure</option>
                <option value="bar">Bar Mobile &amp; Cocktails Sur-Mesure</option>
                <option value="autre">Autre Demande Spéciale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Votre Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ex: Bonjour, nous aimerions réserver une table de 6 personnes..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-4 rounded-2xl uppercase text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
              style={{ backgroundColor: "var(--theme-primary)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...
                </>
              ) : sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Message envoyé
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Envoyer le Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Colonne contacts directs */}
        <div className="lg:col-span-5 space-y-5">
          <div
            className="text-white p-6 rounded-[2rem] shadow-xl space-y-4"
            style={{ backgroundColor: "var(--theme-primary)" }}
          >
            <h3 className="text-lg font-extrabold pb-3 flex items-center justify-between border-b border-white/10">
              <span>Lignes Directes</span>
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "var(--theme-secondary)" }}
              >
                En Ligne
              </span>
            </h3>

            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/5 hover:bg-white/15 p-4 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "var(--theme-secondary)" }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/50 block">
                      WhatsApp &amp; Infoline
                    </span>
                    <strong className="text-sm font-bold">{EVENT_INFO.whatsapp}</strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
              </a>

              <a
                href="mailto:contact@cooktail.ci"
                className="flex items-center justify-between bg-white/5 hover:bg-white/15 p-4 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-primary)" }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/50 block">
                      Courrier Électronique
                    </span>
                    <strong className="text-sm font-bold">contact@cooktail.ci</strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(EVENT_INFO.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/5 hover:bg-white/15 p-4 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "var(--theme-danger)" }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/50 block">
                      Lieu du Rassemblement
                    </span>
                    <strong className="text-sm font-bold">{EVENT_INFO.location}</strong>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
              </a>
            </div>

            <div
              className="p-4 rounded-2xl text-xs font-semibold flex items-center gap-3"
              style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-primary)" }}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Réponse garantie du Lundi au Samedi (08h00 - 18h00 GMT)</span>
            </div>
          </div>

          <div
            className="p-6 rounded-[2rem] space-y-3 shadow-lg"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-primary)" }}>
              Suivre l'Actualité
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--theme-primary)" }}
              >
                <Share2 className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#1877F2" }}
              >
                <Share2 className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}