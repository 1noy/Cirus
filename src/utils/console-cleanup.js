// Nettoyage de la console pour supprimer les avertissements inutiles
export function setupConsoleCleanup() {
  // Sauvegarder les fonctions originales
  const originalWarn = console.warn;
  const originalError = console.error;

  // Remplacer console.warn pour filtrer les avertissements
  console.warn = (...args) => {
    const message = args[0];
    if (typeof message === 'string') {
      // Ignorer les avertissements de dépréciation DOM
      if (message.includes('DOMNodeInsertedIntoDocument') ||
          message.includes('DOM Mutation Event') ||
          message.includes('MutationObserver') ||
          message.includes('React Router Future Flag Warning') ||
          message.includes('v7_startTransition') ||
          message.includes('v7_relativeSplatPath')) {
        return;
      }
    }
    originalWarn.apply(console, args);
  };

  // Remplacer console.error pour filtrer les erreurs mineures
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string') {
      // Ignorer les erreurs DOM mineures
      if (message.includes('removeChild') ||
          message.includes('DOMNodeInsertedIntoDocument') ||
          message.includes('400')) {
        return;
      }
    }
    originalError.apply(console, args);
  };
} 