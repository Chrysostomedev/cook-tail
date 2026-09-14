// app/admin/components/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useVisibility, type ComponentVisibility } from "@/context/VisibilityContext";
import { Eye, EyeOff, RotateCcw, Search, Zap } from "lucide-react";
import { Edit3 } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { ContentEditorModal } from "@/components/admin/ContentEditorModal";
import type { ContentConfig } from "@/lib/content";

type EditableSection = keyof ContentConfig;

interface ComponentGroup {
  name: string;
  components: {
    id: string;
    label: string;
    description: string;
  }[];
}

export default function ComponentsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSection, setEditingSection] = useState<EditableSection | null>(null);
  
  let visibilityContext: any = null;
  try {
    visibilityContext = useVisibility();
  } catch (e) {
    // Context not available
  }
  const { content, updateSection } = useContent();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visibilityContext) {
    return <div style={{ padding: "2rem", color: "var(--theme-textPrimary)" }}>Chargement...</div>;
  }

  const { visibility, toggleComponent, resetVisibility } = visibilityContext;

 const contentSectionMap: Record<string, EditableSection> = {
  "home.hero": "hero",
  "home.countdown": "countdown",
  "home.features": "features",
  "home.program": "program",
  "home.testimonials": "testimonials",
  "home.cta": "regulation",
  "programme.timeline": "programmePage",
  "menu.header": "menuHeader",
  "footer.main": "footer", // ← ajouté
};

  const componentGroups: ComponentGroup[] = [
    {
      name: "Accueil",
      // icon: Zap,
      components: [
        { id: "home.hero", label: "Hero Section", description: "Bannière principale avec logo et CTA" },
        { id: "home.countdown", label: "Compte à Rebours", description: "Minuteur avant fermeture des inscriptions" },
        { id: "home.features", label: "Fonctionnalités", description: "Cartes des 3 fonctionnalités principales" },
        { id: "home.program", label: "Programme Slider", description: "Carrousel du déroulement de la journée" },
        { id: "home.testimonials", label: "Témoignages", description: "Avis des anciens élèves" },
        { id: "home.cta", label: "Call-to-Action", description: "Section finale avec règlement & réservation" },
      ],
    },
    {
  name: "Footer",
  components: [
    { id: "footer.main", label: "Pied de page", description: "Textes, contacts, réseaux sociaux et paiement du footer" },
  ],
},
    {
      name: "Pages Secondaires",
      // icon: Eye,
      components: [
        { id: "programme.header", label: "En-tête Programme", description: "Titre et description du programme" },
        { id: "programme.timeline", label: "Timeline", description: "Timeline chronologique des événements" },
        { id: "menu.header", label: "En-tête Menu", description: "Titre et description du menu" },
        { id: "menu.categories", label: "Catégories Menu", description: "Grille des plats et cocktails" },
        { id: "services.header", label: "En-tête Services", description: "Titre et description des services" },
        { id: "services.cards", label: "Cartes Services", description: "Grille des prestations disponibles" },
        { id: "galerie.header", label: "En-tête Galerie", description: "Titre et description de la galerie" },
        { id: "galerie.gallery", label: "Galerie Photos", description: "Grille des photos" },
      ],
    },
    {
      name: "Onglets de navigation",
      components: [
        { id: "nav.accueil", label: "Onglet Accueil", description: "Afficher ou masquer Accueil sur mobile" },
        { id: "nav.programme", label: "Onglet Programme", description: "Afficher ou masquer Programme" },
        { id: "nav.menu", label: "Onglet Menu", description: "Afficher ou masquer Menu" },
        { id: "nav.mon-pass", label: "Onglet Mon pass", description: "Afficher ou masquer Mon pass" },
        { id: "nav.services", label: "Onglet Services", description: "Afficher ou masquer Services" },
        { id: "nav.contact", label: "Onglet Contact", description: "Afficher ou masquer Contact" },
        { id: "nav.galerie", label: "Onglet Galerie", description: "Afficher ou masquer Galerie" },
        { id: "nav.jeux", label: "Onglet Jeux", description: "Afficher ou masquer Jeux" },
        { id: "nav.profil", label: "Onglet Profil", description: "Afficher ou masquer Profil" },
        { id: "nav.about", label: "Onglet À propos", description: "Afficher ou masquer À propos" },
      ],
    },
    {
      name: "Formulaires & Contact",
      // icon: Eye,
      components: [
        { id: "contact.header", label: "En-tête Contact", description: "Titre et description du contact" },
        { id: "contact.form", label: "Formulaire Contact", description: "Formulaire de demande de devis" },
        { id: "contact.info", label: "Infos Contact", description: "Coordonnées et horaires" },
        { id: "reservation.form", label: "Formulaire Réservation", description: "Formulaire 3 étapes de réservation" },
      ],
    },
    {
      name: "Pages Légales & Profil",
      // icon: Eye,
      components: [
        { id: "about.header", label: "En-tête À Propos", description: "Titre et description" },
        { id: "about.content", label: "Contenu À Propos", description: "Texte et informations" },
        { id: "reglement.header", label: "En-tête Règlement", description: "Titre du règlement" },
        { id: "reglement.content", label: "Contenu Règlement", description: "Texte du règlement" },
        { id: "cgu.header", label: "En-tête CGU", description: "Titre des CGU" },
        { id: "cgu.content", label: "Contenu CGU", description: "Texte des CGU" },
        { id: "profil.header", label: "En-tête Profil", description: "Titre du profil utilisateur" },
        { id: "profil.content", label: "Contenu Profil", description: "Informations du profil" },
      ],
    },
  ];

  // Filtrer les composants par recherche
  const filteredGroups = componentGroups.map((group) => ({
    ...group,
    components: group.components.filter(
      (comp) =>
        comp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  // Compter les composants visibles et masqués
  const visibleCount = Object.values(visibility).filter((v) => v).length;
  const hiddenCount = Object.values(visibility).filter((v) => !v).length;
  const navigationTabs = [
    ["nav.accueil", "Accueil"],
    ["nav.programme", "Programme"],
    ["nav.menu", "Menu"],
    ["nav.mon-pass", "Mon pass"],
    ["nav.services", "Services"],
    ["nav.contact", "Contact"],
    ["nav.galerie", "Galerie"],
    ["nav.jeux", "Jeux"],
    ["nav.profil", "Profil"],
    ["nav.about", "À propos"],
  ] as const;
  const activeNavigationTabs = navigationTabs.filter(([id]) => visibility[id] !== false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black uppercase" style={{ color: "var(--theme-textPrimary)" }}>
          Gestionnaire de Composants
        </h1>
        <p style={{ color: "var(--theme-textSecondary)" }} className="text-sm">
          Masquez/affichez les sections et composants de l'interface publique en temps réel
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 flex items-center justify-between" style={{ backgroundColor: "var(--theme-bgSecondary)", borderColor: "var(--theme-borderColor)" }}>
          <div>
            <p className="text-xs font-mono font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>
              Total Composants
            </p>
            <p className="text-2xl font-black" style={{ color: "var(--theme-textPrimary)" }}>
              {Object.keys(visibility).length}
            </p>
          </div>
          <div className="text-3xl opacity-50"></div>
        </div>

     

        <div className="p-4 rounded-lg border-2 flex items-center justify-between" style={{ backgroundColor: `var(--theme-danger)20`, borderColor: "var(--theme-danger)" }}>
          <div>
            <p className="text-xs font-mono font-bold uppercase text-red-700">
              Composants Masqués
            </p>
            <p className="text-2xl font-black text-red-700">
              {hiddenCount}
            </p>
          </div>
          <EyeOff className="w-8 h-8 text-red-700 opacity-70" />
        </div>

        <div className="md:col-span-2 rounded-lg border-2 p-4" style={{ backgroundColor: "var(--theme-bgSecondary)", borderColor: "var(--theme-secondary)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>
                Onglets actifs
              </p>
              <p className="mt-1 text-2xl font-black" style={{ color: "var(--theme-textPrimary)" }}>
                {activeNavigationTabs.length}
              </p>
            </div>
            <Eye className="h-8 w-8 opacity-60" style={{ color: "var(--theme-secondary)" }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeNavigationTabs.map(([id, label]) => (
              <span key={id} className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase" style={{ backgroundColor: "var(--theme-secondary)", color: "white" }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Rechercher un composant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-all"
          style={{
            backgroundColor: "var(--theme-bgSecondary)",
            borderColor: "var(--theme-borderColor)",
            color: "var(--theme-textPrimary)",
          }}
        />
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <button
          onClick={resetVisibility}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm uppercase transition-all border-2"
          style={{
            backgroundColor: "transparent",
            color: "var(--theme-textPrimary)",
            borderColor: "var(--theme-borderColor)",
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Réinitialiser Tous
        </button>
      </div>

      {/* Component Groups */}
      <div className="space-y-8">
        {filteredGroups.map((group) => {
          if (group.components.length === 0) return null;

          return (
            <div key={group.name} className="space-y-4">
              {/* Group Header */}
              <div className="flex items-center gap-3 pb-3 border-b-2" style={{ borderColor: "var(--theme-borderColor)" }}>
                <h2 className="text-lg font-bold" style={{ color: "var(--theme-textPrimary)" }}>
                  {group.name}
                </h2>
                <span className="ml-auto text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textSecondary)" }}>
                  {group.components.length} composant(s)
                </span>
              </div>

              {/* Component Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.components.map((component) => {
                  const isVisible = visibility[component.id] !== false;

                  return (
                    <div
                      key={component.id}
                      className="p-4 rounded-lg border-2 transition-all hover:shadow-md"
                      style={{
                        backgroundColor: "var(--theme-bgPrimary)",
                        borderColor: isVisible ? "var(--theme-secondary)" : "var(--theme-danger)",
                      }}
                    >
                      {/* Component Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm" style={{ color: "var(--theme-textPrimary)" }}>
                            {component.label}
                          </h3>
                          <p className="text-xs mt-1" style={{ color: "var(--theme-textSecondary)" }}>
                            {component.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <button
                          onClick={() => toggleComponent(component.id)}
                          className="py-2 px-3 rounded-lg font-bold text-sm uppercase flex items-center justify-center gap-2 transition-all border border-transparent"
                          style={{ backgroundColor: isVisible ? "var(--theme-secondary)" : "var(--theme-danger)", color: "white" }}
                        >
                          {isVisible ? <><Eye className="w-4 h-4" /> Visible</> : <><EyeOff className="w-4 h-4" /> Masqué</>}
                        </button>
                        {contentSectionMap[component.id] && (
                          <button
                            onClick={() => setEditingSection(contentSectionMap[component.id])}
                            className="flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-bold uppercase"
                            style={{ color: "var(--theme-primary)", borderColor: "var(--theme-primary)" }}
                          >
                            <Edit3 className="h-4 w-4" /> Modifier
                          </button>
                        )}
                      </div>

                      {/* Status Indicator */}
                      <div className="mt-2 text-[10px] font-mono flex items-center gap-1" style={{ color: "var(--theme-textSecondary)" }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isVisible ? "var(--theme-secondary)" : "var(--theme-danger)" }} />
                        {isVisible ? "En ligne" : "Caché"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg border-2" style={{ backgroundColor: "var(--theme-accent)20", borderColor: "var(--theme-accent)", borderLeftWidth: "4px" }}>
        <p className="text-xs" style={{ color: "var(--theme-primary)" }}>
          <strong>Les modifications s'appliquent en direct!</strong> Vous pouvez masquer/afficher des composants sans rechargement de page. Les changements sont sauvegardés dans votre navigateur.
        </p>
      </div>

      {editingSection && (
        <ContentEditorModal
          section={editingSection}
          value={content[editingSection]}
          onClose={() => setEditingSection(null)}
          onSave={(value) => updateSection(editingSection, value)}
        />
      )}
    </div>
  );
}