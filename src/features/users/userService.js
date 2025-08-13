import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where, orderBy, startAt, endAt } from 'firebase/firestore';
import { db } from '../../utils/firebase';

export const ensureUserDoc = async (user) => {
  if (!user?.uid) return;
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  const payload = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || 'Utilisateur',
    photoURL: user.photoURL || null,
    updatedAt: Date.now(),
  };
  if (!snap.exists()) {
    await setDoc(ref, { ...payload, createdAt: Date.now() });
  } else {
    await setDoc(ref, payload, { merge: true });
  }
};

export const searchUsersByDisplayName = async (prefix) => {
  if (!prefix) return [];
  const q = query(
    collection(db, 'users'),
    orderBy('displayName'),
    startAt(prefix),
    endAt(prefix + '\uf8ff')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getUserById = async (userId) => {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const listenUserById = (userId, cb) => {
  if (!userId) return () => {};
  const ref = doc(db, 'users', userId);
  return onSnapshot(ref, (snap) => cb(snap.exists() ? { id: snap.id, ...snap.data() } : null));
};


