import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { app } from '../../utils/firebase';

export const initNotifications = async (onForegroundMessage) => {
  const supported = await isSupported();
  if (!supported) return null;

  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    // Pousser la config Firebase au SW si besoin
    try {
      const cfg = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };
      if (Object.values(cfg).every(Boolean)) {
        reg.active?.postMessage({ type: 'FIREBASE_CONFIG', payload: cfg });
      }
    } catch {}
  }

  const messaging = getMessaging(app);
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
  try {
    const hasPermissionAPI = typeof globalThis !== 'undefined' && 'Notification' in globalThis && typeof globalThis.Notification?.requestPermission === 'function';
    const permission = await (hasPermissionAPI ? globalThis.Notification.requestPermission() : Promise.resolve('denied'));
    if (permission !== 'granted') return null;
    const token = await getToken(messaging, { vapidKey });
    onMessage(messaging, (payload) => {
      if (onForegroundMessage) onForegroundMessage(payload);
    });
    return token;
  } catch (e) {
    console.warn('Notifications non initialisées:', e);
    return null;
  }
};


