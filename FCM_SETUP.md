# Firebase Cloud Messaging (FCM) Setup Guide

## Overview
This project is configured for push notifications using Firebase Cloud Messaging (FCM). The setup includes:
- Service Worker for offline support and background notifications
- Firebase Cloud Messaging client SDK
- React hooks for easy integration in components
- Push notification utilities

## Prerequisites
- Firebase project already created
- Firebase Admin SDK configured (for server-side delivery)
- Service Worker registration enabled (✓ automatic)

## Setup Steps

### 1. Get Firebase Cloud Messaging Configuration

#### Step 1.1: Get VAPID Key
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** (⚙️ icon)
4. Click on **Cloud Messaging** tab
5. Under "Web configuration", you'll see:
   - **Sender ID** → Already in `.env` as `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - **Server API Key** → For backend delivery (optional)
   - **Web Push Certificates** → Generate if needed

#### Step 1.2: Generate VAPID Key (if not already generated)
1. In the Cloud Messaging tab, click **"Generate Key Pair"**
2. Copy the generated VAPID key

### 2. Add Environment Variables

Update `.env.local` with your Firebase credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Cloud Messaging (Push Notifications)
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### 3. Service Worker Registration

The Service Worker (`/public/sw.js`) is automatically registered when:
- App initializes (via `NotificationInitializer` component in `app/layout.tsx`)
- Browser supports Service Workers (check via `navigator.serviceWorker`)

✓ **Already implemented** - No additional setup needed

### 4. Enable Push Notifications in Components

#### Basic Usage with Hook

```typescript
'use client';

import { usePushNotifications } from '@/lib/hooks/usePushNotifications';

export function NotificationButton() {
  const { token, loading, error, isEnabled, requestPermission, unsubscribe } = usePushNotifications();

  const handleEnable = async () => {
    const newToken = await requestPermission();
    if (newToken) {
      console.log('✓ Notifications enabled');
      // Send token to backend to store for later delivery
    }
  };

  return (
    <>
      <button onClick={handleEnable} disabled={loading}>
        {isEnabled ? '✓ Notifications Enabled' : 'Enable Notifications'}
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
```

#### With Message Callback

```typescript
const handleNewMessage = (payload) => {
  console.log('Message received:', payload);
  // Handle foreground message
};

const { token } = usePushNotifications(handleNewMessage);
```

### 5. Send Push Notifications

#### Method 1: Firebase Console (Testing)

1. Go to Firebase Console → **Cloud Messaging**
2. Click **"Create your first campaign"**
3. Select "Send test message" or create a campaign
4. Add recipients (subscription tokens)
5. Send test notification

#### Method 2: Backend (Node.js/Python)

Using Firebase Admin SDK:

```javascript
// Example: Node.js with Firebase Admin SDK
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'your-project-id'
});

const message = {
  notification: {
    title: 'Cook\'Tail Service',
    body: 'Your reservation is confirmed!'
  },
  data: {
    reservationId: '12345',
    url: '/admin/reservations'
  },
  token: 'device_token_here'
};

admin.messaging()
  .send(message)
  .then((response) => console.log('Message sent:', response))
  .catch((error) => console.error('Error sending:', error));
```

#### Method 3: REST API

```bash
curl -X POST https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -d '{
    "message": {
      "token": "device_token",
      "notification": {
        "title": "Cook'\''Tail Service",
        "body": "Your reservation is confirmed!"
      }
    }
  }'
```

### 6. Store Device Tokens

After user grants permission, store their FCM token in Firestore for later delivery:

```typescript
'use client';

import { usePushNotifications } from '@/lib/hooks/usePushNotifications';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export function SaveNotificationToken() {
  const { token } = usePushNotifications();

  useEffect(() => {
    if (token && userId) {
      // Save token to Firestore
      setDoc(doc(db, 'users', userId, 'notifications', 'fcm'), {
        token,
        platform: 'web',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }, [token, userId]);

  return null;
}
```

### 7. Notification Handling

#### Foreground Notifications
When app is open, notifications are handled by the message listener:

```typescript
const handleMessage = (payload) => {
  const { notification, data } = payload;
  console.log('Foreground notification:', {
    title: notification.title,
    body: notification.body,
    data: data
  });
};

usePushNotifications(handleMessage);
```

#### Background Notifications
When app is closed/minimized, notifications are handled by Service Worker:
- User sees native notification
- Clicking notification opens app and navigates to specified URL
- Notification close is logged

### 8. Testing Notifications

#### Development Setup
1. Run the app: `npm run dev`
2. Open in browser: `http://localhost:3000`
3. Look for console logs confirming:
   - ✓ Service Worker registered
   - ✓ Firebase Cloud Messaging initialized
4. Test with Firebase Console test message

#### Checklist Before Production
- [ ] VAPID key configured in `.env.local`
- [ ] Service Worker loads at `/public/sw.js`
- [ ] `NotificationInitializer` component active in layout
- [ ] HTTPS enabled (required for Service Workers in production)
- [ ] User permission requested appropriately
- [ ] Backend ready to store and send tokens

## Files Created/Modified

- ✓ `lib/notifications.ts` - FCM initialization and utilities
- ✓ `lib/hooks/usePushNotifications.ts` - React hook for components
- ✓ `components/NotificationInitializer.tsx` - Auto-initialize on app load
- ✓ `public/sw.js` - Service Worker for background notifications
- ✓ `app/layout.tsx` - Added NotificationInitializer component
- ✓ `.env.local.example` - Added VAPID key template

## Troubleshooting

### "Service Worker registration failed"
- ✓ Make sure app is served over HTTPS (required except localhost)
- ✓ Check browser console for errors
- ✓ Verify `/public/sw.js` file exists

### "Permission denied"
- User declined notification permission
- Request permission with user gesture (button click)
- Explain why notifications are useful

### "Token not generated"
- ✓ Verify VAPID key in `.env.local`
- ✓ Check browser console for errors
- ✓ Confirm Firebase initialization successful

### "Notification not received"
- ✓ Check device token is stored in backend
- ✓ Verify Firebase project ID and credentials
- ✓ Check message format (title/body required)
- ✓ Confirm Service Worker running: Chrome DevTools → Application → Service Workers

## Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

## Next Steps

1. **Get VAPID key** from Firebase Console
2. **Update `.env.local`** with your configuration
3. **Test notifications** using Firebase Console
4. **Implement token storage** in your backend
5. **Set up server-side sending** when ready for production

---
Generated: Setup ready for Firebase Cloud Messaging integration
