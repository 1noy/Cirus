import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc, getDocs } from 'firebase/firestore';
import { Box, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, Paper, InputAdornment, IconButton, Fade, Grow, Zoom, Chip, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ToastContext } from '../App';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Chat() {
  const { id: otherUid } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [convId, setConvId] = useState(null);
  const user = auth.currentUser;
  const messagesEndRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [reaction, setReaction] = useState({});
  const emojiList = ['🐟','💙','😂','😍','🔥','👍','😮','🥰'];
  const { showToast } = useContext(ToastContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simulation présence en ligne (à remplacer par une vraie logique temps réel)
  function isOnline(uid) {
    return Math.random() < 0.6;
  }

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
    if (!input.trim() || !convId) return;
    try {
      await addDoc(collection(db, 'conversations', convId, 'messages'), {
        text: input,
        from: user.uid,
        to: otherUid,
        createdAt: serverTimestamp(),
        pseudo: user.displayName || '',
        photo: user.photoURL || ''
      });
      setInput('');
      showToast('Message envoyé !', 'success');
    } catch (err) {
      showToast('Erreur lors de l\'envoi du message', 'error');
    }
  };

  const handleReaction = (msgId, emoji) => {
    setReaction(r => ({ ...r, [msgId]: emoji }));
    setShowEmoji(false);
    setSelectedMsg(null);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Fond animé aquatique */}
      <Box minHeight="100vh" width="100vw" sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'linear-gradient(135deg, #181828 60%, #1976d2 100%)',
        overflow: 'hidden',
      }}>
        <svg style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',zIndex:0,opacity:0.18}} viewBox="0 0 1440 320"><path fill="#4fc3f7" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </Box>
      <Box ml={isMobile ? 0 : 35} p={isMobile ? 1 : 0} minHeight="100vh" width="100vw" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header flottant */}
        <Paper elevation={8} sx={{ position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 2, bgcolor: '#23233a', p: 2, mb: 2, borderRadius: 0, boxShadow: '0 4px 24px #0006', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Zoom in={true}><Avatar src={otherUser?.photo} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #fff', boxShadow: '0 0 16px #4fc3f7' }} /></Zoom>
            <FiberManualRecordIcon sx={{ position: 'absolute', bottom: 4, right: 8, color: isOnline(otherUser?.uid) ? '#4caf50' : '#bbb', fontSize: 18, border: '2px solid #23233a', borderRadius: '50%' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#4fc3f7', letterSpacing: 1 }}>{otherUser?.pseudo || 'Utilisateur'}</Typography>
        </Paper>
        {/* Liste des messages */}
        <List sx={{ width: '100%', maxWidth: isMobile ? '98vw' : 700, minHeight: 400, maxHeight: isMobile ? '50vh' : '60vh', overflowY: 'auto', bgcolor: 'transparent', mb: 2, px: 0 }}>
          {messages.map((msg, idx) => (
            <Grow in={true} key={msg.id} timeout={400 + idx * 60}>
              <ListItem sx={{ justifyContent: msg.from === user.uid ? 'flex-end' : 'flex-start', display: 'flex', position: 'relative' }} disableGutters>
                {msg.from !== user.uid && (
                  <Zoom in={true}><Avatar src={msg.photo} sx={{ width: 40, height: 40, mr: 2, border: '2px solid #fff', boxShadow: '0 0 8px #4fc3f7' }} /></Zoom>
                )}
                <Paper elevation={6} sx={{
                  bgcolor: msg.from === user.uid ? 'linear-gradient(90deg,#4fc3f7 80%,#1976d2 100%)' : 'linear-gradient(90deg,#23233a 80%,#1976d2 100%)',
                  color: msg.from === user.uid ? '#222' : '#fff',
                  px: 3, py: 2, borderRadius: 4,
                  maxWidth: 400,
                  boxShadow: '0 2px 16px #0008',
                  mb: 1,
                  ml: msg.from === user.uid ? 8 : 0,
                  mr: msg.from !== user.uid ? 8 : 0,
                  fontWeight: 500,
                  fontSize: 18,
                  textAlign: msg.from === user.uid ? 'right' : 'left',
                  position: 'relative',
                  transition: 'background 0.3s',
                  borderBottom: '4px solid #4fc3f7',
                  animation: 'wave 1.2s cubic-bezier(.36,.07,.19,.97) both',
                  '@keyframes wave': {
                    '0%': { transform: 'translateY(30px) scale(0.95)', opacity: 0 },
                    '100%': { transform: 'translateY(0) scale(1)', opacity: 1 }
                  },
                  '&:hover': { boxShadow: '0 0 24px #4fc3f7', transform: 'scale(1.03)' },
                }}
                  onMouseEnter={() => { setShowEmoji(true); setSelectedMsg(msg.id); }}
                  onMouseLeave={() => { setShowEmoji(false); setSelectedMsg(null); }}
                >
                  {msg.text}
                  <Typography variant="caption" sx={{ display: 'block', color: msg.from === user.uid ? '#1976d2' : '#bbb', mt: 0.5, fontWeight: 400 }}>
                    {msg.pseudo}
                  </Typography>
                  {reaction[msg.id] && <Chip label={reaction[msg.id]} size="small" sx={{ position: 'absolute', bottom: -18, right: 8, bgcolor: '#fff', color: '#1976d2', fontWeight: 700, fontSize: 18 }} />}
                  {showEmoji && selectedMsg === msg.id && (
                    <Box sx={{ position: 'absolute', bottom: 36, right: 0, left: 0, display: 'flex', justifyContent: 'center', gap: 1, zIndex: 10 }}>
                      {emojiList.map(emoji => (
                        <Tooltip title={emoji} key={emoji}><IconButton onClick={() => handleReaction(msg.id, emoji)}>{emoji}</IconButton></Tooltip>
                      ))}
                    </Box>
                  )}
                </Paper>
                {msg.from === user.uid && (
                  <Zoom in={true}><Avatar src={msg.photo} sx={{ width: 40, height: 40, ml: 2, border: '2px solid #fff', boxShadow: '0 0 8px #4fc3f7' }} /></Zoom>
                )}
              </ListItem>
            </Grow>
          ))}
          <div ref={messagesEndRef} />
        </List>
        {/* Champ de saisie */}
        <Paper elevation={8} sx={{ width: '100%', maxWidth: 700, bgcolor: '#23233a', p: 2, borderRadius: 4, boxShadow: '0 4px 24px #0006', position: 'sticky', bottom: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 12, flex: 1 }}>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Écris ton message..."
              fullWidth
              sx={{ bgcolor: '#181828', borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" color="primary" size="large" sx={{ transition: 'transform 0.2s', '&:hover': { bgcolor: '#4fc3f7', color: '#222', transform: 'scale(1.15)' } }}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
          <IconButton color="secondary" onClick={() => setShowEmoji(e => !e)}>
            <EmojiEmotionsIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
} 