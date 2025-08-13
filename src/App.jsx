import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

// Import des styles cyberpunk
import './styles/cyberpunk.css';
import './styles/chat.css';

// Nouvelles pages minimalistes
const AuthPage = lazy(() => import('./pages/Auth'));
const Chat = lazy(() => import('./components/ChatPage'));
const ErrorFallback = lazy(() => import('./components/ErrorFallback'));
const WelcomeAnimation = lazy(() => import('./components/WelcomeAnimation'));

// Hooks personnalisés
import { useAppStore } from './store';
import { auth } from './utils/firebase';
import { ToastProvider } from './components/ToastContext';
import NotificationManager from './components/NotificationManager';
import { initNotifications } from './features/notifications/notifications';
import TopBar from './components/TopBar';

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Composant lazy avec fallback
const LazyComponent = ({ component: Component, ...props }) => (
  <Suspense
    fallback={
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

// Route protégée
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Route publique (pour les utilisateurs non connectés)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAppStore();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

// Configuration des toasts
const toastConfig = {
  duration: 4000,
  position: 'top-right',
  style: {
    background: '#1a1a1a',
    color: '#ffffff',
    border: '1px solid #333333',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
};

function App() {
  const { initializeApp, setUser, setTheme, addError } = useAppStore();
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return localStorage.getItem('welcome_shown') !== '1';
    } catch { return true; }
  });

  // Initialisation de l'application
  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialiser le store
        await initializeApp();

        // Charger les préférences utilisateur
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Écouter les changements d'authentification Firebase
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            const userData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'Utilisateur',
              photoURL: user.photoURL
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            // Initialiser FCM après login
            initNotifications().catch(() => {});
          } else {
            setUser(null);
            localStorage.removeItem('user');
          }
        });
        
        return () => unsubscribe();
      } catch (error) {
        addError(error);
        console.error('Erreur lors de l\'initialisation:', error);
      }
    };

    initApp();
  }, [initializeApp, setTheme, setUser, addError]);

  // Surveillance des erreurs globales
  useEffect(() => {
    const handleGlobalError = event => {
      const error = event.error || new Error('Erreur inconnue');
      addError(error);
    };

    const handleUnhandledRejection = event => {
      const error = new Error(event.reason || 'Promesse rejetée');
      addError(error);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [addError]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          addError(error);
          console.error('Erreur dans ErrorBoundary:', error, errorInfo);
        }}
      >
        <ToastProvider>
          <NotificationManager />
          <TopBar />
          {showWelcome && (
            <LazyComponent
              component={() => (
                <WelcomeAnimation
                  onComplete={() => {
                    setShowWelcome(false);
                    try { localStorage.setItem('welcome_shown', '1'); } catch {}
                  }}
                />
              )}
            />
          )}
          <div className="app">
            <RouterProvider
              router={useMemo(() => createBrowserRouter([
                {
                  path: '/login',
                  element: (
                    <PublicRoute>
                      <LazyComponent component={AuthPage} />
                    </PublicRoute>
                  ),
                },
                {
                  path: '/',
                  element: (
                    <ProtectedRoute>
                      <LazyComponent component={Chat} />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: '*',
                  element: <Navigate to="/" replace />,
                },
              ], {
                future: {
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                },
              }), [])}
            />
            <Toaster {...toastConfig} />
          </div>
        </ToastProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
