import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

const UserSearch = ({ onUserSelect, onClose, filter = 'all' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { 
    users, 
    contacts, 
    searchResults, 
    setSearchResults, 
    clearSearchResults,
    addContact,
    createChat,
    setActiveChat,
    chats,
    user: currentUser
  } = useAppStore();

  // Filtrer les utilisateurs basé sur la recherche et les filtres
  const filteredUsers = users.filter(user => {
    // Exclure l'utilisateur actuel
    if (user.uid === currentUser?.uid) return false;
    
    // Filtre par terme de recherche
    const matchesSearch = searchTerm === '' || 
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Appliquer les filtres supplémentaires
    switch (filter) {
      case 'online':
        return user.status === 'online';
      case 'recent':
        // Simuler des utilisateurs récents (moins de 7 jours)
        return user.lastSeen && (Date.now() - user.lastSeen) < 7 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  // Vérifier si un utilisateur est déjà dans les contacts
  const isContact = (userId) => {
    return contacts.some(contact => contact.uid === userId);
  };

  // Vérifier si un chat existe déjà avec cet utilisateur
  const getExistingChat = (userId) => {
    return chats.find(chat => 
      chat.participants.length === 2 && 
      chat.participants.includes(currentUser?.uid) && 
      chat.participants.includes(userId)
    );
  };

  // Vérifier si on a déjà discuté avec cet utilisateur
  const hasExistingChat = (userId) => {
    return getExistingChat(userId) !== undefined;
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      setIsSearching(true);
      // Simuler une recherche
      setTimeout(() => {
        setSearchResults(filteredUsers);
        setIsSearching(false);
      }, 500);
    } else {
      clearSearchResults();
      setIsSearching(false);
    }
  };

  const handleAddContact = async (user) => {
    // Vérification supplémentaire pour empêcher l'auto-ajout
    if (user.uid === currentUser?.uid) {
      console.warn('Tentative d\'auto-ajout bloquée');
      if (window.showError) {
        window.showError('Vous ne pouvez pas vous ajouter vous-même');
      }
      return;
    }

    try {
      if (window.showLoading) {
        window.showLoading('Ajout du contact...');
      }
      
      await addContact({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        addedAt: Date.now()
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact:', error);
      if (window.showError) {
        window.showError('Erreur lors de l\'ajout du contact');
      }
    }
  };

  const handleStartChat = async (user) => {
    const existingChat = getExistingChat(user.uid);
    
    if (existingChat) {
      setActiveChat(existingChat.id);
    } else {
      const chatId = await createChat([currentUser.uid, user.uid]);
      setActiveChat(chatId);
    }
    
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  const handleMessage = (user) => {
    handleStartChat(user);
  };

  return (
    <motion.div 
      className="user-search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="user-search-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
      <div className="search-header">
        <h2>Rechercher des utilisateurs</h2>
          <button onClick={onClose} className="btn btn-icon close-btn">
            <i className="fas fa-times"></i>
          </button>
      </div>

      <div className="search-input-container">
        <div className="search-input-wrapper">
            <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
              onChange={handleSearch}
            className="search-input"
          />
            {isSearching && (
              <div className="search-spinner">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
          )}
        </div>
      </div>

        <div className="search-results">
      <AnimatePresence>
            {searchResults.length > 0 ? (
          <motion.div
                className="results-list"
                initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {searchResults.map((user) => (
              <motion.div
                    key={user.uid}
                    className="user-result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
              >
                <div className="user-info">
                      <div className="user-avatar">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName} />
                        ) : (
                          <i className="fas fa-user"></i>
                        )}
                      </div>
                                             <div className="user-details">
                         <h3>{user.displayName || 'Utilisateur'}</h3>
                       </div>
                    </div>
                    
                                         <div className="user-actions">
                       {isContact(user.uid) || hasExistingChat(user.uid) ? (
                         <button 
                           onClick={() => handleMessage(user)}
                           className="btn btn-sm btn-primary"
                         >
                           <i className="fas fa-comment"></i>
                           Message
                         </button>
                       ) : (
                         <button 
                           onClick={() => handleAddContact(user)}
                           className="btn btn-sm btn-success"
                         >
                           <i className="fas fa-plus"></i>
                           Ajouter
                         </button>
                       )}
                </div>
              </motion.div>
            ))}
          </motion.div>
            ) : searchTerm && !isSearching ? (
              <motion.div
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-search"></i>
                <p>Aucun utilisateur trouvé</p>
              </motion.div>
            ) : (
              <motion.div 
                className="search-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-users"></i>
                <p>Tapez pour rechercher des utilisateurs</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserSearch; 