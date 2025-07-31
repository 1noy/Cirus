import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true);
        return true;
      }
      return false;
    };

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    // Vérifier si déjà installée
    if (!checkIfInstalled()) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Application installée avec succès');
      setIsInstalled(true);
      setShowInstallButton(false);
    } else {
      console.log('Installation refusée par l\'utilisateur');
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallButton(false);
    setDeferredPrompt(null);
  };

  if (isInstalled || !showInstallButton) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="pwa-install-banner"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pwa-content">
          <div className="pwa-icon">
            <i className="fas fa-download"></i>
          </div>
          <div className="pwa-text">
            <h3>Installer CirusChat</h3>
            <p>Accédez rapidement à l'application depuis votre écran d'accueil</p>
          </div>
          <div className="pwa-actions">
            <button 
              className="btn btn-primary pwa-install-btn"
              onClick={handleInstallClick}
            >
              <i className="fas fa-download"></i>
              Installer
            </button>
            <button 
              className="btn btn-secondary pwa-dismiss-btn"
              onClick={handleDismiss}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstall; 