// app/login/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { loginUser, getCurrentUser } from "@/lib/services/authService";

export default function AdminLoginPage() {
    const router = useRouter();
    const { showToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Check if already logged in
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            router.push("/admin/dashboard");
        }
    }, []); // ✅ FIXÉ: Dépendances vides - exécute une seule fois au mount

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            showToast("Remplissez tous les champs", "error");
            return;
        }

        setIsLoading(true);

        try {
            await loginUser(email, password);
            showToast("Connexion réussie !", "success");
            router.push("/admin/dashboard");
        } catch (err: any) {
            let errorMessage = "Erreur de connexion";
            
            if (err.code === "auth/invalid-email") {
                errorMessage = "Email invalide";
            } else if (err.code === "auth/user-not-found") {
                errorMessage = "Utilisateur non trouvé";
            } else if (err.code === "auth/wrong-password") {
                errorMessage = "Mot de passe incorrect";
            } else if (err.code === "auth/too-many-requests") {
                errorMessage = "Trop de tentatives. Réessayez plus tard";
            }

            setError(errorMessage);
            showToast(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--theme-bgPrimary)] flex items-center justify-center p-4 selection:bg-amber-200 selection:text-amber-950">

            {/* Carte de connexion principale */}
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 p-6 sm:p-8 space-y-6 relative overflow-hidden">

                {/* Glow décoratif en arrière-plan */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Branding & En-tête */}
                <div className="text-center space-y-3 relative z-10">
                    <div className="w-14 h-14 bg-[var(--theme-primary)] rounded-2xl p-2.5 mx-auto shadow-md flex items-center justify-center">
                        <Image
                            src="/img/logo.png"
                            alt="Logo Cook'Tail"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <span className="inline-flex items-center gap-1.5 bg-[var(--theme-secondary)]/10 text-[var(--theme-primary)] border border-[var(--theme-secondary)]/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3" /> Espace Staff
                        </span>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                            Connexion Admin
                        </h1>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Accédez au tableau de contrôle du Brunch Récréation
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex gap-2 items-start">
                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-rose-700 font-semibold">{error}</p>
                    </div>
                )}

                {/* Formulaire de Connexion */}
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">

                    {/* Champ Email */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                            Email
                        </label>
                        <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                placeholder="admin@cooktail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                            />
                        </div>
                    </div>

                    {/* Champ Mot de Passe */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                aria-label="Afficher/Masquer le mot de passe"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Bouton de Validation */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-[var(--theme-secondary)] font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none mt-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Vérification...</span>
                            </>
                        ) : (
                            <>
                                <span>Se connecter</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer d'information */}
                <div className="pt-2 border-t border-slate-100 text-center">
                    <p className="text-[11px] font-mono text-slate-400">
                        Cook'Tail Service © 2026 — Plateforme sécurisée
                    </p>
                </div>

            </div>
        </div>
    );
}