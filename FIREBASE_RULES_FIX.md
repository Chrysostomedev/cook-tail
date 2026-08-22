# Firebase Firestore Rules - Fix Permission Errors

## Current Issue
You're seeing: **"Missing or insufficient permissions"** when trying to read data from Firebase.

This means your Firestore Security Rules are preventing reads. This is actually a GOOD thing for security, but we need to adjust them for development/testing.

## Solution: Update Firestore Rules

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com
2. Select your project: **cooktail-9681e**
3. Go to **Firestore Database** → **Rules**

### Step 2: Replace Rules with Development Rules

Replace ALL existing rules with this:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow authenticated users to read everything
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Allow public reads from specific collections (for public scan page)
    match /reservations/{document=**} {
      allow read: if true;
    }
    
    match /games/{document=**} {
      allow read: if true;
    }
    
    match /menuItems/{document=**} {
      allow read: if true;
    }
    
    match /services/{document=**} {
      allow read: if true;
    }
    
    match /statistics/{document=**} {
      allow read: if true;
    }
  }
}
```

### Step 3: Publish the Rules
- Click the **"Publish"** button
- Wait for deployment (usually 1-2 minutes)

## What This Does

✅ **Read Access**: Everyone can read public collections (games, menu, services, stats)  
✅ **Write Access**: Authenticated users can create/update/delete  
✅ **Public Scans**: `/scan` page can work without authentication

## For Production

Later, use more restrictive rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Admin rules
    match /admins/{document=**} {
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    // Public readable
    match /games/{document=**} {
      allow read: if true;
    }
    
    match /menuItems/{document=**} {
      allow read: if true;
    }
    
    match /services/{document=**} {
      allow read: if true;
    }
    
    // User reservations
    match /reservations/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId || request.auth != null;
    }
  }
}
```

## Testing After Update

1. Refresh your app: `npm run dev`
2. Go to `/admin/menu` - should now load menu items
3. Go to `/admin/services` - should now load services
4. Go to `/admin/dashboard` - should show reservations
5. Go to `/admin/statistics` - should show live stats
6. Go to `/scan` - public should be able to scan permits

## If Still Not Working

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Check browser console** for exact error
3. **Verify authentication** - Make sure you're logged in to `/admin` pages
4. **Wait for rule deployment** - Can take 2-3 minutes

## Files Modified

The code already handles permission errors gracefully:
- ✅ `lib/services/reservationService.ts` - Console logs for debugging
- ✅ `lib/services/menuService.ts` - Fallback to empty array
- ✅ `lib/services/servicesService.ts` - Fallback to empty array
- ✅ `lib/services/statisticsService.ts` - Fallback with 0 values

All pages show loading states and don't crash if Firebase fails.
