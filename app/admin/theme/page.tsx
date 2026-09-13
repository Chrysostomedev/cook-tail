// app/admin/theme/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme, type ThemeConfig } from "@/context/ThemeContext";
import { Palette, RotateCcw, Copy, Check } from "lucide-react";

export default function ThemePage() {
  const [mounted, setMounted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState<ThemeConfig | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [lastSaveTime, setLastSaveTime] = useState<string>("");

  // Utiliser useTheme avec protection hydration
  let themeContext: any = null;
  
  try {
    themeContext = useTheme();
  } catch (e) {
    // Context not available during SSR
  }

  useEffect(() => {
    setMounted(true);
    if (themeContext) {
      setCustomColors(themeContext.theme);
    }
  }, [themeContext]);

  if (!mounted || !themeContext || !customColors) {
    return <div style={{ padding: "2rem", color: "var(--theme-textPrimary)" }}>Chargement...</div>;
  }

  const { theme, presetThemes, currentPreset, setTheme, switchPreset, resetToDefault } = themeContext;

  // Mise à jour des couleurs personnalisées EN LIVE
  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    const updated = { ...customColors, [key]: value };
    setCustomColors(updated);
    
    // Appliquer automatiquement en live
    setSaveStatus("saving");
    setTimeout(() => {
      setTheme(updated);
      setSaveStatus("saved");
      setLastSaveTime(new Date().toLocaleTimeString("fr-FR"));
      
      // Réinitialiser le statut après 2 secondes
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 300);
  };

  // Copier une couleur
  const copyToClipboard = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ backgroundColor: "var(--theme-bgSecondary)" }}>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--theme-primary)" }}>
              <Palette className="w-6 h-6" style={{ color: "white" }} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold" style={{ color: "var(--theme-textPrimary)" }}>
                Gestionnaire de couleurs
              </h1>
              <p style={{ color: "var(--theme-textSecondary)" }}>
                Personnalisez les couleurs globales de Cook'Tail Service
              </p>
            </div>
            
            {/* Save Status Indicator */}
            <div className="flex items-center gap-2">
              {saveStatus === "saving" && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-primary)" }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--theme-primary)" }} />
                  <span className="text-xs font-bold">Enregistrement...</span>
                </div>
              )}
              {saveStatus === "saved" && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--theme-secondary)", color: "white" }}>
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold">Enregistré!</span>
                </div>
              )}
              {lastSaveTime && saveStatus === "idle" && (
                <span className="text-[11px] font-mono" style={{ color: "var(--theme-textSecondary)" }}>
                  ✓ Dernière maj: {lastSaveTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-soft-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--theme-textPrimary)" }}>
            Thèmes Prédéfinis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(presetThemes).map(([presetName, presetTheme]: any) => (
              <button
                key={presetName}
                onClick={() => {
                  setSaveStatus("saving");
                  setTimeout(() => {
                    switchPreset(presetName);
                    setCustomColors(presetTheme);
                    setSaveStatus("saved");
                    setLastSaveTime(new Date().toLocaleTimeString("fr-FR"));
                    setTimeout(() => setSaveStatus("idle"), 2000);
                  }, 300);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  currentPreset === presetName
                    ? "border-blue-500 shadow-md"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{
                  borderColor: currentPreset === presetName ? "var(--theme-primary)" : "var(--theme-borderColor)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: presetTheme.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: presetTheme.secondary }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: presetTheme.bgPrimary, border: `1px solid ${presetTheme.textPrimary}` }}
                    />
                  </div>
                  {currentPreset === presetName && (
                    <span className="ml-auto text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700">
                      Actif
                    </span>
                  )}
                </div>
                <p className="font-semibold capitalize" style={{ color: "var(--theme-textPrimary)" }}>
                  {presetName === "default" ? "Cook'Tail (Défaut)" : presetName.charAt(0).toUpperCase() + presetName.slice(1)}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSaveStatus("saving");
              setTimeout(() => {
                resetToDefault();
                setCustomColors(presetThemes.default);
                setSaveStatus("saved");
                setLastSaveTime(new Date().toLocaleTimeString("fr-FR"));
                setTimeout(() => setSaveStatus("idle"), 2000);
              }, 300);
            }}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:opacity-80 transition-all"
            style={{
              borderColor: "var(--theme-borderColor)",
              color: "var(--theme-textPrimary)",
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser au Défaut
          </button>
        </div>

        {/* Editeur Personnalisé */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-soft-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--theme-textPrimary)" }}>
            Éditeur de Couleurs Personnalisé (EN LIVE)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Color Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm" style={{ color: "var(--theme-textPrimary)" }}>
                Couleur Primaire (Magenta/Bleu)
              </h3>
              <ColorPickerGroup
                label="Primary"
                value={customColors.primary}
                onChange={(val) => handleColorChange("primary", val)}
                onCopy={() => copyToClipboard(customColors.primary, "primary")}
                copied={copiedField === "primary"}
              />
              <ColorPickerGroup
                label="Primary Light"
                value={customColors.primaryLight}
                onChange={(val) => handleColorChange("primaryLight", val)}
                onCopy={() => copyToClipboard(customColors.primaryLight, "primaryLight")}
                copied={copiedField === "primaryLight"}
              />
              <ColorPickerGroup
                label="Primary Dark"
                value={customColors.primaryDark}
                onChange={(val) => handleColorChange("primaryDark", val)}
                onCopy={() => copyToClipboard(customColors.primaryDark, "primaryDark")}
                copied={copiedField === "primaryDark"}
              />
            </div>

            {/* Secondary Color Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm" style={{ color: "var(--theme-textPrimary)" }}>
                Couleur Secondaire (Vert/Kaki)
              </h3>
              <ColorPickerGroup
                label="Secondary"
                value={customColors.secondary}
                onChange={(val) => handleColorChange("secondary", val)}
                onCopy={() => copyToClipboard(customColors.secondary, "secondary")}
                copied={copiedField === "secondary"}
              />
              <ColorPickerGroup
                label="Secondary Light"
                value={customColors.secondaryLight}
                onChange={(val) => handleColorChange("secondaryLight", val)}
                onCopy={() => copyToClipboard(customColors.secondaryLight, "secondaryLight")}
                copied={copiedField === "secondaryLight"}
              />
              <ColorPickerGroup
                label="Secondary Dark"
                value={customColors.secondaryDark}
                onChange={(val) => handleColorChange("secondaryDark", val)}
                onCopy={() => copyToClipboard(customColors.secondaryDark, "secondaryDark")}
                copied={copiedField === "secondaryDark"}
              />
            </div>

            {/* Text & BG Colors */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm" style={{ color: "var(--theme-textPrimary)" }}>
                Texte & Fond
              </h3>
              <ColorPickerGroup
                label="Text Primary"
                value={customColors.textPrimary}
                onChange={(val) => handleColorChange("textPrimary", val)}
                onCopy={() => copyToClipboard(customColors.textPrimary, "textPrimary")}
                copied={copiedField === "textPrimary"}
              />
              <ColorPickerGroup
                label="BG Primary"
                value={customColors.bgPrimary}
                onChange={(val) => handleColorChange("bgPrimary", val)}
                onCopy={() => copyToClipboard(customColors.bgPrimary, "bgPrimary")}
                copied={copiedField === "bgPrimary"}
              />
              <ColorPickerGroup
                label="Accent"
                value={customColors.accent}
                onChange={(val) => handleColorChange("accent", val)}
                onCopy={() => copyToClipboard(customColors.accent, "accent")}
                copied={copiedField === "accent"}
              />
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "var(--theme-bgSecondary)", borderLeft: `4px solid var(--theme-secondary)` }}>
            <p className="text-xs" style={{ color: "var(--theme-textSecondary)" }}>
              💡 <strong>Les modifications s'appliquent automatiquement en temps réel!</strong> Tous les changements sont sauvegardés dans votre navigateur.
            </p>
          </div>
        </div>

        {/* Aperçu en Direct */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-soft-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--theme-textPrimary)" }}>
            Aperçu en Direct
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Preview */}
            <div
              className="p-6 rounded-lg text-white text-center font-bold transition-all duration-300"
              style={{ backgroundColor: "var(--theme-primary)" }}
            >
              Couleur Primaire
              <p className="text-xs mt-2 opacity-80">{theme.primary}</p>
            </div>

            {/* Secondary Preview */}
            <div
              className="p-6 rounded-lg text-white text-center font-bold transition-all duration-300"
              style={{ backgroundColor: "var(--theme-secondary)" }}
            >
              Couleur Secondaire
              <p className="text-xs mt-2 opacity-80">{theme.secondary}</p>
            </div>

            {/* Text Preview */}
            <div
              className="p-6 rounded-lg text-center font-bold border-2 transition-all duration-300"
              style={{
                backgroundColor: "var(--theme-bgPrimary)",
                color: "var(--theme-textPrimary)",
                borderColor: "var(--theme-borderColor)",
              }}
            >
              Texte Principal
              <p className="text-xs mt-2">{theme.textPrimary}</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "var(--theme-bgSecondary)", borderColor: "var(--theme-borderColor)", borderWidth: "1px" }}>
            <p className="text-sm" style={{ color: "var(--theme-textSecondary)" }}>
              🎨 Les changements s'appliquent immédiatement à tout le site. Rechargez pour voir les changements sur d'autres pages.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Composant réutilisable pour un sélecteur de couleur
 */
function ColorPickerGroup({
  label,
  value,
  onChange,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-12 rounded cursor-pointer border-2"
        style={{ borderColor: "var(--theme-borderColor)" }}
      />
      <div className="flex-1">
        <p className="text-xs font-mono text-gray-500">{label}</p>
        <p className="text-sm font-mono font-bold">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="p-2 rounded hover:opacity-70 transition-all"
        style={{ color: "var(--theme-primary)" }}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

