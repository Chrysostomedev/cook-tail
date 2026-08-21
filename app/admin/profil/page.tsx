// app/admin/profil/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    KeyRound,
    User,
    Mail,
    Phone,
    Lock,
    Smartphone,
    History,
    CheckCircle2,
    ArrowLeft,
    Camera,
    Save,
    Clock,
    Sparkles,
    LogOut,
    AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProfilePage() {
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    const [formData, setFormData] = useState({
        name: "Awa Koffi",
        role: "Directrice Générale & Admin",
        email: "admin@cooktail-service.ci",
        phone: "+225 07 00 00 11 22",
        twoFactorEnabled: true,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSuccessMsg(true);
            setTimeout(() => setSuccessMsg(false), 3000);
        }, 800);
    };

    const logs = [
        { id: 1, action: "Connexion réussie depuis Abidjan, CI", date: "Aujourd'hui, 09:42", ip: "160.155.22.10", device: "Chrome / macOS" },
        { id: 2, action: "Validation QR Pass #BR-2026-0089", date: "Aujourd'hui, 08:15", ip: "160.155.22.10", device: "Scanner Mobile" },
        { id: 3, action: "Modification du tarif Pass Élève VIP", date: "Hier, 17:30", ip: "41.202.219.1", device: "Safari / iOS" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            {/* Header Navigation */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Dashboard
                </Link>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Compte Vérifié
                </span>
            </div>

            {/* Hero Banner Profil */}
            <div className="relative bg-gradient-to-r from-[var(--theme-primary)] via-[#10274A] to-[var(--theme-primary)] border border-white/10 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                    <div className="relative group">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-3xl flex items-center justify-center shadow-xl ring-4 ring-white/10 shrink-0">
                            A
                        </div>
                        <button className="absolute bottom-1 right-1 p-2 bg-slate-900/90 text-amber-400 rounded-xl border border-amber-500/30 hover:bg-slate-900 transition-all shadow-lg">
                            <Camera className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="text-center sm:text-left space-y-2 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{formData.name}</h1>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md w-fit mx-auto sm:mx-0">
                                <ShieldCheck className="w-3 h-3" /> Admin Master
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{formData.role}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300 font-mono">
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400" /> {formData.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-400" /> {formData.phone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Formulaire des Informations */}
                <div className="md:col-span-2 bg-[var(--theme-primary)] border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <User className="w-4 h-4 text-amber-400" /> Informations Personnelles
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">Mettez à jour vos identifiants administrateur</p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-mono uppercase font-semibold text-slate-300">Nom Complet</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-mono uppercase font-semibold text-slate-300">Intitulé du Poste</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-mono uppercase font-semibold text-slate-300">Adresse Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-mono uppercase font-semibold text-slate-300">Téléphone Mobile</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            {successMsg ? (
                                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-fade-in">
                                    <CheckCircle2 className="w-4 h-4" /> Modifications enregistrées !
                                </span>
                            ) : <div />}

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" /> {isSaving ? "Enregistrement..." : "Sauvegarder"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Panneau Sécurité & Actions */}
                <div className="space-y-6">
                    <div className="bg-[var(--theme-primary)] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
                        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                            <Lock className="w-4 h-4 text-amber-400" /> Sécurité
                        </h2>

                        <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                                    <Smartphone className="w-3.5 h-3.5 text-amber-400" /> Validation 2FA
                                </span>
                                <span className="text-[9px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                                    Actif
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400">Authentification à deux facteurs active via SMS / OTP.</p>
                        </div>

                        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                            <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Changer le mot de passe
                        </button>
                    </div>

                    <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 space-y-3">
                        <h3 className="text-xs font-extrabold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" /> Zone Sensible
                        </h3>
                        <p className="text-[11px] text-slate-400">Déconnectez votre session administrateur sur cet appareil.</p>
                        <button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                            <LogOut className="w-3.5 h-3.5" /> Se déconnecter
                        </button>
                    </div>
                </div>
            </div>

            {/* Log d'Activités Récentes */}
            <div className="bg-[var(--theme-primary)] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <History className="w-4 h-4 text-amber-400" /> Historique d'Accès & Activités
                </h2>

                <div className="divide-y divide-white/5">
                    {logs.map((log) => (
                        <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                            <div className="space-y-0.5">
                                <p className="font-semibold text-slate-200">{log.action}</p>
                                <span className="text-[10px] text-slate-400 font-mono block">{log.device} • IP: {log.ip}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                                <Clock className="w-3 h-3 text-amber-400/80" /> {log.date}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}