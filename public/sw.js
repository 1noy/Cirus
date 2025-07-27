const CACHE_NAME = 'chat-changing-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const API_CACHE = 'api-v3';

// Assets statiques critiques
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

// Assets dynamiques (lazy load)
const DYNAMIC_ASSETS = [
  '/audio-worker.js'
];

// Patterns pour les caches
const CACHE_PATTERNS = {
  static: /\.(js|css|svg|png|jpg|jpeg|webp|avif|woff|woff2|ttf|eot)$/,
  dynamic: /\.(json|xml|txt)$/,
  api: /\/api\//
};

// Stratégies de cache
const CACHE_STRATEGIES = {
  // Cache-first pour les assets statiques
  cacheFirst: async (request) => {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.status === 200) {
        await cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.warn('Cache-first failed:', error);
      return new Response('Offline content not available', { status: 503 });
    }
  },

  // Network-first pour les API
  networkFirst: async (request) => {
    const cache = await caches.open(API_CACHE);
    
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.status === 200) {
        await cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },

  // Stale-while-revalidate pour les assets dynamiques
  staleWhileRevalidate: async (request) => {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(async (networkResponse) => {
      if (networkResponse.status === 200) {
        await cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(() => cachedResponse);
    
    return cachedResponse || fetchPromise;
  }
};

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(DYNAMIC_CACHE).then(cache => cache.addAll(DYNAMIC_ASSETS))
    ]).then(() => {
      console.log('Service Worker installed successfully');
      return self.skipWaiting();
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== API_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes Firebase/Google API
  if (url.hostname.includes('firebase') || 
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('google.com')) {
    return;
  }
  
  // Stratégie selon le type de ressource
  if (CACHE_PATTERNS.static.test(url.pathname)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else if (CACHE_PATTERNS.api.test(url.pathname)) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else if (CACHE_PATTERNS.dynamic.test(url.pathname)) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
  } else {
    // Stratégie par défaut : network-first
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  }
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nouveau message reçu',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir le message',
        icon: '/favicon.svg'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/favicon.svg'
      }
    ],
    requireInteraction: false,
    silent: false,
    tag: 'chat-message'
  };

  event.waitUntil(
    self.registration.showNotification('Cirus Chat', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Fermer la notification
    return;
  } else {
    // Action par défaut
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Synchroniser les messages en attente
      syncMessages()
    );
  }
});

// Fonction de synchronisation des messages
async function syncMessages() {
  try {
    const cache = await caches.open('pending-messages');
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
        }
      } catch (error) {
        console.warn('Failed to sync message:', error);
      }
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Nettoyage périodique des caches
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupCache());
  }
});

// Fonction de nettoyage des caches
async function cleanupCache() {
  try {
    const cacheNames = await caches.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const date = response.headers.get('date');
          if (date && (now - new Date(date).getTime()) > maxAge) {
            await cache.delete(request);
          }
        }
      }
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
} 