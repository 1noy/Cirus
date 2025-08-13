import { doc, setDoc, onSnapshot, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

export const setOnline = async (userId) => {
  if (!userId) return;
  await setDoc(doc(db, 'presence', userId), {
    online: true,
    lastActive: serverTimestamp(),
  }, { merge: true });
};

export const setOffline = async (userId) => {
  if (!userId) return;
  await setDoc(doc(db, 'presence', userId), {
    online: false,
    lastActive: serverTimestamp(),
  }, { merge: true });
};

export const heartbeat = async (userId) => {
  if (!userId) return;
  await updateDoc(doc(db, 'presence', userId), {
    lastActive: serverTimestamp(),
  });
};

export const listenPresence = (userId, cb) => {
  if (!userId) return () => {};
  return onSnapshot(doc(db, 'presence', userId), (snap) => {
    cb(snap.exists() ? snap.data() : { online: false });
  });
};

export const getPresence = async (userId) => {
  const ref = doc(db, 'presence', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : { online: false };
};


