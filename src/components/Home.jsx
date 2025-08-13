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
    <div className="home-container" style={{ 
      background: 'linear-gradient(135deg, #000000, #1a1a2e)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Navigation en haut */}
      <nav className="top-navigation" style={{ 
        background: 'rgba(255, 0, 255, 0.2)', 
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <div className="nav-buttons">
          <button 
            onClick={() => handleSectionChange('home')}
            className={`nav-tab ${isHomeActive ? 'active' : ''}`}
            style={{ 
              background: isHomeActive ? '#ff00ff' : '#333',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              margin: '0 5px'
            }}
          >
            <i className="fas fa-home"></i>
            <span>Accueil</span>
          </button>
          
          <button 
            onClick={() => handleSectionChange('messages')}
            className={`nav-tab ${isMessagesActive ? 'active' : ''}`}
            style={{ 
              background: isMessagesActive ? '#ff00ff' : '#333',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              margin: '0 5px'
            }}
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
            style={{ 
              background: isSearchActive ? '#ff00ff' : '#333',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              margin: '0 5px'
            }}
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
            style={{ 
              background: '#00ffff',
              color: '#000',
              padding: '10px',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="main-content" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <AnimatePresence mode="wait">
          {isHomeActive && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section"
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))',
                padding: '40px',
                borderRadius: '20px',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                position: 'relative',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(255, 0, 255, 0.3)'
              }}
            >
              {/* Effet de particules en arrière-plan */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                borderRadius: '20px',
                pointerEvents: 'none'
              }}></div>
              
              <div className="cirus-neon-text" style={{
                fontSize: '5rem',
                color: '#ff00ff',
                textShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff',
                marginBottom: '30px',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                animation: 'neonPulse 2s ease-in-out infinite alternate'
              }}>
                CIRUS
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  marginBottom: '10px',
                  fontWeight: '600'
                }}>
                  🚀 Application de Messagerie Moderne
                </h2>
                <p style={{
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  Connectez-vous avec vos amis en temps réel avec une interface cyberpunk unique
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginTop: '30px'
              }}>
                <div style={{
                  background: 'rgba(255, 0, 255, 0.1)',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 0, 255, 0.3)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💬</div>
                  <h3 style={{ color: '#ff00ff', marginBottom: '5px' }}>Messages</h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>Chat en temps réel</p>
                </div>
                
                <div style={{
                  background: 'rgba(0, 255, 255, 0.1)',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
                  <h3 style={{ color: '#00ffff', marginBottom: '5px' }}>Recherche</h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>Trouvez des amis</p>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 0, 0.1)',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 0, 0.3)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚙️</div>
                  <h3 style={{ color: '#ffff00', marginBottom: '5px' }}>Paramètres</h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>Personnalisez</p>
                </div>
              </div>
              
              <div style={{
                marginTop: '25px',
                padding: '15px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{
                  color: '#00ff00',
                  fontSize: '0.9rem',
                  marginBottom: '5px'
                }}>
                  ✅ Système opérationnel
                </p>
                <p style={{
                  color: '#ffff00',
                  fontSize: '0.8rem'
                }}>
                  URL: https://cirus-chat-git.vercel.app
                </p>
              </div>
            </motion.div>
          )}
          {isMessagesActive && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section"
              style={{ 
                background: 'rgba(0, 255, 255, 0.2)',
                padding: '20px',
                borderRadius: '10px'
              }}
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
              style={{ 
                background: 'rgba(255, 255, 0, 0.2)',
                padding: '20px',
                borderRadius: '10px'
              }}
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
