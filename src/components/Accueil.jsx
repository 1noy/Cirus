import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import {
  collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp,
  doc, getDoc
} from 'firebase/firestore';
import {
  Box, Typography, TextField, List, ListItem, Avatar, Paper, InputAdornment,
  IconButton, Divider, Fade, Slide, useMediaQuery, Switch
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ToastContext } from '../App';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

function getConvIdForUsers(uid1, uid2) {
  return [uid1, uid2].sort().join('_');
}

function formatDate(date) {
  const now = new Date();
  const d = date instanceof Date ? date : date.toDate();
  if (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  ) return "Aujourd'hui";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  ) return "Hier";
  return d.toLocaleDateString();
}

export default function Chat() {
  const { id: otherUid } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [convId, setConvId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'dark');
  const user = auth.currentUser;
  const messagesEndRef = useRef(null);
  const { showToast } = useContext(ToastContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simule la présence en ligne
  function isOnline(u) {
    return u && u.uid && (u.uid.charCodeAt(0) % 3 === 0);
  }

  // Récupérer l'utilisateur cible
  useEffect(() => {
    async function fetchUser() {
      const docSnap = await getDoc(doc(db, 'users', otherUid));
      setOtherUser(docSnap.exists() ? docSnap.data() : null);
    }
    fetchUser();
  }, [otherUid]);

  // Créer ou récupérer la conversation FIABLEMENT
  useEffect(() => {
    if (!user || !otherUid) return;
    async function getOrCreateConv() {
      const convId = getConvIdForUsers(user.uid, otherUid);
      setConvId(convId);
    }
    getOrCreateConv();
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

  // Saisie en cours (statut “en train d’écrire…”)
  useEffect(() => {
    if (!input) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timeout);
  }, [input]);

  // Envoi d'un message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !convId) return;
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
  };

  // Regroupement des messages par date
  const grouped = messages.reduce((acc, msg) => {
    const d = msg.createdAt?.toDate ? formatDate(msg.createdAt) : '';
    if (!acc[d]) acc[d] = [];
    acc[d].push(msg);
    return acc;
  }, {});

  // Thème sombre/clair
  const muiTheme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'dark'
        ? {
            background: { default: '#181828', paper: '#23233a' },
            primary: { main: '#4fc3f7' }
          }
        : {
            background: { default: '#f7f9fb', paper: '#fff' },
            primary: { main: '#1976d2' }
          }),
    },
  });

  const handleThemeToggle = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: muiTheme.palette.background.default,
        minHeight: 0,
        height: '100vh'
      }}>
        {/* Header */}
        <Paper elevation={8} sx={{
          position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 2,
          bgcolor: muiTheme.palette.background.paper, p: 2, mb: 2, borderRadius: 0, boxShadow: '0 4px 24px #0006',
          display: 'flex', alignItems: 'center', gap: 2
        }}>
          <Avatar src={otherUser?.photo} sx={{ width: 48, height: 48, mr: 1, border: '2px solid #4fc3f7' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: muiTheme.palette.primary.main, letterSpacing: 1 }}>
              {otherUser?.pseudo || otherUser?.email || 'Utilisateur'}
            </Typography>
            {isOnline(otherUser) && (
              <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 500 }}>
                En ligne
              </Typography>
            )}
          </Box>
          <Box flex={1} />
          <Switch checked={themeMode === 'dark'} onChange={handleThemeToggle} />
        </Paper>

        {/* Liste des messages */}
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          px: isMobile ? 1 : 6,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5
        }}>
          {Object.entries(grouped).map(([date, msgs]) => (
            <React.Fragment key={date}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Divider sx={{ flex: 1, bgcolor: muiTheme.palette.primary.main, opacity: 0.15 }} />
                <Typography sx={{ mx: 2, color: muiTheme.palette.primary.main, fontWeight: 700 }}>{date}</Typography>
                <Divider sx={{ flex: 1, bgcolor: muiTheme.palette.primary.main, opacity: 0.15 }} />
              </Box>
              {msgs.map((msg, idx) => {
                const isMine = msg.from === user.uid;
                return (
                  <Slide direction={isMine ? "left" : "right"} in={true} mountOnEnter unmountOnExit key={msg.id}>
                    <Fade in={true} timeout={400 + idx * 60}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: isMine ? 'flex-end' : 'flex-start',
                          alignItems: 'flex-end',
                          mb: 0.5
                        }}
                      >
                        {!isMine && (
                          <Avatar src={msg.photo} sx={{ width: 32, height: 32, mr: 1 }} />
                        )}
                        <Paper
                          elevation={6}
                          sx={{
                            bgcolor: isMine
                              ? muiTheme.palette.mode === 'dark'
                                ? 'linear-gradient(90deg,#4fc3f7 80%,#1976d2 100%)'
                                : 'linear-gradient(90deg,#1976d2 80%,#4fc3f7 100%)'
                              : muiTheme.palette.background.paper,
                            color: isMine ? '#222' : muiTheme.palette.text.primary,
                            px: 2,
                            py: 1.2,
                            borderRadius: 3,
                            maxWidth: 320,
                            minWidth: 40,
                            boxShadow: isMine ? '0 2px 8px #4fc3f7aa' : '0 2px 8px #23233a88',
                            fontSize: 16,
                            fontWeight: 500,
                            textAlign: 'left',
                            wordBreak: 'break-word',
                            position: 'relative',
                            transition: 'background 0.2s',
                            borderBottomRightRadius: isMine ? 8 : 24,
                            borderBottomLeftRadius: isMine ? 24 : 8,
                          }}
                        >
                          {msg.text}
                          <Typography variant="caption" sx={{
                            display: 'block',
                            color: isMine ? '#1976d2' : '#bbb',
                            mt: 0.5,
                            textAlign: 'right'
                          }}>
                            {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </Typography>
                        </Paper>
                        {isMine && (
                          <Avatar src={msg.photo} sx={{ width: 32, height: 32, ml: 1 }} />
                        )}
                      </Box>
                    </Fade>
                  </Slide>
                );
              })}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Statut “en train d’écrire…” */}
        {isTyping && (
          <Fade in={isTyping}>
            <Typography variant="body2" align="center" sx={{ color: muiTheme.palette.primary.main, mb: 1 }}>
              {user.displayName || 'Vous'} est en train d’écrire...
            </Typography>
          </Fade>
        )}

        {/* Champ de saisie */}
        <Paper elevation={8} sx={{
          width: '100%',
          maxWidth: 700,
          bgcolor: muiTheme.palette.background.paper,
          p: 2,
          borderRadius: 4,
          boxShadow: '0 4px 24px #0006',
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mx: 'auto'
        }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 12, flex: 1 }}>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Écris ton message..."
              fullWidth
              sx={{ bgcolor: muiTheme.palette.mode === 'dark' ? '#181828' : '#f7f9fb', borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" color="primary" size="large"
                      sx={{ transition: 'transform 0.2s', '&:hover': { bgcolor: '#4fc3f7', color: '#222', transform: 'scale(1.15)' } }}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
} 