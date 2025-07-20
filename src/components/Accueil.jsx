import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Paper, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

export default function Accueil() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box minHeight="100vh" bgcolor={theme.palette.background.default} display="flex" flexDirection="column">
      {/* Barre supérieure avec icônes */}
      <AppBar position="static" color="transparent" elevation={3} sx={{ borderBottom: '1px solid #222', backdropFilter: 'blur(8px)' }}>
        <Toolbar sx={{ minHeight: 72 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 1, color: theme.palette.primary.main }}>
            Poisson Messenger
          </Typography>
          <Tooltip title="Recherche d'utilisateurs">
            <IconButton color="primary" size="large" sx={{ mx: 1, transition: 'transform 0.2s', '&:hover': { bgcolor: theme.palette.primary.dark, color: '#fff', transform: 'scale(1.15)' } }} onClick={() => navigate('/recherche')}>
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Messagerie">
            <IconButton color="primary" size="large" sx={{ mx: 1, transition: 'transform 0.2s', '&:hover': { bgcolor: theme.palette.primary.dark, color: '#fff', transform: 'scale(1.15)' } }} onClick={() => navigate('/chatbox')}>
              <ChatIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Paramètres">
            <IconButton color="primary" size="large" sx={{ mx: 1, transition: 'transform 0.2s', '&:hover': { bgcolor: theme.palette.primary.dark, color: '#fff', transform: 'scale(1.15)' } }} onClick={() => navigate('/parametres')}>
              <SettingsIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Cinématique de poissons (SVG animé) */}
      <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={-6}>
        <Paper elevation={6} sx={{ bgcolor: '#1e1e2f', p: 4, borderRadius: 6, mb: 4, boxShadow: '0 8px 32px #0008' }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <svg width="420" height="220" viewBox="0 0 420 220">
              <g>
                <ellipse cx="120" cy="110" rx="90" ry="45" fill="#4fc3f7">
                  <animate attributeName="cx" values="120;320;120" dur="6s" repeatCount="indefinite" />
                </ellipse>
                <polygon points="210,110 260,85 260,135" fill="#0288d1">
                  <animate attributeName="points" values="210,110 260,85 260,135;390,110 340,85 340,135;210,110 260,85 260,135" dur="6s" repeatCount="indefinite" />
                </polygon>
                <circle cx="90" cy="100" r="8" fill="#fff" />
                <circle cx="95" cy="105" r="3.5" fill="#000" />
              </g>
              <g>
                <ellipse cx="320" cy="170" rx="45" ry="22" fill="#ffb300" opacity="0.8">
                  <animate attributeName="cx" values="320;120;320" dur="6s" repeatCount="indefinite" />
                </ellipse>
                <polygon points="365,170 400,155 400,185" fill="#f57c00" opacity="0.8">
                  <animate attributeName="points" values="365,170 400,155 400,185;155,170 120,155 120,185;365,170 400,155 400,185" dur="6s" repeatCount="indefinite" />
                </polygon>
                <circle cx="305" cy="165" r="5" fill="#fff" />
                <circle cx="308" cy="168" r="2" fill="#000" />
              </g>
              {/* Bulles */}
              <circle cx="210" cy="80" r="6" fill="#b3e5fc">
                <animate attributeName="cy" values="80;30;80" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="270" cy="140" r="4" fill="#b3e5fc">
                <animate attributeName="cy" values="140;60;140" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </Box>
        </Paper>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, color: theme.palette.primary.main, textShadow: '0 2px 12px #000a' }}>
          Bienvenue dans l'univers romantique et fantastique des poissons !
        </Typography>
        <Typography variant="h6" align="center" color="#e0e0e0" sx={{ mb: 2, textShadow: '0 1px 8px #0006' }}>
          Plonge dans la discussion, explore, rêve...
        </Typography>
        <Typography variant="body1" align="center" color="#bbb" sx={{ maxWidth: 500, fontSize: 18 }}>
          Utilise les icônes en haut pour rechercher des amis, discuter ou personnaliser ton expérience.<br />
          Laisse-toi porter par la magie aquatique&nbsp;!
        </Typography>
      </Box>
    </Box>
  );
} 