"use client";

import { useEffect, useState, type ReactNode } from "react";
import { X, Save, Image as ImageIcon, Trash2, Upload, Plus } from "lucide-react";
import type { ContentConfig, HeroContent, CountdownContent, ProgramContent, FeatureContent, TestimonialContent, ProgrammePageContent } from "@/lib/content";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { useToast } from "@/context/ToastContext";

type EditableSection = keyof ContentConfig;

interface ContentEditorModalProps {
  section: EditableSection;
  value: ContentConfig[EditableSection];
  onClose: () => void;
  onSave: (value: ContentConfig[EditableSection]) => void | Promise<void>;
}

const labels: Record<EditableSection, string> = {
  hero: "Hero Section",
  countdown: "Compte à Rebours",
  program: "Program Slider",
  features: "Fonctionnalités",
  menuHeader: "En-tête Menu",
  testimonials: "Témoignages",
  regulation: "Règlement Accueil",
  programmePage: "Timeline Programme",
};

export function ContentEditorModal({ section, value, onClose, onSave }: ContentEditorModalProps) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState("");
  const [heroDraft, setHeroDraft] = useState<HeroContent | null>(section === "hero" ? value as HeroContent : null);
  const [sectionDraft, setSectionDraft] = useState<ContentConfig[EditableSection]>(value);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadingTestimonialIndex, setUploadingTestimonialIndex] = useState<number | null>(null);
  const preview: ContentConfig[EditableSection] = section === "hero" && heroDraft ? heroDraft : sectionDraft;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const handleSave = async () => {
    if (section === "hero" && heroDraft) {
      try {
        await onSave(heroDraft);
        showToast("Composant enregistré pour tous les utilisateurs", "success");
        onClose();
      } catch {
        showToast("Échec de la sauvegarde du composant", "error");
        setError("La sauvegarde Firebase a échoué. Vérifie les règles Firestore.");
      }
      return;
    }
    try {
      await onSave(sectionDraft);
      showToast("Composant enregistré pour tous les utilisateurs", "success");
      onClose();
    } catch {
      showToast("Échec de la sauvegarde du composant", "error");
      setError("La sauvegarde Firebase a échoué. Vérifie les règles Firestore.");
    }
  };

  const updateHero = (patch: Partial<HeroContent>) => {
    setHeroDraft((current) => current ? { ...current, ...patch } : current);
  };

  const updateHeroImage = (index: number, url: string) => {
    if (!heroDraft) return;
    const images = [...heroDraft.images];
    images[index] = url;
    updateHero({ images });
  };

  const removeHeroImage = (index: number) => {
    if (!heroDraft) return;
    updateHero({ images: heroDraft.images.filter((_, imageIndex) => imageIndex !== index) });
  };

  const addHeroImage = () => updateHero({ images: [...(heroDraft?.images || []), ""] });

  const uploadHeroImage = async (index: number, file: File) => {
    setUploadingIndex(index);
    setError("");
    try {
      const result = await uploadImageToCloudinary(file, "events");
      updateHeroImage(index, result.secure_url);
    } catch {
      setError("Impossible d'envoyer cette image. Vérifie la configuration Cloudinary.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const updateSectionDraft = (patch: Record<string, unknown>) => {
    setSectionDraft((current) => ({ ...current, ...patch }) as ContentConfig[EditableSection]);
  };

  const updateProgramStep = (index: number, patch: Record<string, unknown>) => {
    const program = sectionDraft as ProgramContent;
    setSectionDraft({ ...program, steps: program.steps.map((step, stepIndex) => stepIndex === index ? { ...step, ...patch } : step) });
  };

  const addProgramStep = () => {
    const program = sectionDraft as ProgramContent;
    setSectionDraft({ ...program, steps: [...program.steps, { time: "20H00", title: "Nouvelle étape", desc: "Description", badge: "Nouveau", icon: "clock" }] });
  };

  const removeProgramStep = (index: number) => {
    const program = sectionDraft as ProgramContent;
    setSectionDraft({ ...program, steps: program.steps.filter((_, stepIndex) => stepIndex !== index) });
  };

  const updateFeature = (index: number, patch: Partial<FeatureContent>) => {
    const features = sectionDraft as FeatureContent[];
    setSectionDraft(features.map((feature, featureIndex) => featureIndex === index ? { ...feature, ...patch } : feature));
  };

  const addFeature = () => setSectionDraft([...(sectionDraft as FeatureContent[]), { title: "Nouvelle fonctionnalité", desc: "Description", badge: "Nouveau", tone: "primary" }]);
  const removeFeature = (index: number) => setSectionDraft((sectionDraft as FeatureContent[]).filter((_, featureIndex) => featureIndex !== index));

  const updateTestimonial = (index: number, patch: Partial<TestimonialContent>) => {
    const testimonials = sectionDraft as TestimonialContent[];
    setSectionDraft(testimonials.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  };

  const addTestimonial = () => setSectionDraft([...(sectionDraft as TestimonialContent[]), { id: `testimonial-${Date.now()}`, name: "Nouveau témoignage", promo: "Ancien élève", text: "Votre témoignage", rating: 5 }]);
  const removeTestimonial = (index: number) => setSectionDraft((sectionDraft as TestimonialContent[]).filter((_, itemIndex) => itemIndex !== index));

  const updateProgrammePage = (patch: Partial<ProgrammePageContent>) => setSectionDraft((current) => ({ ...(current as ProgrammePageContent), ...patch }));
  const updateProgrammeItem = (index: number, patch: Partial<ProgrammePageContent["items"][number]>) => {
    const page = sectionDraft as ProgrammePageContent;
    setSectionDraft({ ...page, items: page.items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) });
  };
  const addProgrammeItem = () => {
    const page = sectionDraft as ProgrammePageContent;
    setSectionDraft({ ...page, items: [...page.items, { id: `item-${Date.now()}`, time: "20H00", title: "Nouvelle activité", category: "Animation", description: "Description", iconName: "Clock" }] });
  };
  const removeProgrammeItem = (index: number) => setSectionDraft({ ...(sectionDraft as ProgrammePageContent), items: (sectionDraft as ProgrammePageContent).items.filter((_, itemIndex) => itemIndex !== index) });

  const uploadTestimonialImage = async (index: number, file: File) => {
    setUploadingTestimonialIndex(index);
    setError("");
    try {
      const result = await uploadImageToCloudinary(file, "testimonials");
      updateTestimonial(index, { image: result.secure_url });
    } catch {
      setError("Impossible d'envoyer la photo du témoignage.");
    } finally {
      setUploadingTestimonialIndex(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="flex h-[95vh] max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border-2 shadow-2xl" style={{ backgroundColor: "var(--theme-bgPrimary)", borderColor: "var(--theme-borderColor)" }}>
        <header className="flex items-center justify-between gap-4 border-b p-4 sm:p-6" style={{ borderColor: "var(--theme-borderColor)" }}>
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "var(--theme-secondary)" }}>Éditeur de contenu</p>
            <h2 className="text-xl font-black" style={{ color: "var(--theme-textPrimary)" }}>{labels[section]}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-lg p-2 transition-opacity hover:opacity-70" style={{ color: "var(--theme-textPrimary)" }}><X className="h-5 w-5" /></button>
        </header>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:grid-cols-2">
          <div className="space-y-4">
            {section === "hero" && heroDraft ? (
              <>
                <label className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Textes du Hero</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["badge", "capacity", "title", "subtitle", "primaryCta", "secondaryCta", "gamesCta"] as const).map((field) => (
                    <label key={field} className={field === "subtitle" ? "sm:col-span-2" : ""}>
                      <span className="mb-1 block text-[10px] font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{field}</span>
                      {field === "subtitle" ? <textarea value={heroDraft[field]} onChange={(event) => updateHero({ [field]: event.target.value })} className="min-h-20 w-full rounded-lg border-2 p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }} /> : <input value={heroDraft[field]} onChange={(event) => updateHero({ [field]: event.target.value })} className="w-full rounded-lg border-2 p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }} />}
                    </label>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between"><label className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Images du Hero</label><button type="button" onClick={addHeroImage} className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-primary)" }}><Plus className="h-4 w-4" /> Ajouter</button></div>
                  {heroDraft.images.map((image, index) => <div key={`${index}-${image}`} className="rounded-xl border-2 p-3" style={{ borderColor: "var(--theme-borderColor)" }}><div className="mb-2 flex items-center justify-between"><span className="text-xs font-bold" style={{ color: "var(--theme-textPrimary)" }}>Image {index + 1}</span><button type="button" onClick={() => removeHeroImage(index)} aria-label="Supprimer l'image" className="p-1" style={{ color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div><div className="flex flex-col gap-2 sm:flex-row"><input value={image} onChange={(event) => updateHeroImage(index, event.target.value)} placeholder="URL de l'image" className="min-w-0 flex-1 rounded-lg border-2 p-2 text-xs" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }} /><label className="flex cursor-pointer items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-white" style={{ backgroundColor: "var(--theme-secondary)" }}><Upload className="h-3.5 w-3.5" /> {uploadingIndex === index ? "Envoi..." : "Uploader"}<input type="file" accept="image/*" className="hidden" disabled={uploadingIndex !== null} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadHeroImage(index, file); event.target.value = ""; }} /></label></div>{image && <img src={image} alt={`Aperçu image ${index + 1}`} className="mt-2 h-24 w-full rounded-lg object-cover" />}</div>)}
                  {heroDraft.images.length === 0 && <p className="rounded-lg border border-dashed p-4 text-center text-xs" style={{ borderColor: "var(--theme-borderColor)", color: "var(--theme-textSecondary)" }}>Aucune image. Ajoute une image ou une URL.</p>}
                </div>
              </>
            ) : section === "countdown" ? (
              <StructuredFields title="Textes du compte à rebours">
                <Field label="Badge" value={(sectionDraft as CountdownContent).badge} onChange={(value) => updateSectionDraft({ badge: value })} />
                <Field label="Titre" value={(sectionDraft as CountdownContent).title} onChange={(value) => updateSectionDraft({ title: value })} />
                <Field label="Mot mis en avant" value={(sectionDraft as CountdownContent).highlight} onChange={(value) => updateSectionDraft({ highlight: value })} />
                <Field label="Date cible" type="datetime-local" value={toDateTimeLocal((sectionDraft as CountdownContent).targetDate)} onChange={(value) => updateSectionDraft({ targetDate: new Date(value).toISOString() })} />
                <TextAreaField label="Description" value={(sectionDraft as CountdownContent).description} onChange={(value) => updateSectionDraft({ description: value })} />
              </StructuredFields>
            ) : section === "program" ? (
              <div className="space-y-4"><StructuredFields title="En-tête du programme"><Field label="Badge" value={(sectionDraft as ProgramContent).eyebrow} onChange={(value) => updateSectionDraft({ eyebrow: value })} /><Field label="Titre" value={(sectionDraft as ProgramContent).title} onChange={(value) => updateSectionDraft({ title: value })} /><Field label="Mot mis en avant" value={(sectionDraft as ProgramContent).accent} onChange={(value) => updateSectionDraft({ accent: value })} /></StructuredFields><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Étapes du programme</span><button type="button" onClick={addProgramStep} className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-primary)" }}><Plus className="h-4 w-4" /> Ajouter</button></div>{(sectionDraft as ProgramContent).steps.map((step, index) => <div key={`${index}-${step.time}`} className="space-y-3 rounded-xl border-2 p-3" style={{ borderColor: "var(--theme-borderColor)" }}><div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: "var(--theme-textPrimary)" }}>Étape {index + 1}</span><button type="button" onClick={() => removeProgramStep(index)} aria-label="Supprimer l'étape" style={{ color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-3 sm:grid-cols-2"><Field label="Horaire" value={step.time} onChange={(value) => updateProgramStep(index, { time: value })} /><Field label="Badge" value={step.badge} onChange={(value) => updateProgramStep(index, { badge: value })} /><Field label="Titre" value={step.title} onChange={(value) => updateProgramStep(index, { title: value })} /><SelectField label="Icône" value={step.icon} options={["clock", "utensils", "award", "party"]} onChange={(value) => updateProgramStep(index, { icon: value })} /><TextAreaField label="Description" value={step.desc} onChange={(value) => updateProgramStep(index, { desc: value })} /></div></div>)}</div>
            ) : section === "features" ? (
              <div className="space-y-4"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Cartes de fonctionnalités</span><button type="button" onClick={addFeature} className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-primary)" }}><Plus className="h-4 w-4" /> Ajouter</button></div>{(sectionDraft as FeatureContent[]).map((feature, index) => <div key={`${index}-${feature.title}`} className="space-y-3 rounded-xl border-2 p-3" style={{ borderColor: "var(--theme-borderColor)" }}><div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: "var(--theme-textPrimary)" }}>Carte {index + 1}</span><button type="button" onClick={() => removeFeature(index)} aria-label="Supprimer la carte" style={{ color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div><Field label="Titre" value={feature.title} onChange={(value) => updateFeature(index, { title: value })} /><TextAreaField label="Description" value={feature.desc} onChange={(value) => updateFeature(index, { desc: value })} /><div className="grid gap-3 sm:grid-cols-2"><Field label="Badge" value={feature.badge} onChange={(value) => updateFeature(index, { badge: value })} /><SelectField label="Couleur" value={feature.tone} options={["primary", "secondary", "accent", "danger"]} onChange={(value) => updateFeature(index, { tone: value as FeatureContent["tone"] })} /></div></div>)}</div>
            ) : section === "testimonials" ? (
              <div className="space-y-4"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Témoignages</span><button type="button" onClick={addTestimonial} className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-primary)" }}><Plus className="h-4 w-4" /> Ajouter</button></div>{(sectionDraft as TestimonialContent[]).map((item, index) => <div key={item.id} className="space-y-3 rounded-xl border-2 p-3" style={{ borderColor: "var(--theme-borderColor)" }}><div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: "var(--theme-textPrimary)" }}>Témoignage {index + 1}</span><button type="button" onClick={() => removeTestimonial(index)} aria-label="Supprimer le témoignage" style={{ color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-3 sm:grid-cols-2"><Field label="Nom" value={item.name} onChange={(value) => updateTestimonial(index, { name: value })} /><Field label="Promotion" value={item.promo} onChange={(value) => updateTestimonial(index, { promo: value })} /><Field label="Note (1 à 5)" type="number" value={String(item.rating)} onChange={(value) => updateTestimonial(index, { rating: Math.min(5, Math.max(1, Number(value) || 1)) })} /><Field label="Image (URL)" value={item.image || ""} onChange={(value) => updateTestimonial(index, { image: value })} /><label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white" style={{ backgroundColor: "var(--theme-secondary)" }}><Upload className="h-4 w-4" />{uploadingTestimonialIndex === index ? "Envoi..." : "Uploader une photo"}<input type="file" accept="image/*" className="hidden" disabled={uploadingTestimonialIndex !== null} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadTestimonialImage(index, file); event.target.value = ""; }} /></label><TextAreaField label="Témoignage" value={item.text} onChange={(value) => updateTestimonial(index, { text: value })} /></div></div>)}</div>
            ) : section === "menuHeader" ? (
              <StructuredFields title="En-tête du menu"><Field label="Badge" value={(sectionDraft as ContentConfig["menuHeader"]).badge} onChange={(value) => updateSectionDraft({ badge: value })} /><Field label="Titre" value={(sectionDraft as ContentConfig["menuHeader"]).title} onChange={(value) => updateSectionDraft({ title: value })} /><Field label="Mot mis en avant" value={(sectionDraft as ContentConfig["menuHeader"]).accent} onChange={(value) => updateSectionDraft({ accent: value })} /><TextAreaField label="Description" value={(sectionDraft as ContentConfig["menuHeader"]).description} onChange={(value) => updateSectionDraft({ description: value })} /></StructuredFields>
            ) : section === "regulation" ? (
              <StructuredFields title="Bloc Règlement"><Field label="Titre" value={(sectionDraft as ContentConfig["regulation"]).title} onChange={(value) => updateSectionDraft({ title: value })} /><Field label="Texte mis en avant" value={(sectionDraft as ContentConfig["regulation"]).highlight} onChange={(value) => updateSectionDraft({ highlight: value })} /><Field label="Libellé du bouton" value={(sectionDraft as ContentConfig["regulation"]).buttonLabel} onChange={(value) => updateSectionDraft({ buttonLabel: value })} /><TextAreaField label="Description" value={(sectionDraft as ContentConfig["regulation"]).description} onChange={(value) => updateSectionDraft({ description: value })} /></StructuredFields>
            ) : section === "programmePage" ? (
              <div className="space-y-4"><StructuredFields title="En-tête Timeline"><Field label="Badge" value={(sectionDraft as ProgrammePageContent).eyebrow} onChange={(value) => updateProgrammePage({ eyebrow: value })} /><Field label="Titre" value={(sectionDraft as ProgrammePageContent).title} onChange={(value) => updateProgrammePage({ title: value })} /><Field label="Mot mis en avant" value={(sectionDraft as ProgrammePageContent).accent} onChange={(value) => updateProgrammePage({ accent: value })} /><TextAreaField label="Description" value={(sectionDraft as ProgrammePageContent).description} onChange={(value) => updateProgrammePage({ description: value })} /></StructuredFields><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Activités</span><button type="button" onClick={addProgrammeItem} className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-primary)" }}><Plus className="h-4 w-4" /> Ajouter</button></div>{(sectionDraft as ProgrammePageContent).items.map((item, index) => <div key={item.id} className="space-y-3 rounded-xl border-2 p-3" style={{ borderColor: "var(--theme-borderColor)" }}><div className="flex items-center justify-between"><span className="text-xs font-bold">Activité {index + 1}</span><button type="button" onClick={() => removeProgrammeItem(index)} style={{ color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-3 sm:grid-cols-2"><Field label="Horaire" value={item.time} onChange={(value) => updateProgrammeItem(index, { time: value })} /><Field label="Catégorie" value={item.category} onChange={(value) => updateProgrammeItem(index, { category: value })} /><Field label="Titre" value={item.title} onChange={(value) => updateProgrammeItem(index, { title: value })} /><Field label="Icône" value={item.iconName} onChange={(value) => updateProgrammeItem(index, { iconName: value })} /><TextAreaField label="Description" value={item.description} onChange={(value) => updateProgrammeItem(index, { description: value })} /></div></div>)}</div>
            ) : null}
            {error && <p className="text-xs font-bold" style={{ color: "var(--theme-danger)" }}>{error}</p>}
            <p className="text-xs" style={{ color: "var(--theme-textSecondary)" }}>Les champs texte, les URLs d&apos;images et les listes sont modifiables ici. Le bouton Enregistrer publie la section pour tous les utilisateurs.</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>Aperçu</label>
            <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: "var(--theme-bgSecondary)", borderColor: "var(--theme-borderColor)" }}>
              {section === "hero" && typeof preview === "object" && preview !== null && "images" in preview && (
                <div className="space-y-4">
                  <div className="relative h-40 overflow-hidden rounded-xl" style={{ backgroundColor: "var(--theme-primary)" }}>
                    {preview.images[0] ? <img src={preview.images[0]} alt="Aperçu Hero" className="h-full w-full object-cover opacity-70" /> : <ImageIcon className="absolute inset-0 m-auto h-10 w-10 text-white" />}
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-xl font-black text-white">{preview.title}</div>
                  </div>
                  <p className="text-sm" style={{ color: "var(--theme-textSecondary)" }}>{preview.subtitle}</p>
                </div>
              )}
              {section === "countdown" && typeof preview === "object" && preview !== null && "targetDate" in preview && (
                <div className="space-y-3 text-center"><span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold" style={{ backgroundColor: "var(--theme-primary)", color: "white" }}>{preview.badge}</span><h3 className="text-2xl font-black" style={{ color: "var(--theme-primary)" }}>{preview.title}</h3><p className="text-sm" style={{ color: "var(--theme-textSecondary)" }}>{preview.description}</p><p className="font-mono text-xs" style={{ color: "var(--theme-secondary)" }}>{preview.targetDate}</p></div>
              )}
              {section === "program" && typeof preview === "object" && preview !== null && "steps" in preview && (
                <div className="space-y-3"><h3 className="text-xl font-black" style={{ color: "var(--theme-textPrimary)" }}>{preview.title}</h3>{preview.steps.slice(0, 3).map((step) => <div key={step.time} className="rounded-xl border p-3" style={{ borderColor: "var(--theme-borderColor)" }}><strong className="text-xs" style={{ color: "var(--theme-primary)" }}>{step.time}</strong><p className="text-sm font-bold" style={{ color: "var(--theme-textPrimary)" }}>{step.title}</p></div>)}</div>
              )}
              {section === "features" && Array.isArray(preview) && <div className="grid gap-3 sm:grid-cols-3">{(preview as FeatureContent[]).map((item) => <div key={item.title} className="rounded-xl border p-3" style={{ borderColor: "var(--theme-borderColor)" }}><strong className="text-sm" style={{ color: "var(--theme-textPrimary)" }}>{item.title}</strong><p className="mt-1 text-xs" style={{ color: "var(--theme-textSecondary)" }}>{item.desc}</p></div>)}</div>}
              {section === "testimonials" && Array.isArray(preview) && <div className="space-y-3">{(preview as TestimonialContent[]).map((item) => <div key={item.id} className="rounded-xl border p-3" style={{ borderColor: "var(--theme-borderColor)" }}>{item.image && <img src={item.image} alt={item.name} className="mb-2 h-16 w-16 rounded-full object-cover" />}<strong className="text-sm" style={{ color: "var(--theme-textPrimary)" }}>{item.name}</strong><p className="text-xs" style={{ color: "var(--theme-textSecondary)" }}>{item.text}</p></div>)}</div>}
              {section === "menuHeader" && typeof preview === "object" && preview !== null && "description" in preview && "badge" in preview && <div className="space-y-3 text-center"><span className="text-xs font-bold" style={{ color: "var(--theme-secondary)" }}>{preview.badge}</span><h3 className="text-2xl font-black" style={{ color: "var(--theme-textPrimary)" }}>{preview.title}</h3><p className="text-sm" style={{ color: "var(--theme-textSecondary)" }}>{preview.description}</p></div>}
            </div>
          </div>
        </div>

        <footer className="flex justify-end gap-3 border-t p-4 sm:p-6" style={{ borderColor: "var(--theme-borderColor)" }}>
          <button type="button" onClick={onClose} className="rounded-lg border-2 px-4 py-2 text-xs font-bold uppercase" style={{ color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }}>Annuler</button>
          <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase text-white" style={{ backgroundColor: "var(--theme-primary)" }}><Save className="h-4 w-4" /> Enregistrer</button>
        </footer>
      </div>
    </div>
  );
}

function StructuredFields({ title, children }: { title: string; children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2"><div className="sm:col-span-2"><label className="text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{title}</label></div>{children}</div>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label><span className="mb-1 block text-[10px] font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border-2 p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }} /></label>;
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="sm:col-span-2"><span className="mb-1 block text-[10px] font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-20 w-full rounded-lg border-2 p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }} /></label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label><span className="mb-1 block text-[10px] font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border-2 p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)", borderColor: "var(--theme-borderColor)" }}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}
