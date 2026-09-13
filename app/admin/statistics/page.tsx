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


     
    </div>
  );
}
