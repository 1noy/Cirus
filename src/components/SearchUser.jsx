import React, { useState, useContext, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Box, Typography, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Alert, Paper, CircularProgress, Fade, Chip, Slide, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ToastContext } from '../App';

export default function SearchUser() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);
  const [instant, setInstant] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Pour la suite

  // Recherche instantanée dès la saisie
  useEffect(() => {
    if (search.length < 2) {
      setResults([]);
      setError('');
      return;
    }
    let active = true;
    setLoading(true);
    setInstant(true);
    (async () => {
      try {
        const q = query(collection(db, 'users'), where('pseudo', '>=', search), where('pseudo', '<=', search + '\uf8ff'));
        const snap = await getDocs(q);
        if (!active) return;
        const arr = [];
        snap.forEach(doc => arr.push(doc.data()));
        setResults(arr);
        setError(arr.length === 0 ? 'Aucun utilisateur trouvé.' : '');
      } catch (e) {
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [search]);

  // Suggestions intelligentes simulées (populaires/récents)
  useEffect(() => {
    // Simule des suggestions (à remplacer par Firestore)
    setSuggestions([
      { uid: 'pop1', pseudo: 'AquaStar', bio: 'Fan d’aquariums', photo: '', isNew: true },
      { uid: 'pop2', pseudo: 'BlueFish', bio: 'Toujours en ligne', photo: '', isNew: false }
    ]);
  }, []);

  const handleStartChat = (user) => {
    // Démarre une conversation instantanément (à adapter selon l’architecture Messenger)
    window.location.href = `/chat/${user.uid}`;
  };
  function isOnline(uid) {
    // TODO: remplacer par vrai statut en ligne
    return uid && uid.charCodeAt(0) % 3 === 0;
  }

  return (
    <Box minHeight="100vh" bgcolor="#181828" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Paper elevation={8} sx={{ bgcolor: '#23233a', p: 5, borderRadius: 5, minWidth: 340, maxWidth: 420, boxShadow: '0 8px 32px #0008' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#4fc3f7', mb: 3, letterSpacing: 1 }}>
          Recherche d'utilisateur
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tape un pseudo..."
            fullWidth
            size="medium"
            sx={{ bgcolor: '#181828', borderRadius: 2, input: { color: '#fff', fontWeight: 600 } }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#4fc3f7', mr: 1 }} />
            }}
            autoFocus
            inputProps={{ 'aria-label': 'Recherche utilisateur' }}
          />
        </Box>
        {error && <Alert severity="warning" sx={{ mb: 2, bgcolor: '#1976d2', color: '#fff', fontWeight: 700 }}>{error}</Alert>}
        {loading && <Box display="flex" justifyContent="center" my={2}><CircularProgress size={32} color="info" /></Box>}
        {/* Suggestions intelligentes */}
        {suggestions.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" sx={{ color: '#4fc3f7', fontWeight: 700, mb: 1 }}>Suggestions</Typography>
            <List>
              {suggestions.map((user, idx) => (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit key={user.uid} timeout={350 + idx * 30}>
                  <Fade in={true} timeout={400 + idx * 40}>
                    <ListItem button onClick={() => handleStartChat(user)} sx={{
                      mb: 1.5,
                      borderRadius: 3,
                      bgcolor: '#1e1e2f',
                      color: '#fff',
                      boxShadow: '0 2px 8px #0004',
                      minHeight: 56,
                      px: 1.5,
                      transition: 'background 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        bgcolor: '#23233a',
                        boxShadow: '0 0 16px #4fc3f7aa'
                      },
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      '&:focus-visible': { outline: '2px solid #4fc3f7' }
                    }} aria-label={`Suggestion ${user.pseudo}`}>
                      <ListItemAvatar>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar src={user.photo} sx={{ width: 40, height: 40, border: '2px solid #4fc3f7', boxShadow: '0 0 8px #4fc3f7' }} />
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#4fc3f7' }}>{user.pseudo}</Typography>
                          {user.isNew && <Chip label="Nouveau" color="info" size="small" sx={{ ml: 1, bgcolor: '#1976d2', color: '#fff', fontWeight: 700 }} />}
                        </Box>}
                        secondary={<Typography variant="body2" color="#bbb">{user.bio}</Typography>}
                      />
                      <Tooltip title="Démarrer une conversation">
                        <IconButton edge="end" color="primary" sx={{ ml: 1, '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} aria-label={`Démarrer une conversation avec ${user.pseudo}`}>
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  </Fade>
                </Slide>
              ))}
            </List>
          </Box>
        )}
        <List>
          {results.map((user, idx) => (
            <Slide direction="up" in={true} mountOnEnter unmountOnExit key={user.uid} timeout={350 + idx * 30}>
              <Fade in={true} timeout={400 + idx * 40}>
                <ListItem button onClick={() => handleStartChat(user)} sx={{
                  mb: 1.5,
                  borderRadius: 3,
                  bgcolor: '#1e1e2f',
                  color: '#fff',
                  boxShadow: '0 2px 8px #0004',
                  minHeight: 56,
                  px: 1.5,
                  transition: 'background 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    bgcolor: '#23233a',
                    boxShadow: '0 0 16px #4fc3f7aa'
                  },
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:focus-visible': { outline: '2px solid #4fc3f7' }
                }} aria-label={`Résultat ${user.pseudo}`}>
                  <ListItemAvatar>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar src={user.photo} sx={{ width: 40, height: 40, border: '2px solid #4fc3f7', boxShadow: '0 0 8px #4fc3f7' }} />
                      {isOnline(user.uid) && (
                        <FiberManualRecordIcon sx={{
                          position: 'absolute', bottom: 2, right: 2,
                          color: '#4caf50', fontSize: 14, border: '2px solid #23233a', borderRadius: '50%'
                        }} />
                      )}
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#4fc3f7' }}>{user.pseudo}</Typography>
                      {user.isNew && <Chip label="Nouveau" color="info" size="small" sx={{ ml: 1, bgcolor: '#1976d2', color: '#fff', fontWeight: 700 }} />}
                    </Box>}
                    secondary={<Typography variant="body2" color="#bbb">{user.bio}</Typography>}
                  />
                  <Tooltip title="Démarrer une conversation">
                    <IconButton edge="end" color="primary" sx={{ ml: 1, '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} aria-label={`Démarrer une conversation avec ${user.pseudo}`}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              </Fade>
            </Slide>
          ))}
        </List>
      </Paper>
    </Box>
  );
}