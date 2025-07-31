import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

const ContactsList = ({ onContactSelect, onStartSearch }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  
  const { 
    contacts, 
    chats, 
    setActiveChat, 
    createChat,
    user: currentUser 
  } = useAppStore();

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    
    // Vérifier si un chat existe déjà avec ce contact
    const existingChat = chats.find(chat => 
      chat.participants.length === 2 && 
      chat.participants.includes(currentUser?.uid) && 
      chat.participants.includes(contact.uid)
    );
    
    if (existingChat) {
      setActiveChat(existingChat.id);
    } else {
      const chatId = await createChat([currentUser.uid, contact.uid]);
      setActiveChat(chatId);
    }
    
    if (onContactSelect) {
      onContactSelect(contact);
    }
  };

  const getLastMessage = (contact) => {
    const chat = chats.find(chat => 
      chat.participants.length === 2 && 
      chat.participants.includes(currentUser?.uid) && 
      chat.participants.includes(contact.uid)
    );
    
    return chat?.lastMessage;
  };

  const getUnreadCount = (contact) => {
    const chat = chats.find(chat => 
      chat.participants.length === 2 && 
      chat.participants.includes(currentUser?.uid) && 
      chat.participants.includes(contact.uid)
    );
    
    return chat?.unreadCount || 0;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  return (
    <div className="contacts-container">
             <div className="contacts-header">
         <h2>Contacts</h2>
         <button 
           onClick={onStartSearch}
           className="btn btn-sm add-btn"
         >
           <i className="fas fa-plus"></i>
           Nouveau contact
         </button>
       </div>

      <div className="contacts-list">
        <AnimatePresence>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => {
              const lastMessage = getLastMessage(contact);
              
              return (
                <motion.div
                  key={contact.uid}
                  className={`contact-item ${selectedContact?.uid === contact.uid ? 'selected' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="contact-avatar">
                    {contact.photoURL ? (
                      <img src={contact.photoURL} alt={contact.displayName} />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                    {/* Indicateur de messages non lus */}
                    {getUnreadCount(contact) > 0 && (
                      <div className="unread-badge">
                        {getUnreadCount(contact) > 99 ? '99+' : getUnreadCount(contact)}
                      </div>
                    )}
                  </div>
                  
                  <div className="contact-info">
                    <div className="contact-name-row">
                      <h3>{contact.displayName || 'Utilisateur'}</h3>
                      {contact.autoAdded && (
                        <span className="auto-added-badge" title="Ajouté automatiquement">
                          <i className="fas fa-magic"></i>
                        </span>
                      )}
                    </div>
                    {lastMessage && (
                      <p className="last-message">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                  
                  <div className="contact-meta">
                    {lastMessage && (
                      <div className="contact-time">
                        {formatTime(lastMessage.timestamp)}
                      </div>
                    )}
                    {/* Indicateur de statut en ligne */}
                    <div className="online-indicator">
                      <div className="status-dot online"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
                         <motion.div 
               className="empty-contacts"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
             >
               <i className="fas fa-users"></i>
               <h3>Aucun contact</h3>
               <p>Ajoutez des contacts pour commencer à discuter</p>
               <button 
                 onClick={onStartSearch}
                 className="btn btn-primary"
               >
                 <i className="fas fa-plus"></i>
                 Ajouter un contact
               </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactsList;