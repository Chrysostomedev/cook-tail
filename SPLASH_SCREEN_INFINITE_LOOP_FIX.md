# Fix: Splash Screen Bloqué à 0% + Boucle Infinie de Requêtes

## Diagnostic Complet

### Problème Décrit
- **Symptôme**: Splash screen reste bloqué à 0%, requêtes réseau en boucle infinie
- **Impact**: App non fonctionnelle, impossible de sortir du splash

### Root Causes Identifiées & Fixées

---

## 1. ❌ → ✅ Service Worker Mal Configuré

**Fichier**: `public/sw.js`

**Problème**:
- Le SW tentait de pre-cache le "/" au install avec `cache.addAll(["/"])`
- Tous les navigation requests (HTML) étaient catchés et cachés
- Cela pouvait créer des boucles si le "/" était servi avec une ancienne version en cache
- Le fetch handler ne distinguait pas les navigation requests des autres

**Solution - Network First pour Pages HTML**:
```javascript
// ✅ AVANT (cache-first TOUT)
event.respondWith(caches.match(event.request)...)

// ✅ APRÈS (network-first pour navigations)
if (event.request.mode === "navigate") {
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(() => new Response("Offline"))
  );
  return;
}
```

**Changements**:
- Supprimé: `cache.addAll(["/"])` au install
- Ajouté: `self.skipWaiting()` et `self.clients.claim()`
- Ajouté: Vérification `if (event.request.mode === "navigate")`
- Stratégie: Network-first pour HTML, Cache-first pour assets

---

## 2. ❌ → ✅ Context Providers Recréaient des Objets

**Fichiers**: 
- `context/ThemeContext.tsx`
- `context/VisibilityContext.tsx`
- `context/ToastContext.tsx`

**Problème**:
```tsx
// ❌ Objet recréé à CHAQUE render
<ThemeContext.Provider value={{theme, setTheme, ...}}>
```
- Cela déclenche TOUS les `useContext()` enfants
- Cascade infinie de re-renders

**Solution - Mémoïser avec useMemo()**:
```tsx
// ✅ Objet stable
const value = useMemo(() => ({theme, setTheme, ...}), [theme]);
<ThemeContext.Provider value={value}>
```

---

## 3. ❌ → ✅ Login Page - useEffect avec Dépendances Instables

**Fichier**: `app/login/page.tsx` (ligne 22-28)

**Problème**:
```tsx
// ❌ AVANT - Dépendance sur router (instable)
useEffect(() => {
    const user = getCurrentUser();
    if (user) {
        router.push("/admin/dashboard");
    }
}, [router]); // ← router change à chaque render = boucle
```

**Solution - Dépendances Vides (une seule exécution)**:
```tsx
// ✅ APRÈS
useEffect(() => {
    const user = getCurrentUser();
    if (user) {
        router.push("/admin/dashboard");
    }
}, []); // ← Exécute une seule fois au mount
```

---

## 4. ❌ → ✅ Firebase Messaging Initialization

**Fichier**: `lib/notifications.ts`

**Problème**:
```tsx
// ❌ getMessaging() sans l'instance app
messaging = getMessaging();
```

**Solution**:
```tsx
// ✅ Passer l'instance app
messaging = getMessaging(app);
```

---

## 5. ✅ Code Cleanup

**Fichier**: `components/layout/Footer.tsx`

**Changements**:
- Supprimé unused imports: `Heart`, `Eye`, `EyeOff`
- Fixé référence `showVisibilityTools` → `false`

---

## Impact sur la Boucle Infinie

### Avant
1. SW cache `/` au install
2. User visite `/` → splash page.tsx affiche la barre de progression
3. Après 2.2s: `router.replace("/accueil")`
4. Requête vers `/accueil` peut être mal servie par le SW
5. **OU** les Contexts recréent leurs objets → re-renders en cascade
6. **OU** une promesse Firebase ne se résout jamais
7. → **Splash reste bloqué à 0%**

### Après
1. SW: Network-first pour HTML, pas de cache au install
2. User visite `/` → splash page.tsx render correctement
3. Après 2.2s: `router.replace("/accueil")` fonctionne sans interception SW
4. Contexts: Valeurs stables (useMemo) → pas de re-renders en cascade
5. Login: useEffect exécute une seule fois → pas de redirects en boucle
6. Firebase: Messaging initialisé correctement
7. → **Splash avance de 0% à 100%, puis redirige vers /accueil**

---

## 📊 Build Status

```
✅ Exit Code: 0
✅ 28/28 pages compilent
✅ Aucune erreur TypeScript
```

---

## 🧪 Vérification

Pour confirmer que le fix fonctionne:

1. **Hard Reload dans le navigateur** (`Ctrl+Shift+R` ou `Cmd+Shift+R`)
2. **Unregister le SW** (DevTools → Application → Service Workers → Unregister)
3. **Révisiter `/`** - le splash devrait:
   - Afficher la barre de progression (0% → 100%)
   - Prendre ~2.2 secondes
   - Rediriger automatiquement vers `/accueil`
   - **PAS rester bloqué à 0%**

---

## 📝 Commandes Utiles pour Tester

```bash
# Effacer le cache .next et rebuilder
Remove-Item -Recurse -Force ".next" 2>$null; npm run build

# Démarrer le dev server
npm run dev

# Accéder à l'app
# http://localhost:3000/
```

---

## 🔍 Prochaines Étapes (Si Problème Persiste)

1. **Vérifier le Network tab** dans DevTools
   - Le `/` devrait être servi avec Status 200 (pas 304, 304, 304...)
   - Les requêtes ne doivent pas se répéter en boucle

2. **Vérifier le Console**
   - Pas d'erreurs Firebase non-catchées
   - Message `✓ Push notifications ready` une seule fois

3. **Profiler React DevTools**
   - Vérifier que les composants n'ont pas de re-renders infinis
   - Les Providers doivent rendre une seule fois

4. **Firestore Rules**
   - Si le splash charge mais ne redirige pas: problème Firebase
   - Voir `FIREBASE_RULES_FIX.md`

---

## ✅ Résumé des Fichiers Modifiés

| Fichier | Fix | Type |
|---------|-----|------|
| `public/sw.js` | Network-first pour HTML, skip install cache | SW Config |
| `context/ThemeContext.tsx` | useMemo pour value object | Memory Leak |
| `context/VisibilityContext.tsx` | useMemo pour value object | Memory Leak |
| `context/ToastContext.tsx` | useMemo pour value object | Memory Leak |
| `app/login/page.tsx` | Dépendances useEffect vides | Infinite Loop |
| `lib/notifications.ts` | getMessaging(app) | Firebase Init |
| `components/layout/Footer.tsx` | Cleanup imports | Code Quality |

---

**Status**: ✅ COMPLET - Splash screen devrait maintenant fonctionner correctement
