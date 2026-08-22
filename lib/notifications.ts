// lib/notifications.ts
// Firebase Cloud Messaging (FCM) setup for push notifications

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import app from './firebase';

let messaging: any = null;

/**
 * Initialize Firebase Cloud Messaging
 * Must be called from a client component after DOM is ready
 */
export const initializeFCM = async () => {
  if (typeof window === 'undefined') {
    console.warn('FCM can only be initialized on client');
    return null;
  }

  try {
    // Already initialized
    if (messaging) {
      return messaging;
    }

    // Initialize messaging
    messaging = getMessaging(app);
    console.log('Firebase Cloud Messaging initialized');
    
    return messaging;
  } catch (error) {
    console.error('Error initializing FCM:', error);
    return null;
  }
};

/**
 * Request permission and get FCM token
 * Call after user grants notification permission
 */
export const getFCMToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // Initialize if not already done
    if (!messaging) {
      await initializeFCM();
    }

    if (!messaging) {
      throw new Error('Firebase Messaging not initialized');
    }

    // Request notification permission
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });

      if (token) {
        console.log('FCM Token:', token);
        // Store token for server-side delivery
        localStorage.setItem('fcm_token', token);
        return token;
      }
    } else {
      console.warn('Notification permission denied');
    }

    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Listen for incoming messages (foreground notifications)
 * Call after user grants notification permission
 */
export const setupMessageListener = async (
  callback?: (payload: any) => void
) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Initialize if not already done
    if (!messaging) {
      await initializeFCM();
    }

    if (!messaging) {
      throw new Error('Firebase Messaging not initialized');
    }

    // Listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);

      // Extract notification data
      const { notification, data } = payload;
      
      // Show browser notification if not already showing one
      if (Notification.permission === 'granted' && notification) {
        new Notification(notification.title || 'Cook\'Tail Service', {
          body: notification.body,
          icon: notification.icon || '/logo.png',
          badge: '/logo.png',
          tag: 'cooktail-notification',
          data: data || {}
        });
      }

      // Call custom callback if provided
      if (callback) {
        callback(payload);
      }
    });

    console.log('Message listener setup complete');
  } catch (error) {
    console.error('Error setting up message listener:', error);
  }
};

/**
 * Register service worker for offline support and background notifications
 */
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);
      return registration;
    } else {
      console.warn('Service Workers not supported');
      return null;
    }
  } catch (error) {
    console.error('Error registering service worker:', error);
    return null;
  }
};

/**
 * Unsubscribe from push notifications
 */
export const unsubscribeFromNotifications = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem('fcm_token');
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          // Unsubscribe from push notifications
          registration.pushManager?.getSubscription().then((subscription) => {
            if (subscription) {
              subscription.unsubscribe();
            }
          });
        });
      });
    }

    console.log('Unsubscribed from notifications');
  } catch (error) {
    console.error('Error unsubscribing:', error);
  }
};

/**
 * Get stored FCM token
 */
export const getStoredFCMToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('fcm_token');
};

/**
 * Check if notifications are supported and enabled
 */
export const areNotificationsEnabled = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return 'Notification' in window && Notification.permission === 'granted';
};
