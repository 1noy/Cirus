// Optimiseur de performance pour Cirus Chat
class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      fps: [],
      memory: [],
      network: [],
      interactions: []
    };
    this.observers = new Map();
    this.isMonitoring = false;
  }

  // Démarrer le monitoring
  start() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    
    this.observeFPS();
    this.observeMemory();
    this.observeNetwork();
    this.observeInteractions();
    this.optimizeImages();
    this.optimizeAnimations();
    this.optimizeScroll();
    
    console.log('🚀 Performance Optimizer démarré');
  }

  // Observer les FPS
  observeFPS() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.metrics.fps.push(fps);
        
        if (fps < 30) {
          this.optimizeRendering();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (this.isMonitoring) {
        requestAnimationFrame(measureFPS);
      }
    };
    
    requestAnimationFrame(measureFPS);
  }

  // Observer l'utilisation mémoire
  observeMemory() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        this.metrics.memory.push({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        });
        
        // Alerte si utilisation mémoire > 80%
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (usagePercent > 80) {
          this.cleanupMemory();
        }
      }, 5000);
    }
  }

  // Observer les requêtes réseau
  observeNetwork() {
    const originalFetch = window.fetch;
    window.fetch = (...args) => {
      const startTime = performance.now();
      return originalFetch(...args).then(response => {
        const duration = performance.now() - startTime;
        this.metrics.network.push({ duration, url: args[0] });
        
        if (duration > 3000) {
          console.warn('⚠️ Requête réseau lente:', args[0], `${duration.toFixed(0)}ms`);
        }
        
        return response;
      });
    };
  }

  // Observer les interactions utilisateur
  observeInteractions() {
    let lastInteraction = performance.now();
    
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, () => {
        const now = performance.now();
        const timeSinceLast = now - lastInteraction;
        this.metrics.interactions.push({ event, timeSinceLast });
        lastInteraction = now;
      }, { passive: true });
    });
  }

  // Optimiser le rendu
  optimizeRendering() {
    // Réduire les animations si FPS bas
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    
    // Désactiver les effets visuels lourds
    const heavyElements = document.querySelectorAll('.performance-optimized');
    heavyElements.forEach(el => {
      el.style.willChange = 'auto';
    });
  }

  // Nettoyer la mémoire
  cleanupMemory() {
    // Forcer le garbage collection si disponible
    if (window.gc) {
      window.gc();
    }
    
    // Nettoyer les caches inutilisés
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('chat-changing')) {
            caches.delete(name);
          }
        });
      });
    }
    
    console.log('🧹 Nettoyage mémoire effectué');
  }

  // Optimiser les images
  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Lazy loading
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Optimiser le format
      if (img.src && !img.src.includes('webp')) {
        this.convertToWebP(img);
      }
    });
  }

  // Convertir en WebP
  convertToWebP(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const webpUrl = URL.createObjectURL(blob);
          img.src = webpUrl;
        }
      }, 'image/webp', 0.8);
    };
  }

  // Optimiser les animations
  optimizeAnimations() {
    // Vérifier les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
    
    // Optimiser les animations CSS
    const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  }

  // Optimiser le scroll
  optimizeScroll() {
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
  }

  // Obtenir les métriques
  getMetrics() {
    try {
      const lastFps = this.metrics.fps[this.metrics.fps.length - 1] || 0;
      const lastMemory = this.metrics.memory[this.metrics.memory.length - 1] || { used: 0, limit: 1 };
      
      return {
        fps: {
          current: lastFps,
          average: this.metrics.fps.length > 0 
            ? this.metrics.fps.reduce((a, b) => a + b, 0) / this.metrics.fps.length 
            : 0
        },
        memory: {
          current: lastMemory,
          usage: lastMemory.limit > 0 
            ? (lastMemory.used / lastMemory.limit) * 100 
            : 0
        },
        network: {
          average: this.metrics.network.length > 0 
            ? this.metrics.network.reduce((a, b) => a + b.duration, 0) / this.metrics.network.length 
            : 0
        }
      };
    } catch (error) {
      console.warn('Erreur lors du calcul des métriques:', error);
      return {
        fps: { current: 0, average: 0 },
        memory: { current: {}, usage: 0 },
        network: { average: 0 }
      };
    }
  }

  // Arrêter le monitoring
  stop() {
    this.isMonitoring = false;
    console.log('🛑 Performance Optimizer arrêté');
  }
}

// Instance globale
export const performanceOptimizer = new PerformanceOptimizer();

// Hook React pour l'optimisation
export const usePerformanceOptimization = () => {
  const startOptimization = () => {
    if (process.env.NODE_ENV === 'production') {
      performanceOptimizer.start();
    }
  };

  const stopOptimization = () => {
    performanceOptimizer.stop();
  };

  const getMetrics = () => {
    try {
      return performanceOptimizer.getMetrics() || {
        fps: { current: 0, average: 0 },
        memory: { usage: 0 },
        network: { average: 0 }
      };
    } catch (error) {
      console.warn('Erreur lors de la récupération des métriques:', error);
      return {
        fps: { current: 0, average: 0 },
        memory: { usage: 0 },
        network: { average: 0 }
      };
    }
  };

  return { startOptimization, stopOptimization, getMetrics };
}; 