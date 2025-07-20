import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth, storage } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Box, Typography, TextField, List, ListItem, Avatar, Paper, InputAdornment, IconButton, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';

export default function Chat() {
  const { id: otherUid } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [convId, setConvId] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const user = auth.currentUser;
  const messagesEndRef = useRef(null);

  // Récupérer l'utilisateur cible
  useEffect(() => {
    async function fetchUser() {
      const docSnap = await getDoc(doc(db, 'users', otherUid));
      setOtherUser(docSnap.exists() ? docSnap.data() : null);
    }
    fetchUser();
  }, [otherUid]);

  // Créer ou récupérer la conversation
  useEffect(() => {
    if (!user || !otherUid) return;
    async function getOrCreateConv() {
      const convRef = collection(db, 'conversations');
      const q = query(convRef, where('members', 'array-contains', user.uid));
      let found = null;
      const snap = await getDocs(q);
      snap.forEach(docu => {
        const data = docu.data();
        if (data.members.includes(otherUid)) found = { id: docu.id, ...data };
      });
      if (found) {
        setConvId(found.id);
      } else {
        // Créer la conversation
        const newConv = await addDoc(convRef, {
          members: [user.uid, otherUid],
          users: [
            { uid: user.uid, pseudo: user.displayName || '', photo: user.photoURL || '' },
            { uid: otherUid, pseudo: otherUser?.pseudo || '', photo: otherUser?.photo || '' }
          ],
          createdAt: serverTimestamp()
        });
        setConvId(newConv.id);
      }
    }
    getOrCreateConv();
    // eslint-disable-next-line
  }, [user, otherUid, otherUser]);

  // Récupérer les messages en temps réel
  useEffect(() => {
    if (!convId) return;
    const q = query(collection(db, 'conversations', convId, 'messages'), orderBy('createdAt'));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = [];
      snap.forEach(doc => msgs.push({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsub();
  }, [convId]);

  // Scroll auto en bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !uploading) || !convId) return;
    await addDoc(collection(db, 'conversations', convId, 'messages'), {
      text: input,
      from: user.uid,
      to: otherUid,
      createdAt: serverTimestamp(),
      pseudo: user.displayName || '',
      photo: user.photoURL || ''
    });
    setInput('');
  };

  // Envoi d'image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !convId) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `chatImages/${convId}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, 'conversations', convId, 'messages'), {
        text: '',
        image: url,
        from: user.uid,
        to: otherUid,
        createdAt: serverTimestamp(),
        pseudo: user.displayName || '',
        photo: user.photoURL || ''
      });
    } catch (err) {
      alert('Erreur lors de l\'upload de l\'image');
    }
    setUploading(false);
  };

  // Ajout emoji
  const handleEmojiClick = (emojiData) => {
    setInput(input + emojiData.emoji);
    setShowEmoji(false);
  };

  // Affichage si aucun message
  const noMessage = messages.length === 0;

  return (
    <Box ml={35} p={0} minHeight="100vh" bgcolor="#181828" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start">
      {/* Header flottant */}
      <Paper elevation={6} sx={{ position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 2, bgcolor: '#23233a', p: 2, mb: 2, borderRadius: 0, boxShadow: '0 4px 24px #0006' }}>
        <Box display="flex" alignItems="center">
          <Avatar src={otherUser?.photo} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #fff' }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#4fc3f7' }}>{otherUser?.pseudo || 'Utilisateur'}</Typography>
        </Box>
      </Paper>
      {/* Liste des messages */}
      <List sx={{ width: '100%', maxWidth: 700, minHeight: 400, maxHeight: '60vh', overflowY: 'auto', bgcolor: 'transparent', mb: 2, px: 0 }}>
        {noMessage && (
          <Fade in={noMessage}>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={8}>
              <Typography variant="h6" color="#bbb" sx={{ mb: 2 }}>Aucun message pour l’instant</Typography>
              <Typography variant="body2" color="#888">Commence la conversation !</Typography>
            </Box>
          </Fade>
        )}
        {messages.map(msg => (
          <ListItem key={msg.id} sx={{ justifyContent: msg.from === user.uid ? 'flex-end' : 'flex-start', display: 'flex' }} disableGutters>
            {msg.from !== user.uid && (
              <Avatar src={msg.photo} sx={{ width: 40, height: 40, mr: 2, border: '2px solid #fff' }} />
            )}
            <Fade in>
              <Paper elevation={4} sx={{
                bgcolor: msg.from === user.uid ? '#4fc3f7' : '#23233a',
                color: msg.from === user.uid ? '#222' : '#fff',
                px: 3, py: 1.5, borderRadius: 4,
                maxWidth: 400,
                boxShadow: '0 2px 12px #0006',
                mb: 1,
                ml: msg.from === user.uid ? 8 : 0,
                mr: msg.from !== user.uid ? 8 : 0,
                fontWeight: 500,
                fontSize: 17,
                textAlign: msg.from === user.uid ? 'right' : 'left',
                transition: 'background 0.2s',
              }}>
                {msg.text}
                {msg.image && (
                  <Box mt={1}>
                    <img src={msg.image} alt="envoyé" style={{ maxWidth: 200, borderRadius: 8 }} />
                  </Box>
                )}
                <Typography variant="caption" sx={{ display: 'block', color: msg.from === user.uid ? '#1976d2' : '#bbb', mt: 0.5, fontWeight: 400 }}>
                  {msg.pseudo}
                </Typography>
              </Paper>
            </Fade>
            {msg.from === user.uid && (
              <Avatar src={msg.photo} sx={{ width: 40, height: 40, ml: 2, border: '2px solid #fff' }} />
            )}
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      {/* Champ de saisie */}
      <Paper elevation={6} sx={{ width: '100%', maxWidth: 700, bgcolor: '#23233a', p: 2, borderRadius: 4, boxShadow: '0 4px 24px #0006', position: 'sticky', bottom: 0 }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <IconButton component="label" color="primary" disabled={uploading}>
            <ImageIcon />
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </IconButton>
          <IconButton color="primary" onClick={() => setShowEmoji(v => !v)}>
            <EmojiEmotionsIcon />
          </IconButton>
          {showEmoji && (
            <Box position="absolute" bottom={70} left={40} zIndex={10}>
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </Box>
          )}
          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Écris ton message..."
            fullWidth
            sx={{ bgcolor: '#181828', borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary" size="large" disabled={uploading}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Paper>
    </Box>
  );
}