// Système de monitoring des performances avancé
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fcp: null, // First Contentful Paint
      lcp: null, // Largest Contentful Paint
      fid: null, // First Input Delay
      cls: null, // Cumulative Layout Shift
      ttfb: null, // Time to First Byte
      fmp: null, // First Meaningful Paint
      tti: null, // Time to Interactive
      tbt: null  // Total Blocking Time
    };
    
    this.observers = new Map();
    this.isMonitoring = false;
  }

  // Démarrer le monitoring
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.observeWebVitals();
    this.observeUserInteractions();
    this.observeNetworkRequests();
    this.observeMemoryUsage();
    
    console.log('Performance monitoring started');
  }

  // Observer les Web Vitals
  observeWebVitals() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.fcp = lastEntry.startTime;
          this.logMetric('FCP', this.metrics.fcp);
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.set('fcp', fcpObserver);
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          this.logMetric('LCP', this.metrics.lcp);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.set('lcp', lcpObserver);
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.logMetric('FID', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.set('fid', fidObserver);
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          this.logMetric('CLS', this.metrics.cls);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.set('cls', clsObserver);
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }
  }

  // Observer les interactions utilisateur
  observeUserInteractions() {
    let interactionCount = 0;
    let totalInteractionTime = 0;

    const trackInteraction = (event) => {
      const startTime = performance.now();
      
      const handleInteractionEnd = () => {
        const duration = performance.now() - startTime;
        totalInteractionTime += duration;
        interactionCount++;
        
        // Calculer la moyenne
        const avgInteractionTime = totalInteractionTime / interactionCount;
        
        if (avgInteractionTime > 100) { // Seuil de 100ms
          this.logMetric('Slow Interaction', avgInteractionTime);
        }
        
        // Nettoyer les listeners
        document.removeEventListener('pointerup', handleInteractionEnd);
        document.removeEventListener('keyup', handleInteractionEnd);
      };
      
      document.addEventListener('pointerup', handleInteractionEnd, { once: true });
      document.addEventListener('keyup', handleInteractionEnd, { once: true });
    };

    document.addEventListener('pointerdown', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
  }

  // Observer les requêtes réseau
  observeNetworkRequests() {
    if ('PerformanceObserver' in window) {
      try {
        const networkObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
              const duration = entry.duration;
              const size = entry.transferSize || 0;
              
              if (duration > 1000) { // Seuil de 1 seconde
                this.logMetric('Slow Network Request', {
                  duration,
                  size,
                  name: entry.name
                });
              }
            }
          });
        });
        networkObserver.observe({ entryTypes: ['resource'] });
        this.observers.set('network', networkObserver);
      } catch (e) {
        console.warn('Network observer failed:', e);
      }
    }
  }

  // Observer l'utilisation mémoire
  observeMemoryUsage() {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = performance.memory;
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        const totalMB = memory.totalJSHeapSize / 1024 / 1024;
        const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;
        
        const usagePercent = (usedMB / limitMB) * 100;
        
        if (usagePercent > 80) {
          this.logMetric('High Memory Usage', {
            used: usedMB.toFixed(2) + 'MB',
            total: totalMB.toFixed(2) + 'MB',
            limit: limitMB.toFixed(2) + 'MB',
            usage: usagePercent.toFixed(2) + '%'
          });
        }
      };
      
      setInterval(checkMemory, 10000); // Vérifier toutes les 10 secondes
    }
  }

  // Logger une métrique
  logMetric(name, value) {
    const metric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    console.log(`📊 ${name}:`, value);
    
    // Envoyer à un service de monitoring (optionnel)
    this.sendToMonitoringService(metric);
  }

  // Envoyer à un service de monitoring
  sendToMonitoringService(metric) {
    try {
      // Exemple avec Google Analytics
      if (window.gtag) {
        window.gtag('event', 'performance_metric', {
          metric_name: metric.name,
          metric_value: metric.value,
          page_url: metric.url
        });
      }
      
      // Exemple avec un service personnalisé
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/metrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metric)
        }).catch(() => {
          // Ignorer les erreurs de monitoring
        });
      }
    } catch (e) {
      // Ignorer les erreurs de monitoring
    }
  }

  // Obtenir un rapport de performance
  getPerformanceReport() {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    return {
      metrics: this.metrics,
      navigation: {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
        totalTime: navigation?.loadEventEnd - navigation?.fetchStart
      },
      resources: {
        count: resources.length,
        totalSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0),
        averageLoadTime: resources.reduce((sum, resource) => sum + resource.duration, 0) / resources.length
      },
      memory: 'memory' in performance ? {
        used: performance.memory.usedJSHeapSize / 1024 / 1024,
        total: performance.memory.totalJSHeapSize / 1024 / 1024,
        limit: performance.memory.jsHeapSizeLimit / 1024 / 1024
      } : null
    };
  }

  // Arrêter le monitoring
  stop() {
    this.isMonitoring = false;
    
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (e) {
        console.warn('Failed to disconnect observer:', e);
      }
    });
    
    this.observers.clear();
    console.log('Performance monitoring stopped');
  }
}

// Instance globale
export const performanceMonitor = new PerformanceMonitor();

// Hook React pour le monitoring
export const usePerformanceMonitoring = () => {
  const startMonitoring = () => performanceMonitor.start();
  const stopMonitoring = () => performanceMonitor.stop();
  const getReport = () => performanceMonitor.getPerformanceReport();
  
  return {
    startMonitoring,
    stopMonitoring,
    getReport
  };
}; 