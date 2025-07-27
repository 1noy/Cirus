import React, { useState, useEffect, useCallback } from 'react';
import { usePerformanceOptimization } from '../utils/performanceOptimizer.js';

export default function PerformanceDiagnostic() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: { current: 0, average: 0 },
    memory: { usage: 0 },
    network: { average: 0 }
  });
  const { getMetrics } = usePerformanceOptimization();

  const updateMetrics = useCallback(() => {
    try {
      const currentMetrics = getMetrics();
      if (currentMetrics) {
        setMetrics(currentMetrics);
      }
    } catch (error) {
      console.warn('Erreur lors de la récupération des métriques:', error);
    }
  }, [getMetrics]);

  useEffect(() => {
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  // Afficher seulement en développement ou si activé manuellement
  if (process.env.NODE_ENV !== 'development' && !isVisible) {
    return null;
  }

  const getPerformanceStatus = () => {
    try {
      const { fps, memory, network } = metrics || {};
      
      if (!fps || !memory || !network) {
        return 'unknown';
      }
      
      if (fps.current < 30) return 'critical';
      if (fps.current < 50) return 'warning';
      if (memory.usage > 80) return 'critical';
      if (memory.usage > 60) return 'warning';
      if (network.average > 3000) return 'warning';
      
      return 'good';
    } catch (error) {
      console.warn('Erreur lors du calcul du statut:', error);
      return 'unknown';
    }
  };

  const status = getPerformanceStatus();
  const statusColors = {
    good: '#4caf50',
    warning: '#ff9800',
    critical: '#f44336',
    unknown: '#666'
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 10000,
      minWidth: '200px',
      border: `2px solid ${statusColors[status] || statusColors.unknown}`,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <strong>🚀 Performance Diagnostic</strong>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      {isVisible && (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: statusColors[status] || statusColors.unknown }}>●</span>
            <span style={{ marginLeft: '4px' }}>
              Status: {status.toUpperCase()}
            </span>
          </div>
          
          <div style={{ marginBottom: '4px' }}>
            FPS: {metrics.fps?.current || 0} (avg: {Math.round(metrics.fps?.average || 0)})
          </div>
          
          <div style={{ marginBottom: '4px' }}>
            Memory: {Math.round(metrics.memory?.usage || 0)}%
          </div>
          
          <div style={{ marginBottom: '4px' }}>
            Network: {Math.round(metrics.network?.average || 0)}ms
          </div>
          
          {status === 'critical' && (
            <div style={{
              marginTop: '8px',
              padding: '4px 8px',
              background: 'rgba(244, 67, 54, 0.2)',
              borderRadius: '4px',
              fontSize: '10px'
            }}>
              ⚠️ Performance critique détectée
            </div>
          )}
          
          {status === 'warning' && (
            <div style={{
              marginTop: '8px',
              padding: '4px 8px',
              background: 'rgba(255, 152, 0, 0.2)',
              borderRadius: '4px',
              fontSize: '10px'
            }}>
              ⚠️ Optimisations recommandées
            </div>
          )}
          
          {status === 'unknown' && (
            <div style={{
              marginTop: '8px',
              padding: '4px 8px',
              background: 'rgba(102, 102, 102, 0.2)',
              borderRadius: '4px',
              fontSize: '10px'
            }}>
              ℹ️ Métriques en cours de chargement
            </div>
          )}
        </div>
      )}
    </div>
  );
} 