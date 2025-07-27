import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

// Initialisation de l'application Firebase
let app;
try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    } catch {
      throw new Error('Impossible d\'initialiser Firebase');
    }

// Export des services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 

// Vérification de la connexion
export const checkFirebaseConnection = async () => {
  try {
    await auth.authStateReady();
    return true;
  } catch {
    return false;
  }
}; 