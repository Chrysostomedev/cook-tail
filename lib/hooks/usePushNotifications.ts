// lib/hooks/usePushNotifications.ts
// Hook for managing push notifications in components

import { useEffect, useState } from 'react';
import {
  initializeFCM,
  getFCMToken,
  setupMessageListener,
  registerServiceWorker,
  getStoredFCMToken,
  areNotificationsEnabled,
  unsubscribeFromNotifications
} from '@/lib/notifications';

interface UsePushNotificationsReturn {
  token: string | null;
  loading: boolean;
  error: string | null;
  isEnabled: boolean;
  requestPermission: () => Promise<string | null>;
  unsubscribe: () => void;
}

/**
 * Hook to manage push notifications in React components
 * Automatically sets up FCM and service worker on mount
 * 
 * @param onMessageCallback - Optional callback when message is received in foreground
 * @returns Object with token, loading state, and control functions
 */
export const usePushNotifications = (
  onMessageCallback?: (payload: any) => void
): UsePushNotificationsReturn => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        setLoading(true);

        // Register service worker first (for offline support)
        await registerServiceWorker();

        // Initialize FCM
        await initializeFCM();

        // Check if notifications are already enabled
        if (areNotificationsEnabled()) {
          setIsEnabled(true);
          const storedToken = getStoredFCMToken();
          if (storedToken) {
            setToken(storedToken);
          }
        }

        // Setup message listener if callback provided
        if (onMessageCallback && isEnabled) {
          await setupMessageListener(onMessageCallback);
        }

        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error setting up notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    setupNotifications();
  }, []);

  const requestPermission = async (): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);

      const newToken = await getFCMToken();
      
      if (newToken) {
        setToken(newToken);
        setIsEnabled(true);
        
        // Setup message listener after getting token
        if (onMessageCallback) {
          await setupMessageListener(onMessageCallback);
        }
      }

      return newToken;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get token';
      setError(errorMessage);
      console.error('Error requesting permission:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = () => {
    try {
      unsubscribeFromNotifications();
      setToken(null);
      setIsEnabled(false);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unsubscribe';
      setError(errorMessage);
      console.error('Error unsubscribing:', err);
    }
  };

  return {
    token,
    loading,
    error,
    isEnabled,
    requestPermission,
    unsubscribe
  };
};
