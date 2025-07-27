import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner, LazyLoadingSpinner } from './components/LoadingStates';
import PerformanceDiagnostic from './components/PerformanceDiagnostic';

// Lazy loading des composants
const Home = React.lazy(() => import('./components/Home'));
const LoginRegister = React.lazy(() => import('./components/LoginRegister'));
const ChatPage = React.lazy(() => import('./components/ChatPage'));
const ProfilePage = React.lazy(() => import('./components/ProfilePage'));

// Composant de chargement pour les composants lazy
const LazyComponentLoader = ({ children }) => (
  <Suspense fallback={<LazyLoadingSpinner />}>
    {children}
  </Suspense>
);

function App() {
  useEffect(() => {
    // Optimisation du scroll avec requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Optimisations de scroll ici
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyComponentLoader>
                    <Home />
                  </LazyComponentLoader>
                </Suspense>
              } 
            />
            <Route 
              path="/login" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyComponentLoader>
                    <LoginRegister />
                  </LazyComponentLoader>
                </Suspense>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyComponentLoader>
                    <ChatPage />
                  </LazyComponentLoader>
                </Suspense>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyComponentLoader>
                    <ProfilePage />
                  </LazyComponentLoader>
                </Suspense>
              } 
            />
          </Routes>
        </Router>
        
        {/* Diagnostic de performance (visible en développement) */}
        {/* Temporairement désactivé pour éviter les erreurs */}
        {/* <PerformanceDiagnostic /> */}
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App; 