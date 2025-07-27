import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';
import { auth, db } from '../utils/firebase';
import { collection, addDoc, onSnapshot, query, where, orderBy, updateDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';
import ContactsList from './ContactsList';
import VoiceRecorder from './VoiceRecorder';
import VoiceMessage from './VoiceMessage';

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageUnsubscribe, setMessageUnsubscribe] = useState(null);
  const [showContacts, setShowContacts] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const updateUserStatus = useCallback(async (online) => {
    if (!auth.currentUser) return;
    
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        online,
        lastSeen: new Date().toISOString()
      });
    } catch {
      // Erreur silencieuse pour la mise à jour du statut
    }
  }, []);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
        showToast({ message: 'Veuillez vous connecter pour accéder au chat', severity: 'warning' });
      } else {
        // Mettre à jour le statut en ligne
        updateUserStatus(true);
      }
    });

    return () => {
      unsubscribe();
      updateUserStatus(false);
    };
  }, [navigate, showToast, updateUserStatus]);

  // Nettoyer les listeners de messages lors du démontage
  useEffect(() => {
    return () => {
      if (messageUnsubscribe) {
        messageUnsubscribe();
      }
    };
  }, [messageUnsubscribe]);

  const loadMessages = useCallback((conversationId) => {
    if (!conversationId) return;

    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    }, (error) => {
      // eslint-disable-next-line no-console, no-undef
      console.error('Erreur lors du chargement des messages:', error);
    });

    setMessageUnsubscribe(() => unsubscribe);
  }, []);

  const handleSelectContact = useCallback(async (contact) => {
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
    } catch {
      showToast({ message: 'Erreur lors de la sélection du contact', severity: 'error' });
    }
  }, [messageUnsubscribe, showToast, loadMessages]);

  const uploadAudioFile = async (audioBlob) => {
    try {
      const fileName = `voice_messages/${Date.now()}_${auth.currentUser.uid}.webm`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, audioBlob);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch {
      throw new Error('Erreur lors de l\'upload du fichier audio');
    }
  };

  const handleSendVoiceMessage = async (audioBlob, duration) => {
    if (!selectedContact) return;

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

      if (!conversationId) {
        // Créer une nouvelle conversation
        const newConversation = await addDoc(conversationsRef, {
          participants: [auth.currentUser.email, selectedContact.email],
          createdAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString()
        });
        conversationId = newConversation.id;
      }

      // Ajouter le message vocal
      const messagesRef = collection(db, 'conversations', conversationId, 'messages');
      await addDoc(messagesRef, {
        type: 'voice',
        audioUrl: audioURL,
        duration: duration,
        sender: auth.currentUser.email,
        timestamp: new Date().toISOString()
      });

      // Mettre à jour la conversation
      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessageAt: new Date().toISOString()
      });

      showToast({ message: 'Message vocal envoyé !', severity: 'success' });
    } catch {
      showToast({ message: 'Erreur lors de l\'envoi du message vocal', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedContact || !newMessage.trim() || loading) return;

    setLoading(true);
    try {
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

      if (!conversationId) {
        // Créer une nouvelle conversation
        const newConversation = await addDoc(conversationsRef, {
          participants: [auth.currentUser.email, selectedContact.email],
          createdAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString()
        });
        conversationId = newConversation.id;
      }

      // Ajouter le message texte
      const messagesRef = collection(db, 'conversations', conversationId, 'messages');
      await addDoc(messagesRef, {
        type: 'text',
        text: newMessage.trim(),
        sender: auth.currentUser.email,
        timestamp: new Date().toISOString()
      });

      // Mettre à jour la conversation
      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessageAt: new Date().toISOString()
      });

      setNewMessage('');
    } catch {
      showToast({ message: 'Erreur lors de l\'envoi du message', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Nettoyer les listeners
      if (messageUnsubscribe) {
        messageUnsubscribe();
      }
      
      await auth.signOut();
      navigate('/');
      showToast({ message: 'Déconnexion réussie', severity: 'success' });
    } catch {
      showToast({ message: 'Erreur lors de la déconnexion', severity: 'error' });
    }
  };

  const renderMessage = (message, index) => {
    const isOwnMessage = message.sender === auth.currentUser?.email;

    if (message.type === 'voice') {
      return (
        <VoiceMessage
          key={message.id}
          audioUrl={message.audioUrl}
          duration={message.duration}
          sender={selectedContact?.displayName}
          timestamp={message.timestamp}
          isOwnMessage={isOwnMessage}
        />
      );
    }

    // Message texte normal
    return (
      <div
        key={message.id}
        style={{
          padding: window.innerWidth <= 768 ? '10px 14px' : '12px 16px',
          background: isOwnMessage
            ? 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)'
            : 'rgba(255, 255, 255, 0.1)',
          borderRadius: window.innerWidth <= 768 ? '18px' : '16px',
          maxWidth: window.innerWidth <= 768 ? '85%' : '70%',
          alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
          wordWrap: 'break-word',
          boxShadow: isOwnMessage
            ? '0 4px 16px rgba(28, 198, 255, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: isOwnMessage
            ? '1px solid rgba(62, 242, 255, 0.3)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'fadeInUp 0.3s ease',
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'both',
          fontSize: window.innerWidth <= 768 ? '14px' : '16px',
          lineHeight: 1.4
        }}
      >
        <div style={{
          fontSize: window.innerWidth <= 768 ? '10px' : '12px',
          opacity: 0.7,
          marginBottom: '4px',
          fontWeight: '600'
        }}>
          {isOwnMessage ? 'Vous' : selectedContact?.displayName}
        </div>
        <div>{message.text}</div>
        <div style={{
          fontSize: window.innerWidth <= 768 ? '8px' : '10px',
          opacity: 0.6,
          marginTop: '4px',
          textAlign: 'right'
        }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
      color: '#fff',
      position: 'relative'
    }}>
      {/* Effet de particules en arrière-plan */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 10% 20%, rgba(28, 198, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(252, 92, 125, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      {/* Liste des contacts - Desktop */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        display: window.innerWidth > 768 ? 'block' : 'none'
      }}>
        <ContactsList
          onSelectContact={handleSelectContact}
          selectedContact={selectedContact}
        />
      </div>

      {/* Zone de chat */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'rgba(28, 198, 255, 0.1)',
          borderBottom: '1px solid rgba(62, 242, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 16px rgba(28, 198, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Bouton menu mobile */}
            {window.innerWidth <= 768 && (
              <button
                onClick={() => setShowContacts(!showContacts)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                }}
              >
                ☰
              </button>
            )}
            
            <div>
              <h1 style={{
                margin: 0,
                fontSize: window.innerWidth <= 768 ? '20px' : '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #3ef2ff 0%, #1cc6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {selectedContact ? selectedContact.displayName : 'Chat'}
              </h1>
              {selectedContact && (
                <div style={{
                  fontSize: '14px',
                  color: '#a0f0ff',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: selectedContact.online ? '#4caf50' : '#ff9800',
                    boxShadow: selectedContact.online ? '0 0 8px rgba(76, 175, 80, 0.5)' : 'none'
                  }} />
                  {selectedContact.online ? 'En ligne' : 'Hors ligne'}
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/profile')}
              style={{
                padding: window.innerWidth <= 768 ? '8px 12px' : '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(62, 242, 255, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: window.innerWidth <= 768 ? '12px' : '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              {window.innerWidth <= 768 ? '👤' : 'Profil'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: window.innerWidth <= 768 ? '8px 12px' : '8px 16px',
                background: 'linear-gradient(90deg, #ff4757 0%, #ff3742 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: window.innerWidth <= 768 ? '12px' : '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(255, 71, 87, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 71, 87, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(255, 71, 87, 0.3)';
              }}
            >
              {window.innerWidth <= 768 ? '🚪' : 'Déconnexion'}
            </button>
          </div>
        </div>

        {/* Contacts mobile overlay */}
        {window.innerWidth <= 768 && showContacts && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            animation: 'fadeInModal 0.3s ease'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)'
            }}>
              <div style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(62, 242, 255, 0.2)'
              }}>
                <h2 style={{ margin: 0, color: '#3ef2ff' }}>Contacts</h2>
                <button
                  onClick={() => setShowContacts(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ height: 'calc(100% - 80px)', overflow: 'auto' }}>
                <ContactsList
                  onSelectContact={handleSelectContact}
                  selectedContact={selectedContact}
                />
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div style={{
          flex: 1,
          padding: window.innerWidth <= 768 ? '12px' : '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.02)',
          height: window.innerWidth <= 768 ? 'calc(100vh - 200px)' : 'auto'
        }}>
          {!selectedContact ? (
            <div style={{
              textAlign: 'center',
              color: '#a0f0ff',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              marginTop: '50px',
              padding: window.innerWidth <= 768 ? '20px' : '40px',
              background: 'rgba(28, 198, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(62, 242, 255, 0.1)'
            }}>
              <div style={{ fontSize: window.innerWidth <= 768 ? '36px' : '48px', marginBottom: '16px' }}>💬</div>
              {window.innerWidth <= 768 ? 'Appuyez sur ☰ pour voir vos contacts' : 'Sélectionnez un contact pour commencer à discuter'}
            </div>
          ) : messages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#a0f0ff',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              marginTop: '50px',
              padding: window.innerWidth <= 768 ? '20px' : '40px',
              background: 'rgba(28, 198, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(62, 242, 255, 0.1)'
            }}>
              <div style={{ fontSize: window.innerWidth <= 768 ? '36px' : '48px', marginBottom: '16px' }}>✨</div>
              Aucun message pour le moment. Commencez la conversation !
            </div>
          ) : (
            messages.map((message, index) => renderMessage(message, index))
          )}
        </div>

        {/* Enregistreur vocal */}
        {selectedContact && showVoiceRecorder && (
          <VoiceRecorder
            onSendVoice={handleSendVoiceMessage}
            disabled={loading}
          />
        )}

        {/* Message Input */}
        {selectedContact && (
          <form onSubmit={handleSendMessage} style={{
            padding: window.innerWidth <= 768 ? '12px' : '20px',
            background: 'rgba(28, 198, 255, 0.05)',
            borderTop: '1px solid rgba(62, 242, 255, 0.2)',
            display: 'flex',
            gap: '12px',
            backdropFilter: 'blur(10px)',
            position: window.innerWidth <= 768 ? 'fixed' : 'relative',
            bottom: window.innerWidth <= 768 ? 0 : 'auto',
            left: window.innerWidth <= 768 ? 0 : 'auto',
            right: window.innerWidth <= 768 ? 0 : 'auto',
            zIndex: window.innerWidth <= 768 ? 100 : 'auto'
          }}>
            {/* Bouton vocal */}
            <button
              type="button"
              onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
              style={{
                padding: window.innerWidth <= 768 ? '12px' : '14px',
                background: showVoiceRecorder 
                  ? 'linear-gradient(90deg, #ff4757 0%, #ff3742 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(62, 242, 255, 0.3)',
                borderRadius: window.innerWidth <= 768 ? '20px' : '12px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: window.innerWidth <= 768 ? '16px' : '14px',
                transition: 'all 0.3s ease',
                minWidth: window.innerWidth <= 768 ? '44px' : 'auto'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🎤
            </button>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre message..."
              disabled={loading}
              style={{
                flex: 1,
                padding: window.innerWidth <= 768 ? '12px 16px' : '14px 18px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(62, 242, 255, 0.3)',
                borderRadius: window.innerWidth <= 768 ? '20px' : '12px',
                color: '#fff',
                fontSize: window.innerWidth <= 768 ? '16px' : '14px',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(62, 242, 255, 0.6)';
                e.target.style.boxShadow = '0 0 0 3px rgba(62, 242, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(62, 242, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              style={{
                padding: window.innerWidth <= 768 ? '12px 16px' : '14px 24px',
                background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
                border: 'none',
                borderRadius: window.innerWidth <= 768 ? '20px' : '12px',
                color: '#fff',
                cursor: loading || !newMessage.trim() ? 'not-allowed' : 'pointer',
                fontSize: window.innerWidth <= 768 ? '16px' : '14px',
                fontWeight: 'bold',
                opacity: loading || !newMessage.trim() ? 0.6 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(28, 198, 255, 0.3)',
                minWidth: window.innerWidth <= 768 ? '60px' : 'auto'
              }}
              onMouseEnter={(e) => {
                if (!loading && newMessage.trim()) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(28, 198, 255, 0.3)';
              }}
            >
              {loading ? '...' : window.innerWidth <= 768 ? '📤' : 'Envoyer'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 