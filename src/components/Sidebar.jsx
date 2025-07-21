import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import {
  Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography,
  Paper, Divider, IconButton, useMediaQuery, Dialog, DialogTitle, DialogContent, Badge, Menu, MenuItem, Tooltip, Fade, Slide
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Sidebar({ onSelect, selectedUid, open = true, onToggle, headerAction }) {
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const user = auth.currentUser;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [profileOpen, setProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUid, setMenuUid] = useState(null);

  // Récupère les conversations et messages non lus
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'conversations'), where('members', 'array-contains', user.uid));
    const unsub = onSnapshot(q, async (snap) => {
      const convs = [];
      for (const docSnap of snap.docs) {
        const conv = { id: docSnap.id, ...docSnap.data() };
        // Récupère le nombre de messages non lus
        const msgsSnap = await getDoc(doc(db, 'conversations', docSnap.id));
        conv.unreadCount = conv.lastMessage && conv.lastMessage.to === user.uid && !conv.lastMessage.read ? 1 : 0;
        convs.push(conv);
      }
      setConversations(convs);
    });
    return () => unsub();
  }, [user]);

  // Favoris en localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Statut en ligne réel (Firebase, fallback simulation)
  function isOnline(u) {
    // TODO: remplacer par un vrai statut en ligne Firebase
    return u && u.uid && (u.uid.charCodeAt(0) % 3 === 0);
  }

  if (isMobile && !open) return null;

  const filteredConversations = conversations.filter(conv => {
    const other = conv.users?.find(u => u.uid !== user.uid);
    const pseudo = other?.pseudo || other?.email || '';
    return pseudo.toLowerCase().includes(search.toLowerCase());
  });

  // Gestion du menu contextuel (favoris, etc)
  const handleMenu = (event, uid) => {
    setAnchorEl(event.currentTarget);
    setMenuUid(uid);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuUid(null);
  };
  const toggleFavorite = (uid) => {
    setFavorites(favs => favs.includes(uid) ? favs.filter(f => f !== uid) : [...favs, uid]);
    handleCloseMenu();
  };

  // Trie favoris en haut
  const sortedConversations = [
    ...filteredConversations.filter(conv => favorites.includes(conv.users?.find(u => u.uid !== user.uid)?.uid)),
    ...filteredConversations.filter(conv => !favorites.includes(conv.users?.find(u => u.uid !== user.uid)?.uid))
  ];

  return (
    <Paper elevation={8} sx={{
      bgcolor: '#23233a',
      width: { xs: 240, md: 220 },
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      boxShadow: '0 8px 32px #0008',
      borderRadius: 0,
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      p: 0,
      borderRight: '2px solid #1976d2',
      transition: 'transform 0.3s',
    }}>
      {/* Header avec barre de recherche et action personnalisée */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 2,
        borderBottom: '1px solid #333',
        bgcolor: '#23233a',
        gap: 1
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 800,
          color: '#4fc3f7',
          letterSpacing: 1,
          textShadow: '0 2px 12px #1976d2cc',
          fontSize: 20
        }}>
          Conversations
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerAction}
          {isMobile && (
            <IconButton onClick={onToggle} sx={{ color: '#4fc3f7' }} aria-label="Fermer la sidebar">
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {/* Barre de recherche instantanée */}
      <Box sx={{ px: 2, pb: 1, pt: 0.5, bgcolor: '#23233a' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#181828', borderRadius: 2, px: 1 }}>
          <SearchIcon sx={{ color: '#4fc3f7', fontSize: 22, mr: 1 }} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: 16,
              flex: 1,
              padding: '8px 0',
              fontWeight: 600
            }}
            aria-label="Rechercher un contact"
          />
        </Box>
      </Box>
      <Divider sx={{ bgcolor: '#4fc3f7', opacity: 0.15, mb: 1 }} />
      <List sx={{ mt: 1, flex: 1, overflowY: 'auto', px: 0.5 }}>
        {sortedConversations.length === 0 && (
          <Typography sx={{ color: '#bbb', textAlign: 'center', mt: 4, fontWeight: 600 }}>
            Aucun contact trouvé.
          </Typography>
        )}
        {sortedConversations.map((conv, idx) => {
          const other = conv.users?.find(u => u.uid !== user.uid);
          const selected = selectedUid === other?.uid;
          const lastMsg = conv.lastMessage?.text || '';
          const unread = conv.unreadCount > 0;
          const isFav = favorites.includes(other?.uid);
          return (
            <Slide direction="up" in={true} mountOnEnter unmountOnExit key={conv.id} timeout={350 + idx * 30}>
              <Fade in={true} timeout={400 + idx * 40}>
                <ListItem
                  button
                  onClick={() => onSelect(other?.uid)}
                  selected={selected}
                  sx={{
                    mb: 1.5,
                    borderRadius: 3,
                    bgcolor: selected ? 'linear-gradient(90deg,#4fc3f7 60%,#1976d2 100%)' : '#1e1e2f',
                    color: selected ? '#222' : '#fff',
                    boxShadow: selected ? '0 0 16px #4fc3f7cc' : '0 2px 8px #0004',
                    minHeight: 56,
                    px: 1.5,
                    transition: 'background 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      bgcolor: selected ? 'linear-gradient(90deg,#4fc3f7 60%,#1976d2 100%)' : '#23233a',
                      boxShadow: '0 0 16px #4fc3f7aa'
                    },
                    position: 'relative'
                  }}
                  secondaryAction={
                    <IconButton edge="end" onClick={e => { e.stopPropagation(); handleMenu(e, other?.uid); }} size="small" sx={{ color: '#4fc3f7', ml: 1 }} aria-label="Ouvrir le menu contact">
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar src={other?.photo} sx={{
                        width: 40,
                        height: 40,
                        border: selected ? '2px solid #fff' : '2px solid #4fc3f7',
                        boxShadow: selected ? '0 0 8px #fff' : '0 0 8px #4fc3f7'
                      }} />
                      {isOnline(other) && (
                        <FiberManualRecordIcon sx={{
                          position: 'absolute', bottom: 2, right: 2,
                          color: '#4caf50', fontSize: 14, border: '2px solid #23233a', borderRadius: '50%'
                        }} />
                      )}
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{
                          fontWeight: 700,
                          color: selected ? '#222' : '#fff',
                          fontSize: 16,
                          textShadow: selected ? '0 2px 8px #fff8' : '0 2px 8px #1976d2'
                        }}>
                          {other?.pseudo || other?.email || 'Utilisateur'}
                        </Typography>
                        {/* Badge non lu */}
                        {unread && (
                          <Badge color="primary" variant="dot" sx={{ ml: 1 }} />
                        )}
                        {/* Favori (étoile cliquable) */}
                        <Tooltip title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
                          <IconButton size="small" sx={{ ml: 0.5, color: isFav ? '#ffd600' : '#bbb' }} onClick={e => { e.stopPropagation(); toggleFavorite(other?.uid); }} aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
                            {isFav ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                    secondary={
                      <Typography sx={{ color: selected ? '#222' : '#bbb', fontSize: 13, fontWeight: 500, mt: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                        {lastMsg}
                      </Typography>
                    }
                  />
                </ListItem>
              </Fade>
            </Slide>
          );
        })}
      </List>
      {/* Menu contextuel pour favoris */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => toggleFavorite(menuUid)} aria-label={favorites.includes(menuUid) ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
          {favorites.includes(menuUid) ? <StarIcon fontSize="small" sx={{ color: '#ffd600' }} /> : <StarBorderIcon fontSize="small" sx={{ color: '#bbb' }} />}
          &nbsp;{favorites.includes(menuUid) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        </MenuItem>
      </Menu>
      {/* Footer profil utilisateur */}
      <Box
        sx={{
          px: 2, py: 1.5, borderTop: '1px solid #333', bgcolor: '#23233a',
          display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer'
        }}
        onClick={() => setProfileOpen(true)}
      >
        <Avatar src={user?.photoURL} sx={{ width: 32, height: 32, border: '2px solid #4fc3f7' }} aria-label="Ouvrir mon profil" />
        <Box>
          <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>
            {user?.displayName || user?.email || 'Vous'}
          </Typography>
        </Box>
      </Box>
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)}>
        <DialogTitle>Mon profil</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" py={2}>
            <Avatar src={user?.photoURL} sx={{ width: 64, height: 64, mb: 2 }} aria-label="Photo de profil" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{user?.displayName || user?.email || 'Vous'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {user?.bio || "Aucune bio renseignée."}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
} 