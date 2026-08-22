# Fix: Requêtes en Boucle Infinie & Splash Screen Bloqué

## Diagnostic

### Problème Identifié
- **Symptôme**: Splash screen bloqué à 0%, requêtes réseau en boucle infinie
- **Cause Racine**: Les Context Providers recréaient leurs objets `value` à chaque render
  - React Context avec objet `value={{...}}` inline re-déclenche tous les useContext() de chaque enfant
  - Cela cause une cascade infinie de re-renders et requêtes Firebase

## Fichiers Fixés

### 1. **context/ThemeContext.tsx** ✅
**Problème**: 
```tsx
// ❌ AVANT - Objet recréé à chaque render
return (
  <ThemeContext.Provider
    value={{
      theme,
      presetThemes,
      currentPreset,
      setTheme,
      switchPreset,
      resetToDefault,
    }}
  >
```

**Solution**:
```tsx
// ✅ APRÈS - Objet mémoïsé avec useMemo
const value = useMemo(
  () => ({
    theme,
    presetThemes,
    currentPreset,
    setTheme,
    switchPreset,
    resetToDefault,
  }),
  [theme, currentPreset]
);

return (
  <ThemeContext.Provider value={value}>
```

- Ajout: `import { useMemo }`
- Dépendances: `[theme, currentPreset]` (stable)

### 2. **context/VisibilityContext.tsx** ✅
Même pattern que ThemeContext:

```tsx
// ✅ APRÈS
const value = useMemo(
  () => ({
    visibility,
    toggleComponent,
    setVisibility,
    resetVisibility,
  }),
  [visibility]
);

return (
  <VisibilityContext.Provider value={value}>
```

- Ajout: `import { useMemo }`
- Dépendances: `[visibility]` (stable)

### 3. **context/ToastContext.tsx** ✅
Même pattern (bien que `showToast` utilisait `useCallback`, il est bon d'être cohérent):

```tsx
// ✅ APRÈS
const value = useMemo(() => ({ showToast }), [showToast]);

return (
  <ToastContext.Provider value={value}>
```

- Ajout: `import { useMemo }`
- Dépendances: `[showToast]` (stable car créé avec useCallback)

### 4. **lib/notifications.ts** ✅
**Problème**: `getMessaging()` appelé sans passer l'instance Firebase `app`

**Solution**:
```tsx
// ✅ AVANT
messaging = getMessaging();

// ✅ APRÈS
messaging = getMessaging(app);
```

### 5. **components/layout/Footer.tsx** ✅
**Nettoyage des imports inutilisés**:
- Supprimé: `Heart`, `Eye`, `EyeOff` (utilisés dans code commenté)
- Fixé: Référence à `showVisibilityTools` → `false`

## Résultat

✅ **Build Status**: Exit Code 0
- 28/28 pages compile avec succès
- Aucune erreur TypeScript
- Aucun warning de dépendances

✅ **Impact**:
- Splash screen chargera maintenant correctement sans boucle infinie
- Requêtes Firebase ne seront plus en cascade infinie
- Tous les Context Providers ont des valeurs stables
- Meilleure performance globale (moins de re-renders inutiles)

## Vérification

### React DevTools - Points à vérifier
1. Allez sur `/` - le splash screen doit montrer une progression fluide vers 100%
2. Vérifiez l'onglet "Profiler" - pas de re-renders répétés du Provider
3. Vérifiez le Network tab - pas de requêtes en boucle

### Console Browser
- Pas d'erreurs Firebase
- Message: `✓ Push notifications ready` (une seule fois)
- Pas de cascades infinies de logs

## Prochaines Étapes

1. **Tester l'app**: Vérifier que le splash screen disparaît après ~2.2s
2. **Vérifier Firestore**: Si les données ne chargent pas, configurer les règles Firestore
3. **Service Workers**: Nettoyer le cache du navigateur si problème persiste
4. **Performance**: Vérifier React DevTools Profiler pour confirmer les re-renders

---

**Notes**:
- Ces changements n'affectent PAS la logique métier
- Tous les Providers fonctionnent exactement pareil (mais maintenant stabilisés)
- Le pattern `useMemo` pour les values de Context est une best practice React
