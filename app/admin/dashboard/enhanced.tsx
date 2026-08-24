"use client";

import React from "react";
import { Eye, Globe, Smartphone, Monitor, Tablet, Loader, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStats } from "@/lib/hooks/useDashboardStats";

const DEVICE_ICONS = { mobile: Smartphone, desktop: Monitor, tablet: Tablet };
const DEVICE_LABELS = { mobile: "Mobile", desktop: "Desktop", tablet: "Tablette" };

export function EnhancedDashboard() {
  const { analytics, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 flex justify-center">
        <Loader className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!analytics) return null;

  const maxDaily = Math.max(...analytics.dailyTrend.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">Statistiques du Site (7 derniers jours)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Eye className="w-5 h-5" /></div>
            </div>
            <p className="text-xs text-slate-500 font-mono">Visiteurs Uniques</p>
            <p className="text-2xl font-extrabold text-slate-900">{analytics.uniqueVisitors}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><Globe className="w-5 h-5" /></div>
            </div>
            <p className="text-xs text-slate-500 font-mono">Pages Vues</p>
            <p className="text-2xl font-extrabold text-slate-900">{analytics.totalPageViews}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pages les plus vues */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900">Pages les Plus Consultées</h3>
          {analytics.topPages.length === 0 ? (
            <p className="text-xs text-slate-400">Pas encore de données</p>
          ) : (
            <div className="space-y-3">
              {analytics.topPages.map((page, idx) => {
                const pct = Math.round((page.count / analytics.totalPageViews) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-700 truncate">{page.path}</span>
                      <span className="text-xs font-bold text-slate-900">{page.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[var(--theme-secondary)] h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Appareils */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900">Appareils Utilisés</h3>
          {analytics.deviceBreakdown.length === 0 ? (
            <p className="text-xs text-slate-400">Pas encore de données</p>
          ) : (
            <div className="space-y-3">
              {analytics.deviceBreakdown.map((dev, idx) => {
                const Icon = DEVICE_ICONS[dev.device] || Monitor;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" /> {DEVICE_LABELS[dev.device] || dev.device}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{dev.count} ({dev.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[var(--theme-primary)] h-full rounded-full" style={{ width: `${dev.percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tendance */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Tendance des Visites
        </h3>
        {analytics.dailyTrend.length === 0 ? (
          <p className="text-xs text-slate-400">Pas encore assez de données</p>
        ) : (
          <div className="flex items-end justify-between gap-1 h-24">
            {analytics.dailyTrend.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[var(--theme-secondary)]/80 rounded-t-lg hover:bg-[var(--theme-secondary)] transition-all"
                  style={{ height: `${(item.count / maxDaily) * 100}%` }}
                  title={`${item.count} visites`}
                />
                <span className="text-[10px] font-bold text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}