import { performance, PerformanceObserver } from 'perf_hooks';

/**
 * Système de tests de performance avancé pour React
 * Mesure les performances réelles des composants et des opérations
 */
class PerformanceTest {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.thresholds = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
    
    this.setupPerformanceObserver();
  }

  /**
   * Configuration de l'observateur de performance
   */
  setupPerformanceObserver() {
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            this.recordMetric(entry.name, entry.duration, entry.entryType);
          });
        });

        observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
        this.observers.set('main', observer);
      } catch (error) {
        console.warn('PerformanceObserver non supporté:', error);
      }
    }
  }

  /**
   * Démarrer une mesure de performance
   * @param {string} name - Nom de la mesure
   * @param {string} category - Catégorie de la mesure
   */
  startMeasure(name, category = 'default') {
    if (!this.isEnabled) return;

    const key = `${category}:${name}`;
    const startTime = performance.now();
    
    this.metrics.set(key, {
      startTime,
      category,
      name,
      measurements: []
    });

    // Marquer le début
    if (performance.mark) {
      performance.mark(`${key}-start`);
    }

    return key;
  }

  /**
   * Arrêter une mesure de performance
   * @param {string} name - Nom de la mesure
   * @param {string} category - Catégorie de la mesure
   * @param {Object} metadata - Métadonnées supplémentaires
   */
  endMeasure(name, category = 'default', metadata = {}) {
    if (!this.isEnabled) return null;

    const key = `${category}:${name}`;
    const metric = this.metrics.get(key);
    
    if (!metric) {
      console.warn(`Mesure non trouvée: ${key}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    // Marquer la fin
    if (performance.mark) {
      performance.mark(`${key}-end`);
      performance.measure(key, `${key}-start`, `${key}-end`);
    }

    // Enregistrer la mesure
    const measurement = {
      duration,
      timestamp: Date.now(),
      metadata
    };

    metric.measurements.push(measurement);
    metric.lastDuration = duration;
    metric.averageDuration = this.calculateAverage(metric.measurements.map(m => m.duration));

    // Vérifier les seuils
    this.checkThresholds(key, duration);

    return measurement;
  }

  /**
   * Mesurer une fonction asynchrone
   * @param {string} name - Nom de la mesure
   * @param {Function} fn - Fonction à mesurer
   * @param {string} category - Catégorie de la mesure
   * @param {Object} metadata - Métadonnées supplémentaires
   */
  async measureAsync(name, fn, category = 'default', metadata = {}) {
    const key = this.startMeasure(name, category);
    
    try {
      const result = await fn();
      this.endMeasure(name, category, { ...metadata, success: true });
      return result;
    } catch (error) {
      this.endMeasure(name, category, { ...metadata, success: false, error: error.message });
      throw error;
    }
  }

  /**
   * Mesurer une fonction synchrone
   * @param {string} name - Nom de la mesure
   * @param {Function} fn - Fonction à mesurer
   * @param {string} category - Catégorie de la mesure
   * @param {Object} metadata - Métadonnées supplémentaires
   */
  measureSync(name, fn, category = 'default', metadata = {}) {
    const key = this.startMeasure(name, category);
    
    try {
      const result = fn();
      this.endMeasure(name, category, { ...metadata, success: true });
      return result;
    } catch (error) {
      this.endMeasure(name, category, { ...metadata, success: false, error: error.message });
      throw error;
    }
  }

  /**
   * Mesurer le rendu d'un composant React
   * @param {string} componentName - Nom du composant
   * @param {Function} renderFn - Fonction de rendu
   * @param {Object} props - Props du composant
   */
  measureComponentRender(componentName, renderFn, props = {}) {
    return this.measureSync(
      `${componentName}-render`,
      () => renderFn(props),
      'component-render',
      { component: componentName, props }
    );
  }

  /**
   * Mesurer les performances de re-rendu
   * @param {string} componentName - Nom du composant
   * @param {Function} renderFn - Fonction de rendu
   * @param {Array} propsArray - Tableau de props pour tester différents scénarios
   */
  measureReRenderPerformance(componentName, renderFn, propsArray) {
    const results = [];
    
    propsArray.forEach((props, index) => {
      const result = this.measureComponentRender(
        `${componentName}-re-render-${index}`,
        renderFn,
        props
      );
      results.push({ props, result });
    });

    return results;
  }

  /**
   * Mesurer les performances de la liste virtuelle
   * @param {string} name - Nom de la mesure
   * @param {Array} items - Éléments de la liste
   * @param {Function} renderItem - Fonction de rendu d'un élément
   * @param {Object} options - Options de virtualisation
   */
  measureVirtualListPerformance(name, items, renderItem, options = {}) {
    const { itemHeight = 50, containerHeight = 400, overscan = 5 } = options;
    
    return this.measureSync(
      `${name}-virtual-list`,
      () => {
        const visibleCount = Math.ceil(containerHeight / itemHeight) + overscan;
        const visibleItems = items.slice(0, visibleCount);
        return visibleItems.map(renderItem);
      },
      'virtual-list',
      { itemCount: items.length, visibleCount: Math.ceil(containerHeight / itemHeight) + overscan }
    );
  }

  /**
   * Mesurer les performances de la mémoire
   * @param {string} name - Nom de la mesure
   */
  measureMemoryUsage(name) {
    if (!performance.memory) {
      console.warn('performance.memory non supporté');
      return null;
    }

    const memoryInfo = performance.memory;
    const measurement = {
      usedJSHeapSize: memoryInfo.usedJSHeapSize,
      totalJSHeapSize: memoryInfo.totalJSHeapSize,
      jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
      timestamp: Date.now()
    };

    this.recordMetric(name, 0, 'memory', measurement);
    return measurement;
  }

  /**
   * Mesurer les performances réseau
   * @param {string} url - URL à tester
   * @param {Object} options - Options de la requête
   */
  async measureNetworkPerformance(url, options = {}) {
    const startTime = performance.now();
    
    try {
      const response = await fetch(url, options);
      const endTime = performance.now();
      
      const measurement = {
        duration: endTime - startTime,
        status: response.status,
        size: response.headers.get('content-length'),
        timestamp: Date.now()
      };

      this.recordMetric(`network:${url}`, measurement.duration, 'network', measurement);
      return measurement;
    } catch (error) {
      const endTime = performance.now();
      const measurement = {
        duration: endTime - startTime,
        error: error.message,
        timestamp: Date.now()
      };

      this.recordMetric(`network:${url}`, measurement.duration, 'network', measurement);
      throw error;
    }
  }

  /**
   * Définir un seuil de performance
   * @param {string} name - Nom de la mesure
   * @param {number} threshold - Seuil en millisecondes
   * @param {string} category - Catégorie de la mesure
   */
  setThreshold(name, threshold, category = 'default') {
    const key = `${category}:${name}`;
    this.thresholds.set(key, threshold);
  }

  /**
   * Vérifier les seuils de performance
   * @param {string} key - Clé de la mesure
   * @param {number} duration - Durée mesurée
   */
  checkThresholds(key, duration) {
    const threshold = this.thresholds.get(key);
    
    if (threshold && duration > threshold) {
      console.warn(`⚠️ Performance seuil dépassé: ${key} (${duration.toFixed(2)}ms > ${threshold}ms)`);
      
      // Émettre un événement personnalisé
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('performance-threshold-exceeded', {
          detail: { key, duration, threshold }
        }));
      }
    }
  }

  /**
   * Calculer la moyenne d'un tableau de valeurs
   * @param {Array} values - Valeurs à moyenner
   */
  calculateAverage(values) {
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  /**
   * Enregistrer une métrique
   * @param {string} name - Nom de la métrique
   * @param {number} duration - Durée
   * @param {string} type - Type de métrique
   * @param {Object} metadata - Métadonnées supplémentaires
   */
  recordMetric(name, duration, type = 'measure', metadata = {}) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, {
        name,
        type,
        measurements: [],
        category: 'default'
      });
    }

    const metric = this.metrics.get(name);
    const measurement = {
      duration,
      timestamp: Date.now(),
      metadata
    };

    metric.measurements.push(measurement);
    metric.lastDuration = duration;
    metric.averageDuration = this.calculateAverage(metric.measurements.map(m => m.duration));
  }

  /**
   * Obtenir les statistiques d'une métrique
   * @param {string} name - Nom de la métrique
   */
  getMetricStats(name) {
    const metric = this.metrics.get(name);
    if (!metric) return null;

    const durations = metric.measurements.map(m => m.duration);
    
    return {
      name: metric.name,
      type: metric.type,
      count: metric.measurements.length,
      lastDuration: metric.lastDuration,
      averageDuration: metric.averageDuration,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      totalDuration: durations.reduce((sum, d) => sum + d, 0),
      measurements: metric.measurements
    };
  }

  /**
   * Obtenir toutes les statistiques
   */
  getAllStats() {
    const stats = {};
    
    for (const [name, metric] of this.metrics) {
      stats[name] = this.getMetricStats(name);
    }
    
    return stats;
  }

  /**
   * Générer un rapport de performance
   */
  generateReport() {
    const stats = this.getAllStats();
    const categories = {};
    
    // Grouper par catégorie
    Object.values(stats).forEach(stat => {
      const category = stat.name.split(':')[0];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(stat);
    });

    // Calculer les moyennes par catégorie
    const categoryAverages = {};
    Object.entries(categories).forEach(([category, metrics]) => {
      const avgDuration = metrics.reduce((sum, m) => sum + m.averageDuration, 0) / metrics.length;
      categoryAverages[category] = {
        count: metrics.length,
        averageDuration: avgDuration,
        totalDuration: metrics.reduce((sum, m) => sum + m.totalDuration, 0)
      };
    });

    return {
      timestamp: Date.now(),
      totalMetrics: Object.keys(stats).length,
      categories: categoryAverages,
      details: stats,
      summary: {
        slowestMetric: Object.values(stats).reduce((slowest, current) => 
          current.averageDuration > slowest.averageDuration ? current : slowest
        ),
        fastestMetric: Object.values(stats).reduce((fastest, current) => 
          current.averageDuration < fastest.averageDuration ? current : fastest
        ),
        overallAverage: Object.values(stats).reduce((sum, m) => sum + m.averageDuration, 0) / Object.keys(stats).length
      }
    };
  }

  /**
   * Exporter les données de performance
   */
  exportData() {
    return {
      metrics: Array.from(this.metrics.entries()),
      thresholds: Array.from(this.thresholds.entries()),
      report: this.generateReport()
    };
  }

  /**
   * Importer des données de performance
   * @param {Object} data - Données à importer
   */
  importData(data) {
    if (data.metrics) {
      this.metrics = new Map(data.metrics);
    }
    if (data.thresholds) {
      this.thresholds = new Map(data.thresholds);
    }
  }

  /**
   * Réinitialiser toutes les métriques
   */
  reset() {
    this.metrics.clear();
    this.thresholds.clear();
  }

  /**
   * Activer/désactiver le système de performance
   * @param {boolean} enabled - État d'activation
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  /**
   * Nettoyer les ressources
   */
  destroy() {
    this.observers.forEach(observer => {
      if (observer.disconnect) {
        observer.disconnect();
      }
    });
    this.observers.clear();
    this.metrics.clear();
    this.thresholds.clear();
  }
}

// Instance singleton
const performanceTest = new PerformanceTest();

// Hooks React pour les tests de performance
export const usePerformanceTest = () => {
  return {
    startMeasure: (name, category) => performanceTest.startMeasure(name, category),
    endMeasure: (name, category, metadata) => performanceTest.endMeasure(name, category, metadata),
    measureAsync: (name, fn, category, metadata) => performanceTest.measureAsync(name, fn, category, metadata),
    measureSync: (name, fn, category, metadata) => performanceTest.measureSync(name, fn, category, metadata),
    measureComponentRender: (componentName, renderFn, props) => 
      performanceTest.measureComponentRender(componentName, renderFn, props),
    setThreshold: (name, threshold, category) => performanceTest.setThreshold(name, threshold, category),
    getStats: (name) => performanceTest.getMetricStats(name),
    getAllStats: () => performanceTest.getAllStats(),
    generateReport: () => performanceTest.generateReport()
  };
};

// HOC pour mesurer automatiquement les performances des composants
export const withPerformanceTest = (WrappedComponent, options = {}) => {
  const { 
    name = WrappedComponent.displayName || WrappedComponent.name || 'Component',
    category = 'component',
    measureRender = true,
    measureProps = false
  } = options;

  const PerformanceTestComponent = React.forwardRef((props, ref) => {
    const performanceTest = usePerformanceTest();
    const renderCount = React.useRef(0);
    const lastProps = React.useRef(props);

    React.useEffect(() => {
      if (measureProps && lastProps.current !== props) {
        performanceTest.measureSync(
          `${name}-props-change`,
          () => {},
          category,
          { 
            renderCount: renderCount.current,
            propsChanged: Object.keys(props).filter(key => props[key] !== lastProps.current[key])
          }
        );
        lastProps.current = props;
      }
    });

    if (measureRender) {
      renderCount.current++;
      performanceTest.startMeasure(`${name}-render-${renderCount.current}`, category);
    }

    const result = React.useMemo(() => {
      return <WrappedComponent {...props} ref={ref} />;
    }, [props, ref]);

    React.useEffect(() => {
      if (measureRender) {
        performanceTest.endMeasure(`${name}-render-${renderCount.current}`, category, {
          renderCount: renderCount.current,
          props: Object.keys(props)
        });
      }
    });

    return result;
  });

  PerformanceTestComponent.displayName = `withPerformanceTest(${name})`;
  return PerformanceTestComponent;
};

export default performanceTest;
