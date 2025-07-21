import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import Login from './components/Login';
import Profile from './components/Profile';
import SearchUser from './components/SearchUser';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { doc, getDoc } from 'firebase/firestore';
import Accueil from './components/Accueil';
import Settings from './components/Settings';
import Toast from './components/Toast';
import { createContext } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const getTheme = () => {
  const mode = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
      },
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff4081',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });
};

export const ToastContext = createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const showToast = useCallback((message, severity = 'info') => {
    setToast({ open: true, message, severity });
  }, []);
  const handleClose = () => setToast(t => ({ ...t, open: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={toast.severity} sx={{
          fontWeight: 700,
          fontSize: 16,
          bgcolor: '#23233a',
          color: '#4fc3f7',
          border: '1.5px solid #1976d2',
          boxShadow: '0 4px 24px #0008',
          borderRadius: 2
        }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

function UltraAquaticBackground() {
  if (typeof window === 'undefined' || localStorage.getItem('ultraAquatic') !== 'true') return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none', width: '100vw', height: '100vh' }}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="bubbleGradientUltra" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#181828" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="waveGradientUltra" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1976d2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#181828" stopOpacity="0.7" />
          </linearGradient>
          <filter id="blurUltra" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        {/* Bulles animées supplémentaires */}
        <circle cx="300" cy="900" r="60" fill="url(#bubbleGradientUltra)">
          <animate attributeName="cy" values="900;200;900" dur="12s" repeatCount="indefinite" />
        </circle>
        <circle cx="1600" cy="1000" r="40" fill="url(#bubbleGradientUltra)">
          <animate attributeName="cy" values="1000;300;1000" dur="16s" repeatCount="indefinite" />
        </circle>
        <circle cx="900" cy="1100" r="80" fill="url(#bubbleGradientUltra)">
          <animate attributeName="cy" values="1100;100;1100" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="1200" r="30" fill="url(#bubbleGradientUltra)">
          <animate attributeName="cy" values="1200;100;1200" dur="18s" repeatCount="indefinite" />
        </circle>
        <circle cx="1200" cy="1300" r="50" fill="url(#bubbleGradientUltra)">
          <animate attributeName="cy" values="1300;200;1300" dur="22s" repeatCount="indefinite" />
        </circle>
        {/* Poissons SVG animés */}
        <g>
          <g>
            <ellipse cx="200" cy="600" rx="32" ry="12" fill="#4fc3f7" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="1400 0" dur="18s" repeatCount="indefinite" />
            </ellipse>
            <polygon points="232,600 250,590 250,610" fill="#1976d2" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="1400 0" dur="18s" repeatCount="indefinite" />
            </polygon>
          </g>
          <g>
            <ellipse cx="400" cy="800" rx="18" ry="7" fill="#fff" opacity="0.18">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="1000 -200" dur="14s" repeatCount="indefinite" />
            </ellipse>
            <polygon points="418,800 430,795 430,805" fill="#4fc3f7" opacity="0.18">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="1000 -200" dur="14s" repeatCount="indefinite" />
            </polygon>
          </g>
        </g>
        {/* Vagues */}
        <path d="M0,900 Q480,850 960,900 T1920,900 V1080 H0Z" fill="url(#waveGradientUltra)" filter="url(#blurUltra)">
          <animate attributeName="d" values="M0,900 Q480,850 960,900 T1920,900 V1080 H0Z;M0,910 Q480,870 960,910 T1920,910 V1080 H0Z;M0,900 Q480,850 960,900 T1920,900 V1080 H0Z" dur="8s" repeatCount="indefinite" />
        </path>
        {/* Rayons de lumière mouvants */}
        <ellipse cx="960" cy="200" rx="700" ry="120" fill="#fff" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.18;0.08" dur="7s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="700" cy="180" rx="200" ry="40" fill="#fff" opacity="0.06">
          <animate attributeName="opacity" values="0.06;0.16;0.06" dur="9s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1300" cy="220" rx="180" ry="36" fill="#fff" opacity="0.05">
          <animate attributeName="opacity" values="0.05;0.13;0.05" dur="11s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const showToast = (message, severity = 'info', duration = 3000) => {
    setToast({ open: true, message, severity, duration });
  };
  const handleToastClose = () => setToast(t => ({ ...t, open: false }));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setCheckingProfile(true);
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setProfileComplete(userDoc.exists() && userDoc.data().pseudo);
        setCheckingProfile(false);
      } else {
        setProfileComplete(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const onThemeChange = () => setTheme(getTheme());
    window.addEventListener('themechange', onThemeChange);
    return () => window.removeEventListener('themechange', onThemeChange);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UltraAquaticBackground />
        <Router>
          <Routes>
            {!user && (
              <Route path="/*" element={<Login />} />
            )}
            {user && !profileComplete && !checkingProfile && (
              <>
                <Route path="/profil" element={<Profile onComplete={() => setProfileComplete(true)} />} />
                <Route path="*" element={<Navigate to="/profil" />} />
              </>
            )}
            {user && profileComplete && (
              <>
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/recherche" element={<SearchUser />} />
                <Route path="/chat/:id" element={<><Sidebar /><Chat /></>} />
                <Route path="/parametres" element={<Settings />} />
                <Route path="*" element={<Navigate to="/accueil" />} />
              </>
            )}
          </Routes>
        </Router>
        <Toast open={toast.open} onClose={handleToastClose} message={toast.message} severity={toast.severity} duration={toast.duration} />
      </ThemeProvider>
    </ToastContext.Provider>
  );
} 