// app/admin/profil/page.tsx
// Admin profile and password management

"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  User,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export default function AdminProfilePage() {
  const { showToast } = useToast();
  const [adminName, setAdminName] = useState("Admin Cook'Tail");
  const [adminEmail, setAdminEmail] = useState("admin@cooktail.local");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Password validation
  const passwordStrength = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*]/.test(newPassword),
  };

  const isPasswordStrong = Object.values(passwordStrength).every((v) => v);
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  // Handle password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Remplissez tous les champs", "error");
      return;
    }

    if (!isPasswordStrong) {
      showToast("Le mot de passe ne respecte pas les critères de sécurité", "error");
      return;
    }

    if (!passwordsMatch) {
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }

    try {
      setIsChanging(true);

      // TODO: Replace with actual Firebase authentication
      // For now, just simulate the change
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, use Firebase:
      // const user = await firebase.auth().currentUser;
      // await user.updatePassword(newPassword);
      // Or use reauthenticateWithCredential for verification

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      showToast("Mot de passe modifié avec succès", "success");
    } catch (error) {
      console.error("Error changing password:", error);
      showToast("Erreur lors du changement de mot de passe", "error");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gestion du Compte
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Gérez les paramètres de votre compte et la sécurité
          </p>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Informations Personnelles</h2>
            <p className="text-xs text-slate-400 mt-0.5">Détails de votre compte administrateur</p>
          </div>
          <div className="p-3 bg-[var(--theme-secondary)]/10 text-[var(--theme-secondary)] rounded-xl">
            <User className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-4">
          {/* Admin Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Nom
            </label>
            <input
              type="text"
              value={adminName}
              readOnly
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 cursor-not-allowed opacity-75"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              ⓘ Contact l'administrateur système pour modifier
            </p>
          </div>

          {/* Admin Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={adminEmail}
              readOnly
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 cursor-not-allowed opacity-75"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              ⓘ Contact l'administrateur système pour modifier
            </p>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Sécurité</h2>
            <p className="text-xs text-slate-400 mt-0.5">Modifiez votre mot de passe</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Entrez votre mot de passe actuel"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Créez un nouveau mot de passe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Password Strength */}
            {newPassword && (
              <div className="mt-3 space-y-2">
                <div className="text-xs font-bold text-slate-700">Critères de sécurité:</div>
                <div className="space-y-1">
                  {[
                    { key: "length", label: "Au moins 8 caractères" },
                    { key: "uppercase", label: "Une lettre majuscule" },
                    { key: "lowercase", label: "Une lettre minuscule" },
                    { key: "number", label: "Un chiffre" },
                    { key: "special", label: "Un caractère spécial (!@#$%^&*)" },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center gap-2 text-xs"
                    >
                      {passwordStrength[key as keyof typeof passwordStrength] ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-slate-300" />
                      )}
                      <span
                        className={
                          passwordStrength[key as keyof typeof passwordStrength]
                            ? "text-slate-700"
                            : "text-slate-400"
                        }
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre nouveau mot de passe"
                className={cn(
                  "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 transition-all",
                  confirmPassword
                    ? passwordsMatch
                      ? "border-emerald-200 focus:border-emerald-500"
                      : "border-rose-200 focus:border-rose-500"
                    : "border-slate-200 focus:border-[var(--theme-secondary)]"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {confirmPassword && (
              <div className={`mt-2 text-xs font-semibold flex items-center gap-1.5 ${
                passwordsMatch ? "text-emerald-600" : "text-rose-600"
              }`}>
                {passwordsMatch ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                {passwordsMatch ? "Les mots de passe correspondent" : "Les mots de passe ne correspondent pas"}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isChanging || !isPasswordStrong || !passwordsMatch}
              className={cn(
                "flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2",
                isPasswordStrong && passwordsMatch && !isChanging
                  ? "bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-[var(--theme-secondary)]"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              )}
            >
              <Save className="w-4 h-4" />
              {isChanging ? "Modification..." : "Modifier le mot de passe"}
            </button>
          </div>
        </form>

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900">
              <p className="font-bold mb-1">Conseils de sécurité:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Utilisez un mot de passe unique et fort</li>
                <li>Ne partagez votre mot de passe avec personne</li>
                <li>Changez votre mot de passe régulièrement</li>
                <li>Utilisez l'authentification à deux facteurs si disponible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
