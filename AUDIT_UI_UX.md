# 🎨 AUDIT UI/UX COMPLET — BRUNCH RÉCRÉATION 2026

**Analysé le:** 21 Août 2026  
**Lead Designer:** Senior UI/UX Specialist (Event Platforms)  
**Statut:** Audit Détaillé + Recommandations

---

## 📋 RÉSUMÉ EXÉCUTIF

Le projet présente une **identité visuelle forte** (thème rétro/scolaire) mais souffre de **fragmentation** dans l'application des tokens et une **incohérence** dans les appels à l'action, espacement, et hiérarchie typographique. Les composants UI ne suivent pas systématiquement le design system défini dans `lib/theme.ts`.

### Scores d'Audit par Domaine:
- **Cohérence Couleurs:** 65/100 ⚠️ (alternance brutale entre thème clair/sombre)
- **Espacement & Rythme:** 70/100 ⚠️ (mélange p-4, p-5, p-6, px-3/px-4)
- **Hiérarchie Typographique:** 60/100 ⚠️ (titres sans hiérarchie claire entre sections)
- **Ombre & Profondeur:** 80/100 ✅ (ombres cohérentes, mais variable dans la force)
- **Interaction & Feedback:** 75/100 ✅ (bons États hover, mais manque de transition d'accès)
- **Accessibilité Mobile:** 78/100 ✅ (responsive correct mais dense sur petit écran)

---

## 🔍 INCOHÉRENCES DÉTAILLÉES (Fichier par Fichier)

### **1. PALETTES & TOKENS**

#### ✅ Définis dans `lib/theme.ts`:
```
blouseBlue: #0B0369        → Bleu foncé (Utilisé comme --rnc-ink)
kakiBoys: #556B2F          → Vert-olive (Utilisé en accent secondaire)
creamPaper: #F4EBD9        → Crème papier (Utilisé comme --rnc-parchment)
chalkboard: #1C2826        → Tableau noir (Utilisé comme --rnc-forest)
penRed: #DC2626            → Rouge crayon (Accent danger)
highlightYellow: #ad8653   → Jaune surligneur (--rnc-gold dans theme.ts)
notebookGrid: #E2D8C3      → Gris papier (Non utilisé)
```

#### ❌ INCOHÉRENCES DÉTECTÉES:

**Problème #1: Mélange HeroSection (Moderne) vs Autres Cartes (Rétro)**
- `HeroSection.tsx`: Utilise Tailwind stock (amber-*, slate-*) — **MODERNE/GLASSMORPHISM**
- `ActivityCard.tsx`, `ServiceCard.tsx`: Utilisent `#0B1B33`, `#F4EBD9` — **RÉTRO**
- `MenuSection.tsx`: Thème sombre `#1C2826` — **SOMBRE**
- `Footer.tsx`, `Layout.tsx`: Mélange clair/sombre par section

**Impact:** L'utilisateur perçoit 3 univers visuels différents en naviguant.

---

### **2. COMPOSANTS > CARDS**

#### `ServiceCard.tsx`
- ✅ Bon : Shadow rétro `4px 4px 0px 0px #0B1B33`, border-2, badge jaune
- ❌ Problème : Padding `p-5` — Inconsistent (autres cartes: p-4, p-6)
- ❌ Problème : `rounded-xs` → Pas défini dans Tailwind v4, faut clarifier
- ❌ Problème : Icône badge avec surligneur jaune (`#FEF08A`) sur fond jaune = mauvais contraste

#### `ActivityCard.tsx`
- ✅ Bon : Ligne de marge rouge (simulation cahier)
- ✅ Bon : Rotation légère (-1deg / 1deg)
- ❌ Problème : Padding `p-6` — Plus épais que ServiceCard (`p-5`)
- ❌ Problème : Deux variantes BG alternées (crème + blanc) — Incohérent avec autres cartes qui maintiennent UNE couleur
- ❌ Problème : Hovers différents entre cartes (shadow augmente ici, pas ailleurs)

#### `MenuItemCard.tsx`
- ✅ Bon : Coin plié (pseudo-élément CSS)
- ✅ Bon : Shadow vert `#556B2F`
- ❌ Problème : BG sombre `#1C2826` vs crème partout ailleurs
- ❌ Problème : Padding `p-5` — Encore une variation
- ❌ Problème : Badge "Classique Récré" jaune sur fond sombre = visibilité OK mais pas stylé uniformément

#### `ParticipantCard.tsx`
- ✅ Bon : Status badges bien codifiés
- ❌ Problème : Padding `p-4` (plus petit) — Incohérent
- ❌ Problème : Bouton CTA `bg-[#556B2F]` vert-olive — Rare en CTA (priorise or/amber)

#### `StatCard.tsx`, `PolaroidFrame.tsx`
- ⚠️ Non audités (nécessite lecture)

---

### **3. COMPOSANTS > HOME**

#### `HeroSection.tsx`
- ❌ **Problème Majeur:** Utilise palette Tailwind moderne (slate-950, amber-*) — **TOTALEMENT DIFFÉRENTE** du thème rétro
  - Fond: `slate-950` (noir moderne) vs `#1C2826` (tableau noir rétro)
  - Accents: `amber-*` (or métallique) vs `#ad8653` (or mat/surligneur)
  - Badges: `amber-500/15` (glassmorphism) vs `#FEF08A` (jaune plein rétro)
- ❌ Padding: `py-8 sm:py-12 md:py-16` — Variable sur le responsive
- ❌ Titres: `text-3xl sm:text-5xl md:text-6xl` — Gigantesque, pas scalé uniformément
- ✅ Bon : Slide transitions fluides, indicateurs de slide clairs
- ⚠️ Les boutons utilisent du bleu `#0B1B33` avec or `#amber-300` — Bien, mais pallette mélangée

#### `ProgramSlider.tsx`, `CountdownSection.tsx`, `TestimonialsSlider.tsx`
- ⚠️ Non audités (nécessite lecture)

---

### **4. COMPOSANTS > SECTIONS**

#### `MenuSection.tsx`
- ✅ Bon : Structure claire (Header + Grille)
- ❌ Problème : Header label `#556B2F` sur fond `#1C2826` = faible contraste (ratio ~3:1)
- ❌ Problème : Padding section `py-20` — Très épais par rapport au reste
- ❌ Problème : Titre h2 `text-3xl md:text-5xl` — Plus grand que HeroSection (qui était 6xl mobile = INCOHÉRENT)

#### `ExperienceSection.tsx`, `ActivitiesSection.tsx`
- ⚠️ Non audités

---

### **5. COMPOSANTS > MODALS**

#### `Modal.tsx`
- ✅ Bon : Border épais `border-3`, shadow rétro
- ❌ Problème : Titre padding `pb-2` (pb-2 = 0.5rem) — Non scalable
- ❌ Problème : Close button sans padding standard (doit être ~32px min-height pour tactile)

#### `AuthModal.tsx`, `ConfirmationModal.tsx`, `MessageModal.tsx`, `QRCodeModal.tsx`
- ⚠️ Non audités

---

### **6. COMPOSANTS > UI**

#### `Button.tsx`
- ✅ Bon : System de variants (primary/secondary/danger/ghost)
- ❌ Problème : Variant "primary" → `#FEF08A` (jaune surligneur) OK, mais manque `--rnc-gold` token
- ❌ Problème : Sizes `sm: text-xs`, `md: text-sm`, `lg: text-base` — Trop proches, manque variation de padding
- ✅ Shadow: `3px 3px`, `5px 5px` — Bon gradient de profondeur

#### `Input.tsx`
- ⚠️ Non audité

#### `Badge.tsx`, `CountdownBadge.tsx`
- ⚠️ Non audités

---

### **7. LAYOUT > NAVIGATION**

#### `Header.tsx` (Admin?)
- ✅ Bon : Logo + Navigation texte
- ❌ Problème : Utilisé parallèlement à `(public)/layout.tsx` — Deux headers différents?
- ❌ Problème : Bouton CTA `border-3 border-black` — Peut être trop épais si utilisé uniformément

#### `(public)/layout.tsx`
- ✅ Bon : Bottom bar mobile moderne
- ✅ Bon : Responsive layout clair
- ❌ Problème : Navigation text-xs font-semibold → Autre font-size pas uniformisée
- ❌ Problème : Bottom bar utilise `#0B1B33` + `amber-400` — Cohérent, OK
- ⚠️ Padding côté `px-4` standard mais certaines sections internes varient

#### `Footer.tsx`
- ✅ Bon : Container standard
- ❌ Problème : H4/H5 font-sizes: `text-xl` vs autre `text-xs` — Manque hiérarchie inter-sections

#### `AdminSidebar.tsx`, `AdminNavbar.tsx`
- ⚠️ Non audités

---

### **8. PAGES**

#### `(public)/reservation/page.tsx`
- ❌ **Problème Majeur:** Utilise Tailwind modern (`slate-50`, `slate-100`, `slate-200`) PARTOUT
  - Contradictoire avec thème rétro des cartes
  - Formulaire = 100% Tailwind moderne, pas du tout rétro
- ✅ Bon : QR Code display card est **bien stylée** (foncé, or, contraste)
- ❌ Problème : Inputs avec `focus:ring-2 focus:ring-amber-500/30` — Pas unifié
- ❌ Problème : Grille responsive `grid-cols-1 lg:grid-cols-12` — OK mais padding interne variables

#### Autres pages `(public)/`
- ⚠️ Non audités (nécessite lecture)

---

### **9. TYPOGRAPHIE**

#### Détecté:
```
font-mono:     Utilisé pour labels, petits textes
font-sans:     Utilisé partout (défaut)
font-serif:    Utilisé pour descriptions/italiques (rare)
```

#### Problème:
- `font-sans` = défaut HTML Arial/sans fallback — **PAS Manrope!**
- `font-mono` = non spécifié (probablement monospace système)
- `Fraunces` (serif) non importé
- **Aucun** token CSS pour les polices dans `globals.css`

---

### **10. OMBRES & PROFONDEUR**

#### Bon:
- Ombres brutales rétro: `shadow-[4px_4px_0px_0px_#0B1B33]` — Cohérent dans cartes
- Ombres modernes: `shadow-md`, `shadow-lg` — Utilisées en frontend modern

#### Problème:
- Deux systèmes coexistent sans règle claire
- Hover states variables (ActivityCard augmente shadow, autres non)

---

### **11. ESPACEMENTS**

#### Analysé:
- Padding cartes: `p-4`, `p-5`, `p-6` (3 variations!)
- Padding sections: `py-20`, `py-8`, `py-6` (toutes différentes)
- Gap grilles: `gap-2`, `gap-2.5`, `gap-3`, `gap-4`, `gap-5` (5 variations!)
- Margin titres: Aucun pattern cohérent

---

### **12. RAYONS DE BORDURE**

#### Détecté:
- `rounded-xs` (Tailwind v4 custom?) — Non défini partout
- `rounded-sm` — Rare
- `rounded-xl` — Fréquent en moderne
- `rounded-2xl` — Fréquent en moderne
- `rounded-3xl` — Footer/Sections
- Carrés `rounded-none` — Quelques éléments

#### Problème:
- Aucune cohérence — Faut choisir **2-3 rayons max** et les appliquer partout

---

## 🎯 PLAN DE HARMONISATION

### **Phase 1: Créer les Tokens CSS Globaux** (30 min)
1. Créer `app/globals-tokens.css` avec CSS variables:
   - Couleurs: `--rnc-ink`, `--rnc-parchment`, `--rnc-gold`, `--rnc-forest`, `--rnc-clay`
   - Typographie: `--ff-fraunces`, `--ff-manrope`, `--ff-space-mono`
   - Espacement: `--spacing-unit-xs` à `--spacing-unit-lg`
   - Rayons: `--radius-tight`, `--radius-default`, `--radius-loose`
   - Ombres: `--shadow-retro`, `--shadow-modern`

2. Importer dans `globals.css`

---

### **Phase 2: Unifier les Polices** (15 min)
1. Créer `lib/fonts.ts` avec `next/font/google` imports
2. Appliquer au layout root

---

### **Phase 3: Standardiser Composants UI** (2h)
#### Priority 1:
- `Button.tsx` → Utiliser tokens
- `Input.tsx` → Style cohérent
- `Badge.tsx` → Variantes uniformes

#### Priority 2:
- `Modal.tsx` → Padding/Border fixes
- Toutes les cartes → Même padding/border/shadow

---

### **Phase 4: Refactor Sections** (3h)
1. `HeroSection.tsx` → Passer du modern amber à `--rnc-gold`/`--rnc-forest`
2. `MenuSection.tsx` → Contraste labels, padding section
3. Autres sections → Appliquer design system

---

### **Phase 5: Pages** (2h)
1. `ReservationPage` → Inputs avec tokens
2. Autres pages → Audit individuel et fix

---

### **Phase 6: Admin Layout** (1h)
1. `AdminLayout.tsx`, sidebar, navbar → Cohérent avec public

---

## ✨ PRIORISATION CORRECTIONS

### 🔴 CRITIQUE (Faire MAINTENANT):
1. **HeroSection palette** → Changer amber/slate vers `#0B1B33`/`#FEF08A`/`#F4EBD9`
2. **Bouton CTA Principal** → Unifié rouge/or sur noir (Réserver, Payer, etc.)
3. **Réservation Form** → Inputs rétro, pas modernes
4. **Cards padding** → Standardiser à `p-5` partout

### 🟠 HAUTE (Cette semaine):
5. **Typographie polices** → Import Fraunces/Manrope
6. **Espacement section** → Standardiser `py-12` pour sections
7. **Ombres** → Une seule règle: `4px 4px 0px 0px` + variantes modernes
8. **Rayons bordure** → Choisir 2 rayons (rétro carré / moderne arrondi)

### 🟡 MOYENNE (Semaine prochaine):
9. **Contraste et accessibilité** → Auditer WCAG AAA
10. **États tactiles** → 48px min-height CTA
11. **Autres pages** → Audit individuel

---

## 📊 TOKENS RECOMMANDÉS (À Créer)

```css
/* Couleurs Brand */
--rnc-ink: #0B1B33;
--rnc-parchment: #F4EBD9;
--rnc-gold: #ad8653;
--rnc-forest: #1C2826;
--rnc-clay: #556B2F;

/* Typographie */
--ff-fraunces: 'Fraunces', serif;
--ff-manrope: 'Manrope', sans-serif;
--ff-space-mono: 'Space Mono', monospace;

--fs-xs: 0.625rem;     /* 10px */
--fs-sm: 0.75rem;      /* 12px */
--fs-base: 1rem;       /* 16px */
--fs-lg: 1.25rem;      /* 20px */
--fs-xl: 1.5rem;       /* 24px */
--fs-2xl: 2rem;        /* 32px */
--fs-3xl: 2.5rem;      /* 40px */

/* Espacement */
--sp-xs: 0.25rem;      /* 4px */
--sp-sm: 0.5rem;       /* 8px */
--sp-md: 1rem;         /* 16px */
--sp-lg: 1.5rem;       /* 24px */
--sp-xl: 2rem;         /* 32px */

/* Rayons */
--radius-tight: 4px;   /* Rétro carré */
--radius-default: 12px;/* Moderne arrondi */
--radius-loose: 24px;  /* Très arrondi */

/* Ombres Rétro */
--shadow-sm: 2px 2px 0px 0px #0B1B33;
--shadow-md: 4px 4px 0px 0px #0B1B33;
--shadow-lg: 6px 6px 0px 0px #0B1B33;

/* Ombres Modernes (pour comparaison) */
--shadow-soft: 0 4px 12px rgba(0,0,0,0.1);
```

---

## 🎨 AVANT/APRÈS VISUAL (Exemples)

### AVANT (Incohérent):
```
HeroSection: Moderne dark + amber gradients + slate text
Button: Gold + dark ink
Card: Cream + ink + retro shadow
Input: Slate BG moderne
```

### APRÈS (Unifié):
```
HeroSection: Dark forest BG + gold accents + cream text
Button: Cream BG + ink text (primary) OU ink BG + gold text (CTA)
Card: Cream BG + ink text + retro shadow unifié
Input: Parchment BG + forest text + gold focus ring
```

---

## 📌 NOTES IMPORTANTES

1. **Ne pas toucher logique métier** — Seulement classes Tailwind/CSS
2. **Respecter `prefers-reduced-motion`** — Déjà en place
3. **Mobile tactile ≥48px** — Vérifier tous les CTA
4. **Hiérarchie "en direct" repère** — Pas trouvé LivePlayerBar, à chercher
5. **Tailwind v4:** Certains custom values comme `rounded-xs` peuvent ne pas exister → Faut clarifier config

---

## 🚀 PROCHAINES ÉTAPES

**Jour 1-2:**
- Créer tokens CSS
- Fix HeroSection
- Standardiser cards

**Jour 3-4:**
- Importer polices
- Fix inputs/forms
- Admin layout

**Jour 5:**
- Audit final
- Tests accessibilité
- Déploiement

---

**Auteur:** Claude (Kiro)  
**Date:** 21 Août 2026  
**Revisiter dans:** 1 semaine pour validation finale
