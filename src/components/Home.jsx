import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import ContactsList from './ContactsList';
import UserSearch from './UserSearch';
import ProfileSettings from './ProfileSettings';

const Home = () => {
  const { selectedContact, setSelectedContact } = useAppStore();
  const [activeSection, setActiveSection] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [searchFilter, setSearchFilter] = useState('all');
  const [notifications] = useState({
    messages: 3,
    search: 1
  });

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const handleContactSelect = useCallback((contact) => {
    setSelectedContact(contact);
  }, [setSelectedContact]);

  const handleProfileSettingsToggle = useCallback(() => {
    setShowProfileSettings(!showProfileSettings);
  }, [showProfileSettings]);

  const handleFilterChange = useCallback((filter) => {
    setSearchFilter(filter);
  }, []);

  const isHomeActive = activeSection === 'home';
  const isMessagesActive = activeSection === 'messages';
  const isSearchActive = activeSection === 'search';

  return (
    <div className="home-page">
      {/* Navigation en haut */}
      <nav className="home-tabs">
        <div className="nav-buttons">
          <button 
            onClick={() => handleSectionChange('home')}
            className={`nav-tab ${isHomeActive ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i>
            <span>Accueil</span>
          </button>
          
          <button 
            onClick={() => handleSectionChange('messages')}
            className={`nav-tab ${isMessagesActive ? 'active' : ''}`}
          >
            <i className="fas fa-comments"></i>
            <span>Messages</span>
            {notifications.messages > 0 && (
              <div className="notification-badge">
                {notifications.messages}
              </div>
            )}
          </button>
          
          <button 
            onClick={() => handleSectionChange('search')}
            className={`nav-tab ${isSearchActive ? 'active' : ''}`}
          >
            <i className="fas fa-search"></i>
            <span>Recherche</span>
          </button>
        </div>
        
        <div className="nav-actions">
          <button 
            onClick={handleProfileSettingsToggle}
            className="btn btn-icon profile-btn"
            title="Paramètres du profil"
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="home-content">
        <AnimatePresence mode="wait">
          {isHomeActive && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section hero"
            >
              <div className="cirus-neon-text" style={{
                fontSize: '4rem',
                color: '#ff00ff',
                textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
                marginBottom: '20px'
              }}>
                CIRUS
              </div>
              <p className="status-pill">
                ✅ Application CirusChat - Fonctionnelle
              </p>
              <p className="url-hint">
                URL: http://192.168.0.103:5173
              </p>
            </motion.div>
          )}
          {isMessagesActive && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section"
            >
              <div className="contacts-wrapper">
                <ContactsList 
                  onContactSelect={handleContactSelect}
                  onStartSearch={() => handleSectionChange('search')}
                />
              </div>
            </motion.div>
          )}
          {isSearchActive && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section"
            >
              <div className="search-header">
                <h2>
                  <i className="fas fa-search"></i>
                  Recherche
                </h2>
                <p>Trouvez de nouveaux utilisateurs</p>
              </div>
              
              {/* Filtres de recherche */}
              <div className="search-filters">
                <button 
                  className={`filter-btn ${searchFilter === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('all')}
                >
                  Tous
                </button>
                <button 
                  className={`filter-btn ${searchFilter === 'online' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('online')}
                >
                  En ligne
                </button>
                <button 
                  className={`filter-btn ${searchFilter === 'recent' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('recent')}
                >
                  Récents
                </button>
              </div>
              
              <div className="search-content">
                <UserSearch 
                  onClose={() => handleSectionChange('home')} 
                  filter={searchFilter}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showSearch && (
          <UserSearch
            onUserSelect={(user) => {
              setSelectedContact(user);
              setShowSearch(false);
            }}
            onClose={() => setShowSearch(false)}
          />
        )}
        {showProfileSettings && (
          <ProfileSettings onClose={() => setShowProfileSettings(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
