import React, { useEffect } from 'react';
import { useToast } from './ToastContext';

const NotificationManager = () => {
  const { 
    showContactAdded, 
    showContactAutoAdded, 
    showMessageSent, 
    showMessageReceived, 
    showError, 
    showLoading,
    showToast
  } = useToast();

  useEffect(() => {
    // Rendre les fonctions de notification disponibles globalement
    window.showContactAdded = showContactAdded;
    window.showContactAutoAdded = showContactAutoAdded;
    window.showMessageSent = showMessageSent;
    window.showMessageReceived = showMessageReceived;
    window.showError = showError;
    window.showLoading = showLoading;
    window.showToast = showToast;

    // Nettoyer les références globales lors du démontage
    return () => {
      delete window.showContactAdded;
      delete window.showContactAutoAdded;
      delete window.showMessageSent;
      delete window.showMessageReceived;
      delete window.showError;
      delete window.showLoading;
      delete window.showToast;
    };
  }, [showContactAdded, showContactAutoAdded, showMessageSent, showMessageReceived, showError, showLoading, showToast]);

  return null; // Ce composant ne rend rien visuellement
};

export default NotificationManager; 