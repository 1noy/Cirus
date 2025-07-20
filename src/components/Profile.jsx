import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Avatar, Button, Box, Typography, TextField, Alert } from '@mui/material';

export default function Profile({ onComplete }) {
  const user = auth.currentUser;
  const [pseudo, setPseudo] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(user?.photoURL || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        pseudo,
        bio,
        photo,
        createdAt: new Date()
      });
      onComplete();
    } catch (e) {
      setError("Erreur lors de l'enregistrement du profil.");
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#121212">
      <Box bgcolor="#222" p={4} borderRadius={3} boxShadow={3} minWidth={320}>
        <Typography variant="h5" align="center" gutterBottom>Complète ton profil</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar src={photo} sx={{ width: 72, height: 72, mb: 1 }} />
          <TextField
            label="URL de la photo de profil"
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
        <form onSubmit={handleSave}>
          <TextField
            label="Pseudo"
            value={pseudo}
            onChange={e => setPseudo(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Bio (optionnel)"
            value={bio}
            onChange={e => setBio(e.target.value)}
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            Enregistrer et continuer
          </Button>
        </form>
      </Box>
    </Box>
  );
} 