import React, { useState, useContext } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Box, Typography, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Alert, Paper, CircularProgress, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ToastContext } from '../App';

export default function SearchUser() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResults([]);
    try {
      const q = query(collection(db, 'users'), where('pseudo', '>=', search), where('pseudo', '<=', search + '\uf8ff'));
      const snap = await getDocs(q);
      const users = [];
      snap.forEach(doc => {
        if (doc.id !== auth.currentUser.uid) {
          users.push(doc.data());
        }
      });
      setResults(users);
      if (users.length === 0) {
        setError('Aucun utilisateur trouvé.');
        showToast('Aucun utilisateur trouvé.', 'warning');
      } else {
        showToast('Résultats trouvés !', 'success');
      }
    } catch (e) {
      setError("Erreur lors de la recherche.");
      showToast('Erreur lors de la recherche.', 'error');
    }
    setLoading(false);
  };

  const handleStartChat = (user) => {
    window.location.href = `/chat/${user.uid}`;
  };

  // Simulation présence en ligne (à remplacer par une vraie logique temps réel)
  function isOnline(uid) {
    // Pour la démo, 60% de chances d'être en ligne
    return Math.random() < 0.6;
  }

  return (
    <Box minHeight="100vh" bgcolor="#181828" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Paper elevation={8} sx={{ bgcolor: '#23233a', p: 5, borderRadius: 5, minWidth: 380, maxWidth: 420, boxShadow: '0 8px 32px #0008' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#4fc3f7', mb: 3 }}>
          Recherche d'utilisateur
        </Typography>
        <form onSubmit={handleSearch} style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
          <TextField
            label="Pseudo de l'utilisateur"
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
            required
            sx={{ bgcolor: '#181828', borderRadius: 2 }}
            autoFocus
          />
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ minWidth: 56, height: 56, borderRadius: 2, boxShadow: 2, transition: 'transform 0.2s', fontWeight: 700, fontSize: 18, '&:hover': { bgcolor: '#1976d2', transform: 'scale(1.08)' } }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon fontSize="large" />}
          </Button>
        </form>
        {error && <Alert severity="warning" sx={{ mb: 2, fontWeight: 600, fontSize: 16 }}>{error}</Alert>}
        {results.length > 0 && <Fade in={results.length > 0}><Alert severity="success" sx={{ mb: 2, fontWeight: 600, fontSize: 16 }}>Résultats trouvés !</Alert></Fade>}
        <List>
          {results.map(user => (
            <ListItem key={user.uid} button onClick={() => handleStartChat(user)} sx={{ mb: 2, borderRadius: 3, bgcolor: '#1e1e2f', boxShadow: 2, transition: 'background 0.2s, transform 0.2s', '&:hover': { bgcolor: '#4fc3f7', color: '#222', transform: 'scale(1.03)' } }}>
              <ListItemAvatar>
                <Box sx={{ position: 'relative' }}>
                  <Avatar src={user.photo} sx={{ width: 64, height: 64, mr: 2, border: '2px solid #fff' }} />
                  <FiberManualRecordIcon sx={{ position: 'absolute', bottom: 4, right: 10, color: isOnline(user.uid) ? '#4caf50' : '#bbb', fontSize: 20, border: '2px solid #1e1e2f', borderRadius: '50%' }} />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>{user.pseudo}</Typography>}
                secondary={<Typography variant="body2" color="#bbb">{user.bio}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}