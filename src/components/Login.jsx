import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Box, Typography, TextField, Divider, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError("Erreur lors de la connexion Google.");
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      setError("Erreur : " + e.message);
    }
  };

  const handleFacebook = () => {
    setError("Connexion Facebook non disponible. Veuillez utiliser Google ou Email.");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#121212">
      <Box bgcolor="#222" p={4} borderRadius={3} boxShadow={3} minWidth={320}>
        <Typography variant="h4" align="center" gutterBottom>Bienvenue sur Chat-changing</Typography>
        <Typography variant="body1" align="center" mb={2}>Connecte-toi ou crée un compte pour commencer à discuter !</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button fullWidth variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogle} sx={{ mb: 2, bgcolor: '#4285F4', color: '#fff', '&:hover': { bgcolor: '#357ae8' } }}>
          Continuer avec Google
        </Button>
        <Button fullWidth variant="contained" startIcon={<FacebookIcon />} onClick={handleFacebook} sx={{ mb: 2, bgcolor: '#3b5998', color: '#fff', '&:hover': { bgcolor: '#2d4373' } }}>
          Continuer avec Facebook
        </Button>
        <Divider sx={{ my: 2 }}>ou</Divider>
        <form onSubmit={handleEmail}>
          <TextField
            label="Adresse e-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            autoComplete="email"
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mb: 1 }}>
            {isRegister ? "Créer un compte" : "Se connecter"}
          </Button>
        </form>
        <Button color="secondary" fullWidth onClick={() => setIsRegister(r => !r)}>
          {isRegister ? "Déjà inscrit ? Se connecter" : "Pas encore de compte ? S'inscrire"}
        </Button>
      </Box>
    </Box>
  );
} 