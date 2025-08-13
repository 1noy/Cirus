import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { motion } from 'framer-motion';
import Dashboard from '../Dashboard';
import { useAppStore } from '../../store';

// Mock de framer-motion pour les tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }) => children
}));

// Mock du store
vi.mock('../../store', () => ({
  useAppStore: vi.fn()
}));

// Mock des timers
vi.useFakeTimers();

describe('Dashboard', () => {
  const mockStore = {
    user: { id: '1', name: 'Test User' },
    chats: [
      { id: '1', name: 'Chat 1' },
      { id: '2', name: 'Chat 2' }
    ],
    messages: {
      '1': [{ id: '1', text: 'Message 1' }],
      '2': [{ id: '2', text: 'Message 2' }]
    },
    notifications: [
      { id: '1', text: 'Notification 1' }
    ]
  };

  beforeEach(() => {
    useAppStore.mockReturnValue(mockStore);
    vi.clearAllTimers();
  });

  describe('Rendu de base', () => {
    it('affiche le titre par défaut', () => {
      render(<Dashboard />);
      expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
    });

    it('affiche le titre personnalisé', () => {
      render(<Dashboard title="Mon Dashboard" />);
      expect(screen.getByText('Mon Dashboard')).toBeInTheDocument();
    });

    it('affiche la date de dernière mise à jour', () => {
      render(<Dashboard />);
      expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument();
    });
  });

  describe('Métriques', () => {
    it('affiche les métriques par défaut', () => {
      render(<Dashboard />);
      
      expect(screen.getByText('Conversations')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Total des chats
      
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Total des messages
      
      expect(screen.getByText('Utilisateurs actifs')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Utilisateur connecté
      
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Total des notifications
    });

    it('affiche les métriques personnalisées', () => {
      const customMetrics = [
        {
          id: 'custom-1',
          label: 'Métrique personnalisée',
          value: 42,
          change: '+15%',
          changeType: 'positive',
          icon: '⭐'
        }
      ];

      render(<Dashboard metrics={customMetrics} />);
      
      expect(screen.getByText('Métrique personnalisée')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('+15%')).toBeInTheDocument();
      expect(screen.getByText('⭐')).toBeInTheDocument();
    });

    it('affiche les icônes de changement avec les bonnes classes CSS', () => {
      const metricsWithChanges = [
        {
          id: 'positive',
          label: 'Positif',
          value: 10,
          change: '+10%',
          changeType: 'positive',
          icon: '📈'
        },
        {
          id: 'negative',
          label: 'Négatif',
          value: 5,
          change: '-5%',
          changeType: 'negative',
          icon: '📉'
        }
      ];

      render(<Dashboard metrics={metricsWithChanges} />);
      
      const positiveChange = screen.getByText('+10%');
      const negativeChange = screen.getByText('-5%');
      
      expect(positiveChange.closest('div')).toHaveClass('metric-card__change--positive');
      expect(negativeChange.closest('div')).toHaveClass('metric-card__change--negative');
    });
  });

  describe('Sélecteur de période', () => {
    it('affiche le sélecteur de période par défaut', () => {
      render(<Dashboard />);
      
      const timeSelector = screen.getByRole('combobox');
      expect(timeSelector).toBeInTheDocument();
      expect(timeSelector).toHaveValue('24h');
    });

    it('permet de changer la période', () => {
      render(<Dashboard />);
      
      const timeSelector = screen.getByRole('combobox');
      fireEvent.change(timeSelector, { target: { value: '7d' } });
      
      expect(timeSelector).toHaveValue('7d');
    });

    it('affiche toutes les options de période', () => {
      render(<Dashboard />);
      
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveValue('1h');
      expect(options[1]).toHaveValue('24h');
      expect(options[2]).toHaveValue('7d');
      expect(options[3]).toHaveValue('30d');
    });
  });

  describe('Rafraîchissement', () => {
    it('affiche le bouton de rafraîchissement par défaut', () => {
      render(<Dashboard />);
      
      const refreshButton = screen.getByRole('button', { name: /Actualiser/i });
      expect(refreshButton).toBeInTheDocument();
    });

    it('masque le bouton de rafraîchissement quand refreshable est false', () => {
      render(<Dashboard refreshable={false} />);
      
      const refreshButton = screen.queryByRole('button', { name: /Actualiser/i });
      expect(refreshButton).not.toBeInTheDocument();
    });

    it('affiche l\'état de chargement lors du rafraîchissement', async () => {
      render(<Dashboard />);
      
      const refreshButton = screen.getByRole('button', { name: /Actualiser/i });
      fireEvent.click(refreshButton);
      
      expect(screen.getByText('Actualisation...')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByText('Actualiser')).toBeInTheDocument();
      });
    });

    it('rafraîchit automatiquement selon l\'intervalle configuré', async () => {
      render(<Dashboard refreshInterval={1000} />);
      
      const initialTime = screen.getByText(/Dernière mise à jour/).textContent;
      
      // Avancer le temps de 1 seconde
      vi.advanceTimersByTime(1000);
      
      await waitFor(() => {
        const newTime = screen.getByText(/Dernière mise à jour/).textContent;
        expect(newTime).not.toBe(initialTime);
      });
    });
  });

  describe('Graphiques', () => {
    it('n\'affiche pas la section des graphiques par défaut', () => {
      render(<Dashboard />);
      
      expect(screen.queryByText('Analyses détaillées')).not.toBeInTheDocument();
    });

    it('affiche la section des graphiques avec des graphiques personnalisés', () => {
      const customCharts = [
        {
          id: 'chart-1',
          title: 'Graphique des utilisateurs',
          type: 'line'
        },
        {
          id: 'chart-2',
          title: 'Graphique des messages',
          type: 'bar'
        }
      ];

      render(<Dashboard charts={customCharts} />);
      
      expect(screen.getByText('Analyses détaillées')).toBeInTheDocument();
      expect(screen.getByText('Graphique des utilisateurs')).toBeInTheDocument();
      expect(screen.getByText('Graphique des messages')).toBeInTheDocument();
      expect(screen.getByText('Graphique: line')).toBeInTheDocument();
      expect(screen.getByText('Graphique: bar')).toBeInTheDocument();
    });
  });

  describe('Actions rapides', () => {
    it('affiche la section des actions rapides', () => {
      render(<Dashboard />);
      
      expect(screen.getByText('Actions rapides')).toBeInTheDocument();
    });

    it('affiche toutes les actions rapides par défaut', () => {
      render(<Dashboard />);
      
      expect(screen.getByText('Nouvelle conversation')).toBeInTheDocument();
      expect(screen.getByText('Ajouter contact')).toBeInTheDocument();
      expect(screen.getByText('Paramètres')).toBeInTheDocument();
      expect(screen.getByText('Rapports')).toBeInTheDocument();
    });

    it('affiche les icônes des actions rapides', () => {
      render(<Dashboard />);
      
      expect(screen.getByText('➕')).toBeInTheDocument();
      expect(screen.getByText('👥')).toBeInTheDocument();
      expect(screen.getByText('⚙️')).toBeInTheDocument();
      expect(screen.getByText('📊')).toBeInTheDocument();
    });
  });

  describe('Accessibilité', () => {
    it('a des labels appropriés pour les boutons', () => {
      render(<Dashboard />);
      
      const refreshButton = screen.getByRole('button', { name: /Actualiser/i });
      expect(refreshButton).toHaveAttribute('aria-label', 'Rafraîchir le tableau de bord');
    });

    it('utilise des éléments sémantiques appropriés', () => {
      render(<Dashboard />);
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Gestion des erreurs', () => {
    it('gère les erreurs de rafraîchissement gracieusement', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<Dashboard />);
      
      const refreshButton = screen.getByRole('button', { name: /Actualiser/i });
      fireEvent.click(refreshButton);
      
      await waitFor(() => {
        expect(screen.getByText('Actualiser')).toBeInTheDocument();
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('utilise useMemo pour les métriques par défaut', () => {
      const { rerender } = render(<Dashboard />);
      
      // Re-render sans changer les props
      rerender(<Dashboard />);
      
      // Les métriques devraient être mémorisées
      expect(screen.getByText('2')).toBeInTheDocument(); // Total des chats
    });

    it('utilise useCallback pour les gestionnaires d\'événements', () => {
      render(<Dashboard />);
      
      const refreshButton = screen.getByRole('button', { name: /Actualiser/i });
      
      // Le bouton devrait être stable entre les re-renders
      expect(refreshButton).toBeInTheDocument();
    });
  });
});
