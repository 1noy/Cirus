/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Configuration fallback (identique à src/utils/firebase.js)
const fallbackConfig = {
  apiKey: 'AIzaSyDW3ze_OVVjr5I79e0zqDbvnOUi2YRnPFA',
  authDomain: 'chat-changing.firebaseapp.com',
  projectId: 'chat-changing',
  storageBucket: 'chat-changing.appspot.com',
  messagingSenderId: '38586122759',
  appId: '1:38586122759:web:07e8309564df8ce71aa0a2',
};

// Permet de surcharger via self.__FIREBASE_CONFIG posté depuis l'app si besoin
const cfg = self.__FIREBASE_CONFIG || fallbackConfig;
firebase.initializeApp(cfg);
try {
  console.info('[SW] Firebase config projectId=', cfg?.projectId || 'missing');
} catch {}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Nouveau message';
  const options = {
    body: payload.notification?.body,
    icon: '/icon-192x192.png',
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);
});

// Réception de la config depuis l'app si fournie
self.addEventListener('message', (event) => {
  if (event.data?.type === 'FIREBASE_CONFIG') {
    self.__FIREBASE_CONFIG = event.data.payload;
  }
});


