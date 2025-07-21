import React from 'react';
import { Box, Typography, Paper, Button, Grow, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function Accueil() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh" width="100vw" sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#181828' }}>
      {/* Fond aquatique animé */}
      <Box minHeight="100vh" width="100vw" sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'linear-gradient(135deg, #181828 60%, #1976d2 100%)',
        overflow: 'hidden',
      }}>
        {/* Rayons de lumière animés */}
        <svg style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',zIndex:1,pointerEvents:'none'}} width="100vw" height="100vh">
          {[...Array(7)].map((_,i) => (
            <rect key={i} x={100+i*180} y="0" width={8+i%3*4} height="100vh" fill="#fff" opacity={0.06+0.03*(i%2)}>
              <animate attributeName="opacity" values="0.06;0.18;0.06" dur={`${3.5+0.7*i}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </svg>
        {/* Bulles animées variées */}
        {[...Array(18)].map((_,i) => (
          <svg key={i} style={{position:'absolute',left:`${3+i*5}%`,bottom:0,opacity:0.13+0.07*(i%4),zIndex:2}} width={18+Math.random()*18} height="220">
            <circle cx={10+Math.random()*10} cy="200" r={5+Math.random()*7} fill="#b3e5fc" opacity="0.7">
              <animate attributeName="cy" values="200;10;200" dur={`${2.5+Math.random()*3}s`} repeatCount="indefinite" />
            </circle>
          </svg>
        ))}
        {/* Vagues SVG */}
        <svg style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',zIndex:0,opacity:0.18}} viewBox="0 0 1440 320"><path fill="#4fc3f7" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </Box>
      <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={-6} sx={{ position: 'relative', zIndex: 1 }}>
        <Grow in={true} timeout={600}>
          <Paper elevation={6} sx={{
            bgcolor: '#1e1e2f',
            p: isMobile ? 2 : 4,
            borderRadius: 6,
            mb: 4,
            boxShadow: '0 8px 32px #0008',
            transition: 'transform 0.3s',
            maxWidth: isMobile ? '98vw' : 600,
            width: '100%',
            '&:hover': { transform: 'scale(1.025) rotate(-1deg)' }
          }}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ position: 'relative', minHeight: 260 }}>
              {/* Bulle avec logo C */}
              <svg width="220" height="220" viewBox="0 0 220 220" style={{ filter: 'drop-shadow(0 8px 32px #4fc3f7aa)' }}>
                <defs>
                  <radialGradient id="bubbleGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e3f7ff" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#4fc3f7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#1976d2" stopOpacity="0.5" />
                  </radialGradient>
                  <radialGradient id="bubbleLight" cx="30%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#4fc3f7" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="110" cy="110" r="90" fill="url(#bubbleGrad)" />
                {/* Reflet */}
                <ellipse cx="80" cy="70" rx="30" ry="12" fill="url(#bubbleLight)" opacity="0.7" />
                {/* Logo C */}
                <text x="110" y="135" textAnchor="middle" fontSize="110" fontWeight="bold" fill="#fff" opacity="0.92" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" style={{ filter: 'drop-shadow(0 2px 8px #1976d2)' }}>C</text>
                {/* Petites bulles */}
                <circle cx="60" cy="40" r="7" fill="#b3e5fc" opacity="0.7">
                  <animate attributeName="cy" values="40;10;40" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="170" cy="60" r="4" fill="#b3e5fc" opacity="0.5">
                  <animate attributeName="cy" values="60;20;60" dur="2.7s" repeatCount="indefinite" />
                </circle>
              </svg>
              {/* Poissons animés autour */}
              <svg width="80" height="40" style={{ position: 'absolute', left: -60, top: 40 }} viewBox="0 0 80 40">
                <g>
                  <ellipse cx="30" cy="20" rx="18" ry="8" fill="#4fc3f7" />
                  <polygon points="10,20 2,12 2,28" fill="#1976d2" />
                  <circle cx="44" cy="18" r="2.5" fill="#fff" />
                  <circle cx="45" cy="19" r="1" fill="#222" />
                </g>
                <animateTransform attributeName="transform" type="translate" values="0 0; 30 -10; 0 0" dur="7s" repeatCount="indefinite" />
              </svg>
              <svg width="60" height="30" style={{ position: 'absolute', right: -40, top: 80 }} viewBox="0 0 60 30">
                <g>
                  <ellipse cx="20" cy="15" rx="12" ry="6" fill="#ffb300" />
                  <polygon points="5,15 0,10 0,20" fill="#f57c00" />
                  <circle cx="30" cy="13" r="1.8" fill="#fff" />
                  <circle cx="31" cy="14" r="0.7" fill="#222" />
                </g>
                <animateTransform attributeName="transform" type="translate" values="0 0; -20 10; 0 0" dur="6s" repeatCount="indefinite" />
              </svg>
              <svg width="50" height="24" style={{ position: 'absolute', left: 120, top: 160 }} viewBox="0 0 50 24">
                <g>
                  <ellipse cx="15" cy="12" rx="10" ry="5" fill="#ab47bc" />
                  <polygon points="2,12 0,7 0,17" fill="#7c1fa3" />
                  <circle cx="23" cy="10" r="1.2" fill="#fff" />
                  <circle cx="24" cy="11" r="0.5" fill="#222" />
                </g>
                <animateTransform attributeName="transform" type="translate" values="0 0; 10 -8; 0 0" dur="5.5s" repeatCount="indefinite" />
              </svg>
            </Box>
          </Paper>
        </Grow>
        <Typography variant="h3" align="center" gutterBottom sx={{
          fontWeight: 800,
          color: '#4fc3f7',
          textShadow: '0 2px 12px #000a',
          letterSpacing: 2,
          animation: 'waveText 2.5s infinite linear alternate'
        }}>
          Bienvenue dans l'univers aquatique du chat !
        </Typography>
        <style>{`@keyframes waveText { 0%{letter-spacing:2px;transform:translateY(0);} 50%{letter-spacing:8px;transform:translateY(-8px);} 100%{letter-spacing:2px;transform:translateY(0);} }`}</style>
        <Typography variant="h6" align="center" color="#e0e0e0" sx={{ mb: 2, textShadow: '0 1px 8px #0006' }}>
          Plonge dans la discussion, explore, rêve...
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontWeight: 700,
            fontSize: 20,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 4px 24px #1976d2',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': { bgcolor: theme.palette.primary.dark, color: '#fff', transform: 'scale(1.08)' }
          }}
          onClick={() => navigate('/recherche')}
        >
          Découvrir des contacts
        </Button>
      </Box>
    </Box>
  );
} 