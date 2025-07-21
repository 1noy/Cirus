import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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