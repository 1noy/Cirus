import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  enableIndexedDbPersistence,
  initializeFirestore,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { onSnapshot } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDW3ze_OVVjr5I79e0zqDbvnOUi2YRnPFA',
  authDomain: 'chat-changing.firebaseapp.com',
  projectId: 'chat-changing',
  storageBucket: 'chat-changing.appspot.com',
  messagingSenderId: '38586122759',
  appId: '1:38586122759:web:07e8309564df8ce71aa0a2',
  measurementId: 'G-NTW1DN98K3',
};

// Initialisation de l'application Firebase avec gestion d'erreur
let app;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error("Erreur d'initialisation Firebase:", error);
  throw new Error("Impossible d'initialiser Firebase");
}

export const auth = getAuth(app);

// Initialiser Firestore avec cache configuré
export const db = initializeFirestore(app, {
  cacheSizeBytes: 50 * 1024 * 1024, // 50MB
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const storage = getStorage(app);

// Configuration pour désactiver les redirections automatiques
auth.useDeviceLanguage();

// Activation de la persistance hors ligne pour Firestore
enableIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') {
    console.warn(
      'Persistance hors ligne non disponible - plusieurs onglets ouverts'
    );
  } else if (err.code === 'unimplemented') {
    console.warn('Persistance hors ligne non supportée par ce navigateur');
  }
});

// Système de debouncing pour optimiser les requêtes
class FirebaseDebouncer {
  constructor() {
    this.pendingRequests = new Map();
    this.debounceTime = 300; // 300ms
  }

  debounce(key, callback) {
    if (this.pendingRequests.has(key)) {
      clearTimeout(this.pendingRequests.get(key));
    }

    const timeoutId = setTimeout(() => {
      this.pendingRequests.delete(key);
      callback();
    }, this.debounceTime);

    this.pendingRequests.set(key, timeoutId);
  }

  cancel(key) {
    if (this.pendingRequests.has(key)) {
      clearTimeout(this.pendingRequests.get(key));
      this.pendingRequests.delete(key);
    }
  }

  clear() {
    this.pendingRequests.forEach(timeoutId => clearTimeout(timeoutId));
    this.pendingRequests.clear();
  }
}

export const firebaseDebouncer = new FirebaseDebouncer();

// Fonction utilitaire pour créer des listeners throttled
export const createThrottledListener = (query, callback, throttleMs = 1000) => {
  let lastCall = 0;
  let timeoutId = null;

  return onSnapshot(query, snapshot => {
    const now = Date.now();

    if (now - lastCall < throttleMs) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          callback(snapshot);
          lastCall = Date.now();
        },
        throttleMs - (now - lastCall)
      );
    } else {
      callback(snapshot);
      lastCall = now;
    }
  });
};

// Vérification de la connexion Firebase
export const checkFirebaseConnection = async () => {
  try {
    await auth.authStateReady();
    return true;
  } catch (error) {
    console.error('Erreur de connexion Firebase:', error);
    return false;
  }
};

// Gestion des erreurs d'authentification
export const handleAuthError = async error => {
  console.error("Erreur d'authentification:", error);

  switch (error.code) {
    case 'auth/user-not-found':
      return 'Utilisateur non trouvé';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect';
    case 'auth/email-already-in-use':
      return 'Email déjà utilisé';
    case 'auth/weak-password':
      return 'Mot de passe trop faible';
    case 'auth/invalid-email':
      return 'Email invalide';
    default:
      return "Erreur d'authentification";
  }
};

// Wrapper pour les opérations avec retry
export const withAuthRetry = async (operation, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
