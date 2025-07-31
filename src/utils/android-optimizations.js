// Optimisations spécifiques pour Android

// Détection de la plateforme Android
export const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

// Détection de Chrome sur Android
export const isAndroidChrome = () => {
  return isAndroid() && /Chrome/i.test(navigator.userAgent);
};

// Optimisations pour les performances Android
export class AndroidOptimizer {
  constructor() {
    this.isAndroid = isAndroid();
    this.isAndroidChrome = isAndroidChrome();
    this.optimizations = new Map();
  }

  // Optimisation des animations pour Android
  optimizeAnimations() {
    if (!this.isAndroid) return;

    // Réduire la complexité des animations sur Android
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .motion-div {
          will-change: auto !important;
        }
        
        .cyberpunk-button {
          transform: none !important;
          transition: all 0.2s ease !important;
        }
        
        .neon-text {
          animation-duration: 2s !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Optimisation de la mémoire pour Android
  optimizeMemory() {
    if (!this.isAndroid) return;

    // Réduire la taille du cache sur Android
    const originalSetCache = window.setCache;
    if (originalSetCache) {
      window.setCache = (key, value, ttl) => {
        // Réduire la TTL sur Android
        const androidTTL = Math.min(ttl || 300000, 180000); // Max 3 minutes
        return originalSetCache(key, value, androidTTL);
      };
    }

    // Nettoyage plus agressif sur Android
    setInterval(() => {
      if ('memory' in performance) {
        const usage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
        if (usage > 0.7) {
          console.log('⚠️ Mémoire élevée sur Android, nettoyage...');
          this.forceGarbageCollection();
        }
      }
    }, 10000);
  }

  // Forcer le garbage collection (si disponible)
  forceGarbageCollection() {
    if (window.gc) {
      window.gc();
    }
  }

  // Optimisation des images pour Android
  optimizeImages() {
    if (!this.isAndroid) return;

    // Utiliser des formats plus légers sur Android
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src && !img.src.includes('webp')) {
        // Essayer de charger en WebP si supporté
        const webpSrc = img.src.replace(/\.(jpg|jpeg|png)/, '.webp');
        const testImg = new Image();
        testImg.onload = () => {
          img.src = webpSrc;
        };
        testImg.onerror = () => {
          // Garder l'original si WebP n'est pas supporté
        };
        testImg.src = webpSrc;
      }
    });
  }

  // Optimisation du scroll pour Android
  optimizeScroll() {
    if (!this.isAndroid) return;

    // Améliorer la performance du scroll sur Android
    const scrollElements = document.querySelectorAll('.scrollable');
    scrollElements.forEach(element => {
      element.style.webkitOverflowScrolling = 'touch';
      element.style.overflowScrolling = 'touch';
    });
  }

  // Optimisation des événements tactiles
  optimizeTouchEvents() {
    if (!this.isAndroid) return;

    // Optimiser les événements tactiles
    document.addEventListener('touchstart', (e) => {
      // Prévenir le zoom sur les boutons
      if (e.target.classList.contains('btn')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Optimiser le scroll tactile
    document.addEventListener('touchmove', (e) => {
      // Permettre le scroll naturel
    }, { passive: true });
  }

  // Optimisation de la batterie
  optimizeBattery() {
    if (!this.isAndroid) return;

    // Réduire les animations si la batterie est faible
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          this.enableLowPowerMode();
        }
      });
    }

    // Écouter les changements de batterie
    navigator.getBattery().then(battery => {
      battery.addEventListener('levelchange', () => {
        if (battery.level < 0.2) {
          this.enableLowPowerMode();
        } else {
          this.disableLowPowerMode();
        }
      });
    });
  }

  // Mode économie d'énergie
  enableLowPowerMode() {
    document.body.classList.add('low-power-mode');
    
    // Réduire les animations
    const style = document.createElement('style');
    style.textContent = `
      .low-power-mode * {
        animation-duration: 0.5s !important;
        transition-duration: 0.2s !important;
      }
      
      .low-power-mode .neon-text {
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  disableLowPowerMode() {
    document.body.classList.remove('low-power-mode');
  }

  // Optimisation du réseau pour Android
  optimizeNetwork() {
    if (!this.isAndroid) return;

    // Utiliser des stratégies de cache adaptées
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // Stratégie cache-first pour les ressources statiques
        registration.active.postMessage({
          type: 'SET_CACHE_STRATEGY',
          strategy: 'cache-first'
        });
      });
    }
  }

  // Initialiser toutes les optimisations Android
  init() {
    if (!this.isAndroid) return;

    console.log('🚀 Optimisations Android activées');

    this.optimizeAnimations();
    this.optimizeMemory();
    this.optimizeImages();
    this.optimizeScroll();
    this.optimizeTouchEvents();
    this.optimizeBattery();
    this.optimizeNetwork();

    // Surveiller les performances
    this.monitorPerformance();
  }

  // Surveillance des performances Android
  monitorPerformance() {
    if (!this.isAndroid) return;

    // Surveiller les FPS
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Ajuster les optimisations selon les FPS
        if (fps < 30) {
          this.enableLowPowerMode();
        } else if (fps > 50) {
          this.disableLowPowerMode();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    measureFPS();
  }
}

// Instance globale
export const androidOptimizer = new AndroidOptimizer();

// Hook React pour les optimisations Android
export const useAndroidOptimizations = () => {
  const [isOptimized, setIsOptimized] = React.useState(false);

  React.useEffect(() => {
    if (isAndroid()) {
      androidOptimizer.init();
      setIsOptimized(true);
    }
  }, []);

  return { isOptimized, isAndroid: isAndroid() };
}; 