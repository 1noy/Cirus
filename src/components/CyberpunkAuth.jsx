import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import WelcomeAnimation from './WelcomeAnimation';
import CyberpunkLogin from './CyberpunkLogin';

/**
 * Composant d'authentification principal avec gestion d'état optimisée
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onAuthSuccess - Callback appelé lors de la connexion réussie
 * @param {string} props.defaultView - Vue par défaut ('welcome' | 'login')
 */
const CyberpunkAuth = React.memo(({ onAuthSuccess, defaultView = 'welcome' }) => {
  const [currentView, setCurrentView] = useState(defaultView);
  const [authState, setAuthState] = useState({
    isLoading: false,
    error: null,
    lastAttempt: null
  });

  // Callback memoized pour éviter les re-renders inutiles
  const handleViewChange = useCallback((newView) => {
    setCurrentView(newView);
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  const handleAuthSuccess = useCallback((userData) => {
    setAuthState(prev => ({ ...prev, isLoading: false, error: null }));
    onAuthSuccess?.(userData);
  }, [onAuthSuccess]);

  const handleAuthError = useCallback((error) => {
    setAuthState(prev => ({
      ...prev,
      isLoading: false,
      error: error.message,
      lastAttempt: Date.now()
    }));
  }, []);

  // Configuration des animations memoized
  const animationConfig = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }), []);

  // Rendu conditionnel optimisé
  const renderCurrentView = useMemo(() => {
    switch (currentView) {
      case 'welcome':
        return (
          <WelcomeAnimation
            key="welcome"
            onGetStarted={() => handleViewChange('login')}
            onAuthSuccess={handleAuthSuccess}
            onAuthError={handleAuthError}
          />
        );
      case 'login':
        return (
          <CyberpunkLogin
            key="login"
            onAuthSuccess={handleAuthSuccess}
            onAuthError={handleAuthError}
            onBackToWelcome={() => handleViewChange('welcome')}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );
      default:
        return null;
    }
  }, [currentView, handleViewChange, handleAuthSuccess, handleAuthError, authState.isLoading, authState.error]);

  return (
    <div className="auth-container" role="main" aria-label="Authentification">
      {/* Gestionnaire d'erreurs global */}
      {authState.error && (
        <motion.div
          className="auth-error-banner"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          role="alert"
          aria-live="polite"
        >
          <span className="error-icon">⚠️</span>
          <span className="error-message">{authState.error}</span>
          <button
            className="error-close"
            onClick={() => setAuthState(prev => ({ ...prev, error: null }))}
            aria-label="Fermer l'erreur"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Contenu principal avec transitions fluides */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentView}
          {...animationConfig}
          className="auth-content"
        >
          {renderCurrentView}
        </motion.div>
      </AnimatePresence>

      {/* Indicateur de chargement global */}
      {authState.isLoading && (
        <motion.div
          className="global-loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="status"
          aria-label="Chargement en cours"
        >
          <div className="loading-spinner" />
          <span className="loading-text">Authentification en cours...</span>
        </motion.div>
      )}
    </div>
  );
});

CyberpunkAuth.propTypes = {
  onAuthSuccess: PropTypes.func,
  defaultView: PropTypes.oneOf(['welcome', 'login'])
};

CyberpunkAuth.defaultProps = {
  defaultView: 'welcome'
};

// Optimisation des performances avec displayName
CyberpunkAuth.displayName = 'CyberpunkAuth';

export default CyberpunkAuth; 