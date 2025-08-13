import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import ContactsDrawer from './ContactsDrawer';

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [showReactions, setShowReactions] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  
  const { 
    user: currentUser,
    chats,
    messages,
    activeChat,
    setActiveChat,
    addMessage,
    editMessage,
    deleteMessage,
    addReaction,
    markMessagesAsRead,
    loadChatMessages,
    contacts
  } = useAppStore();

  // Récupérer le chat actuel
  const currentChat = chats.find(chat => chat.id === activeChat);
  const chatMessages = messages[activeChat] || [];

  // Récupérer l'autre participant
  const otherParticipant = currentChat?.participants?.find(
    participantId => participantId !== currentUser?.uid
  );
  
  const contact = contacts.find(contact => contact.uid === otherParticipant);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Charger les messages quand un chat est activé
  useEffect(() => {
    if (activeChat) {
      loadChatMessages(activeChat);
      // Marquer les messages comme lus
      markMessagesAsRead(activeChat);
    }
  }, [activeChat, loadChatMessages, markMessagesAsRead]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() && currentChat) {
      const newMessage = {
        id: `msg_${Date.now()}`,
        content: messageText.trim(),
        senderId: currentUser.uid,
        timestamp: Date.now(),
        type: 'text',
        replyTo: replyToMessage?.id || null
      };
      
      try {
        if (window.showLoading) {
          window.showLoading('Envoi du message...');
        }
        
        await addMessage(currentChat.id, newMessage);
        setMessageText('');
        setReplyToMessage(null);
        setShowEmojiPicker(false);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        if (window.showError) {
          window.showError('Erreur lors de l\'envoi du message');
        }
      }
    }
  };

  const handleEditMessage = async (messageId, newContent) => {
    if (newContent.trim() && currentChat) {
      try {
        if (window.showLoading) {
          window.showLoading('Modification du message...');
        }
        
        await editMessage(currentChat.id, messageId, newContent.trim());
        setEditingMessage(null);
        
        if (window.showToast) {
          window.showToast('Message modifié avec succès', 'success');
        }
      } catch (error) {
        console.error('Erreur lors de la modification du message:', error);
        if (window.showError) {
          window.showError('Erreur lors de la modification du message');
        }
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (currentChat && window.confirm('Voulez-vous vraiment supprimer ce message ?')) {
      try {
        if (window.showLoading) {
          window.showLoading('Suppression du message...');
        }
        
        await deleteMessage(currentChat.id, messageId);
        
        if (window.showToast) {
          window.showToast('Message supprimé avec succès', 'success');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du message:', error);
        if (window.showError) {
          window.showError('Erreur lors de la suppression du message');
        }
      }
    }
  };

  const handleAddReaction = async (messageId, emoji) => {
    if (currentChat) {
      await addReaction(currentChat.id, messageId, {
        userId: currentUser.uid,
        emoji: emoji
      });
      setShowReactions(null);
    }
  };

  const handleBackToContacts = () => {
    setActiveChat(null);
    setShowDrawer(true);
  };

  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
    setShowDrawer(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Ici vous pouvez implémenter la logique d'upload de fichier
      console.log('Fichier sélectionné:', file);
      setShowAttachmentMenu(false);
    }
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageStatus = (message) => {
    if (message.senderId === currentUser?.uid) {
      switch (message.status) {
        case 'sent': return '✓';
        case 'delivered': return '✓✓';
        case 'read': return '✓✓';
        default: return '';
      }
    }
    return '';
  };

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];
  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];

  if (!currentChat) {
    return (
      <>
        <div className="chat-error">
          <h3>Chat non trouvé</h3>
          <button onClick={() => setShowDrawer(true)} className="btn btn-primary">
            Retour aux contacts
          </button>
        </div>
        <ContactsDrawer
          visible={showDrawer}
          onClose={() => setShowDrawer(false)}
          chats={chats}
          contacts={contacts}
          currentUserId={currentUser?.uid}
          onSelectChat={handleSelectChat}
        />
      </>
    );
  }

  return (
    <div className="chat-page" style={{ display: 'grid', gridTemplateColumns: '320px 1fr' }}>
      <div className="chat-drawer-desktop">
        <ContactsDrawer
          pinned
          chats={chats}
          contacts={contacts}
          messages={messages}
          currentUserId={currentUser?.uid}
          onSelectChat={handleSelectChat}
        />
      </div>
      <div className="chat-header">
        <button onClick={handleBackToContacts} className="btn btn-icon btn-outline">
          <i className="fas fa-arrow-left"></i>
        </button>
        
        <div className="chat-participant">
          <div className="participant-avatar">
            {contact?.photoURL ? (
              <img src={contact.photoURL} alt={contact.displayName} />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </div>
          <div className="participant-info">
            <h2>{contact?.displayName || 'Utilisateur'}</h2>
            <p className="participant-status">
              {isTyping ? 'En train d\'écrire...' : 'En ligne'}
            </p>
          </div>
      </div>

        <div className="chat-actions">
          <button className="btn btn-icon action-btn" title="Appel vocal">
            <i className="fas fa-phone"></i>
          </button>
          <button className="btn btn-icon action-btn" title="Appel vidéo">
            <i className="fas fa-video"></i>
          </button>
          <button className="btn btn-icon action-btn" title="Plus d'options">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
      
      <div className="chat-messages">
        <div className="messages-container">
          <AnimatePresence>
            {chatMessages.length > 0 ? (
              chatMessages.map((message, index) => {
                const isOwnMessage = message.senderId === currentUser?.uid;
                const isEditing = editingMessage?.id === message.id;
                
                return (
                  <motion.div
                    key={message.id}
                    className={`message-item ${isOwnMessage ? 'own' : 'other'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Message de réponse */}
                    {message.replyTo && (
                      <div className="reply-to">
                        <i className="fas fa-reply"></i>
                        <span>Réponse à un message</span>
                      </div>
                    )}
                    
                    <div className="message-content">
                      {isEditing ? (
                        <div className="edit-message">
                          <input
                            type="text"
                            defaultValue={message.content}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleEditMessage(message.id, e.target.value);
                              }
                            }}
                            onBlur={() => setEditingMessage(null)}
                            autoFocus
                          />
                          <button onClick={() => setEditingMessage(null)}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <>
                          <p>{message.content}</p>
                          {message.edited && (
                            <span className="edited-indicator">(modifié)</span>
                          )}
                        </>
                      )}
                      
                      <div className="message-meta">
                        <span className="message-time">
                          {formatTime(message.timestamp)}
                        </span>
                        {isOwnMessage && (
                          <span className="message-status">
                            {getMessageStatus(message)}
                          </span>
                        )}
                      </div>
                      
                      {/* Réactions */}
                      {message.reactions && Object.keys(message.reactions).length > 0 && (
                        <div className="message-reactions">
                          {Object.entries(message.reactions).map(([userId, emoji]) => (
                            <span key={userId} className="reaction">
                              {emoji}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Actions du message */}
                    <div className="message-actions">
                      <button 
                        onClick={() => setShowReactions(showReactions === message.id ? null : message.id)}
                        className="action-btn"
                        title="Ajouter une réaction"
                      >
                        <i className="fas fa-smile"></i>
                      </button>
                      {isOwnMessage && (
                        <>
                          <button 
                            onClick={() => setEditingMessage(message)}
                            className="action-btn"
                            title="Modifier le message"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="action-btn"
                            title="Supprimer le message"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Menu des réactions */}
                    {showReactions === message.id && (
                      <motion.div 
                        className="reactions-menu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        {reactions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleAddReaction(message.id, emoji)}
                            className="reaction-btn"
                          >
                            {emoji}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                className="empty-messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-comments"></i>
                <h3>Aucun message</h3>
                <p>Commencez la conversation en envoyant un message !</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="chat-input-container">
        {/* Message de réponse */}
        {replyToMessage && (
          <div className="reply-preview">
            <div className="reply-content">
              <i className="fas fa-reply"></i>
            <span>Réponse à : {replyToMessage.content}</span>
            </div>
            <button
              type="button" 
              onClick={() => setReplyToMessage(null)}
              className="btn btn-icon close-btn"
              title="Annuler la réponse"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        
        <div className="message-input-wrapper">
        <div className="input-actions">
            <button 
              type="button" 
              className="btn btn-icon action-btn"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              title="Pièces jointes"
            >
            <i className="fas fa-paperclip"></i>
          </button>
            
            {/* Menu des pièces jointes */}
            {showAttachmentMenu && (
              <motion.div 
                className="attachment-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="attachment-option"
                >
                  <i className="fas fa-image"></i>
                  <span>Photo</span>
                </button>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="attachment-option"
                >
                  <i className="fas fa-video"></i>
                  <span>Vidéo</span>
                </button>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="attachment-option"
                >
                  <i className="fas fa-file"></i>
                  <span>Document</span>
                </button>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="attachment-option"
                >
                  <i className="fas fa-microphone"></i>
                  <span>Audio</span>
                </button>
              </motion.div>
            )}
            
            <button 
              type="button" 
              className="btn btn-icon action-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Emojis"
            >
            <i className="fas fa-smile"></i>
          </button>
        </div>

          <div className="input-field-container">
        <input
          type="text"
          value={messageText}
              onChange={handleTyping}
          placeholder="Tapez votre message..."
          className="message-input"
        />
        
            <button 
              type="submit" 
              className="btn btn-icon send-btn" 
              disabled={!messageText.trim()}
              title="Envoyer"
            >
          <i className="fas fa-paper-plane"></i>
        </button>
          </div>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <motion.div 
            className="emoji-picker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="emoji-grid">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="emoji-btn"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Indicateur de frappe */}
        {otherUserTyping && (
          <motion.div 
            className="typing-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>{contact?.displayName || 'Quelqu\'un'} est en train d'écrire</span>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </motion.div>
        )}

        {/* Input file caché */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />
      </form>

      <ContactsDrawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        chats={chats}
        contacts={contacts}
        messages={messages}
        currentUserId={currentUser?.uid}
        onSelectChat={handleSelectChat}
      />
    </div>
  );
};

export default ChatPage;
