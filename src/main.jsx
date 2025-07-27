import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { setupConsoleCleanup } from './utils/console-cleanup.js'
import { performanceMonitor } from './utils/performanceMonitor.js'
import { performanceOptimizer } from './utils/performanceOptimizer.js'

// Configurer le nettoyage de console
setupConsoleCleanup();

// Démarrer le monitoring de performance
if (process.env.NODE_ENV === 'production') {
  performanceMonitor.start();
  performanceOptimizer.start();
}

// Optimisations globales
const optimizeApp = () => {
  // Optimisation du scroll
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

  // Optimisation des images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Optimisation des animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  }

  // Optimisation du focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });

  // Optimisation des boutons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    // Ajouter les rôles d'accessibilité manquants
    if (!button.getAttribute('role')) {
      button.setAttribute('role', 'button');
    }
    if (!button.getAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
    }
    
    // Optimiser les événements clavier
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Optimisation des formulaires
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton && submitButton.disabled) {
        e.preventDefault();
        return false;
      }
    });
  });

  // Optimisation des inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    // Ajouter les rôles d'accessibilité
    if (!input.getAttribute('role')) {
      input.setAttribute('role', 'textbox');
    }
    
    // Optimiser les événements de focus
    input.addEventListener('focus', (e) => {
      e.target.style.borderColor = '#1cc6ff';
      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
    });
    
    input.addEventListener('blur', (e) => {
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
    });
  });
};

// Initialisation optimisée
const initializeApp = () => {
  // Optimisations avant le rendu
  optimizeApp();

  // Rendu de l'application
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Démarrer l'application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
  if (process.env.NODE_ENV === 'production') {
    console.error('Global error:', event.error);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (process.env.NODE_ENV === 'production') {
    console.error('Unhandled promise rejection:', event.reason);
  }
}); 