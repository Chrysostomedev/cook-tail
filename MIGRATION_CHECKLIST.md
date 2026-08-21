# ✅ Checklist de Migration — Harmonisation UI avec Thème Dynamique

**Objectif:** Convertir tous les composants du hardcoding de couleurs au système de thème dynamique.

**Priorité:** HIGH → Tous les composants clients doivent utiliser `var(--theme-*)` 

---

## 📊 Statut Global: 20% ✅ (2/10 modules)

### ✅ **Complétés**

- [x] System de Thème (`context/ThemeContext.tsx`)
- [x] CSS Tokens (`app/globals-tokens.css`)
- [x] Polices (`lib/fonts.ts`)
- [x] HeroSection (`components/home/HeroSection.tsx`)
- [x] Button UI (`components/ui/Button.tsx`)
- [x] Page Admin Thème (`app/admin/theme/page.tsx`)

---

## 🔄 **À Faire (Reste: 80%)**

### 📦 **Module 1: Composants UI Basiques** [0/5]

- [ ] **`components/ui/Badge.tsx`**
  - Utiliser `--theme-primary` pour le fond
  - Utiliser `--theme-textPrimary` pour le texte
  - Durée estimée: 10 min

- [ ] **`components/ui/Input.tsx`**
  - Border: `--theme-borderColor`
  - Focus ring: `--theme-primary`
  - Text: `--theme-textPrimary`
  - BG: `--theme-bgPrimary`
  - Durée estimée: 15 min

- [ ] **`components/ui/CountdownBadge.tsx`**
  - BG: `--theme-secondary`
  - Text: white
  - Durée estimée: 10 min

- [ ] **`components/ui/PolaroidFrame.tsx`**
  - Border: `--theme-borderColor`
  - Shadow: `--shadow-retro-md`
  - Durée estimée: 10 min

**Sous-total Estimé:** 45 min

---

### 📇 **Module 2: Cartes** [0/5]

- [ ] **`components/cards/ActivityCard.tsx`**
  - BG alternée: `--theme-bgPrimary` ou `--theme-bgSecondary`
  - Border: `--theme-borderColor`
  - Shadow: `--shadow-retro-md` avec hover augmenté
  - Text: `--theme-textPrimary`
  - Ligne rouge marge: `--theme-danger`
  - Highlight jaune: `--theme-accent`
  - Durée estimée: 30 min

- [ ] **`components/cards/MenuItemCard.tsx`**
  - BG: `--theme-bgSecondary` (sombre)
  - Text: `--theme-textPrimary`
  - Border coin plié: `--theme-borderColor`
  - Shadow: `--shadow-retro-md`
  - Durée estimée: 25 min

- [ ] **`components/cards/ServiceCard.tsx`**
  - BG: `--theme-bgPrimary`
  - Border: `--theme-borderColor`
  - Shadow: `--shadow-retro-md`
  - Badge BG: `--theme-accent`
  - Durée estimée: 20 min

- [ ] **`components/cards/ParticipantCard.tsx`**
  - BG: `--theme-bgPrimary`
  - Border: `--theme-borderColor`
  - Status badges: utiliser `--theme-primary`, `--theme-secondary`, `--theme-danger`
  - Durée estimée: 25 min

- [ ] **`components/cards/StatCard.tsx`** (À auditer d'abord)
  - Durée estimée: 20 min

**Sous-total Estimé:** 2h 10 min

---

### 🏘️ **Module 3: Sections** [0/3]

- [ ] **`components/sections/MenuSection.tsx`**
  - Header BG: `--theme-bgSecondary`
  - Title: `--theme-textPrimary`
  - Label: `--theme-secondary`
  - Padding standardisé: `py-12`
  - Durée estimée: 25 min

- [ ] **`components/sections/ActivitiesSection.tsx`** (À auditer d'abord)
  - Durée estimée: 30 min

- [ ] **`components/sections/ExperienceSection.tsx`** (À auditer d'abord)
  - Durée estimée: 30 min

**Sous-total Estimé:** 1h 25 min

---

### 🏠 **Module 4: Composants Home** [1/4]

- [x] **`components/home/HeroSection.tsx`** ✅
  
- [ ] **`components/home/ProgramSlider.tsx`** (À auditer)
  - Durée estimée: 40 min

- [ ] **`components/home/CountdownSection.tsx`** (À auditer)
  - Durée estimée: 35 min

- [ ] **`components/home/TestimonialsSlider.tsx`** (À auditer)
  - Durée estimée: 40 min

**Sous-total Estimé:** 1h 55 min

---

### 🎨 **Module 5: Modales** [0/5]

- [ ] **`components/modals/Modal.tsx`**
  - BG: `--theme-bgPrimary`
  - Border: `--theme-borderColor`
  - Text: `--theme-textPrimary`
  - Close button: `--theme-textSecondary` hover
  - Durée estimée: 20 min

- [ ] **`components/modals/AuthModal.tsx`** (À auditer)
  - Durée estimée: 25 min

- [ ] **`components/modals/ConfirmationModal.tsx`** (À auditer)
  - Durée estimée: 20 min

- [ ] **`components/modals/MessageModal.tsx`** (À auditer)
  - Durée estimée: 20 min

- [ ] **`components/modals/QRCodeModal.tsx`** (À auditer)
  - Durée estimée: 25 min

**Sous-total Estimé:** 1h 50 min

---

### 📄 **Module 6: Pages Publiques** [0/12]

- [ ] **`app/(public)/reservation/page.tsx`** (PRIORITÉ!)
  - Formulaire: Inputs avec `--theme-*`
  - Boutons: CTA primary avec `--theme-primary`
  - Card QR: Fond `--theme-bgSecondary`, border `--theme-borderColor`
  - Durée estimée: 50 min

- [ ] **`app/(public)/accueil/page.tsx`**
  - Durée estimée: 30 min

- [ ] **`app/(public)/programme/page.tsx`**
  - Durée estimée: 40 min

- [ ] **`app/(public)/menu/page.tsx`**
  - Durée estimée: 35 min

- [ ] **`app/(public)/services/page.tsx`**
  - Durée estimée: 35 min

- [ ] **`app/(public)/contact/page.tsx`**
  - Durée estimée: 40 min

- [ ] **`app/(public)/galerie/page.tsx`**
  - Durée estimée: 35 min

- [ ] **`app/(public)/profil/page.tsx`**
  - Durée estimée: 30 min

- [ ] **`app/(public)/a-propos/page.tsx`**
  - Durée estimée: 25 min

- [ ] **`app/(public)/cgu/page.tsx`**
  - Durée estimée: 20 min

- [ ] **`app/(public)/reglement/page.tsx`**
  - Durée estimée: 20 min

**Sous-total Estimé:** 6h 20 min

---

### 🏢 **Module 7: Admin Pages** [0/6]

- [ ] **`app/admin/dashboard/page.tsx`** (À auditer)
  - Durée estimée: 40 min

- [ ] **`app/admin/evenement/page.tsx`** (À auditer)
  - Durée estimée: 40 min

- [ ] **`app/admin/login/page.tsx`** (À auditer)
  - Durée estimée: 30 min

- [ ] **`app/admin/profil/page.tsx`** (À auditer)
  - Durée estimée: 30 min

- [ ] **`app/admin/reservations/page.tsx`** (À auditer)
  - Durée estimée: 40 min

- [ ] **`app/admin/scanner/page.tsx`** (À auditer)
  - Durée estimée: 35 min

**Sous-total Estimé:** 3h 35 min

---

### 🧭 **Module 8: Layout & Navigation** [0/4]

- [ ] **`components/layout/Header.tsx`**
  - Nav buttons: `--theme-*`
  - CTA button: `--theme-primary`
  - Logo container: `--theme-shadowColor`
  - Durée estimée: 30 min

- [ ] **`app/(public)/layout.tsx`**
  - Bottom bar: `--theme-bgPrimary` ou `--theme-bgSecondary`
  - Nav active: `--theme-primary`
  - Mobile menu: `--theme-bgPrimary`
  - Durée estimée: 40 min

- [ ] **`components/layout/Footer.tsx`**
  - BG: `--theme-bgSecondary`
  - Border: `--theme-borderColor`
  - Text: `--theme-textPrimary`
  - Links: `--theme-primary` hover
  - Durée estimée: 30 min

- [ ] **`app/admin/layout.tsx`** (À auditer)
  - Durée estimée: 40 min

**Sous-total Estimé:** 2h 20 min

---

### 📝 **Module 9: Formulaires** [0/2]

- [ ] **`components/form/FormStepper.tsx`** (À auditer)
  - Steps: `--theme-primary` active
  - Durée estimée: 35 min

- [ ] **`components/form/ReservationForm.tsx`** (À auditer)
  - Inputs: `--theme-*`
  - Buttons: `--theme-primary`
  - Durée estimée: 40 min

**Sous-total Estimé:** 1h 15 min

---

### 🎯 **Module 10: Spéciaux** [0/1]

- [ ] **`components/specials/QRScanner.tsx`** (À auditer)
  - Durée estimée: 30 min

**Sous-total Estimé:** 30 min

---

## 📊 **Résumé des Temps**

| Module | Composants | Temps Estimé |
|--------|-----------|-------------|
| UI Basiques | 5 | 45 min |
| Cartes | 5 | 2h 10 min |
| Sections | 3 | 1h 25 min |
| Home | 3 | 1h 55 min |
| Modales | 5 | 1h 50 min |
| Pages Publiques | 11 | 6h 20 min |
| Admin Pages | 6 | 3h 35 min |
| Layout & Nav | 4 | 2h 20 min |
| Formulaires | 2 | 1h 15 min |
| Spéciaux | 1 | 30 min |
| **TOTAL** | **45** | **≈ 21h 35 min** |

---

## 🚀 **Ordre de Priorité Recommandé**

### 🔴 **CRITIQUE (Jour 1)** — 3h 30 min
1. `components/ui/Input.tsx` — 15 min
2. `app/(public)/reservation/page.tsx` — 50 min
3. `components/cards/ActivityCard.tsx` — 30 min
4. `components/layout/Header.tsx` — 30 min
5. `app/(public)/layout.tsx` — 40 min
6. `components/layout/Footer.tsx` — 30 min

### 🟠 **HAUTE (Jour 2-3)** — 7h
- [ ] Reste des Cartes (MenuItemCard, ServiceCard, ParticipantCard)
- [ ] Sections (MenuSection, ActivitiesSection)
- [ ] Home Pages (ProgramSlider, CountdownSection, TestimonialsSlider)

### 🟡 **MOYENNE (Semaine 1)** — 10h
- [ ] Admin Pages (dashboard, reservations, login, etc.)
- [ ] Modales
- [ ] Pages publiques restantes
- [ ] Formulaires

### 🟢 **BASSE (Semaine 2)** — Optionnel
- [ ] QRScanner et composants spéciaux
- [ ] Optimisations fines
- [ ] Tests d'accessibilité

---

## 📝 **Pattern Standard pour Migrer**

Utilisez ce template pour chaque composant:

```tsx
// AVANT (Hardcodé)
<div className="bg-[#F4EBD9] border-2 border-[#0B1B33] p-5">
  <h3 className="text-[#0B1B33]">{title}</h3>
</div>

// APRÈS (Dynamique)
<div style={{
  backgroundColor: "var(--theme-bgPrimary)",
  borderColor: "var(--theme-borderColor)",
  borderWidth: "2px",
  padding: "1.25rem",
  borderRadius: "12px"
}}>
  <h3 style={{ color: "var(--theme-primary)" }}>{title}</h3>
</div>
```

---

## ✨ **Tips pour l'Implémentation**

1. **Testez après chaque module** — Visitez `/admin/theme` et changez de thème
2. **Utilisez `--shadow-retro-md`** pour les ombres partout
3. **Conservez les `border-radius`** constants (pas de changement dynamique)
4. **Les transitions doivent être fluides** — Utilisez `transition-all duration-200`
5. **Mobile-first** — Assurez-vous que les changements de couleur sont visibles sur mobile

---

## 🎯 **Definition of Done**

Chaque composant est "fait" quand:
- ✅ Aucune couleur hardcodée en hex (`#FFFFFF`)
- ✅ Toutes les couleurs utilisent `var(--theme-*)`
- ✅ Les ombres utilisent `var(--shadow-*)`
- ✅ Testé avec au moins 2 thèmes différents
- ✅ Pas d'erreurs console
- ✅ Responsive & accessible

---

**Bon courage! 🚀 Commencez par le Module 1 (UI Basiques) et progressez!**
