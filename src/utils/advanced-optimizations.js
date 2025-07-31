// Optimisations avancées pour CirusChat

// Web Workers pour les calculs lourds
export class BackgroundWorker {
  constructor() {
    this.worker = null;
    this.isSupported = typeof Worker !== 'undefined';
  }

  init() {
    if (!this.isSupported) return;

    const workerCode = `
      self.onmessage = function(e) {
        const { type, data } = e.data;
        
        switch(type) {
          case 'processData':
            const result = processData(data);
            self.postMessage({ type: 'result', data: result });
            break;
          case 'calculateStats':
            const stats = calculateStats(data);
            self.postMessage({ type: 'stats', data: stats });
            break;
        }
      };

      function processData(data) {
        // Simulation de traitement lourd
        return data.map(item => ({
          ...item,
          processed: true,
          timestamp: Date.now()
        }));
      }

      function calculateStats(data) {
        return {
          count: data.length,
          average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
          max: Math.max(...data.map(item => item.value)),
          min: Math.min(...data.map(item => item.value))
        };
      }
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));
  }

  postMessage(type, data) {
    if (this.worker) {
      this.worker.postMessage({ type, data });
    }
  }

  onMessage(callback) {
    if (this.worker) {
      this.worker.onmessage = callback;
    }
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// Optimisation des images avec WebP
export const optimizeImage = (src, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/webp', quality);
    };
    
    img.src = src;
  });
};

// Cache intelligent avec LRU
export class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.accessOrder = [];
  }

  get(key) {
    if (this.cache.has(key)) {
      this.updateAccessOrder(key);
      return this.cache.get(key);
    }
    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.updateAccessOrder(key);
    } else {
      this.accessOrder.push(key);
      if (this.accessOrder.length > this.maxSize) {
        const oldestKey = this.accessOrder.shift();
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  updateAccessOrder(key) {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
      this.accessOrder.push(key);
    }
  }

  clear() {
    this.cache.clear();
    this.accessOrder = [];
  }
}

// Optimisation des animations avec RAF
export class AnimationOptimizer {
  constructor() {
    this.animations = new Map();
    this.isRunning = false;
  }

  addAnimation(id, animationFn) {
    this.animations.set(id, animationFn);
    if (!this.isRunning) {
      this.start();
    }
  }

  removeAnimation(id) {
    this.animations.delete(id);
    if (this.animations.size === 0) {
      this.stop();
    }
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (!this.isRunning) return;

    this.animations.forEach((animationFn) => {
      animationFn();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Optimisation des événements avec delegation
export class EventDelegator {
  constructor() {
    this.listeners = new Map();
  }

  addListener(selector, eventType, handler) {
    const key = `${selector}-${eventType}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(handler);
  }

  removeListener(selector, eventType, handler) {
    const key = `${selector}-${eventType}`;
    const handlers = this.listeners.get(key);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  delegate(event) {
    const { target, type } = event;
    const key = `${target.tagName.toLowerCase()}-${type}`;
    const handlers = this.listeners.get(key);
    
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event);
        } catch (error) {
          console.error('Erreur dans le gestionnaire d\'événement:', error);
        }
      });
    }
  }
}

// Optimisation des requêtes réseau
export class NetworkOptimizer {
  constructor() {
    this.pendingRequests = new Map();
    this.cache = new LRUCache(50);
  }

  async request(url, options = {}) {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    
    // Vérifier le cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.data;
    }

    // Éviter les requêtes en double
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    const requestPromise = fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Mettre en cache
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
        
        // Nettoyer la requête en cours
        this.pendingRequests.delete(cacheKey);
        
        return data;
      })
      .catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }
}

// Optimisation du DOM avec Virtual DOM simplifié
export class VirtualDOMOptimizer {
  constructor() {
    this.virtualNodes = new Map();
    this.observer = null;
  }

  observe(element, callback) {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          callback(mutation);
        }
      });
    });

    this.observer.observe(element, {
      childList: true,
      subtree: true
    });
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Optimisation de la mémoire
export class MemoryOptimizer {
  constructor() {
    this.weakRefs = new Map();
    this.cleanupInterval = null;
  }

  trackObject(key, obj) {
    this.weakRefs.set(key, new WeakRef(obj));
  }

  getObject(key) {
    const weakRef = this.weakRefs.get(key);
    if (weakRef) {
      const obj = weakRef.deref();
      if (obj) {
        return obj;
      } else {
        this.weakRefs.delete(key);
      }
    }
    return null;
  }

  startCleanup() {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 30000); // Nettoyage toutes les 30 secondes
  }

  stopCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  cleanup() {
    for (const [key, weakRef] of this.weakRefs.entries()) {
      if (!weakRef.deref()) {
        this.weakRefs.delete(key);
      }
    }
  }
}

// Optimisation des performances globales
export class PerformanceOptimizer {
  constructor() {
    this.backgroundWorker = new BackgroundWorker();
    this.animationOptimizer = new AnimationOptimizer();
    this.eventDelegator = new EventDelegator();
    this.networkOptimizer = new NetworkOptimizer();
    this.virtualDOMOptimizer = new VirtualDOMOptimizer();
    this.memoryOptimizer = new MemoryOptimizer();
  }

  init() {
    this.backgroundWorker.init();
    this.memoryOptimizer.startCleanup();
    
    // Optimiser les événements globaux
    document.addEventListener('click', (e) => this.eventDelegator.delegate(e));
    document.addEventListener('scroll', (e) => this.eventDelegator.delegate(e));
  }

  destroy() {
    this.backgroundWorker.terminate();
    this.animationOptimizer.stop();
    this.virtualDOMOptimizer.disconnect();
    this.memoryOptimizer.stopCleanup();
  }
}

// Instance globale
export const performanceOptimizer = new PerformanceOptimizer(); 