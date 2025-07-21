import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Paper, useTheme, Button, Grow, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

export default function Accueil() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box minHeight="100vh" width="100vw" sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Fond aquatique animé */}
      <Box minHeight="100vh" width="100vw" sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'linear-gradient(135deg, #181828 60%, #1976d2 100%)',
        overflow: 'hidden',
      }}>
        {/* Vagues SVG */}
        <svg style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',zIndex:0,opacity:0.18}} viewBox="0 0 1440 320"><path fill="#4fc3f7" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        {/* Bulles animées */}
        {[...Array(12)].map((_,i) => (
          <svg key={i} style={{position:'absolute',left:`${5+i*8}%`,bottom:0,opacity:0.18+0.05*(i%3),zIndex:0}} width="32" height="180">
            <circle cx="16" cy="160" r={6+2*(i%2)} fill="#b3e5fc">
              <animate attributeName="cy" values="160;20;160" dur={`${3+Math.random()*2}s`} repeatCount="indefinite" />
            </circle>
          </svg>
        ))}
      </Box>
      <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={-6} sx={{ position: 'relative', zIndex: 1 }}>
        <Grow in={true} timeout={600}>
          <Paper elevation={6} sx={{ bgcolor: '#1e1e2f', p: isMobile ? 2 : 4, borderRadius: 6, mb: 4, boxShadow: '0 8px 32px #0008', transition: 'transform 0.3s', maxWidth: isMobile ? '98vw' : 600, width: '100%', '&:hover': { transform: 'scale(1.025) rotate(-1deg)' } }}>
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
        </Grow>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, color: theme.palette.primary.main, textShadow: '0 2px 12px #000a', letterSpacing: 2, animation: 'waveText 2.5s infinite linear alternate' }}>
          Bienvenue dans l'univers romantique et fantastique des poissons !
        </Typography>
        <style>{`@keyframes waveText { 0%{letter-spacing:2px;transform:translateY(0);} 50%{letter-spacing:8px;transform:translateY(-8px);} 100%{letter-spacing:2px;transform:translateY(0);} }`}</style>
        <Typography variant="h6" align="center" color="#e0e0e0" sx={{ mb: 2, textShadow: '0 1px 8px #0006' }}>
          Plonge dans la discussion, explore, rêve...
        </Typography>
        <Typography variant="body1" align="center" color="#bbb" sx={{ maxWidth: 500, fontSize: 18, mb: 3 }}>
          Utilise les icônes en haut pour rechercher des amis, discuter ou personnaliser ton expérience.<br />
          Laisse-toi porter par la magie aquatique&nbsp;!
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 700, fontSize: 20, px: 4, py: 1.5, borderRadius: 3, boxShadow: '0 4px 24px #1976d2', mb: 2, transition: 'transform 0.2s', '&:hover': { bgcolor: theme.palette.primary.dark, color: '#fff', transform: 'scale(1.08)' } }} onClick={() => navigate('/recherche')}>
          Découvrir des contacts
        </Button>
      </Box>
    </Box>
  );
} 