import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Chargement sécurisé via variables d'environnement Vite
const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Fallback vers ancienne config si env absent (pour ne pas casser le dev local)
const fallbackConfig = {
  apiKey: 'AIzaSyDW3ze_OVVjr5I79e0zqDbvnOUi2YRnPFA',
  authDomain: 'chat-changing.firebaseapp.com',
  projectId: 'chat-changing',
  storageBucket: 'chat-changing.appspot.com',
  messagingSenderId: '38586122759',
  appId: '1:38586122759:web:07e8309564df8ce71aa0a2',
  measurementId: 'G-NTW1DN98K3',
};

const hasAllEnv = Object.values({
  apiKey: envConfig.apiKey,
  authDomain: envConfig.authDomain,
  projectId: envConfig.projectId,
  storageBucket: envConfig.storageBucket,
  messagingSenderId: envConfig.messagingSenderId,
  appId: envConfig.appId,
}).every(Boolean);

const firebaseConfig = hasAllEnv ? envConfig : fallbackConfig;
if (!hasAllEnv) {
  console.warn('[Firebase] Variables .env incomplètes, utilisation de la configuration de secours.');
}

try {
  const safeProjectId = firebaseConfig?.projectId || 'missing';
  console.info(`[Firebase] Config détectée: projectId=${safeProjectId}, hasAllEnv=${hasAllEnv}`);
} catch {}

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
auth.useDeviceLanguage();
export const googleProvider = new GoogleAuthProvider();

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
export const storage = getStorage(app);

export const ensureFirebaseReady = async () => auth.authStateReady();

export { app };

