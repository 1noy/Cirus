import React, { useEffect, useRef, useState, useContext } from 'react';
import { db, auth, storage } from '../firebase';
import {
  collection, query, orderBy, onSnapshot, addDoc, serverTimestamp,
  doc, getDoc, updateDoc, deleteDoc
} from 'firebase/firestore';
import {
  Box, Typography, TextField, Avatar, Paper, InputAdornment,
  IconButton, Divider, Fade, Slide, useMediaQuery, Switch, Menu, MenuItem, Tooltip, Dialog
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ToastContext } from '../App';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Picker from '@emoji-mart/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import GifBoxIcon from '@mui/icons-material/GifBox';
import ImageIcon from '@mui/icons-material/Image';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CircularProgress from '@mui/material/CircularProgress';

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

// Ajout d'une fonction pour transformer les liens en <a>
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7', textDecoration: 'underline' }}>{part}</a>
      : part
  );
}

export default function Chat({ otherUid }) {
  if (!otherUid) return null;

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [editMsg, setEditMsg] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiList = ['🐟','💙','😂','😍','��','👍','😮','🥰'];
  // Ajout d'un état pour l'indicateur "en train d'écrire" (simulé)
  const [otherTyping, setOtherTyping] = useState(false);
  const [sending, setSending] = useState(false);

  function isOnline(u) {
    return u && u.uid && (u.uid.charCodeAt(0) % 3 === 0);
  }

  useEffect(() => {
    async function fetchUser() {
      const docSnap = await getDoc(doc(db, 'users', otherUid));
      setOtherUser(docSnap.exists() ? docSnap.data() : null);
    }
    fetchUser();
  }, [otherUid]);

  useEffect(() => {
    if (!user || !otherUid) return;
    const convId = getConvIdForUsers(user.uid, otherUid);
    setConvId(convId);
  }, [user, otherUid]);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!input) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    if (attachment) {
      setAttachmentPreview(URL.createObjectURL(attachment));
    } else {
      setAttachmentPreview('');
    }
    return () => {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
    // eslint-disable-next-line
  }, [attachment]);

  // Simule l'indicateur "en train d'écrire" de l'autre utilisateur (pour la démo)
  useEffect(() => {
    if (!otherUid) return;
    // Simule que l'autre écrit de temps en temps
    const interval = setInterval(() => {
      setOtherTyping(Math.random() < 0.18);
    }, 4000);
    return () => clearInterval(interval);
  }, [otherUid]);

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !attachment) || !convId) return;
    setSending(true);
    try {
      let attachmentUrl = '';
      if (attachment) {
        const fileRef = ref(storage, `conversations/${convId}/${Date.now()}_${attachment.name}`);
        await uploadBytes(fileRef, attachment);
        attachmentUrl = await getDownloadURL(fileRef);
      }
      await addDoc(collection(db, 'conversations', convId, 'messages'), {
        text: input,
        from: user.uid,
        to: otherUid,
        createdAt: serverTimestamp(),
        pseudo: user.displayName || '',
        photo: user.photoURL || '',
        attachment: attachmentUrl
      });
      setInput('');
      setAttachment(null);
      setAttachmentPreview('');
      showToast('Message envoyé !', 'success');
    } catch (err) {
      console.error('Erreur lors de l’envoi du message :', err);
      showToast("Erreur lors de l'envoi du message. Vérifie ta connexion ou les droits Firebase.", 'error');
    }
    setSending(false);
  };

  const grouped = messages.reduce((acc, msg) => {
    const d = msg.createdAt?.toDate ? formatDate(msg.createdAt) : '';
    if (!acc[d]) acc[d] = [];
    acc[d].push(msg);
    return acc;
  }, {});

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

  const handleMenu = (event, msg) => {
    setAnchorEl(event.currentTarget);
    setSelectedMsg(msg);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMsg(null);
  };
  const handleEdit = (msg) => {
    setEditMsg(msg);
    setInput(msg.text);
    handleCloseMenu();
  };
  const handleDelete = async (msg) => {
    await deleteDoc(doc(db, 'conversations', convId, 'messages', msg.id));
    showToast('Message supprimé', 'info');
    handleCloseMenu();
  };
  const handleReaction = async (msg, emoji) => {
    const msgRef = doc(db, 'conversations', convId, 'messages', msg.id);
    const newReactions = { ...(msg.reactions || {}) };
    if (!newReactions[emoji]) newReactions[emoji] = [];
    if (newReactions[emoji].includes(user.uid)) {
      newReactions[emoji] = newReactions[emoji].filter(uid => uid !== user.uid);
    } else {
      newReactions[emoji].push(user.uid);
    }
    await updateDoc(msgRef, { reactions: newReactions });
  };
  const handleImageClick = (url) => {
    setLightboxImg(url);
    setLightboxOpen(true);
  };

  const handleEmojiSelect = (emoji) => {
    setInput(input + emoji.native);
    setShowEmoji(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: muiTheme.palette.background.default, minHeight: 0, height: '100vh', position: 'relative' }}>
        {/* Badge nom du contact en haut à droite */}
        {otherUser && (
          <Box sx={{ position: 'absolute', top: 18, right: 24, zIndex: 30 }}>
            <Typography
              variant="body1"
              sx={{
                bgcolor: muiTheme.palette.primary.main,
                color: '#fff',
                px: 2,
                py: 0.5,
                borderRadius: 3,
                fontWeight: 700,
                boxShadow: '0 2px 8px #1976d2',
                fontSize: 16,
                letterSpacing: 1,
                opacity: 0.92
              }}
            >
              {otherUser.pseudo || otherUser.email || 'Utilisateur'}
            </Typography>
          </Box>
        )}
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
          gap: 0.5,
          position: 'relative',
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
                // Simule l'accusé de lecture (pour la démo)
                const status = isMine ? (msg.read ? 'vu' : 'envoyé') : '';
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
                            cursor: 'pointer'
                          }}
                          onContextMenu={e => { e.preventDefault(); handleMenu(e, msg); }}
                        >
                          {/* Saisie enrichie : liens cliquables */}
                          {linkify(msg.text)}
                          {msg.attachment && (
                            <Box mt={1} onClick={() => handleImageClick(msg.attachment)} sx={{ cursor: 'pointer' }}>
                              <img src={msg.attachment} alt="Pièce jointe" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px #0006' }} />
                    </Box>
                  )}
                          {/* Réactions emoji */}
                          <Box>
                            {Object.entries(msg.reactions || {}).map(([emoji, arr]) => arr.length > 0 && (
                              <Tooltip title="Réagir" key={emoji}>
                                <IconButton size="small" onClick={() => handleReaction(msg, emoji)}>
                                  {emoji} {arr.length}
                                </IconButton>
                              </Tooltip>
                            ))}
                            <Tooltip title="Réagir">
                              <IconButton size="small" onClick={() => handleReaction(msg, emojiList[0])}>
                                <EmojiEmotionsIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          {/* Accusé de lecture (envoyé/vu) */}
                          {isMine && (
                            <Typography sx={{ position: 'absolute', bottom: 2, right: 10, fontSize: 11, color: '#4fc3f7', fontWeight: 700, opacity: 0.7 }}>
                              {status}
                            </Typography>
                          )}
                          {/* Menu contextuel */}
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl) && selectedMsg?.id === msg.id}
                            onClose={handleCloseMenu}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          >
                            <MenuItem onClick={() => handleEdit(msg)}><EditIcon fontSize="small" />&nbsp;Éditer</MenuItem>
                            <MenuItem onClick={() => handleDelete(msg)}><DeleteIcon fontSize="small" />&nbsp;Supprimer</MenuItem>
                          </Menu>
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

        {/* Indicateur "en train d'écrire" de l'autre utilisateur */}
        {otherTyping && (
          <Fade in={otherTyping}>
            <Typography variant="body2" align="center" sx={{ color: muiTheme.palette.primary.main, mb: 1 }}>
              {otherUser?.pseudo || 'L’utilisateur'} est en train d’écrire...
            </Typography>
          </Fade>
        )}
        {/* Statut “en train d’écrire…” de moi */}
        {isTyping && (
          <Fade in={isTyping}>
            <Typography variant="body2" align="center" sx={{ color: muiTheme.palette.primary.main, mb: 1 }}>
              {user.displayName || 'Vous'} est en train d’écrire...
            </Typography>
          </Fade>
        )}

        {/* Barre d’outils flottante */}
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
          mx: 'auto',
          zIndex: 5
        }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 12, flex: 1 }}>
            {/* Barre d’outils flottante */}
            <IconButton onClick={() => setShowEmoji(v => !v)} title="Emoji" aria-label="Ouvrir le picker emoji">
              <InsertEmoticonIcon />
            </IconButton>
            <IconButton component="label" title="Image" aria-label="Attacher une image">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                type="file"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) setAttachment(e.target.files[0]);
                }}
              />
              <ImageIcon />
            </IconButton>
            <IconButton disabled title="GIF (à venir)" aria-label="GIF (à venir)"><GifBoxIcon /></IconButton>
            <IconButton disabled title="Sticker (à venir)" aria-label="Sticker (à venir)"><EmojiEmotionsIcon /></IconButton>
            <IconButton disabled title="Mention (à venir)" aria-label="Mention (à venir)"><AlternateEmailIcon /></IconButton>
            {/* Saisie texte */}
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Écris ton message..."
              fullWidth
              sx={{ bgcolor: muiTheme.palette.mode === 'dark' ? '#181828' : '#f7f9fb', borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" color="primary" size="large" aria-label="Envoyer le message" disabled={sending}>
                      {sending ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              disabled={sending}
            />
          </form>
          {/* Aperçu image avant envoi */}
          {attachmentPreview && (
            <Box ml={2}>
              <img src={attachmentPreview} alt="Aperçu" style={{ maxWidth: 60, maxHeight: 60, borderRadius: 8, boxShadow: '0 2px 8px #0006' }} />
            </Box>
          )}
          {/* Affiche un état "Envoi en cours..." */}
          {sending && (
            <Typography align="center" sx={{ color: '#4fc3f7', fontWeight: 700, mt: 1 }}>Envoi en cours...</Typography>
          )}
        </Paper>
        {/* Picker emoji */}
        {showEmoji && (
          <Box sx={{ position: 'absolute', bottom: 90, left: 20, zIndex: 100 }}>
            <Picker
              theme={themeMode}
              onEmojiSelect={handleEmojiSelect}
              previewPosition="none"
              skinTonePosition="none"
            />
          </Box>
        )}
      </Box>
      {lightboxOpen && (
        <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} maxWidth="md">
          <Box sx={{ p: 2, bgcolor: '#181828' }}>
            <img src={lightboxImg} alt="Aperçu" style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 8 }} />
    </Box>
        </Dialog>
      )}
    </ThemeProvider>
  );
} 