sx// Service Worker for Push Notifications
const CACHE_NAME = "cooktail-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  // Network first for navigation requests
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response("Offline");
      })
    );
    return;
  }

  // Cache first for other requests
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        return new Response("Offline");
      })
  );
});

// Push Notification Handler
self.addEventListener("push", (event) => {
  if (!event.data) {
    console.log("Push notification received but no data");
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body || "Nouvelle notification de Cook'Tail Service",
    icon: "/logo.png",
    badge: "/logo.png",
    tag: data.tag || "cooktail-notification",
    requireInteraction: data.requireInteraction || false,
    data: {
      url: data.url || "/",
      ...data,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Cook'Tail Service", options)
  );
});

// Notification Click Handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if window already open
        for (const client of clientList) {
          if (client.url === event.notification.data.url && "focus" in client) {
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});

// Notification Close Handler
self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event.notification.tag);
});
