import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  limit,
  startAfter,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../utils/firebase';

export const listenUserChats = (userId, cb) => {
  const q = query(
    collection(db, 'chats'),
    where('participants', 'array-contains', userId)
  );
  return onSnapshot(q, (snap) => {
    const items = [];
    snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
    items.sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0));
    cb(items);
  });
};

export const listenChatById = (chatId, cb) => {
  if (!chatId) return () => {};
  const chatRef = doc(db, 'chats', chatId);
  return onSnapshot(chatRef, (snap) => {
    cb(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  });
};

export const ensureDMChat = async (userA, userB) => {
  // Try to find existing DM chat
  const q = query(
    collection(db, 'chats'),
    where('type', '==', 'dm'),
    where('participants', 'array-contains', userA)
  );
  const snap = await getDocs(q);
  for (const d of snap.docs) {
    const chat = { id: d.id, ...d.data() };
    if (chat.participants.includes(userB)) return chat.id;
  }
  // Create new
  const chatRef = await addDoc(collection(db, 'chats'), {
    type: 'dm',
    participants: [userA, userB],
    createdAt: Date.now(),
    lastMessage: null,
    lastMessageAt: Date.now(),
  });
  return chatRef.id;
};

export const createGroupChat = async (ownerId, title, participantIds) => {
  const chatRef = await addDoc(collection(db, 'chats'), {
    type: 'group',
    title,
    participants: Array.from(new Set([ownerId, ...participantIds])),
    createdAt: Date.now(),
    lastMessage: null,
    lastMessageAt: Date.now(),
  });
  return chatRef.id;
};

export const createChannel = async (ownerId, title) => {
  const chatRef = await addDoc(collection(db, 'chats'), {
    type: 'channel',
    title,
    ownerId,
    participants: [ownerId],
    createdAt: Date.now(),
    lastMessage: null,
    lastMessageAt: Date.now(),
  });
  return chatRef.id;
};

export const listenMessages = (chatId, cb) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc')
  );
  return onSnapshot(q, (snap) => {
    const items = [];
    snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
    cb(items);
  });
};

export const fetchRecentMessages = async (chatId, pageSize = 50) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  return snap;
};

export const listenRecentMessages = (chatId, pageSize = 50, cb) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(pageSize)
  );
  return onSnapshot(q, cb);
};

export const fetchOlderMessages = async (chatId, lastDoc, pageSize = 50) => {
  if (!lastDoc) return { docs: [] };
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'desc'),
    startAfter(lastDoc),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  return snap;
};

export const sendTextMessage = async (chatId, senderId, content, replyTo = null) => {
  const msg = {
    content,
    senderId,
    timestamp: serverTimestamp(),
    type: 'text',
    status: 'sent',
    replyTo: replyTo || null,
  };
  await addDoc(collection(db, 'chats', chatId, 'messages'), msg);
  await updateDoc(doc(db, 'chats', chatId), {
    lastMessage: content,
    lastMessageAt: Date.now(),
  });
};

export const sendMediaMessage = async (chatId, senderId, file) => {
  const path = `uploads/${chatId}/${Date.now()}_${file.name}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  const msg = {
    content: url,
    senderId,
    timestamp: serverTimestamp(),
    type: 'media',
    fileName: file.name,
    size: file.size,
    mimeType: file.type,
    status: 'sent',
  };
  await addDoc(collection(db, 'chats', chatId, 'messages'), msg);
  await updateDoc(doc(db, 'chats', chatId), {
    lastMessage: 'Fichier média',
    lastMessageAt: Date.now(),
  });
};

export const addReactionToMessage = async (chatId, messageId, userId, emoji) => {
  const msgRef = doc(db, 'chats', chatId, 'messages', messageId);
  await updateDoc(msgRef, {
    [`reactions.${userId}`]: emoji,
  });
};

export const editMessage = async (chatId, messageId, newContent) => {
  const msgRef = doc(db, 'chats', chatId, 'messages', messageId);
  await updateDoc(msgRef, { content: newContent, edited: true, editedAt: Date.now() });
};

export const deleteMessage = async (chatId, messageId) => {
  const msgRef = doc(db, 'chats', chatId, 'messages', messageId);
  // soft delete to keep thread continuity
  await updateDoc(msgRef, { content: 'Message supprimé', deleted: true, deletedAt: Date.now() });
};

export const markRead = async (chatId, messageId, userId) => {
  const msgRef = doc(db, 'chats', chatId, 'messages', messageId);
  await updateDoc(msgRef, { [`reads.${userId}`]: true });
};

export const isMessageReadByOthers = (message, userId) => {
  const reads = message.reads || {};
  return Object.entries(reads).some(([uid, v]) => uid !== userId && v);
};

export const pinMessage = async (chatId, message) => {
  await updateDoc(doc(db, 'chats', chatId), {
    pinned: {
      id: message.id,
      content: message.content?.slice(0, 140) || '',
      senderId: message.senderId,
      timestamp: Date.now(),
      type: message.type || 'text',
    },
  });
};

export const unpinMessage = async (chatId) => {
  await updateDoc(doc(db, 'chats', chatId), { pinned: null });
};

export const fetchRecentMedia = async (chatId, pageSize = 24) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    where('type', '==', 'media'),
    orderBy('timestamp', 'desc'),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const setTyping = async (chatId, userId, typing) => {
  await setDoc(doc(db, 'chats', chatId, 'typing', userId), {
    typing: !!typing,
    updatedAt: Date.now(),
  });
};

export const listenTyping = (chatId, cb) => {
  return onSnapshot(collection(db, 'chats', chatId, 'typing'), (snap) => {
    const map = {};
    snap.forEach((d) => (map[d.id] = d.data().typing));
    cb(map);
  });
};


