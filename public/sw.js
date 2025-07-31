// Service Worker pour CirusChat PWA
const CACHE_NAME = 'cirus-chat-v1.0.1';
const STATIC_CACHE = 'static-v1.0.1';
const DYNAMIC_CACHE = 'dynamic-v1.0.1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/offline.html'
];

const STATIC_ASSETS = [
  '/src/styles/cyberpunk.css',
  '/src/styles/global.css'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Cache statique ouvert');
        return cache.addAll(urlsToCache);
      }),
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log('Cache dynamique ouvert');
        return cache.addAll(STATIC_ASSETS);
      })
    ]).catch((error) => {
      console.error('Erreur lors de l\'installation du cache:', error);
    })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Stratégie de cache pour les ressources statiques
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }

          return fetch(request)
            .then((response) => {
              // Vérifier si la réponse est valide
              if (!response || response.status !== 200) {
                return response;
              }

              // Cloner la réponse pour la mettre en cache
              const responseToCache = response.clone();

              // Choisir le cache approprié selon le type de ressource
              const cacheName = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
              
              caches.open(cacheName)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // En cas d'erreur réseau, retourner la page offline
              if (request.mode === 'navigate') {
                return caches.match('/offline.html');
              }
            });
        })
    );
  }
});

// Fonction pour déterminer si une ressource est statique
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf'];
  return staticExtensions.some(ext => url.includes(ext));
}

// Gestion des messages du Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 