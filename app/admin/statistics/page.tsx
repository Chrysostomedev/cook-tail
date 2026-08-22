// app/admin/statistics/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Users, TrendingUp, DollarSign, Target, Calendar, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Loader } from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { getStatistics } from "@/lib/services/statisticsService";
import { getAllReservations } from "@/lib/services/reservationService";
import { useToast } from "@/context/ToastContext";

interface Statistics {
  totalReservations: number;
  confirmedReservations: number;
  totalRevenue: number;
  averagePartySize: number;
  totalVisitors: number;
  gamesTally: number;
  menuItemsTally: number;
  servicesAvailable: number;
  lastUpdated: Date;
}

export default function StatisticsPage() {
  const { showToast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentReservations, setRecentReservations] = useState<any[]>([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const statistics = await getStatistics();
      setStats(statistics);

      const reservations = await getAllReservations();
      const recent = reservations.slice(0, 3).map((r, idx) => ({
        id: idx + 1,
        name: r.fullName,
        phone: r.phone,
        guests: r.groupSize,
        amount: r.amountPaid,
        status: r.status,
        date: (r.createdAt?.toDate?.() || new Date()).toLocaleDateString("fr-FR"),
      }));
      setRecentReservations(recent);
    } catch (error) {
      console.error("Error loading statistics:", error);
      showToast("Erreur lors du chargement des statistiques", "error");
    } finally {
      setLoading(false);
    }
  };

  const hourlyData = [
    { hour: "08h", reservations: 2, revenue: 20000 },
    { hour: "10h", reservations: 5, revenue: 50000 },
    { hour: "12h", reservations: 8, revenue: 80000 },
    { hour: "14h", reservations: 6, revenue: 60000 },
    { hour: "16h", reservations: 4, revenue: 40000 },
    { hour: "18h", reservations: 3, revenue: 30000 },
  ];

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-slate-400 animate-spin" />
          <p className="text-sm text-slate-400">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black uppercase" style={{ color: "var(--theme-textPrimary)" }}>
          Statistiques & Tracking
        </h1>
        <p style={{ color: "var(--theme-textSecondary)" }} className="text-sm">
          Aperçu en temps réel des réservations et du chiffre d'affaires
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-mono font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>
          <Calendar className="w-4 h-4 inline mr-1" /> Période
        </span>
        {["Aujourd'hui", "Cette semaine", "Ce mois", "Cette année"].map((period, i) => (
          <button
            key={i}
            onClick={() => setSelectedPeriod(period)}
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all border-2"
            style={{
              backgroundColor: selectedPeriod === period ? "var(--theme-primary)" : "transparent",
              color: selectedPeriod === period ? "white" : "var(--theme-textSecondary)",
              borderColor: selectedPeriod === period ? "var(--theme-primary)" : "var(--theme-borderColor)",
            }}
          >
            {period}
          </button>
        ))}
      </div>

      {/* KPI Cards - Première Ligne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Réservations Totales"
          value={stats.totalReservations}
          subtitle="Pass vendus"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Revenu Total"
          value={`${(stats.totalRevenue / 1000).toFixed(0)}k FCFA`}
          subtitle="Chiffre d'affaires"
          icon={DollarSign}
          variant="kaki"
        />
        <StatCard
          title="Moyenne par groupe"
          value={stats.averagePartySize}
          subtitle="Personnes/réservation"
          icon={Target}
          variant="blue"
        />
        <StatCard
          title="Taux de Confirmation"
          value={`${stats.totalReservations > 0 ? Math.round((stats.confirmedReservations / stats.totalReservations) * 100) : 0}%`}
          subtitle="Confirmées → Total"
          icon={TrendingUp}
          variant="red"
        />
      </div>

      {/* KPI Cards - Deuxième Ligne (Live Tracking) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Visiteurs"
          value={stats.totalVisitors}
          subtitle="Personnes confirmées"
          icon={BarChart3}
          variant="blue"
        />
        <StatCard
          title="Catalogues Actifs"
          value={stats.menuItemsTally}
          subtitle={`${stats.gamesTally} jeux, ${stats.servicesAvailable} services`}
          icon={PieChartIcon}
          variant="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique Activité (2/3 width) */}
        <div className="lg:col-span-2 p-6 rounded-3xl border-2" style={{ backgroundColor: "var(--theme-bgPrimary)", borderColor: "var(--theme-borderColor)" }}>
          <div className="flex items-center justify-between mb-6" style={{ borderBottom: `1px solid var(--theme-borderColor)`, paddingBottom: "1.5rem" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg" style={{ backgroundColor: "var(--theme-primary)" }}>
                <LineChartIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg" style={{ color: "var(--theme-textPrimary)" }}>
                Activité Horaire
              </h3>
            </div>
          </div>

          {/* Bars Chart Simulé */}
          <div className="space-y-3">
            {hourlyData.map((data, i) => {
              const maxRevenue = Math.max(...hourlyData.map((d) => d.revenue));
              const percentage = (data.revenue / maxRevenue) * 100;

              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold" style={{ color: "var(--theme-textPrimary)" }}>
                      {data.hour}
                    </span>
                    <span style={{ color: "var(--theme-textSecondary)" }}>
                      {data.reservations} réservations • {data.revenue.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: "var(--theme-bgSecondary)", overflow: "hidden" }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: "var(--theme-secondary)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Stats Sidebar */}
        <div className="p-6 rounded-3xl border-2 space-y-4" style={{ backgroundColor: "var(--theme-bgSecondary)", borderColor: "var(--theme-borderColor)" }}>
          <h4 className="font-bold text-base flex items-center gap-2" style={{ color: "var(--theme-textPrimary)" }}>
            <BarChart3 className="w-5 h-5" style={{ color: "var(--theme-secondary)" }} />
            Meilleurs Créneaux
          </h4>

          <div className="space-y-3">
            {[
              { time: "12h - 14h", reservations: 8, revenue: 80000, badge: "Peak" },
              { time: "10h - 12h", reservations: 5, revenue: 50000, badge: "Stable" },
              { time: "14h - 16h", reservations: 6, revenue: 60000, badge: "Bon" },
            ].map((slot, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border"
                style={{
                  backgroundColor: "var(--theme-bgPrimary)",
                  borderColor: "var(--theme-borderColor)",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs" style={{ color: "var(--theme-textPrimary)" }}>
                    {slot.time}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--theme-primary)",
                      color: "white",
                    }}
                  >
                    {slot.badge}
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: "var(--theme-textSecondary)" }}>
                  {slot.reservations} réservations • {slot.revenue.toLocaleString()} FCFA
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Réservations Récentes */}
      <div className="p-6 rounded-3xl border-2" style={{ backgroundColor: "var(--theme-bgPrimary)", borderColor: "var(--theme-borderColor)" }}>
        <h3 className="font-bold text-lg mb-6" style={{ color: "var(--theme-textPrimary)" }}>
          Réservations Récentes
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid var(--theme-borderColor)` }}>
                <th className="text-left py-3 px-4 font-mono font-bold text-xs uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                  Nom
                </th>
                <th className="text-left py-3 px-4 font-mono font-bold text-xs uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                  Contact
                </th>
                <th className="text-left py-3 px-4 font-mono font-bold text-xs uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                  Personnes
                </th>
                <th className="text-left py-3 px-4 font-mono font-bold text-xs uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                  Montant
                </th>
                <th className="text-left py-3 px-4 font-mono font-bold text-xs uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                  Statut
                </th>
                <th className="text-left py-3 px-4 font-mono font-bold text-xs uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((res, i) => (
                <tr key={i} style={{ borderBottom: `1px solid var(--theme-borderColor)` }}>
                  <td className="py-3 px-4 font-bold" style={{ color: "var(--theme-textPrimary)" }}>
                    {res.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs" style={{ color: "var(--theme-textSecondary)" }}>
                    {res.phone}
                  </td>
                  <td className="py-3 px-4" style={{ color: "var(--theme-textPrimary)" }}>
                    {res.guests}
                  </td>
                  <td className="py-3 px-4 font-bold" style={{ color: "var(--theme-secondary)" }}>
                    {res.amount.toLocaleString()} FCFA
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          res.status === "confirmed"
                            ? "var(--theme-secondary)"
                            : res.status === "checked_in"
                            ? "var(--theme-secondary)"
                            : "var(--theme-bgSecondary)",
                        color:
                          res.status === "confirmed" || res.status === "checked_in"
                            ? "white"
                            : "var(--theme-primary)",
                      }}
                    >
                      {res.status === "confirmed"
                        ? "✓ Confirmé"
                        : res.status === "checked_in"
                        ? "✓ Accès"
                        : "⏳ Attente"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: "var(--theme-textSecondary)" }}>
                    {res.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
