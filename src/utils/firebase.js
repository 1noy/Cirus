import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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
  measurementId: 'G-NTW1DN98K3'
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
  console.error('Erreur d\'initialisation Firebase:', error);
  throw new Error('Impossible d\'initialiser Firebase');
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

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

// Optimisation des listeners avec throttling
export const createThrottledListener = (query, callback, throttleMs = 1000) => {
  let lastCall = 0;
  let timeoutId = null;

  return onSnapshot(query, (snapshot) => {
    const now = Date.now();
    
    if (now - lastCall < throttleMs) {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        callback(snapshot);
        lastCall = Date.now();
      }, throttleMs - (now - lastCall));
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