// app/admin/evenement/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { EVENT_INFO } from "@/lib/constants";
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Edit2,
  Trash2,
  X,
  Sparkles,
  Save,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { formatCFA, cn } from "@/lib/utils";

// Interface pour les événements du calendrier
interface EventItem {
  id: string;
  title: string;
  date: string; // Format ISO: YYYY-MM-DD
  time: string;
  location: string;
  maxCapacity: number;
  reservedSpots: number;
  price: number;
  status: "actif" | "complet" | "annule";
  description?: string;
}

// Données fictives initiales
const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: EVENT_INFO.title || "Brunch Récréation - Édition Spéciale",
    date: "2026-09-12",
    time: "11:00 - 18:00",
    location: EVENT_INFO.location || "Cocody Angré, Abidjan",
    maxCapacity: EVENT_INFO.maxCapacity || 30,
    reservedSpots: 24,
    price: 15000,
    status: "actif",
    description: "Célébration nostalgique des années d'école avec buffet à volonté."
  },
  {
    id: "evt-2",
    title: "Afterwork Cocktails & Nostalgie",
    date: "2026-09-25",
    time: "18:30 - 23:00",
    location: "Zone 4, Marcory",
    maxCapacity: 50,
    reservedSpots: 50,
    price: 20000,
    status: "complet",
    description: "Soirée dégustation de cocktails créations Cook'Tail."
  }
];

const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export default function AdminEventConfigPage() {
  const { showToast } = useToast();

  // États pour la liste des événements et la recherche
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchTerm, setSearchTerm] = useState("");

  // Navigation dans le calendrier (Mois / Année)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Septembre 2026

  // Gestion de la Modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Formulaire d'événement
  const [formData, setFormData] = useState<Partial<EventItem>>({
    title: "",
    date: "",
    time: "11:00 - 18:00",
    location: "Abidjan, Côte d'Ivoire",
    maxCapacity: 30,
    price: 15000,
    status: "actif",
    description: ""
  });

  // Calcul des jours du calendrier pour le mois sélectionné
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Ajustement pour faire commencer la semaine le Lundi (0: Lun, 6: Dim)
    let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const daysInMonth = lastDayOfMonth.getDate();

    const days: { dateString: string; dayNumber: number; isCurrentMonth: boolean }[] = [];

    // Jours du mois précédent (remplissage)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        dateString: prevDate.toISOString().split("T")[0],
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false
      });
    }

    // Jours du mois en cours
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      // Format YYYY-MM-DD local
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({
        dateString,
        dayNumber: day,
        isCurrentMonth: true
      });
    }

    // Jours du mois suivant (remplissage jusqu'à compléter 35 ou 42 cases)
    const totalSlots = days.length > 35 ? 42 : 35;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        dateString: nextDate.toISOString().split("T")[0],
        dayNumber: nextDate.getDate(),
        isCurrentMonth: false
      });
    }

    return days;
  }, [currentDate]);

  // Changer de mois
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Ouvrir la modale pour un nouveau jour
  const handleDayClick = (dateString: string) => {
    setSelectedEventId(null);
    setFormData({
      title: "",
      date: dateString,
      time: "11:00 - 18:00",
      location: EVENT_INFO.location || "Abidjan, Côte d'Ivoire",
      maxCapacity: 30,
      price: 15000,
      status: "actif",
      description: ""
    });
    setIsModalOpen(true);
  };

  // Ouvrir la modale pour modifier un événement existant
  const handleEditEvent = (event: EventItem) => {
    setSelectedEventId(event.id);
    setFormData({ ...event });
    setIsModalOpen(true);
  };

  // Suppression d'un événement
  const handleDeleteEvent = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      showToast("Événement supprimé avec succès.", "success");
    }
  };

  // Sauvegarde (Création ou Édition)
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.date) {
      showToast("Le titre et la date sont obligatoires.", "error");
      return;
    }

    if (selectedEventId) {
      // Édition
      setEvents((prev) =>
        prev.map((item) =>
          item.id === selectedEventId
            ? ({ ...item, ...formData } as EventItem)
            : item
        )
      );
      showToast("Événement mis à jour !", "success");
    } else {
      // Création
      const newEvent: EventItem = {
        id: `evt-${Date.now()}`,
        title: formData.title || "Nouvel Événement",
        date: formData.date || "",
        time: formData.time || "11:00 - 18:00",
        location: formData.location || "Abidjan",
        maxCapacity: Number(formData.maxCapacity) || 30,
        reservedSpots: 0,
        price: Number(formData.price) || 15000,
        status: (formData.status as "actif" | "complet" | "annule") || "actif",
        description: formData.description || ""
      };
      setEvents((prev) => [...prev, newEvent]);
      showToast("Nouvel événement créé avec succès !", "success");
    }

    setIsModalOpen(false);
  };

  // Événements filtrés pour le tableau
  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 selection:bg-amber-200 selection:text-amber-950">

      {/* En-tête Principal */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[var(--theme-secondary)]/10 border border-[var(--theme-secondary)]/20 px-3 py-1 rounded-full text-[var(--theme-secondary)] text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[var(--theme-secondary)]" />
            <span>Gestion du Calendrier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Programmation des Événements
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Planifiez vos sessions de brunch, configurez les capacités et gérez les dates directement depuis le calendrier interactif.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedEventId(null);
            setFormData({
              title: "",
              date: new Date().toISOString().split("T")[0],
              time: "11:00 - 18:00",
              location: "Abidjan, Côte d'Ivoire",
              maxCapacity: 30,
              price: 15000,
              status: "actif",
              description: ""
            });
            setIsModalOpen(true);
          }}
          className="bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Nouvel Événement</span>
        </button>
      </div>

      {/* SECTION 1: Calendrier Mensuel Responsive */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">

        {/* Navigation Mois / Année */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--theme-secondary)]/10 text-[var(--theme-primary)] rounded-xl">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 capitalize">
                {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Cliquez sur une case pour programmer ou modifier un événement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrevMonth}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 active:scale-95 transition-all"
              aria-label="Mois précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 active:scale-95 transition-all"
            >
              Aujourd'hui
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 active:scale-95 transition-all"
              aria-label="Mois suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grille du Calendrier */}
        <div className="space-y-2">
          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="py-1.5 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Grille des DayCell Cards */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
            {calendarDays.map((cell, idx) => {
              // Trouver les événements prévus pour ce jour
              const dayEvents = events.filter((e) => e.date === cell.dateString);
              const isToday = cell.dateString === new Date().toISOString().split("T")[0];

              return (
                <div
                  key={`${cell.dateString}-${idx}`}
                  onClick={() => handleDayClick(cell.dateString)}
                  className={cn(
                    "min-h-[85px] sm:min-h-[110px] p-1.5 sm:p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden",
                    cell.isCurrentMonth
                      ? "bg-slate-50/50 hover:bg-[var(--theme-secondary)]/5 border-slate-200/80 hover:border-[var(--theme-secondary)]/50"
                      : "bg-slate-100/30 text-slate-300 border-slate-100 hover:bg-slate-100/60",
                    isToday && "ring-2 ring-[var(--theme-secondary)] bg-[var(--theme-secondary)]/5 border-[var(--theme-secondary)]"
                  )}
                >
                  {/* Numéro du jour */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={cn(
                        "text-xs font-bold font-mono px-1.5 py-0.5 rounded-lg",
                        isToday
                          ? "bg-[var(--theme-secondary)] text-white font-black"
                          : cell.isCurrentMonth
                            ? "text-slate-700 group-hover:text-[var(--theme-primary)]"
                            : "text-slate-400"
                      )}
                    >
                      {cell.dayNumber}
                    </span>

                    {/* Badge nombre d'événements si > 0 */}
                    {dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-[var(--theme-secondary)] animate-pulse" />
                    )}
                  </div>

                  {/* Badges d'événements dans la cellule */}
                  <div className="space-y-1 mt-1 overflow-y-auto max-h-[60px] scrollbar-none">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(evt);
                        }}
                        className={cn(
                          "px-2 py-1 rounded-lg text-[10px] font-bold truncate transition-all border flex items-center justify-between gap-1 shadow-2xs",
                          evt.status === "actif" && "bg-[var(--theme-primary)] text-[var(--theme-secondary)] border-slate-800 hover:bg-slate-800",
                          evt.status === "complet" && "bg-[var(--theme-secondary)]/10 text-[var(--theme-primary)] border-[var(--theme-secondary)]/30 hover:bg-[var(--theme-secondary)]/20",
                          evt.status === "annule" && "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                        )}
                        title={`${evt.title} (${evt.time})`}
                      >
                        <span className="truncate">{evt.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton rapide d'ajout au survol desktop */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1 right-1 hidden sm:block">
                    <div className="p-1 bg-[var(--theme-secondary)] text-white rounded-lg shadow-xs">
                      <Plus className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: Tableau de Gestion des Événements */}
      <div className="bg-white border border-slate-200/80 p-5 sm:p-6 rounded-3xl space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Répertoire des Sessions
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              {filteredEvents.length} session(s) répertoriée(s)
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une session..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all w-full sm:w-64"
            />
          </div>
        </div>

        {/* Tableau Responsive */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                <th className="pb-3 px-2">Événement & Date</th>
                <th className="pb-3 px-2">Lieu & Horaire</th>
                <th className="pb-3 px-2">Prix</th>
                <th className="pb-3 px-2">Réservations</th>
                <th className="pb-3 px-2">Statut</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Colonne 1: Titre & Date */}
                    <td className="py-3.5 px-2 font-medium">
                      <p className="font-extrabold text-slate-900">{evt.title}</p>
                      <p className="text-[11px] font-mono text-[var(--theme-primary)] flex items-center gap-1 mt-0.5">
                        <CalendarIcon className="w-3 h-3 text-[var(--theme-primary)]" />
                        {new Date(evt.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                    </td>

                    {/* Colonne 2: Lieu & Horaire */}
                    <td className="py-3.5 px-2 text-slate-600">
                      <p className="flex items-center gap-1 font-semibold text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {evt.time}
                      </p>
                    </td>

                    {/* Colonne 3: Prix */}
                    <td className="py-3.5 px-2 font-extrabold text-slate-900">
                      {formatCFA(evt.price)}
                    </td>

                    {/* Colonne 4: Places */}
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Users className="w-3.5 h-3.5 text-[var(--theme-secondary)]" />
                        <span>{evt.reservedSpots} / {evt.maxCapacity}</span>
                      </div>
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="bg-[var(--theme-secondary)] h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (evt.reservedSpots / evt.maxCapacity) * 100)}%`
                          }}
                        />
                      </div>
                    </td>

                    {/* Colonne 5: Statut */}
                    <td className="py-3.5 px-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase",
                          evt.status === "actif" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                          evt.status === "complet" && "bg-[var(--theme-secondary)]/10 text-[var(--theme-primary)] border border-[var(--theme-secondary)]/30",
                          evt.status === "annule" && "bg-rose-50 text-rose-700 border border-rose-200"
                        )}
                      >
                        {evt.status === "actif" && <CheckCircle2 className="w-3 h-3" />}
                        {evt.status === "complet" && <AlertCircle className="w-3 h-3" />}
                        {evt.status}
                      </span>
                    </td>

                    {/* Colonne 6: Actions */}
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEditEvent(evt)}
                          className="p-2 hover:bg-slate-200/60 rounded-xl text-slate-600 transition-all active:scale-95"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-2 hover:bg-rose-50 rounded-xl text-rose-600 transition-all active:scale-95"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-xs font-mono">
                    Aucun événement trouvé pour cette recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE: Formulaire d'Ajout / Édition d'Événement */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50"
            />

            {/* Fenêtre Modale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] sm:mx-auto sm:max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-2xl z-50 overflow-hidden space-y-0"
            >
              {/* Header Modale */}
              <div className="bg-[var(--theme-primary)] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[var(--theme-secondary)] text-white rounded-xl">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">
                      {selectedEventId ? "Modifier la Session" : "Programmer une Session"}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-mono">
                      {formData.date ? `Date : ${formData.date}` : "Sélectionnez les paramètres"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

                {/* Titre */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                    Titre de l'Événement *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Brunch Récréation - Édition Spéciale"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                  />
                </div>

                {/* Date & Horaires */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                      Horaire
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 11:00 - 18:00"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    />
                  </div>
                </div>

                {/* Lieu */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                    Lieu
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Cocody Angré, Abidjan"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                  />
                </div>

                {/* Capacité & Prix */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                      Capacité (Places)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.maxCapacity}
                      onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                      Prix (FCFA)
                    </label>
                    <input
                      type="number"
                      step={500}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                    />
                  </div>
                </div>

                {/* Statut */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                    Statut de la session
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                  >
                    <option value="actif">Actif (Inscriptions ouvertes)</option>
                    <option value="complet">Complet (Guichet fermé)</option>
                    <option value="annule">Annulé</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                    Description / Remarques
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisions sur le déroulement, le menu ou le dress-code..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all resize-none"
                  />
                </div>

                {/* Bouton de Soumission */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[var(--theme-primary)] hover:bg-slate-800 text-[var(--theme-secondary)] font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Save className="w-4 h-4" />
                    <span>{selectedEventId ? "Enregistrer les modifications" : "Créer l'Événement"}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}