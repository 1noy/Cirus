import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';
import { auth, db } from '../utils/firebase';
import { collection, addDoc, onSnapshot, query, where, orderBy, updateDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';
import { useResponsiveStyles } from '../utils/useResponsive';

// Lazy loading des composants lourds
const ContactsList = lazy(() => import('./ContactsList'));
const VoiceRecorder = lazy(() => import('./VoiceRecorder'));
const VoiceMessage = lazy(() => import('./VoiceMessage'));

// Composant de chargement pour les composants lazy
const LazyComponentLoader = ({ children }) => (
  <Suspense fallback={
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: '#fff',
      fontSize: '14px'
    }}>
      Chargement...
    </div>
  }>
    {children}
  </Suspense>
);

// Optimisation avec React.memo
const MemoizedContactsList = React.memo(ContactsList);
const MemoizedVoiceRecorder = React.memo(VoiceRecorder);
const MemoizedVoiceMessage = React.memo(VoiceMessage);

// Composant de message virtualisé
const VirtualizedMessage = React.memo(({ message, isOwnMessage, scrollToBottom }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (isOwnMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOwnMessage]);

  return (
    <div
      ref={messageRef}
      style={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        marginBottom: '8px',
        padding: '0 16px'
      }}
    >
      <div style={{
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '18px',
        background: isOwnMessage 
          ? 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)'
          : 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        wordWrap: 'break-word',
        backdropFilter: 'blur(10px)',
        border: isOwnMessage ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {message.type === 'voice' ? (
          <MemoizedVoiceMessage audioURL={message.audioURL} duration={message.duration} />
        ) : (
          <span style={{ fontSize: '15px', lineHeight: '1.4' }}>
            {message.text}
          </span>
        )}
        <div style={{
          fontSize: '11px',
          opacity: 0.7,
          marginTop: '4px',
          textAlign: isOwnMessage ? 'right' : 'left'
        }}>
          {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
});

// Hook de virtualisation personnalisé
const useVirtualization = (items, itemHeight = 80, containerHeight = 400) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    containerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  };
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isMobile, getResponsiveValue, getResponsiveButtonSize, getResponsiveInputSize } = useResponsiveStyles();
  
  const [mounted, setMounted] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [messageUnsubscribe, setMessageUnsubscribe] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Virtualisation des messages
  const { containerRef, visibleItems, totalHeight, offsetY, handleScroll } = useVirtualization(
    messages,
    80,
    400
  );

  // Gestion du montage/démontage
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Optimisation avec useMemo pour les callbacks
  const updateUserStatus = useCallback(async (online) => {
    if (!auth.currentUser || !mounted) return;
    
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        online,
        lastSeen: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  }, [mounted]);

  // Optimisation des listeners avec useMemo
  const authListener = useMemo(() => {
    return auth.onAuthStateChanged((user) => {
      if (!mounted) return;
      
      if (!user) {
        navigate('/login');
        showToast({ message: 'Connexion requise pour accéder au chat', severity: 'warning' });
      } else {
        updateUserStatus(true);
      }
    });
  }, [navigate, showToast, updateUserStatus, mounted]);

  useEffect(() => {
    const unsubscribe = authListener;
    return () => {
      if (unsubscribe) {
      unsubscribe();
      }
      if (mounted) {
      updateUserStatus(false);
      }
    };
  }, [authListener, updateUserStatus, mounted]);

  // Nettoyer les listeners de messages lors du démontage
  useEffect(() => {
    return () => {
      if (messageUnsubscribe) {
        messageUnsubscribe();
      }
    };
  }, [messageUnsubscribe]);

  // Cleanup complet lors du démontage
  useEffect(() => {
    return () => {
      setMounted(false);
      if (messageUnsubscribe) {
        messageUnsubscribe();
      }
    };
  }, [messageUnsubscribe]);

  const loadMessages = useCallback((conversationId) => {
    if (!conversationId || !mounted) return;

    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!mounted) return;
      
      const messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    }, (error) => {
      if (!mounted) return;
      
      console.error('Erreur lors du chargement des messages:', error);
      showToast({ message: 'Erreur lors du chargement des messages', severity: 'error' });
    });

    setMessageUnsubscribe(() => unsubscribe);
  }, [showToast, mounted]);

  const handleSelectContact = useCallback(async (contact) => {
    if (!mounted) return;
    
    // Nettoyer l'ancien listener de messages
    if (messageUnsubscribe) {
      messageUnsubscribe();
    }

    setSelectedContact(contact);
    setMessages([]);
    setShowContacts(false);
    setShowVoiceRecorder(false);
    
    // Charger ou créer la conversation
    try {
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', auth.currentUser.email)
      );
      
      const snapshot = await getDocs(q);
      let conversation = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(contact.email)) {
          conversation = { id: doc.id, ...data };
        }
      });

      if (!conversation) {
        // Créer une nouvelle conversation
        const newConversation = await addDoc(conversationsRef, {
          participants: [auth.currentUser.email, contact.email],
          createdAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString()
        });
        conversation = { id: newConversation.id };
      }

      // Charger les messages
      loadMessages(conversation.id);
    } catch (error) {
      if (!mounted) return;
      
      console.error('Erreur lors de la sélection du contact:', error);
      showToast({ message: 'Erreur lors de la sélection du contact', severity: 'error' });
    }
  }, [messageUnsubscribe, showToast, loadMessages, mounted]);

  // Fonction pour ouvrir la discussion unique avec un contact (depuis UserSearch)
  const handleMessageUser = useCallback(async (user) => {
    if (!mounted) return;
    try {
      // Cherche la conversation existante ou la crée si besoin
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', auth.currentUser.email)
      );
      const snapshot = await getDocs(q);
      let conversationId = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(user.email)) {
          conversationId = doc.id;
        }
      });
      
      if (!conversationId) {
        // Créer une nouvelle conversation unique
        const newConversation = await addDoc(conversationsRef, {
          participants: [auth.currentUser.email, user.email],
          createdAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString()
        });
        conversationId = newConversation.id;
      }
      
      // Sélectionner le contact dans la liste (pour affichage du chat)
      setSelectedContact({
        id: user.id || null,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        avatar: user.avatar || null,
        online: user.online || false,
        lastSeen: user.lastSeen || null
      });
      
      // Charger les messages
      loadMessages(conversationId);
    } catch (error) {
      if (!mounted) return;
      console.error('Erreur lors de l\'ouverture de la conversation:', error);
      showToast({ message: 'Erreur lors de l\'ouverture de la conversation', severity: 'error' });
    }
  }, [loadMessages, showToast, mounted]);

  const uploadAudioFile = async (audioBlob) => {
    if (!mounted) return null;
    try {
      const fileName = `voice_messages/${Date.now()}_${auth.currentUser.uid}.webm`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, audioBlob);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      if (!mounted) return null;
      console.error('Erreur lors de l\'upload du fichier audio:', error);
      throw new Error('Erreur lors de l\'upload du fichier audio');
    }
  };

  const handleSendVoiceMessage = async (audioBlob, duration) => {
    if (!selectedContact || !mounted) return;

    setLoading(true);
    try {
      // Upload du fichier audio
      const audioURL = await uploadAudioFile(audioBlob);

      // Trouver la conversation
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', auth.currentUser.email)
      );
      
      const snapshot = await getDocs(q);
      let conversationId = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(selectedContact.email)) {
          conversationId = doc.id;
        }
      });

      if (conversationId) {
        // Ajouter le message vocal
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        await addDoc(messagesRef, {
          sender: auth.currentUser.email,
          type: 'voice',
          audioURL,
          duration,
          timestamp: new Date().toISOString()
        });

        // Mettre à jour la conversation
        await updateDoc(doc(db, 'conversations', conversationId), {
          lastMessageAt: new Date().toISOString()
        });
      }
    } catch (error) {
      if (!mounted) return;
      console.error('Erreur lors de l\'envoi du message vocal:', error);
      showToast({ message: 'Erreur lors de l\'envoi du message vocal', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    if (!selectedContact || !newMessage.trim() || !mounted) return;
    e.preventDefault();

    setLoading(true);
    try {
      // Trouver la conversation
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', auth.currentUser.email)
      );
      
      const snapshot = await getDocs(q);
      let conversationId = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(selectedContact.email)) {
          conversationId = doc.id;
        }
      });

      if (conversationId) {
        // Ajouter le message
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        await addDoc(messagesRef, {
          sender: auth.currentUser.email,
          text: newMessage.trim(),
          timestamp: new Date().toISOString()
        });

        // Mettre à jour la conversation
        await updateDoc(doc(db, 'conversations', conversationId), {
          lastMessageAt: new Date().toISOString()
        });

        setNewMessage('');
      }
    } catch (error) {
      if (!mounted) return;
      console.error('Erreur lors de l\'envoi du message:', error);
      showToast({ message: 'Erreur lors de l\'envoi du message', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!mounted) return;
    try {
      await auth.signOut();
      navigate('/login');
      showToast({ message: 'Déconnexion réussie', severity: 'success' });
    } catch (error) {
      if (!mounted) return;
      console.error('Erreur lors de la déconnexion:', error);
      showToast({ message: 'Erreur lors de la déconnexion', severity: 'error' });
    }
  };

  // Optimisation du rendu des messages avec useMemo
  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <div
        key={message.id || index}
        style={{
          display: 'flex',
          justifyContent: message.sender === auth.currentUser?.email ? 'flex-end' : 'flex-start',
          marginBottom: '12px',
          padding: '0 16px'
        }}
      >
        <div
          style={{
            maxWidth: '70%',
            padding: '12px 16px',
            borderRadius: '18px',
            background: message.sender === auth.currentUser?.email
              ? 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            wordWrap: 'break-word',
            boxShadow: message.sender === auth.currentUser?.email
              ? '0 2px 8px rgba(28, 198, 255, 0.3)'
              : 'none'
          }}
        >
          {message.type === 'voice' ? (
            <VoiceMessage audioUrl={message.audioURL} duration={message.duration} />
          ) : (
            <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
              {message.text}
            </div>
          )}
          <div style={{
            fontSize: '11px',
            opacity: 0.7,
            marginTop: '4px',
            textAlign: message.sender === auth.currentUser?.email ? 'right' : 'left'
          }}>
            {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    ));
  }, [messages, auth.currentUser?.email, mounted]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #181828 0%, #23234a 100%)',
      display: 'flex',
      overflow: 'hidden',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      {/* Sidebar des contacts */}
      <LazyComponentLoader>
        <MemoizedContactsList
        onSelectContact={handleSelectContact}
        selectedContact={selectedContact}
      />
      </LazyComponentLoader>
      
      {/* Zone de chat principale */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(28, 198, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        minHeight: isMobile ? '60vh' : 'auto'
      }}>
        {/* En-tête du chat */}
        <div style={{
          padding: getResponsiveValue('12px 16px', '20px'),
          borderBottom: '1px solid rgba(62, 242, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          minHeight: isMobile ? '60px' : 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: getResponsiveValue('8px', '12px')
          }}>
            <button
              onClick={() => setShowContacts(!showContacts)}
              aria-label="Afficher la liste des contacts"
              role="button"
              tabIndex={0}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: getResponsiveValue('20px', '24px'),
                cursor: 'pointer',
                padding: getResponsiveValue('8px', '8px'),
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...getResponsiveButtonSize()
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowContacts(!showContacts);
                }
              }}
            >
              👥
            </button>
            
            {selectedContact && (
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: getResponsiveValue('16px', '18px'),
                  fontWeight: '600',
                  color: '#fff'
                }}>
                  {selectedContact.displayName}
                </h2>
                <div style={{
                  fontSize: getResponsiveValue('10px', '12px'),
                  color: selectedContact.online ? '#4caf50' : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: selectedContact.online ? '#4caf50' : '#666'
                  }} />
                    {selectedContact.online ? 'En ligne' : 'Hors ligne'}
                </div>
              </div>
            )}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: getResponsiveValue('6px', '8px')
          }}>
            <button
              onClick={() => navigate('/profile')}
              aria-label="Accéder au profil"
              role="button"
              tabIndex={0}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                padding: getResponsiveValue('6px 10px', '8px 12px'),
                cursor: 'pointer',
                fontSize: getResponsiveValue('12px', '14px'),
                fontWeight: '600',
                transition: 'all 0.2s ease',
                ...getResponsiveButtonSize()
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/profile');
                }
              }}
            >
              Profil
            </button>
            
          <button
            onClick={handleLogout}
              aria-label="Se déconnecter"
              role="button"
              tabIndex={0}
            style={{
              background: 'linear-gradient(90deg, #ff4d4d 0%, #ff0000 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
                padding: getResponsiveValue('6px 12px', '8px 16px'),
              cursor: 'pointer',
                fontSize: getResponsiveValue('12px', '14px'),
                fontWeight: '600',
                transition: 'all 0.2s ease',
                ...getResponsiveButtonSize()
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLogout();
                }
            }}
          >
            Déconnexion
          </button>
          </div>
        </div>
        
        {/* Zone de messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: getResponsiveValue('8px 0', '16px 0'),
          background: 'rgba(28, 198, 255, 0.01)',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}>
          {messages.length === 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: getResponsiveValue('14px', '16px'),
              textAlign: 'center',
              padding: getResponsiveValue('20px', '40px')
            }}>
              {selectedContact 
                ? `Commencez à discuter avec ${selectedContact.displayName} !`
                : 'Sélectionnez un contact pour commencer à discuter'
              }
              </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: getResponsiveValue('6px', '8px')
            }}>
              {renderedMessages}
            </div>
          )}
        </div>
        
        {/* Zone de saisie */}
          <div style={{
          padding: getResponsiveValue('12px 16px', '20px'),
            borderTop: '1px solid rgba(62, 242, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)'
        }}>
          <form onSubmit={handleSendMessage} style={{
            display: 'flex',
            alignItems: 'center',
            gap: getResponsiveValue('8px', '12px')
          }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
              disabled={!selectedContact || loading}
              aria-label="Saisir un message"
              role="textbox"
                  style={{
                flex: 1,
                padding: getResponsiveValue('12px 14px', '12px 16px'),
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: getResponsiveValue('20px', '24px'),
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                fontSize: getResponsiveValue('14px', '16px'),
                minHeight: getResponsiveValue('44px', 'auto'),
                    outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1cc6ff';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            
              <button
                type="button"
                onClick={() => setShowVoiceRecorder(true)}
              disabled={!selectedContact || loading}
              aria-label="Enregistrer un message vocal"
              role="button"
              tabIndex={0}
                style={{
                background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                  border: 'none',
                  borderRadius: '50%',
                width: getResponsiveValue('44px', '48px'),
                height: getResponsiveValue('44px', '48px'),
                  color: '#fff',
                cursor: selectedContact && !loading ? 'pointer' : 'not-allowed',
                fontSize: getResponsiveValue('18px', '20px'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                transition: 'all 0.2s ease',
                opacity: selectedContact && !loading ? 1 : 0.5,
                minWidth: getResponsiveValue('44px', 'auto'),
                minHeight: getResponsiveValue('44px', 'auto')
              }}
              onMouseEnter={(e) => {
                if (selectedContact && !loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selectedContact && !loading) {
                  e.preventDefault();
                  setShowVoiceRecorder(true);
                }
                }}
              >
                🎤
              </button>
            
              <button
                type="submit"
              disabled={!selectedContact || !newMessage.trim() || loading}
              aria-label="Envoyer le message"
              role="button"
              tabIndex={0}
                style={{
                background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                  border: 'none',
                borderRadius: getResponsiveValue('20px', '24px'),
                padding: getResponsiveValue('12px 20px', '12px 24px'),
                  color: '#fff',
                cursor: selectedContact && newMessage.trim() && !loading ? 'pointer' : 'not-allowed',
                fontSize: getResponsiveValue('14px', '16px'),
                fontWeight: '600',
                transition: 'all 0.2s ease',
                opacity: selectedContact && newMessage.trim() && !loading ? 1 : 0.5,
                minWidth: getResponsiveValue('44px', 'auto'),
                minHeight: getResponsiveValue('44px', 'auto')
              }}
              onMouseEnter={(e) => {
                if (selectedContact && newMessage.trim() && !loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selectedContact && newMessage.trim() && !loading) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            >
              Envoyer
              </button>
            </form>
          </div>
      </div>
      
      {/* Enregistreur vocal */}
      {showVoiceRecorder && (
        <LazyComponentLoader>
          <MemoizedVoiceRecorder
          onClose={() => setShowVoiceRecorder(false)}
          onSend={handleSendVoiceMessage}
        />
        </LazyComponentLoader>
      )}
    </div>
  );
} 