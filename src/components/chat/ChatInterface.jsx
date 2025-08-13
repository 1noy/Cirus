import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  PaperAirplaneIcon, 
  PaperClipIcon, 
  EmojiHappyIcon,
  MicrophoneIcon,
  StopIcon,
  ReplyIcon,
  HeartIcon,
  DotsHorizontalIcon
} from '@heroicons/react/outline';

import MessageBubble from './MessageBubble';
import EmojiPicker from './EmojiPicker';
import VoiceRecorder from './VoiceRecorder';
import FileUploader from './FileUploader';
import TypingIndicator from './TypingIndicator';
import MessageReactions from './MessageReactions';

/**
 * Interface de chat professionnelle avec fonctionnalités avancées
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.messages - Messages du chat
 * @param {Function} props.onSendMessage - Callback d'envoi de message
 * @param {Function} props.onReaction - Callback de réaction
 * @param {Function} props.onReply - Callback de réponse
 * @param {Function} props.onEdit - Callback de modification
 * @param {Function} props.onDelete - Callback de suppression
 * @param {boolean} props.isTyping - Indicateur de frappe
 * @param {Object} props.currentUser - Utilisateur actuel
 * @param {Object} props.otherUser - Autre utilisateur
 */
const ChatInterface = React.memo(({
  messages = [],
  onSendMessage,
  onReaction,
  onReply,
  onEdit,
  onDelete,
  isTyping = false,
  currentUser,
  otherUser,
  className = '',
  theme = 'dark',
  compact = false,
  showTimestamps = true,
  showReadReceipts = true,
  enableVoiceMessages = true,
  enableFileUploads = true,
  enableReactions = true,
  enableReplies = true,
  maxMessageLength = 1000,
  autoScroll = true,
  virtualScrolling = false
}) => {
  // États locaux
  const [messageText, setMessageText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [draftMessage, setDraftMessage] = useState('');

  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  // Optimisations de performance
  const memoizedMessages = useMemo(() => messages, [messages]);
  const memoizedCurrentUser = useMemo(() => currentUser, [currentUser]);
  const memoizedOtherUser = useMemo(() => otherUser, [otherUser]);

  // Gestionnaires d'événements
  const handleSendMessage = useCallback(async (content, type = 'text', metadata = {}) => {
    if (!content?.trim() && type === 'text') return;

    try {
      const messageData = {
        content: content?.trim() || content,
        type,
        metadata,
        replyTo: replyTo?.id || null,
        timestamp: Date.now(),
        senderId: currentUser?.uid
      };

      await onSendMessage(messageData);
      
      // Reset des états
      setMessageText('');
      setReplyTo(null);
      setEditingMessage(null);
      setShowEmojiPicker(false);
      
      // Focus sur l'input
      inputRef.current?.focus();
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      // TODO: Afficher une notification d'erreur
    }
  }, [onSendMessage, replyTo, currentUser]);

  const handleTextSubmit = useCallback((e) => {
    e.preventDefault();
    if (editingMessage) {
      handleEditMessage();
    } else {
      handleSendMessage(messageText);
    }
  }, [messageText, editingMessage, handleSendMessage]);

  const handleEditMessage = useCallback(async () => {
    if (!editingMessage || !messageText.trim()) return;

    try {
      await onEdit(editingMessage.id, messageText.trim());
      setEditingMessage(null);
      setMessageText('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  }, [editingMessage, messageText, onEdit]);

  const handleCancelEdit = useCallback(() => {
    setEditingMessage(null);
    setMessageText(draftMessage);
  }, [draftMessage]);

  const handleReply = useCallback((message) => {
    setReplyTo(message);
    setDraftMessage(messageText);
    inputRef.current?.focus();
  }, [messageText]);

  const handleReaction = useCallback(async (messageId, reaction) => {
    try {
      await onReaction(messageId, reaction);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réaction:', error);
    }
  }, [onReaction]);

  const handleDelete = useCallback(async (messageId) => {
    try {
      await onDelete(messageId);
      setShowMessageMenu(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }, [onDelete]);

  const handleEmojiSelect = useCallback((emoji) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  }, []);

  const handleVoiceRecord = useCallback(async (audioBlob) => {
    try {
      await handleSendMessage(audioBlob, 'voice', {
        duration: audioBlob.duration || 0,
        size: audioBlob.size
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message vocal:', error);
    }
  }, [handleSendMessage]);

  const handleFileUpload = useCallback(async (files) => {
    try {
      for (const file of files) {
        const metadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        };
        
        await handleSendMessage(file, 'file', metadata);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  }, [handleSendMessage]);

  const handleMessageMenu = useCallback((message, event) => {
    event.stopPropagation();
    setSelectedMessage(message);
    setShowMessageMenu(true);
  }, []);

  const handleMessageClick = useCallback((message) => {
    // Gestion des clics sur les messages (réponse, édition, etc.)
    if (message.type === 'file') {
      // Ouvrir le fichier
      window.open(URL.createObjectURL(message.content), '_blank');
    }
  }, []);

  // Auto-scroll vers le bas
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, autoScroll]);

  // Sauvegarde du brouillon
  useEffect(() => {
    if (editingMessage) {
      setDraftMessage(messageText);
    }
  }, [editingMessage, messageText]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showEmojiPicker) {
          setShowEmojiPicker(false);
        } else if (editingMessage) {
          handleCancelEdit();
        } else if (replyTo) {
          setReplyTo(null);
        }
      }
      
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleTextSubmit(e);
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('keydown', handleKeyDown);
      return () => input.removeEventListener('keydown', handleKeyDown);
    }
  }, [showEmojiPicker, editingMessage, replyTo, handleTextSubmit, handleCancelEdit]);

  // Rendu des messages avec virtualisation basique
  const renderMessages = useMemo(() => {
    if (virtualScrolling && messages.length > 100) {
      // Virtualisation simple pour les gros volumes
      const visibleMessages = messages.slice(-50); // Afficher seulement les 50 derniers
      return visibleMessages.map((message, index) => (
        <MessageBubble
          key={message.id || index}
          message={message}
          isOwn={message.senderId === currentUser?.uid}
          onReply={handleReply}
          onReaction={handleReaction}
          onEdit={setEditingMessage}
          onDelete={handleDelete}
          onMenu={handleMessageMenu}
          onClick={handleMessageClick}
          showTimestamp={showTimestamps}
          showReadReceipt={showReadReceipts}
          compact={compact}
          theme={theme}
        />
      ));
    }

    return messages.map((message, index) => (
      <motion.div
        key={message.id || index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        layout
      >
        <MessageBubble
          message={message}
          isOwn={message.senderId === currentUser?.uid}
          onReply={handleReply}
          onReaction={handleReaction}
          onEdit={setEditingMessage}
          onDelete={handleDelete}
          onMenu={handleMessageMenu}
          onClick={handleMessageClick}
          showTimestamp={showTimestamps}
          showReadReceipt={showReadReceipts}
          compact={compact}
          theme={theme}
        />
      </motion.div>
    ));
  }, [
    messages, 
    virtualScrolling, 
    currentUser, 
    handleReply, 
    handleReaction, 
    handleDelete, 
    handleMessageMenu, 
    handleMessageClick,
    showTimestamps,
    showReadReceipts,
    compact,
    theme
  ]);

  // Composant de saisie
  const InputComponent = () => (
    <div className="chat-input-container">
      {/* Message de réponse */}
      {replyTo && (
        <motion.div
          className="reply-preview"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="reply-preview-content">
            <ReplyIcon className="reply-icon" />
            <span className="reply-text">
              Répondre à: {replyTo.content?.substring(0, 50)}...
            </span>
            <button
              onClick={() => setReplyTo(null)}
              className="reply-close"
              aria-label="Annuler la réponse"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Message en cours d'édition */}
      {editingMessage && (
        <motion.div
          className="edit-preview"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="edit-preview-content">
            <span className="edit-label">Modifier le message:</span>
            <button
              onClick={handleCancelEdit}
              className="edit-cancel"
              aria-label="Annuler la modification"
            >
              Annuler
            </button>
          </div>
        </motion.div>
      )}

      {/* Zone de saisie principale */}
      <div className="chat-input-wrapper">
        <form onSubmit={handleTextSubmit} className="chat-input-form">
          <div className="input-actions">
            {enableFileUploads && (
              <button
                type="button"
                onClick={() => setShowFileUploader(true)}
                className="input-action-btn"
                aria-label="Joindre un fichier"
              >
                <PaperClipIcon className="input-action-icon" />
              </button>
            )}

            {enableVoiceMessages && (
              <button
                type="button"
                onClick={() => setIsRecording(true)}
                className="input-action-btn"
                aria-label="Message vocal"
              >
                <MicrophoneIcon className="input-action-icon" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="input-action-btn"
              aria-label="Sélectionner un emoji"
            >
              <EmojiHappyIcon className="input-action-icon" />
            </button>
          </div>

          <div className="input-field-container">
            <textarea
              ref={inputRef}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={
                editingMessage 
                  ? "Modifier le message..." 
                  : replyTo 
                    ? "Répondre au message..." 
                    : "Tapez votre message..."
              }
              className="chat-input-field"
              rows={1}
              maxLength={maxMessageLength}
              disabled={isRecording}
            />
            
            <div className="input-counter">
              {messageText.length}/{maxMessageLength}
            </div>
          </div>

          <button
            type="submit"
            disabled={!messageText.trim() && !editingMessage}
            className="send-button"
            aria-label="Envoyer le message"
          >
            <PaperAirplaneIcon className="send-icon" />
          </button>
        </form>
      </div>

      {/* Indicateur de frappe */}
      {isTyping && (
        <TypingIndicator user={otherUser} theme={theme} />
      )}
    </div>
  );

  return (
    <div className={`chat-interface ${className} ${theme} ${compact ? 'compact' : ''}`}>
      {/* En-tête du chat */}
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="user-avatar">
            <img 
              src={otherUser?.photoURL || '/default-avatar.png'} 
              alt={otherUser?.displayName || 'Utilisateur'}
            />
          </div>
          <div className="user-details">
            <h3 className="user-name">{otherUser?.displayName || 'Utilisateur'}</h3>
            <span className="user-status">
              {otherUser?.online ? 'En ligne' : 'Hors ligne'}
            </span>
          </div>
        </div>
        
        <div className="chat-actions">
          <button className="chat-action-btn" aria-label="Appel vocal">
            📞
          </button>
          <button className="chat-action-btn" aria-label="Appel vidéo">
            📹
          </button>
          <button className="chat-action-btn" aria-label="Plus d'options">
            <DotsHorizontalIcon className="action-icon" />
          </button>
        </div>
      </div>

      {/* Zone des messages */}
      <div className="chat-messages" ref={scrollContainerRef}>
        <div className="messages-container">
          {renderMessages}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Zone de saisie */}
      <InputComponent />

      {/* Composants modaux */}
      <AnimatePresence>
        {showEmojiPicker && (
          <EmojiPicker
            onSelect={handleEmojiSelect}
            onClose={() => setShowEmojiPicker(false)}
            theme={theme}
          />
        )}

        {isRecording && (
          <VoiceRecorder
            onRecord={handleVoiceRecord}
            onCancel={() => setIsRecording(false)}
            theme={theme}
          />
        )}

        {showFileUploader && (
          <FileUploader
            onUpload={handleFileUpload}
            onClose={() => setShowFileUploader(false)}
            theme={theme}
            maxSize={10 * 1024 * 1024} // 10MB
            allowedTypes={['image/*', 'video/*', 'audio/*', 'application/pdf']}
          />
        )}

        {showMessageMenu && selectedMessage && (
          <MessageMenu
            message={selectedMessage}
            onEdit={() => {
              setEditingMessage(selectedMessage);
              setMessageText(selectedMessage.content);
              setShowMessageMenu(false);
            }}
            onDelete={() => handleDelete(selectedMessage.id)}
            onClose={() => setShowMessageMenu(false)}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

ChatInterface.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    type: PropTypes.oneOf(['text', 'image', 'file', 'voice', 'video']).isRequired,
    senderId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    metadata: PropTypes.object,
    reactions: PropTypes.array,
    replyTo: PropTypes.string
  })).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onReaction: PropTypes.func,
  onReply: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isTyping: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  otherUser: PropTypes.object.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  compact: PropTypes.bool,
  showTimestamps: PropTypes.bool,
  showReadReceipts: PropTypes.bool,
  enableVoiceMessages: PropTypes.bool,
  enableFileUploads: PropTypes.bool,
  enableReactions: PropTypes.bool,
  enableReplies: PropTypes.bool,
  maxMessageLength: PropTypes.number,
  autoScroll: PropTypes.bool,
  virtualScrolling: PropTypes.bool
};

ChatInterface.defaultProps = {
  theme: 'dark',
  compact: false,
  showTimestamps: true,
  showReadReceipts: true,
  enableVoiceMessages: true,
  enableFileUploads: true,
  enableReactions: true,
  enableReplies: true,
  maxMessageLength: 1000,
  autoScroll: true,
  virtualScrolling: false
};

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
