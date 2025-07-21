import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import {
  collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp,
  doc, getDoc, getDocs, updateDoc, deleteDoc
} from 'firebase/firestore';
import {
  Box, Typography, TextField, List, ListItem, Avatar, Paper, InputAdornment,
  IconButton, Menu, MenuItem, Tooltip, Chip, Fade, Grow, Zoom, Button, CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplyIcon from '@mui/icons-material/Reply';
import { ToastContext } from '../App';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const emojiList = ['🐟','💙','😂','😍','🔥','👍','😮','🥰'];

export default function Chat() {
  const { id: otherUid } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [convId, setConvId] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [reaction, setReaction] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMsg, setEditMsg] = useState(null);
  const [editText, setEditText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = auth.currentUser;
  const messagesEndRef = useRef(null);
  const { showToast } = useContext(ToastContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simule la présence en ligne
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

  // Saisie en cours (indicateur)
  useEffect(() => {
    if (!input) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timeout);
  }, [input]);

  // Recherche dans les messages
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    const results = messages.filter(m => m.text && m.text.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(results.map(r => r.id));
  }, [search, messages]);

  // Envoi d'un message ou édition
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && !attachment) return;
    if (editMsg) {
      // Edition
      await updateDoc(doc(db, 'conversations', convId, 'messages', editMsg.id), { text: input, edited: true });
      setEditMsg(null);
      setInput('');
      showToast('Message modifié !', 'success');
      return;
    }
    // Envoi
    let attachmentUrl = '';
    if (attachment) {
      setUploading(true);
      // Ici, tu dois uploader l'image sur ton stockage (Firebase Storage ou autre) et récupérer l'URL
      // Pour la démo, on simule un upload :
      await new Promise(r => setTimeout(r, 1200));
      attachmentUrl = URL.createObjectURL(attachment);
      setUploading(false);
    }
    await addDoc(collection(db, 'conversations', convId, 'messages'), {
      text: input,
      from: user.uid,
      to: otherUid,
      createdAt: serverTimestamp(),
      pseudo: user.displayName || '',
      photo: user.photoURL || '',
      attachment: attachmentUrl,
      reactions: {},
      edited: false
    });
    setInput('');
    setAttachment(null);
    showToast('Message envoyé !', 'success');
  };

  // Réaction emoji
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

  // Menu contextuel message
  const handleMenu = (event, msg) => {
    setAnchorEl(event.currentTarget);
    setSelectedMsg(msg);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMsg(null);
  };

  // Edition
  const handleEdit = (msg) => {
    setEditMsg(msg);
    setInput(msg.text);
    handleCloseMenu();
  };

  // Suppression
  const handleDelete = async (msg) => {
    await deleteDoc(doc(db, 'conversations', convId, 'messages', msg.id));
    showToast('Message supprimé', 'info');
    handleCloseMenu();
  };

  // Copier
  const handleCopy = (msg) => {
    navigator.clipboard.writeText(msg.text);
    showToast('Message copié !', 'success');
    handleCloseMenu();
  };

  // Répondre (simple, préremplit le champ)
  const handleReply = (msg) => {
    setInput(`@${msg.pseudo} ${input}`);
    handleCloseMenu();
  };

  // Pièce jointe
  const handleAttach = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#181828' }}>
      {/* Header */}
      <Paper elevation={8} sx={{
        position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 2,
        bgcolor: '#23233a', p: 2, mb: 2, borderRadius: 0, boxShadow: '0 4px 24px #0006',
        display: 'flex', alignItems: 'center', gap: 2
      }}>
        <Zoom in={true}><Avatar src={otherUser?.photo} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #fff', boxShadow: '0 0 16px #4fc3f7' }} /></Zoom>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#4fc3f7', letterSpacing: 1 }}>{otherUser?.pseudo || 'Utilisateur'}</Typography>
          <Typography variant="body2" sx={{ color: isOnline(otherUser?.uid) ? '#4caf50' : '#bbb', fontWeight: 500 }}>
            {isOnline(otherUser?.uid) ? 'En ligne' : 'Hors ligne'}
          </Typography>
        </Box>
        <Box flex={1} />
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher..."
          size="small"
          sx={{ bgcolor: '#181828', borderRadius: 2, minWidth: 120 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Paper>

      {/* Liste des messages */}
      <List sx={{
        width: '100%', maxWidth: isMobile ? '98vw' : 700, minHeight: 400,
        maxHeight: isMobile ? '50vh' : '60vh', overflowY: 'auto', bgcolor: 'transparent', mb: 2, px: 0,
        mx: 'auto'
      }}>
        {messages.map((msg, idx) => {
          const isMine = msg.from === user.uid;
          const isSearched = searchResults.includes(msg.id);
          return (
            <Grow in={true} key={msg.id} timeout={400 + idx * 60}>
              <ListItem
                sx={{
                  justifyContent: isMine ? 'flex-end' : 'flex-start',
                  display: 'flex', position: 'relative', px: 0, bgcolor: isSearched ? '#4fc3f733' : 'transparent'
                }}
                disableGutters
                onContextMenu={e => { e.preventDefault(); handleMenu(e, msg); }}
              >
                {!isMine && (
                  <Avatar src={msg.photo} sx={{ width: 40, height: 40, mr: 2, border: '2px solid #fff', boxShadow: '0 0 8px #4fc3f7' }} />
                )}
                <Paper elevation={6} sx={{
                  bgcolor: isMine ? 'linear-gradient(90deg,#4fc3f7 80%,#1976d2 100%)' : 'linear-gradient(90deg,#23233a 80%,#1976d2 100%)',
                  color: isMine ? '#222' : '#fff',
                  px: 3, py: 2, borderRadius: 4,
                  maxWidth: 400,
                  boxShadow: '0 2px 16px #0008',
                  mb: 1,
                  ml: isMine ? 8 : 0,
                  mr: !isMine ? 8 : 0,
                  fontWeight: 500,
                  fontSize: 18,
                  textAlign: isMine ? 'right' : 'left',
                  position: 'relative',
                  borderBottom: '4px solid #4fc3f7',
                  transition: 'background 0.3s',
                  '&:hover': { boxShadow: '0 0 24px #4fc3f7', transform: 'scale(1.03)' },
                  outline: isSearched ? '2px solid #ffb300' : 'none'
                }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography component="span" sx={{ wordBreak: 'break-word', flex: 1 }}>
                      {msg.text}
                      {msg.edited && <Typography variant="caption" color="#bbb" sx={{ ml: 1 }}>(modifié)</Typography>}
                    </Typography>
                    {msg.attachment && (
                      <Box mt={1}>
                        <img src={msg.attachment} alt="Pièce jointe" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px #0006' }} />
                      </Box>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Typography variant="caption" sx={{ color: isMine ? '#1976d2' : '#bbb', fontWeight: 400 }}>
                      {msg.pseudo} • {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString() : ''}
                    </Typography>
                    <Box>
                      {Object.entries(msg.reactions || {}).map(([emoji, arr]) => arr.length > 0 && (
                        <Chip
                          key={emoji}
                          label={`${emoji} ${arr.length}`}
                          size="small"
                          sx={{ ml: 0.5, bgcolor: '#fff', color: '#1976d2', fontWeight: 700, fontSize: 18 }}
                          onClick={() => handleReaction(msg, emoji)}
                        />
                      ))}
                      <Tooltip title="Réagir">
                        <IconButton size="small" onClick={() => handleReaction(msg, emojiList[0])}>
                          <EmojiEmotionsIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
                {isMine && (
                  <Avatar src={msg.photo} sx={{ width: 40, height: 40, ml: 2, border: '2px solid #fff', boxShadow: '0 0 8px #4fc3f7' }} />
                )}
                {/* Menu contextuel */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedMsg?.id === msg.id}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {isMine && <MenuItem onClick={() => handleEdit(msg)}><EditIcon fontSize="small" />&nbsp;Éditer</MenuItem>}
                  {isMine && <MenuItem onClick={() => handleDelete(msg)}><DeleteIcon fontSize="small" />&nbsp;Supprimer</MenuItem>}
                  <MenuItem onClick={() => handleCopy(msg)}><ContentCopyIcon fontSize="small" />&nbsp;Copier</MenuItem>
                  <MenuItem onClick={() => handleReply(msg)}><ReplyIcon fontSize="small" />&nbsp;Répondre</MenuItem>
                </Menu>
              </ListItem>
            </Grow>
          );
        })}
        <div ref={messagesEndRef} />
      </List>

      {/* Indicateur de saisie */}
      {isTyping && (
        <Fade in={isTyping}>
          <Typography variant="body2" align="center" sx={{ color: '#4fc3f7', mb: 1 }}>
            {user.displayName || 'Vous'} est en train d’écrire...
          </Typography>
        </Fade>
      )}

      {/* Champ de saisie */}
      <Paper elevation={8} sx={{
        width: '100%', maxWidth: 700, bgcolor: '#23233a', p: 2, borderRadius: 4,
        boxShadow: '0 4px 24px #0006', position: 'sticky', bottom: 0, display: 'flex', alignItems: 'center', gap: 2, mx: 'auto'
      }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 12, flex: 1 }}>
          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={editMsg ? 'Modifier le message...' : 'Écris ton message...'}
            fullWidth
            sx={{ bgcolor: '#181828', borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary" size="large" disabled={uploading || !input.trim() && !attachment}
                    sx={{ transition: 'transform 0.2s', '&:hover': { bgcolor: '#4fc3f7', color: '#222', transform: 'scale(1.15)' } }}>
                    {uploading ? <CircularProgress size={24} /> : <SendIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="attach-file"
          type="file"
          onChange={handleAttach}
        />
        <label htmlFor="attach-file">
          <IconButton color={attachment ? 'primary' : 'secondary'} component="span" sx={{ mr: 1 }}>
            <AttachFileIcon />
          </IconButton>
        </label>
        <IconButton color={showEmoji ? 'primary' : 'secondary'} onClick={() => setShowEmoji(e => !e)}>
          <EmojiEmotionsIcon />
        </IconButton>
        {attachment && (
          <Box ml={2}>
            <img src={URL.createObjectURL(attachment)} alt="Aperçu" style={{ maxWidth: 60, maxHeight: 60, borderRadius: 8, boxShadow: '0 2px 8px #0006' }} />
          </Box>
        )}
      </Paper>
    </Box>
  );
} 