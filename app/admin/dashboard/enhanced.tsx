// app/admin/dashboard/enhanced.tsx
// Enhanced dashboard with analytics and real-time statistics

"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  Calendar,
  Eye,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown,
  MapPin,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down" | "stable";
}

interface Analytics {
  pageViews: number;
  visitors: number;
  conversionRate: number;
  avgSessionDuration: string;
  bounceRate: number;
}

export function EnhancedDashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    pageViews: 2847,
    visitors: 543,
    conversionRate: 12.5,
    avgSessionDuration: "4m 32s",
    bounceRate: 28.4,
  });

  const stats: StatCard[] = [
    {
      title: "Visiteurs Uniques",
      value: analytics.visitors,
      change: 12.5,
      icon: <Eye className="w-5 h-5" />,
      trend: "up",
    },
    {
      title: "Pages Vues",
      value: analytics.pageViews,
      change: 8.2,
      icon: <Globe className="w-5 h-5" />,
      trend: "up",
    },
    {
      title: "Taux de Conversion",
      value: `${analytics.conversionRate}%`,
      change: -2.1,
      icon: <TrendingUp className="w-5 h-5" />,
      trend: "down",
    },
    {
      title: "Durée Session",
      value: analytics.avgSessionDuration,
      change: 5.3,
      icon: <Activity className="w-5 h-5" />,
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            Statistiques du Site
          </h2>
          <select className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
            <option>Aujourd'hui</option>
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={cn(
                  "p-2 rounded-xl",
                  stat.trend === "up"
                    ? "bg-emerald-100 text-emerald-600"
                    : stat.trend === "down"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-slate-200 text-slate-600"
                )}>
                  {stat.icon}
                </div>
                <div className={cn(
                  "flex items-center gap-0.5 text-xs font-bold",
                  stat.trend === "up"
                    ? "text-emerald-600"
                    : stat.trend === "down"
                    ? "text-rose-600"
                    : "text-slate-600"
                )}>
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-mono">{stat.title}</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900">Localisation des Visiteurs</h3>
          <div className="space-y-3">
            {[
              { country: "Côte d'Ivoire", percentage: 78, count: 424 },
              { country: "France", percentage: 12, count: 65 },
              { country: "Canada", percentage: 5, count: 27 },
              { country: "Autres", percentage: 5, count: 27 },
            ].map((loc, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">
                    {loc.country}
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {loc.count} ({loc.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[var(--theme-secondary)] h-full rounded-full"
                    style={{ width: `${loc.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900">Appareils Utilisés</h3>
          <div className="space-y-3">
            {[
              { device: "Mobile", percentage: 62, count: 336 },
              { device: "Desktop", percentage: 28, count: 152 },
              { device: "Tablet", percentage: 10, count: 55 },
            ].map((dev, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">
                    {dev.device}
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {dev.count} ({dev.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      idx === 0
                        ? "bg-[var(--theme-primary)]"
                        : idx === 1
                        ? "bg-[var(--theme-secondary)]"
                        : "bg-amber-500"
                    )}
                    style={{ width: `${dev.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Timeline */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900">Tendance des Visiteurs</h3>
        <div className="flex items-end justify-between gap-1 h-24">
          {[
            { day: "Lun", count: 120 },
            { day: "Mar", count: 145 },
            { day: "Mer", count: 98 },
            { day: "Jeu", count: 167 },
            { day: "Ven", count: 156 },
            { day: "Sam", count: 142 },
            { day: "Dim", count: 115 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full bg-[var(--theme-secondary)]/80 rounded-t-lg transition-all hover:bg-[var(--theme-secondary)]"
                style={{
                  height: `${(item.count / 167) * 100}%`,
                }}
                title={`${item.count} visiteurs`}
              />
              <span className="text-[10px] font-bold text-slate-600">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
