// Utilitaire pour la gestion PWA
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker enregistré avec succès:', registration);

      // Gérer les mises à jour du service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nouvelle version disponible
            console.log('Nouvelle version disponible');
            
            // Demander à l'utilisateur de recharger
            if (confirm('Une nouvelle version est disponible. Voulez-vous recharger la page ?')) {
              window.location.reload();
            }
          }
        });
      });

      // Gérer les erreurs
      registration.addEventListener('error', (error) => {
        console.error('Erreur du Service Worker:', error);
      });

      return registration;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
      return null;
    }
  }
  
  return null;
};

// Vérifier si l'application est installée
export const isAppInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

// Vérifier si l'installation PWA est supportée
export const isPWAInstallSupported = () => {
  return 'serviceWorker' in navigator && 
         'PushManager' in window &&
         'beforeinstallprompt' in window;
};

// Obtenir les informations de l'application
export const getAppInfo = () => {
  return {
    name: 'CirusChat',
    version: '1.0.0',
    description: 'Application de chat moderne avec interface cyberpunk',
    isInstalled: isAppInstalled(),
    isPWAInstallSupported: isPWAInstallSupported()
  };
}; 