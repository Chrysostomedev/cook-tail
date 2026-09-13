"use client";

import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { defaultContent, type ProgrammePageContent } from "@/lib/content";
import { useToast } from "@/context/ToastContext";

export default function AdminPagesPage() {
  const { content, updateSection } = useContent();
  const [page, setPage] = useState<"programme" | "about" | "contact">("programme");
  const [saved, setSaved] = useState(false);
  const [programmeDraft, setProgrammeDraft] = useState<ProgrammePageContent | null>(null);
  const { showToast } = useToast();
  const programme = programmeDraft ?? content?.programmePage ?? defaultContent.programmePage;

  const updateProgramme = (patch: Partial<ProgrammePageContent>) => {
    setProgrammeDraft({ ...programme, ...patch });
  };

  const updateItem = (index: number, patch: Partial<ProgrammePageContent["items"][number]>) => {
    updateProgramme({ items: programme.items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) });
  };

  const addItem = () => updateProgramme({ items: [...programme.items, { id: `p${Date.now()}`, time: "20H00", title: "Nouvelle activité", category: "Animation", description: "Description de l'activité", iconName: "Clock" }] });
  const removeItem = (index: number) => updateProgramme({ items: programme.items.filter((_, itemIndex) => itemIndex !== index) });

  const saveProgramme = async () => {
    try {
      await updateSection("programmePage", programme);
      setProgrammeDraft(programme);
      setSaved(true);
      showToast("Slider Programme enregistré", "success");
      window.setTimeout(() => setSaved(false), 1800);
    } catch (error) {
      console.error("Error saving programme page:", error);
      showToast("Erreur lors de l'enregistrement du Programme", "error");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase" style={{ color: "var(--theme-textPrimary)" }}>Pages</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--theme-textSecondary)" }}>Modifie la structure, les textes et les horaires des pages publiques.</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b-2 pb-3" style={{ borderColor: "var(--theme-borderColor)" }}>
        {(["programme", "about", "contact"] as const).map((pageName) => (
          <button key={pageName} type="button" onClick={() => setPage(pageName)} className="rounded-lg px-4 py-2 text-xs font-bold uppercase" style={{ backgroundColor: page === pageName ? "var(--theme-primary)" : "var(--theme-bgSecondary)", color: page === pageName ? "white" : "var(--theme-textPrimary)" }}>{pageName === "programme" ? "Programme" : pageName === "about" ? "A propos" : "Contact"}</button>
        ))}
      </div>

      {page !== "programme" ? (
        <div className="rounded-2xl border-2 p-6" style={{ borderColor: "var(--theme-borderColor)", backgroundColor: "var(--theme-bgSecondary)" }}>
          <h2 className="text-xl font-black" style={{ color: "var(--theme-textPrimary)" }}>Éditeur {page === "about" ? "À propos" : "Contact"}</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--theme-textSecondary)" }}>Cette page est préparée dans le registre Pages. Les champs structurés de cette page seront ajoutés avec son modèle dédié, sans modifier le contenu actuel.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="rounded-2xl border-2 p-5 sm:p-7" style={{ borderColor: "var(--theme-borderColor)", backgroundColor: "var(--theme-bgPrimary)" }}>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-black" style={{ color: "var(--theme-textPrimary)" }}>En-tête du Programme</h2><p className="text-xs" style={{ color: "var(--theme-textSecondary)" }}>Ces champs remplacent les textes codés en dur.</p></div><div className="flex items-center gap-3">{saved && <span className="text-xs font-bold" style={{ color: "var(--theme-secondary)" }}>Enregistré</span>}<button type="button" onClick={() => void saveProgramme()} className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase text-white" style={{ backgroundColor: "var(--theme-primary)" }}><Save className="h-4 w-4" /> Enregistrer les modifications</button></div></div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Badge" value={programme.eyebrow} onChange={(value) => updateProgramme({ eyebrow: value })} />
              <Field label="Titre" value={programme.title} onChange={(value) => updateProgramme({ title: value })} />
              <Field label="Mot accentué" value={programme.accent} onChange={(value) => updateProgramme({ accent: value })} />
              <label className="md:col-span-2"><span className="mb-1 block text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Description</span><textarea value={programme.description} onChange={(event) => updateProgramme({ description: event.target.value })} className="min-h-24 w-full rounded-lg border-2 p-3 text-sm" style={{ borderColor: "var(--theme-borderColor)", backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)" }} /></label>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between"><h2 className="text-xl font-black" style={{ color: "var(--theme-textPrimary)" }}>Horaires et activités</h2><button type="button" onClick={addItem} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white" style={{ backgroundColor: "var(--theme-primary)" }}><Plus className="h-4 w-4" /> Ajouter</button></div>
            {programme.items.map((item, index) => <article key={item.id} className="rounded-2xl border-2 p-5" style={{ borderColor: "var(--theme-borderColor)", backgroundColor: "var(--theme-bgPrimary)" }}><div className="mb-4 flex items-center justify-between"><span className="text-xs font-mono font-bold" style={{ color: "var(--theme-secondary)" }}>ACTIVITÉ {index + 1}</span><button type="button" onClick={() => removeItem(index)} aria-label="Supprimer cette activité" style={{ color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-4 md:grid-cols-2"><Field label="Heure" value={item.time} onChange={(value) => updateItem(index, { time: value })} /><Field label="Catégorie" value={item.category} onChange={(value) => updateItem(index, { category: value })} /><Field label="Titre" value={item.title} onChange={(value) => updateItem(index, { title: value })} /><Field label="Icône" value={item.iconName} onChange={(value) => updateItem(index, { iconName: value })} /><label className="md:col-span-2"><span className="mb-1 block text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Énoncé / Description</span><textarea value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} className="min-h-20 w-full rounded-lg border-2 p-3 text-sm" style={{ borderColor: "var(--theme-borderColor)", backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)" }} /></label></div></article>)}
          </section>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label><span className="mb-1 block text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border-2 p-3 text-sm" style={{ borderColor: "var(--theme-borderColor)", backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)" }} /></label>;
}
