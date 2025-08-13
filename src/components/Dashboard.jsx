import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

/**
 * Composant de tableau de bord professionnel avec métriques et graphiques
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre du tableau de bord
 * @param {Array} props.metrics - Métriques à afficher
 * @param {Array} props.charts - Graphiques à afficher
 * @param {boolean} props.refreshable - Si le tableau de bord peut être rafraîchi
 * @param {number} props.refreshInterval - Intervalle de rafraîchissement en ms
 */
const Dashboard = ({
  title = 'Tableau de bord',
  metrics = [],
  charts = [],
  refreshable = true,
  refreshInterval = 30000,
  ...props
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  const { user, chats, messages, notifications } = useAppStore();

  // Métriques par défaut si aucune n'est fournie
  const defaultMetrics = useMemo(() => [
    {
      id: 'total-chats',
      label: 'Conversations',
      value: chats?.length || 0,
      change: '+12%',
      changeType: 'positive',
      icon: '💬'
    },
    {
      id: 'total-messages',
      label: 'Messages',
      value: Object.values(messages).reduce((acc, msgs) => acc + msgs.length, 0),
      change: '+8%',
      changeType: 'positive',
      icon: '📝'
    },
    {
      id: 'active-users',
      label: 'Utilisateurs actifs',
      value: user ? 1 : 0,
      change: '+5%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      value: notifications?.length || 0,
      change: '-3%',
      changeType: 'negative',
      icon: '🔔'
    }
  ], [chats, messages, user, notifications]);

  // Utiliser les métriques fournies ou les métriques par défaut
  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  // Gestion du rafraîchissement
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simuler un rafraîchissement
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastRefresh(Date.now());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Rafraîchissement automatique
  useEffect(() => {
    if (!refreshable || !refreshInterval) return;

    const interval = setInterval(handleRefresh, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshable, refreshInterval, handleRefresh]);

  // Formatage de la date de dernier rafraîchissement
  const formattedLastRefresh = useMemo(() => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(lastRefresh);
  }, [lastRefresh]);

  // Configuration des animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {/* En-tête du tableau de bord */}
      <motion.div className="dashboard__header" variants={itemVariants}>
        <div className="dashboard__title-section">
          <h1 className="dashboard__title">{title}</h1>
          <div className="dashboard__subtitle">
            Dernière mise à jour : {formattedLastRefresh}
          </div>
        </div>
        
        <div className="dashboard__actions">
          {/* Sélecteur de période */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="dashboard__time-selector"
          >
            <option value="1h">1 heure</option>
            <option value="24h">24 heures</option>
            <option value="7d">7 jours</option>
            <option value="30d">30 jours</option>
          </select>
          
          {/* Bouton de rafraîchissement */}
          {refreshable && (
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="dashboard__refresh-btn"
              aria-label="Rafraîchir le tableau de bord"
            >
              <motion.span
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
              >
                🔄
              </motion.span>
              {isRefreshing ? 'Actualisation...' : 'Actualiser'}
            </button>
          )}
        </div>
      </motion.div>

      {/* Grille des métriques */}
      <motion.div className="dashboard__metrics-grid" variants={itemVariants}>
        <AnimatePresence mode="wait">
          {displayMetrics.map((metric, index) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Section des graphiques */}
      {charts.length > 0 && (
        <motion.div className="dashboard__charts-section" variants={itemVariants}>
          <h2 className="dashboard__charts-title">Analyses détaillées</h2>
          <div className="dashboard__charts-grid">
            {charts.map((chart, index) => (
              <ChartCard
                key={chart.id}
                chart={chart}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Section des actions rapides */}
      <motion.div className="dashboard__quick-actions" variants={itemVariants}>
        <h3 className="dashboard__quick-actions-title">Actions rapides</h3>
        <div className="dashboard__quick-actions-grid">
          <QuickAction
            icon="➕"
            label="Nouvelle conversation"
            onClick={() => console.log('Nouvelle conversation')}
          />
          <QuickAction
            icon="👥"
            label="Ajouter contact"
            onClick={() => console.log('Ajouter contact')}
          />
          <QuickAction
            icon="⚙️"
            label="Paramètres"
            onClick={() => console.log('Paramètres')}
          />
          <QuickAction
            icon="📊"
            label="Rapports"
            onClick={() => console.log('Rapports')}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Composant de carte de métrique
 */
const MetricCard = ({ metric, index }) => {
  const { label, value, change, changeType, icon } = metric;

  return (
    <motion.div
      className="metric-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="metric-card__icon">{icon}</div>
      <div className="metric-card__content">
        <h3 className="metric-card__label">{label}</h3>
        <div className="metric-card__value">{value.toLocaleString()}</div>
        {change && (
          <div className={`metric-card__change metric-card__change--${changeType}`}>
            {change}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Composant de carte de graphique
 */
const ChartCard = ({ chart, index }) => {
  return (
    <motion.div
      className="chart-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <h4 className="chart-card__title">{chart.title}</h4>
      <div className="chart-card__content">
        {/* Ici vous pouvez intégrer des bibliothèques de graphiques comme Chart.js ou Recharts */}
        <div className="chart-card__placeholder">
          Graphique: {chart.type}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Composant d'action rapide
 */
const QuickAction = ({ icon, label, onClick }) => {
  return (
    <motion.button
      className="quick-action"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="quick-action__icon">{icon}</span>
      <span className="quick-action__label">{label}</span>
    </motion.button>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    change: PropTypes.string,
    changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
    icon: PropTypes.string
  })),
  charts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })),
  refreshable: PropTypes.bool,
  refreshInterval: PropTypes.number
};

Dashboard.defaultProps = {
  title: 'Tableau de bord',
  metrics: [],
  charts: [],
  refreshable: true,
  refreshInterval: 30000
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
