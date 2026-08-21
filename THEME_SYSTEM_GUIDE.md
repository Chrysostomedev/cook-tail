# 🎨 Système de Thème Dynamique — Cook'Tail Service

**Date:** 21 Août 2026  
**Statut:** ✅ Implémenté & Prêt

---

## 📋 Vue d'ensemble

Le site utilise maintenant un **système de thème entièrement dynamique** qui :
- ✅ Utilise les couleurs **vert/magenta du logo Cook'Tail** par défaut
- ✅ Permet à l'admin de **changer les couleurs globales** sans code
- ✅ **Persiste les changements** dans `localStorage` du navigateur
- ✅ S'applique **instantanément** à tous les composants
- ✅ Inclut des **thèmes prédéfinis** (Default, Rétro, Dark, Minimal)

---

## 🏗️ Architecture

### 1. **Fichiers Créés**

#### `context/ThemeContext.tsx`
- Gère l'état global du thème avec React Context
- Fournit les hooks `useTheme()` pour tous les composants
- Sauvegarde/charge depuis `localStorage`
- Définit les presets (default, retro, dark, minimal)

```typescript
// Utilisation dans un composant:
const { theme, switchPreset, setTheme } = useTheme();
```

#### `app/globals-tokens.css`
- Définit les **variables CSS dynamiques** (`--theme-*`)
- Ces variables sont **mises à jour par ThemeContext**
- Format: `--theme-primary`, `--theme-secondary`, etc.

#### `app/admin/theme/page.tsx`
- Interface d'administration pour **changer les couleurs**
- Permet de :
  - Sélectionner des thèmes prédéfinis
  - Éditer les couleurs manuellement
  - Voir l'aperçu en direct
  - Appliquer et sauvegarder les changements
- URL: `/admin/theme`

#### `lib/fonts.ts` (Mis à jour)
- Importe les polices `Fraunces`, `Manrope`, `Space Mono`
- Exporte `fontVariables` pour le layout racine

#### `app/layout.tsx` (Mis à jour)
- Enveloppe l'app avec `<ThemeProvider>`
- Applique les variables de polices à `<body>`

### 2. **Composants Mis à Jour**

#### `components/home/HeroSection.tsx` ✅
- Utilise `--theme-primary`, `--theme-secondary`, etc.
- Boutons d'action adaptés aux couleurs du thème
- Indicateurs de slide colorés dynamiquement

#### `components/ui/Button.tsx` ✅
- Variants (primary, secondary, danger, ghost) utilise `--theme-*`
- Les couleurs changent en temps réel

### 3. **Tokens de Couleurs Disponibles**

```css
/* Couleurs Dynamiques */
--theme-primary           /* Magenta du logo (#EC4899 par défaut) */
--theme-primaryLight      /* Variante plus claire */
--theme-primaryDark       /* Variante plus foncée */

--theme-secondary         /* Vert du logo (#4ADE80 par défaut) */
--theme-secondaryLight    /* Variante plus claire */
--theme-secondaryDark     /* Variante plus foncée */

--theme-textPrimary       /* Couleur du texte principal */
--theme-textSecondary     /* Couleur du texte secondaire */
--theme-bgPrimary         /* Couleur du fond principal */
--theme-bgSecondary       /* Couleur du fond secondaire */

--theme-accent            /* Accent highlight (or/ambre) */
--theme-danger            /* Rouge pour les dangeurs *)
--theme-success           /* Vert pour le succès *)
--theme-borderColor       /* Couleur des bordures *)
--theme-shadowColor       /* Couleur des ombres rétro *)

/* Autres Tokens (Non-dynamiques mais disponibles) */
--ff-fraunces             /* Police Serif */
--ff-manrope              /* Police Sans-serif */
--ff-space-mono           /* Police Monospace */
--fs-*                    /* Tailles de police */
--sp-*                    /* Espacements *)
--radius-*                /* Rayons de bordure *)
--shadow-*                /* Ombres *)
```

---

## 🎯 Comment Utiliser le Thème dans Vos Composants

### Méthode 1: CSS Variables (Recommandée pour les styles simples)

```tsx
// Dans un composant React
<div style={{ color: "var(--theme-textPrimary)" }}>
  Texte coloré dynamiquement
</div>

<button style={{ backgroundColor: "var(--theme-primary)" }}>
  Bouton avec couleur du thème
</button>
```

### Méthode 2: Hook `useTheme()` (Pour la logique complexe)

```tsx
"use client";
import { useTheme } from "@/context/ThemeContext";

export default function MyComponent() {
  const { theme, currentPreset, switchPreset } = useTheme();
  
  return (
    <div style={{ color: theme.textPrimary }}>
      Préset actuel: {currentPreset}
    </div>
  );
}
```

### Exemple: Créer une Carte Colorée

```tsx
// components/cards/MyCard.tsx
"use client";

export const MyCard = ({ title, content }) => {
  return (
    <div style={{
      backgroundColor: "var(--theme-bgPrimary)",
      borderColor: "var(--theme-borderColor)",
      color: "var(--theme-textPrimary)",
      boxShadow: "var(--shadow-retro-md)",
      borderWidth: "2px",
      borderRadius: "12px",
      padding: "1.5rem"
    }}>
      <h3 style={{ color: "var(--theme-primary)" }}>{title}</h3>
      <p>{content}</p>
    </div>
  );
};
```

---

## 🎨 Les 4 Thèmes Prédéfinis

### 1. **Default** (Cook'Tail Branding)
- 🎯 **Par défaut**
- Primaire: Magenta `#EC4899` (Logo)
- Secondaire: Vert `#4ADE80` (Logo)
- Fond: Blanc `#FFFFFF`
- Texte: Gris foncé `#1F2937`

### 2. **Retro** (Bleu/Kaki Original)
- 🕰️ **Thème nostalgique scolaire**
- Primaire: Bleu foncé `#0B1B33`
- Secondaire: Kaki `#556B2F`
- Fond: Crème `#F4EBD9`
- Texte: Bleu foncé `#0B1B33`

### 3. **Dark** (Mode Nuit)
- 🌙 **Thème sombre élégant**
- Primaire: Magenta `#EC4899`
- Secondaire: Vert `#4ADE80`
- Fond: Gris très foncé `#111827`
- Texte: Blanc `#FFFFFF`

### 4. **Minimal** (Noir & Blanc)
- ⚫ **Thème minimaliste**
- Primaire: Noir `#000000`
- Secondaire: Gris clair `#E5E7EB`
- Fond: Blanc `#FFFFFF`
- Texte: Noir `#000000`

---

## 🛠️ Accéder à la Page d'Administration de Thème

### URL
```
http://localhost:3000/admin/theme
```

### Fonctionnalités

1. **Sélection de Thèmes Prédéfinis**
   - Cliquez sur un préset pour l'appliquer instantanément
   - Les changements sont sauvegardés dans `localStorage`

2. **Éditeur Personnalisé**
   - Modifiez les couleurs individuellement
   - Color picker intégré pour chaque couleur
   - Bouton "Copier" pour la valeur hex
   - Aperçu en direct

3. **Aperçu en Direct**
   - Voir immédiatement comment les couleurs s'appliquent
   - Affiche les valeurs hex actuelles

4. **Réinitialisation**
   - Bouton "Réinitialiser au Défaut" pour revenir aux couleurs Cook'Tail

---

## 📱 Fonctionnement de la Sauvegarde

### localStorage Keys

```javascript
// Préset sélectionné
localStorage.getItem("cooktail-theme-preset")
// Valeurs: "default", "retro", "dark", "minimal", "custom"

// Thème personnalisé (JSON stringifié)
localStorage.getItem("cooktail-theme-custom")
// Valeurs: { "primary": "#EC4899", "secondary": "#4ADE80", ... }
```

### Logique de Chargement

1. Au démarrage de l'app, le Context charge `localStorage`
2. Si une couleur personnalisée existe, elle est utilisée
3. Sinon, le préset sauvegardé est appliqué
4. Sinon, le thème par défaut est utilisé

### Persistance

Les changements se sauvegardent automatiquement dans `localStorage` et persistent au travers des rechargements de page.

---

## 🚀 Prochaines Étapes d'Intégration

### Phase 1: Harmoniser les Cartes (À faire)

Mettre à jour tous les composants de cartes pour utiliser les variables dynamiques:

```tsx
// ✅ À faire dans:
// - components/cards/ActivityCard.tsx
// - components/cards/MenuItemCard.tsx
// - components/cards/ServiceCard.tsx
// - components/cards/ParticipantCard.tsx
// - components/cards/StatCard.tsx
```

**Pattern à suivre:**
```tsx
<div style={{
  backgroundColor: "var(--theme-bgPrimary)",
  borderColor: "var(--theme-primary)",
  color: "var(--theme-textPrimary)",
  boxShadow: "var(--shadow-retro-md)"
}}>
```

### Phase 2: Harmoniser les Sections (À faire)

Mettre à jour toutes les sections:
```tsx
// ✅ À faire dans:
// - components/sections/MenuSection.tsx
// - components/sections/ActivitiesSection.tsx
// - components/sections/ExperienceSection.tsx
```

### Phase 3: Harmoniser les Modales (À faire)

```tsx
// ✅ À faire dans:
// - components/modals/Modal.tsx
// - components/modals/AuthModal.tsx
// - components/modals/ConfirmationModal.tsx
```

### Phase 4: Harmoniser les Pages

```tsx
// ✅ À faire dans:
// - app/(public)/reservation/page.tsx
// - app/(public)/contact/page.tsx
// - app/(public)/galerie/page.tsx
// - etc.
```

### Phase 5: Admin Layout

```tsx
// ✅ À faire dans:
// - app/admin/layout.tsx
// - components/layout/AdminSidebar.tsx
// - components/layout/AdminNavbar.tsx
```

---

## 📝 Exemple Complet: Migrer une Carte

**AVANT** (Hardcodé):
```tsx
export const ActivityCard = ({ title, description }) => {
  return (
    <div className="bg-[#F4EBD9] border-2 border-[#0B1B33] p-5">
      <h3 className="text-[#0B1B33]">{title}</h3>
      <p className="text-[#556B2F]">{description}</p>
    </div>
  );
};
```

**APRÈS** (Dynamique):
```tsx
export const ActivityCard = ({ title, description }) => {
  return (
    <div style={{
      backgroundColor: "var(--theme-bgPrimary)",
      borderColor: "var(--theme-borderColor)",
      borderWidth: "2px",
      padding: "1.25rem",
      borderRadius: "12px",
      boxShadow: "var(--shadow-retro-md)"
    }}>
      <h3 style={{ color: "var(--theme-primary)" }}>{title}</h3>
      <p style={{ color: "var(--theme-secondary)" }}>{description}</p>
    </div>
  );
};
```

---

## 🎓 Points Clés

✅ **Variables CSS Dynamiques** — Les couleurs changent en temps réel
✅ **Aucun Hardcoding** — Aucune couleur fixe en `#FFFFFF`
✅ **Presets Préconfigurés** — Accès facile aux thèmes alternatifs
✅ **Admin Interface** — Aucun code requis pour changer le thème
✅ **Persistance** — Les changements survivent aux rechargements
✅ **Responsive** — Fonctionne sur tous les appareils
✅ **Accessibilité** — Respecte `prefers-reduced-motion`

---

## 🐛 Troubleshooting

### Les couleurs ne changent pas?
1. Vérifiez que le composant utilise `"use client"`
2. Vérifiez que vous utilisez `style={{ color: "var(--theme-*)" }}` pas des classes Tailwind
3. Rafraîchissez la page (F5)

### localStorage ne persiste pas?
1. Vérifiez les paramètres de confidentialité du navigateur
2. Vérifiez que vous êtes en https (requis pour localhost et production)

### Comment réinitialiser localStorage?
```javascript
// Dans la console du navigateur
localStorage.clear();
location.reload();
```

---

## 📞 Support

Pour des questions sur le système de thème, consultez:
- `context/ThemeContext.tsx` — Logique du thème
- `app/globals-tokens.css` — Tokens CSS
- `app/admin/theme/page.tsx` — Interface admin

---

**✨ Prêt à lancer! Visitez `/admin/theme` pour commencer.**
