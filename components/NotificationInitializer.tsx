// components/NotificationInitializer.tsx
// Client-side component to initialize push notifications on app load

'use client';

import { useEffect } from 'react';
import { registerServiceWorker, initializeFCM } from '@/lib/notifications';

export function NotificationInitializer() {
  useEffect(() => {
    const init = async () => {
      // Only run on client
      if (typeof window === 'undefined') return;

      try {
        // Register service worker for offline support and background notifications
        await registerServiceWorker();
        
        // Initialize Firebase Cloud Messaging (but don't request permissions yet)
        // User will grant permissions when needed (e.g., in admin dashboard)
        await initializeFCM();
        
        console.log('✓ Push notifications ready');
      } catch (error) {
        console.error('Error initializing notifications:', error);
      }
    };

    init();
  }, []);

  // This component doesn't render anything
  return null;
}


