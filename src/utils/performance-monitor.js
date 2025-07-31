// Moniteur de performances pour CirusChat

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
      memoryUsage: null
    };
    
    this.observers = [];
    this.isMonitoring = false;
  }

  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.observeWebVitals();
    this.observeMemoryUsage();
    this.logInitialMetrics();
  }

  stop() {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  observeWebVitals() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        this.metrics.firstContentfulPaint = fcp.startTime;
        this.logMetric('FCP', fcp.startTime);
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lcp.startTime;
        this.logMetric('LCP', lcp.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
        this.metrics.cumulativeLayoutShift = cls;
        this.logMetric('CLS', cls);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[entries.length - 1];
        this.metrics.firstInputDelay = fid.processingStart - fid.startTime;
        this.logMetric('FID', this.metrics.firstInputDelay);
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    }
  }

  observeMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memoryUsage = {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        };
        
        // Alerte si utilisation mémoire élevée
        const usagePercent = (this.metrics.memoryUsage.used / this.metrics.memoryUsage.limit) * 100;
        if (usagePercent > 80) {
          console.warn(`⚠️ Utilisation mémoire élevée: ${usagePercent.toFixed(1)}%`);
        }
      }, 5000);
    }
  }

  logInitialMetrics() {
    // Temps de chargement de la page
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.metrics.pageLoadTime = loadTime;
      this.logMetric('Page Load Time', loadTime);
    });
  }

  logMetric(name, value) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  // Mesurer les performances d'une fonction
  measureFunction(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;
    
    this.logMetric(name, duration);
    return { result, duration };
  }

  // Mesurer les performances d'une promesse
  async measureAsyncFunction(name, fn) {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    this.logMetric(name, duration);
    return { result, duration };
  }
}

// Instance globale du moniteur
export const performanceMonitor = new PerformanceMonitor();

// Hook React pour mesurer les performances des composants
export const usePerformanceMonitor = (componentName) => {
  const startTime = performance.now();
  
  return {
    endMeasure: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      performanceMonitor.logMetric(`${componentName} Render`, duration);
    }
  };
};

// Utilitaire pour mesurer les performances des événements
export const measureEvent = (eventName, callback) => {
  return (...args) => {
    const start = performance.now();
    const result = callback(...args);
    const end = performance.now();
    
    performanceMonitor.logMetric(eventName, end - start);
    return result;
  };
};

// Utilitaire pour mesurer les performances des requêtes réseau
export const measureNetworkRequest = async (requestName, requestFn) => {
  const start = performance.now();
  try {
    const result = await requestFn();
    const end = performance.now();
    performanceMonitor.logMetric(`${requestName} Request`, end - start);
    return result;
  } catch (error) {
    const end = performance.now();
    performanceMonitor.logMetric(`${requestName} Error`, end - start);
    throw error;
  }
}; 