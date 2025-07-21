import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Divider, Button, Alert } from '@mui/material';
import { db, auth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ReplayIcon from '@mui/icons-material/Replay';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WavesIcon from '@mui/icons-material/Waves';

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [notif, setNotif] = useState(true); // Préférence notification
  const [access, setAccess] = useState(false); // Accessibilité (contraste élevé)
  const [compact, setCompact] = useState(false); // Chat compact
  const [surprise, setSurprise] = useState(false);
  const [ultra, setUltra] = useState(() => localStorage.getItem('ultraAquatic') === 'true');
  const user = auth.currentUser;

  // Structure de sauvegarde Firestore (à compléter selon ton modèle)
  useEffect(() => {
    if (!user) return;
    // TODO: sauvegarder { notif, access, compact, theme, ultra } dans Firestore
    localStorage.setItem('ultraAquatic', ultra);
  }, [notif, access, compact, theme, ultra, user]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleReset = () => {
    setTheme('dark');
    setNotif(true);
    setAccess(false);
    setCompact(false);
    setSurprise(false);
    localStorage.setItem('theme', 'dark');
  };

  const handleSurprise = () => {
    setSurprise(true);
    setTimeout(() => setSurprise(false), 2000);
    // Bonus : change la couleur principale temporairement
    document.body.style.setProperty('--main-color', '#ff4081');
    setTimeout(() => document.body.style.setProperty('--main-color', '#1976d2'), 2000);
  };

  return (
    <Paper elevation={8} sx={{ bgcolor: '#23233a', p: 4, borderRadius: 5, minWidth: 320, maxWidth: 420, mx: 'auto', boxShadow: '0 8px 32px #0008', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#4fc3f7', mb: 2, letterSpacing: 1 }}>Paramètres</Typography>
      <Divider sx={{ bgcolor: '#4fc3f7', opacity: 0.15, mb: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <AutoAwesomeIcon sx={{ color: '#ffd600', fontSize: 32 }} />
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}>Outils & Personnalisation</Typography>
      </Box>
      <FormControlLabel
        control={<Switch checked={theme === 'dark'} onChange={handleThemeToggle} aria-label="Activer le thème aquatique" sx={{ '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} />}
        label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Brightness4Icon sx={{ color: '#4fc3f7' }} /> <Typography sx={{ color: '#fff', fontWeight: 700 }}>Thème aquatique ({theme === 'dark' ? 'Sombre' : 'Clair'})</Typography></Box>}
      />
      <FormControlLabel
        control={<Switch checked={notif} onChange={() => setNotif(n => !n)} aria-label="Activer les notifications" sx={{ '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} />}
        label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><NotificationsActiveIcon sx={{ color: '#4fc3f7' }} /> <Typography sx={{ color: '#fff', fontWeight: 700 }}>Notifications ({notif ? 'activées' : 'désactivées'})</Typography></Box>}
      />
      <FormControlLabel
        control={<Switch checked={access} onChange={() => setAccess(a => !a)} aria-label="Activer l’accessibilité" sx={{ '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} />}
        label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><AccessibilityNewIcon sx={{ color: '#4fc3f7' }} /> <Typography sx={{ color: '#fff', fontWeight: 700 }}>Contraste élevé ({access ? 'activé' : 'désactivé'})</Typography></Box>}
      />
      <FormControlLabel
        control={<Switch checked={compact} onChange={() => setCompact(c => !c)} aria-label="Activer le mode chat compact" sx={{ '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} />}
        label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ViewCompactIcon sx={{ color: '#4fc3f7' }} /> <Typography sx={{ color: '#fff', fontWeight: 700 }}>Mode chat compact ({compact ? 'activé' : 'désactivé'})</Typography></Box>}
      />
      <FormControlLabel
        control={<Switch checked={ultra} onChange={() => setUltra(u => !u)} aria-label="Activer le mode ultra aquatique" sx={{ '&:focus-visible': { outline: '2px solid #4fc3f7' }, transition: 'box-shadow 0.2s, background 0.2s' }} />}
        label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><WavesIcon sx={{ color: '#4fc3f7' }} /> <Typography sx={{ color: '#fff', fontWeight: 700 }}>Ultra aquatique ({ultra ? 'activé' : 'désactivé'})</Typography></Box>}
      />
      {ultra && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <WavesIcon sx={{ color: '#4fc3f7', fontSize: 32, animation: 'wave 1.2s infinite alternate' }} />
          <Typography sx={{ color: '#4fc3f7', fontWeight: 800, fontSize: 18 }}>Ultra aquatique activé !</Typography>
        </Box>
      )}
      <Divider sx={{ bgcolor: '#4fc3f7', opacity: 0.15, my: 2 }} />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" color="info" startIcon={<ReplayIcon />} onClick={handleReset} sx={{ fontWeight: 700, borderRadius: 2, color: '#4fc3f7', borderColor: '#1976d2', '&:hover': { bgcolor: '#181828', borderColor: '#4fc3f7' } }}>Réinitialiser</Button>
        <Button variant="contained" color="secondary" startIcon={<AutoAwesomeIcon />} onClick={handleSurprise} sx={{ fontWeight: 700, borderRadius: 2, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#4fc3f7', color: '#222' } }}>Effet surprise</Button>
      </Box>
      {surprise && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          {/* Bonus : animation SVG aquatique */}
          <svg width="120" height="60" viewBox="0 0 120 60">
            <ellipse cx="60" cy="30" rx="50" ry="18" fill="#4fc3f7" opacity="0.18">
              <animate attributeName="rx" values="50;60;50" dur="1.2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="60" cy="30" rx="20" ry="7" fill="#1976d2" opacity="0.32">
              <animate attributeName="rx" values="20;30;20" dur="1.2s" repeatCount="indefinite" />
            </ellipse>
            <circle cx="90" cy="30" r="8" fill="#fff" opacity="0.22">
              <animate attributeName="cx" values="90;30;90" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <Typography sx={{ color: '#ffd600', fontWeight: 800, ml: 2, fontSize: 18 }}>Splash ! 🌊</Typography>
        </Box>
      )}
    </Paper>
  );
} 