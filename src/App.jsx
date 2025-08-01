import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

// Import des styles cyberpunk
import './styles/cyberpunk.css';

// Composants lazy
const CyberpunkAuth = lazy(() => import('./components/CyberpunkAuth'));
const ChatPage = lazy(() => import('./components/ChatPage'));
const Home = lazy(() => import('./components/Home'));
const ErrorFallback = lazy(() => import('./components/ErrorFallback'));
const PWAInstall = lazy(() => import('./components/PWAInstall'));
const PerformanceMonitor = lazy(() => import('./components/PerformanceMonitor'));

// Hooks personnalisés
import { useAppStore } from './store';
import { auth } from './utils/firebase';
import { ToastProvider } from './components/ToastContext';
import NotificationManager from './components/NotificationManager';
import { registerServiceWorker } from './utils/pwa';
import { performanceMonitor } from './utils/performance-monitor';
import { performanceOptimizer } from './utils/advanced-optimizations';
import { CacheProvider } from './components/SmartCache';
import { androidOptimizer } from './utils/android-optimizations';

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
  const { initializeApp, setUser, setTheme, addError, initializeTestUsers } = useAppStore();

  // Initialisation de l'application
  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialiser le store
        await initializeApp();

        // Initialiser les utilisateurs de test (sans await pour éviter le blocage)
        initializeTestUsers().catch(error => {
          console.warn('Erreur lors de l\'initialisation des utilisateurs de test:', error);
        });

        // Enregistrer le service worker PWA (sans await)
        registerServiceWorker().catch(error => {
          console.warn('Erreur lors de l\'enregistrement du service worker:', error);
        });

        // Démarrer le moniteur de performances
        performanceMonitor.start();

        // Initialiser les optimisations avancées
        performanceOptimizer.init();

        // Initialiser les optimisations Android
        androidOptimizer.init();

        // Charger les préférences utilisateur
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        // Utilisateur de test temporaire pour le développement
        const testUser = {
          uid: 'test-user-123',
          email: 'test@cirus.com',
          displayName: 'Utilisateur Test',
          photoURL: null
        };
        setUser(testUser);

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
  }, [initializeApp, setTheme, setUser, addError, initializeTestUsers]);

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

  // Nettoyage des optimisations
  useEffect(() => {
    return () => {
      performanceOptimizer.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider maxSize={200}>
        <Router>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
              addError(error);
              console.error('Erreur dans ErrorBoundary:', error, errorInfo);
            }}
          >
            <ToastProvider>
              <NotificationManager />
              <PWAInstall />
              <div className="app">
                <Routes>
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <LazyComponent component={CyberpunkAuth} />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/chat/:chatId?"
                    element={
                      <ProtectedRoute>
                        <LazyComponent component={ChatPage} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={<LazyComponent component={Home} />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                {/* Toaster désactivé pour enlever les notifications en haut */}
                {/* <Toaster {...toastConfig} /> */}
              </div>
              <PerformanceMonitor />
            </ToastProvider>
          </ErrorBoundary>
        </Router>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default App;
