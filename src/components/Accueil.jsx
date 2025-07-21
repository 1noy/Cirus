import React, { useEffect, useRef, useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { db, auth } from '../firebase';
import {
  collection, query, orderBy, onSnapshot, addDoc, serverTimestamp,
  doc, getDoc, updateDoc, deleteDoc
} from 'firebase/firestore';
import {
  Box, Typography, TextField, Avatar, Paper, InputAdornment,
  IconButton, Divider, Fade, Slide, useMediaQuery, Switch, Menu, MenuItem, Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import { ToastContext } from '../App';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Picker from '@emoji-mart/react';
import SearchUser from './SearchUser';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Messenger() {
  const [selectedUid, setSelectedUid] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen(open => !open);

  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#181828' }}>
      {/* Fond animé SVG */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id="bubbleGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#181828" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1976d2" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#181828" stopOpacity="0.7" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
        {/* Bulles animées */}
          <circle cx="300" cy="900" r="60" fill="url(#bubbleGradient)">
            <animate attributeName="cy" values="900;200;900" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="1600" cy="1000" r="40" fill="url(#bubbleGradient)">
            <animate attributeName="cy" values="1000;300;1000" dur="16s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="1100" r="80" fill="url(#bubbleGradient)">
            <animate attributeName="cy" values="1100;100;1100" dur="20s" repeatCount="indefinite" />
            </circle>
          {/* Vagues */}
          <path d="M0,900 Q480,850 960,900 T1920,900 V1080 H0Z" fill="url(#waveGradient)" filter="url(#blur)">
            <animate attributeName="d" values="M0,900 Q480,850 960,900 T1920,900 V1080 H0Z;M0,910 Q480,870 960,910 T1920,910 V1080 H0Z;M0,900 Q480,850 960,900 T1920,900 V1080 H0Z" dur="8s" repeatCount="indefinite" />
          </path>
          {/* Lumière sous-marine */}
          <ellipse cx="960" cy="200" rx="700" ry="120" fill="#fff" opacity="0.08">
            <animate attributeName="opacity" values="0.08;0.18;0.08" dur="7s" repeatCount="indefinite" />
          </ellipse>
          </svg>
      </Box>
      {/* Header Messenger sticky */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 2, bgcolor: 'rgba(24,24,40,0.92)', boxShadow: '0 4px 24px #0006', borderBottom: '2px solid #1976d2', backdropFilter: 'blur(8px)' }}>
        {/* Logo animé */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 54, height: 54, position: 'relative', mr: 2 }}>
            <svg width="54" height="54" viewBox="0 0 54 54">
              <circle cx="27" cy="27" r="26" fill="#23233a" stroke="#4fc3f7" strokeWidth="2" />
              <circle cx="27" cy="27" r="24" fill="url(#bubbleGradient)" opacity="0.7" />
              <text x="50%" y="54%" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#4fc3f7" fontFamily="Arial" dy="0.1em">C</text>
              <animateTransform attributeName="transform" type="rotate" from="0 27 27" to="360 27 27" dur="12s" repeatCount="indefinite" />
            </svg>
            {/* Reflet */}
            <svg width="54" height="54" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
              <ellipse cx="27" cy="18" rx="12" ry="4" fill="#fff" opacity="0.18">
                <animate attributeName="opacity" values="0.18;0.32;0.18" dur="4s" repeatCount="indefinite" />
                  </ellipse>
              </svg>
            </Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#4fc3f7', letterSpacing: 2, textShadow: '0 2px 12px #1976d2cc', fontSize: { xs: 22, md: 28 } }}>
            Chat-changing
        </Typography>
        </Box>
        {/* Actions rapides */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#4fc3f7' }} title="Rechercher un utilisateur">
            <MenuIcon />
          </IconButton>
          <IconButton onClick={() => setProfileOpen(true)} sx={{ color: '#4fc3f7' }} title="Mon profil">
            <AccountCircleIcon />
          </IconButton>
          <IconButton onClick={() => setSettingsOpen(true)} sx={{ color: '#4fc3f7' }} title="Paramètres">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      {/* Layout principal (sidebar + chat) */}
      <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', width: '100%', position: 'relative', zIndex: 2 }}>
        <Sidebar
          onSelect={uid => {
            setSelectedUid(uid);
            setSidebarOpen(false);
          }}
          selectedUid={selectedUid}
          open={sidebarOpen}
          onToggle={handleToggleSidebar}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
          {/* Bouton burger sur mobile */}
          <IconButton
            onClick={handleToggleSidebar}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 20,
              display: { xs: 'block', md: 'none' }
            }}
          >
            <MenuIcon sx={{ color: '#4fc3f7', fontSize: 32 }} />
          </IconButton>
          {selectedUid ? (
            <Chat otherUid={selectedUid} />
          ) : (
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h5" color="#4fc3f7" sx={{ opacity: 0.7 }}>
                Sélectionne un contact pour commencer à discuter
        </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {/* Modales : recherche, profil, paramètres */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} maxWidth="sm" fullWidth>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #333', bgcolor: '#23233a' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#4fc3f7', letterSpacing: 1 }}>
            Recherche d'utilisateur
          </Typography>
          <IconButton onClick={() => setSearchOpen(false)} sx={{ color: '#4fc3f7' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ bgcolor: '#181828', p: 2 }}>
          <SearchUser />
        </Box>
      </Dialog>
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="xs" fullWidth>
        <Box sx={{ p: 3, bgcolor: '#181828' }}>
          {/* Ici tu pourras intégrer le composant Profile amélioré */}
          <Typography variant="h6" sx={{ color: '#4fc3f7', fontWeight: 800, mb: 2 }}>Mon profil</Typography>
          <Typography color="#fff">(À venir : édition avancée du profil)</Typography>
        </Box>
      </Dialog>
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="xs" fullWidth>
        <Box sx={{ p: 3, bgcolor: '#181828' }}>
          {/* Ici tu pourras intégrer le composant Settings amélioré */}
          <Typography variant="h6" sx={{ color: '#4fc3f7', fontWeight: 800, mb: 2 }}>Paramètres</Typography>
          <Typography color="#fff">(À venir : paramètres avancés, accessibilité, thème...)</Typography>
        </Box>
      </Dialog>
    </Box>
  );
} 