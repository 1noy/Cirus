import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW3ze_OVVjr5I79e0zqDbvnOUi2YRnPFA",
  authDomain: "chat-changing.firebaseapp.com",
  projectId: "chat-changing",
  storageBucket: "chat-changing.appspot.com",
  messagingSenderId: "38586122759",
  appId: "1:38586122759:web:07e8309564df8ce71aa0a2",
  measurementId: "G-NTW1DN98K3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 