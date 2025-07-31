import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { performanceMonitor } from '../utils/performance-monitor';

const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: { used: 0, total: 0, limit: 0 },
    loadTime: 0,
    renderTime: 0
  });
  const [fpsHistory, setFpsHistory] = useState([]);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        setFpsHistory(prev => [...prev.slice(-29), fps]); // Garder 30 valeurs
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Mesurer la mémoire
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memory = performance.memory;
        setMetrics(prev => ({
          ...prev,
          memory: {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit
          }
        }));
      }
    }, 1000);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      clearInterval(memoryInterval);
    };
  }, []);

  const getMemoryUsagePercent = () => {
    if (metrics.memory.limit === 0) return 0;
    return (metrics.memory.used / metrics.memory.limit) * 100;
  };

  const getFpsColor = (fps) => {
    if (fps >= 55) return '#00ff00';
    if (fps >= 45) return '#ffff00';
    if (fps >= 30) return '#ff8800';
    return '#ff0000';
  };

  const getMemoryColor = (percent) => {
    if (percent < 50) return '#00ff00';
    if (percent < 75) return '#ffff00';
    if (percent < 90) return '#ff8800';
    return '#ff0000';
  };

  const averageFPS = fpsHistory.length > 0 
    ? Math.round(fpsHistory.reduce((sum, fps) => sum + fps, 0) / fpsHistory.length)
    : 0;

  return (
    <>
      {/* Bouton pour afficher/masquer le moniteur */}
      <motion.button
        className="performance-monitor-toggle"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-chart-line"></i>
      </motion.button>

      {/* Panneau de monitoring */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="performance-monitor"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <div className="monitor-header">
              <h3>Performance Monitor</h3>
              <button 
                className="close-btn"
                onClick={() => setIsVisible(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="monitor-content">
              {/* FPS */}
              <div className="metric-item">
                <div className="metric-label">
                  <i className="fas fa-tachometer-alt"></i>
                  FPS
                </div>
                <div className="metric-value" style={{ color: getFpsColor(metrics.fps) }}>
                  {metrics.fps}
                </div>
                <div className="metric-avg">
                  Avg: {averageFPS}
                </div>
              </div>

              {/* Mémoire */}
              <div className="metric-item">
                <div className="metric-label">
                  <i className="fas fa-memory"></i>
                  Mémoire
                </div>
                <div className="metric-value" style={{ color: getMemoryColor(getMemoryUsagePercent()) }}>
                  {Math.round(getMemoryUsagePercent())}%
                </div>
                <div className="metric-details">
                  {Math.round(metrics.memory.used / 1024 / 1024)}MB / {Math.round(metrics.memory.limit / 1024 / 1024)}MB
                </div>
              </div>

              {/* Graphique FPS */}
              <div className="fps-chart">
                <div className="chart-label">FPS History</div>
                <div className="chart-container">
                  {fpsHistory.map((fps, index) => (
                    <div
                      key={index}
                      className="chart-bar"
                      style={{
                        height: `${(fps / 60) * 100}%`,
                        backgroundColor: getFpsColor(fps)
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="monitor-actions">
                <button 
                  className="action-btn"
                  onClick={() => {
                    setFpsHistory([]);
                    setMetrics(prev => ({ ...prev, fps: 0 }));
                  }}
                >
                  <i className="fas fa-refresh"></i>
                  Reset
                </button>
                <button 
                  className="action-btn"
                  onClick={() => {
                    if ('memory' in performance) {
                      console.log('Memory Usage:', performance.memory);
                    }
                  }}
                >
                  <i className="fas fa-bug"></i>
                  Debug
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceMonitor; 