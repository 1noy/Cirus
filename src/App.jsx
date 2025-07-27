import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import ChatPage from './components/ChatPage';
import ProfilePage from './components/ProfilePage';
import { ToastProvider } from './components/ToastContext';
import CustomRouter from './components/CustomRouter';
import PWAInstall from './components/PWAInstall';

// Error Boundary pour capturer les erreurs React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Ignorer complètement les erreurs DOM mineures
    if (error.message && (
      error.message.includes('removeChild') ||
      error.message.includes('DOMNodeInsertedIntoDocument') ||
      error.message.includes('MutationObserver')
    )) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Ne logger que les erreurs vraiment critiques
    if (!error.message.includes('removeChild') && 
        !error.message.includes('DOMNodeInsertedIntoDocument') &&
        !error.message.includes('MutationObserver')) {
      // eslint-disable-next-line no-console, no-undef
      console.error('Erreur critique capturée:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
          color: '#fff',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>
            <h1 style={{ color: '#ff4757', marginBottom: '16px' }}>⚠️ Erreur Critique</h1>
            <p style={{ marginBottom: '20px' }}>
              Une erreur critique s&apos;est produite. Veuillez rafraîchir la page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Rafraîchir
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  // Gestion globale des erreurs non capturées
  useEffect(() => {
    const handleError = (event) => {
      // Ignorer complètement les erreurs DOM mineures et les avertissements
      if (event.error && event.error.message && (
        event.error.message.includes('removeChild') ||
        event.error.message.includes('DOMNodeInsertedIntoDocument') ||
        event.error.message.includes('MutationObserver') ||
        event.error.message.includes('Deprecation')
      )) {
        event.preventDefault();
        return;
      }
      
      // Ne logger que les vraies erreurs
      if (event.error && !event.error.message.includes('400')) {
        // eslint-disable-next-line no-console, no-undef
        console.error('Erreur globale:', event.error);
      }
      event.preventDefault();
    };

    const handleUnhandledRejection = (event) => {
      // Ignorer les erreurs 400 (authentification)
      if (event.reason && event.reason.message && event.reason.message.includes('400')) {
        event.preventDefault();
        return;
      }
      // eslint-disable-next-line no-console, no-undef
      console.error('Promesse rejetée non gérée:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <CustomRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister mode="login" />} />
            <Route path="/register" element={<LoginRegister mode="register" />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <PWAInstall />
        </CustomRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
} 