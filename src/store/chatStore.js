import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

import { db, auth } from '../utils/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment
} from 'firebase/firestore';

/**
 * Store Zustand avancé pour la gestion des chats
 * Utilise Immer pour des mises à jour immutables et persist pour la sauvegarde locale
 */
export const useChatStore = create(
  devtools(
    subscribeWithSelector(
      persist(
        immer((set, get) => ({
          // === ÉTAT PRINCIPAL ===
          
          // Chats et conversations
          chats: [],
          activeChat: null,
          chatParticipants: {},
          chatSettings: {},
          
          // Messages
          messages: {},
          messageCache: {},
          messageReactions: {},
          messageReplies: {},
          
          // Utilisateurs et contacts
          users: [],
          contacts: [],
          onlineUsers: new Set(),
          userStatuses: {},
          
          // Interface et UI
          ui: {
            sidebarOpen: true,
            mobileMenuOpen: false,
            theme: 'dark',
            compactMode: false,
            showTimestamps: true,
            showReadReceipts: true,
            enableAnimations: true,
            enableSounds: true
          },
          
          // Performance et cache
          performance: {
            lastSync: null,
            syncInterval: 30000, // 30 secondes
            messageBatchSize: 50,
            cacheSize: 0,
            networkStatus: 'online',
            lastError: null
          },
          
          // Notifications et alertes
          notifications: [],
          unreadCounts: {},
          typingIndicators: {},
          
          // === ACTIONS PRINCIPALES ===
          
          // Gestion des chats
          createChat: async (participants, type = 'direct', metadata = {}) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              const chatData = {
                type,
                participants: [...participants, currentUser.uid],
                metadata: {
                  ...metadata,
                  createdAt: serverTimestamp(),
                  createdBy: currentUser.uid,
                  lastActivity: serverTimestamp()
                },
                settings: {
                  notifications: true,
                  sound: true,
                  theme: 'default'
                }
              };

              const chatRef = await addDoc(collection(db, 'chats'), chatData);
              const chatId = chatRef.id;

              // Mettre à jour l'état local
              set(state => {
                state.chats.push({
                  id: chatId,
                  ...chatData,
                  metadata: {
                    ...chatData.metadata,
                    createdAt: Date.now(),
                    lastActivity: Date.now()
                  }
                });
                state.activeChat = chatId;
              });

              // Initialiser les participants
              await get().initializeChatParticipants(chatId, participants);

              return chatId;
            } catch (error) {
              console.error('Erreur lors de la création du chat:', error);
              throw error;
            }
          },

          joinChat: async (chatId) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              const chatRef = doc(db, 'chats', chatId);
              const chatDoc = await getDoc(chatRef);

              if (!chatDoc.exists()) {
                throw new Error('Chat introuvable');
              }

              const chatData = chatDoc.data();
              
              // Vérifier si l'utilisateur peut rejoindre
              if (chatData.type === 'private' && !chatData.participants.includes(currentUser.uid)) {
                throw new Error('Accès refusé à ce chat');
              }

              // Ajouter l'utilisateur aux participants
              await updateDoc(chatRef, {
                participants: arrayUnion(currentUser.uid),
                'metadata.lastActivity': serverTimestamp()
              });

              // Mettre à jour l'état local
              set(state => {
                const existingChat = state.chats.find(c => c.id === chatId);
                if (existingChat) {
                  existingChat.participants.push(currentUser.uid);
                  existingChat.metadata.lastActivity = Date.now();
                } else {
                  state.chats.push({
                    id: chatId,
                    ...chatData,
                    metadata: {
                      ...chatData.metadata,
                      createdAt: chatData.metadata.createdAt?.toDate?.() || Date.now(),
                      lastActivity: Date.now()
                    }
                  });
                }
                state.activeChat = chatId;
              });

              // Charger les messages
              await get().loadChatMessages(chatId);

            } catch (error) {
              console.error('Erreur lors de la jointure du chat:', error);
              throw error;
            }
          },

          leaveChat: async (chatId) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              const chatRef = doc(db, 'chats', chatId);
              await updateDoc(chatRef, {
                participants: arrayRemove(currentUser.uid),
                'metadata.lastActivity': serverTimestamp()
              });

              // Mettre à jour l'état local
              set(state => {
                state.chats = state.chats.filter(c => c.id !== chatId);
                if (state.activeChat === chatId) {
                  state.activeChat = state.chats[0]?.id || null;
                }
                delete state.messages[chatId];
                delete state.unreadCounts[chatId];
                delete state.typingIndicators[chatId];
              });

            } catch (error) {
              console.error('Erreur lors de la sortie du chat:', error);
              throw error;
            }
          },

          // Gestion des messages
          sendMessage: async (chatId, messageData) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              const message = {
                ...messageData,
                id: `temp_${Date.now()}`,
                senderId: currentUser.uid,
                timestamp: Date.now(),
                status: 'sending'
              };

              // Optimistic update
              set(state => {
                if (!state.messages[chatId]) {
                  state.messages[chatId] = [];
                }
                state.messages[chatId].push(message);
                state.messages[chatId].sort((a, b) => a.timestamp - b.timestamp);
              });

              // Envoyer à Firebase
              const messageRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
                ...messageData,
                senderId: currentUser.uid,
                timestamp: serverTimestamp(),
                status: 'sent'
              });

              // Mettre à jour avec l'ID réel
              set(state => {
                const messageIndex = state.messages[chatId].findIndex(m => m.id === message.id);
                if (messageIndex !== -1) {
                  state.messages[chatId][messageIndex] = {
                    ...state.messages[chatId][messageIndex],
                    id: messageRef.id,
                    status: 'sent'
                  };
                }
              });

              // Mettre à jour le chat
              await updateDoc(doc(db, 'chats', chatId), {
                'metadata.lastActivity': serverTimestamp(),
                'metadata.lastMessage': {
                  content: messageData.content,
                  senderId: currentUser.uid,
                  timestamp: serverTimestamp()
                }
              });

              // Mettre à jour l'état local du chat
              set(state => {
                const chat = state.chats.find(c => c.id === chatId);
                if (chat) {
                  chat.metadata.lastActivity = Date.now();
                  chat.metadata.lastMessage = {
                    content: messageData.content,
                    senderId: currentUser.uid,
                    timestamp: Date.now()
                  };
                }
              });

              return messageRef.id;
            } catch (error) {
              console.error('Erreur lors de l\'envoi du message:', error);
              
              // Marquer le message comme échoué
              set(state => {
                const messageIndex = state.messages[chatId]?.findIndex(m => m.id === `temp_${Date.now() - 1000}`);
                if (messageIndex !== -1) {
                  state.messages[chatId][messageIndex].status = 'failed';
                }
              });

              throw error;
            }
          },

          editMessage: async (chatId, messageId, newContent) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              // Vérifier que l'utilisateur peut modifier le message
              const message = get().messages[chatId]?.find(m => m.id === messageId);
              if (!message || message.senderId !== currentUser.uid) {
                throw new Error('Impossible de modifier ce message');
              }

              // Mettre à jour Firebase
              const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
              await updateDoc(messageRef, {
                content: newContent,
                editedAt: serverTimestamp(),
                isEdited: true
              });

              // Mettre à jour l'état local
              set(state => {
                const messageIndex = state.messages[chatId]?.findIndex(m => m.id === messageId);
                if (messageIndex !== -1) {
                  state.messages[chatId][messageIndex] = {
                    ...state.messages[chatId][messageIndex],
                    content: newContent,
                    editedAt: Date.now(),
                    isEdited: true
                  };
                }
              });

            } catch (error) {
              console.error('Erreur lors de la modification du message:', error);
              throw error;
            }
          },

          deleteMessage: async (chatId, messageId) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              // Vérifier que l'utilisateur peut supprimer le message
              const message = get().messages[chatId]?.find(m => m.id === messageId);
              if (!message || message.senderId !== currentUser.uid) {
                throw new Error('Impossible de supprimer ce message');
              }

              // Supprimer de Firebase
              const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
              await deleteDoc(messageRef);

              // Mettre à jour l'état local
              set(state => {
                if (state.messages[chatId]) {
                  state.messages[chatId] = state.messages[chatId].filter(m => m.id !== messageId);
                }
              });

            } catch (error) {
              console.error('Erreur lors de la suppression du message:', error);
              throw error;
            }
          },

          // Réactions aux messages
          addReaction: async (chatId, messageId, reaction) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              const reactionData = {
                emoji: reaction,
                userId: currentUser.uid,
                timestamp: Date.now()
              };

              // Mettre à jour Firebase
              const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
              await updateDoc(messageRef, {
                reactions: arrayUnion(reactionData)
              });

              // Mettre à jour l'état local
              set(state => {
                if (!state.messageReactions[messageId]) {
                  state.messageReactions[messageId] = [];
                }
                state.messageReactions[messageId].push(reactionData);
              });

            } catch (error) {
              console.error('Erreur lors de l\'ajout de la réaction:', error);
              throw error;
            }
          },

          removeReaction: async (chatId, messageId, reaction) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              // Mettre à jour Firebase
              const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
              await updateDoc(messageRef, {
                reactions: arrayRemove({
                  emoji: reaction,
                  userId: currentUser.uid
                })
              });

              // Mettre à jour l'état local
              set(state => {
                if (state.messageReactions[messageId]) {
                  state.messageReactions[messageId] = state.messageReactions[messageId]
                    .filter(r => !(r.emoji === reaction && r.userId === currentUser.uid));
                }
              });

            } catch (error) {
              console.error('Erreur lors de la suppression de la réaction:', error);
              throw error;
            }
          },

          // Réponses aux messages
          replyToMessage: async (chatId, messageId, replyContent) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) throw new Error('Utilisateur non authentifié');

              const replyData = {
                content: replyContent,
                type: 'text',
                replyTo: messageId,
                senderId: currentUser.uid,
                timestamp: Date.now()
              };

              // Envoyer la réponse
              const replyId = await get().sendMessage(chatId, replyData);

              // Mettre à jour l'état local des réponses
              set(state => {
                if (!state.messageReplies[messageId]) {
                  state.messageReplies[messageId] = [];
                }
                state.messageReplies[messageId].push({
                  id: replyId,
                  ...replyData
                });
              });

              return replyId;
            } catch (error) {
              console.error('Erreur lors de la réponse au message:', error);
              throw error;
            }
          },

          // Chargement des messages
          loadChatMessages: async (chatId, limit = 50, startAfter = null) => {
            try {
              const messagesQuery = query(
                collection(db, `chats/${chatId}/messages`),
                orderBy('timestamp', 'desc'),
                limit(limit),
                ...(startAfter ? [startAfter] : [])
              );

              const snapshot = await getDocs(messagesQuery);
              const messages = [];

              snapshot.forEach(doc => {
                const data = doc.data();
                messages.push({
                  id: doc.id,
                  ...data,
                  timestamp: data.timestamp?.toDate?.() || data.timestamp || Date.now()
                });
              });

              // Mettre à jour l'état local
              set(state => {
                if (!state.messages[chatId]) {
                  state.messages[chatId] = [];
                }
                
                // Fusionner avec les messages existants
                const existingIds = new Set(state.messages[chatId].map(m => m.id));
                const newMessages = messages.filter(m => !existingIds.has(m.id));
                
                state.messages[chatId] = [
                  ...state.messages[chatId],
                  ...newMessages
                ].sort((a, b) => a.timestamp - b.timestamp);
              });

              return messages;
            } catch (error) {
              console.error('Erreur lors du chargement des messages:', error);
              throw error;
            }
          },

          // Gestion des participants
          initializeChatParticipants: async (chatId, participantIds) => {
            try {
              const participantsData = [];
              
              for (const uid of participantIds) {
                const userDoc = await getDoc(doc(db, 'users', uid));
                if (userDoc.exists()) {
                  const userData = userDoc.data();
                  participantsData.push({
                    uid,
                    displayName: userData.displayName,
                    photoURL: userData.photoURL,
                    online: userData.online || false,
                    lastSeen: userData.lastSeen
                  });
                }
              }

              // Mettre à jour l'état local
              set(state => {
                state.chatParticipants[chatId] = participantsData;
              });

            } catch (error) {
              console.error('Erreur lors de l\'initialisation des participants:', error);
            }
          },

          // Indicateurs de frappe
          setTypingIndicator: (chatId, userId, isTyping) => {
            set(state => {
              if (!state.typingIndicators[chatId]) {
                state.typingIndicators[chatId] = new Set();
              }
              
              if (isTyping) {
                state.typingIndicators[chatId].add(userId);
              } else {
                state.typingIndicators[chatId].delete(userId);
              }
            });
          },

          // Marquer les messages comme lus
          markMessagesAsRead: async (chatId, messageIds = null) => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) return;

              if (!messageIds) {
                // Marquer tous les messages non lus
                const unreadMessages = get().messages[chatId]?.filter(m => 
                  m.senderId !== currentUser.uid && !m.readBy?.includes(currentUser.uid)
                ) || [];
                messageIds = unreadMessages.map(m => m.id);
              }

              if (messageIds.length === 0) return;

              // Mettre à jour Firebase
              const batch = writeBatch(db);
              messageIds.forEach(messageId => {
                const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
                batch.update(messageRef, {
                  readBy: arrayUnion(currentUser.uid),
                  readAt: serverTimestamp()
                });
              });
              await batch.commit();

              // Mettre à jour l'état local
              set(state => {
                messageIds.forEach(messageId => {
                  const message = state.messages[chatId]?.find(m => m.id === messageId);
                  if (message) {
                    if (!message.readBy) message.readBy = [];
                    if (!message.readBy.includes(currentUser.uid)) {
                      message.readBy.push(currentUser.uid);
                    }
                    message.readAt = Date.now();
                  }
                });

                // Mettre à jour le compteur de messages non lus
                if (state.unreadCounts[chatId]) {
                  state.unreadCounts[chatId] = Math.max(0, state.unreadCounts[chatId] - messageIds.length);
                }
              });

            } catch (error) {
              console.error('Erreur lors du marquage des messages comme lus:', error);
            }
          },

          // Synchronisation
          syncChats: async () => {
            try {
              const currentUser = auth.currentUser;
              if (!currentUser) return;

              // Charger les chats de l'utilisateur
              const chatsQuery = query(
                collection(db, 'chats'),
                where('participants', 'array-contains', currentUser.uid),
                orderBy('metadata.lastActivity', 'desc')
              );

              const snapshot = await getDocs(chatsQuery);
              const chats = [];

              snapshot.forEach(doc => {
                const data = doc.data();
                chats.push({
                  id: doc.id,
                  ...data,
                  metadata: {
                    ...data.metadata,
                    createdAt: data.metadata.createdAt?.toDate?.() || Date.now(),
                    lastActivity: data.metadata.lastActivity?.toDate?.() || Date.now()
                  }
                });
              });

              // Mettre à jour l'état local
              set(state => {
                state.chats = chats;
                state.performance.lastSync = Date.now();
              });

              // Charger les messages pour le chat actif
              if (get().activeChat) {
                await get().loadChatMessages(get().activeChat);
              }

            } catch (error) {
              console.error('Erreur lors de la synchronisation:', error);
              set(state => {
                state.performance.lastError = error.message;
              });
            }
          },

          // Gestion de l'interface
          setActiveChat: (chatId) => {
            set(state => {
              state.activeChat = chatId;
            });
          },

          toggleSidebar: () => {
            set(state => {
              state.ui.sidebarOpen = !state.ui.sidebarOpen;
            });
          },

          toggleMobileMenu: () => {
            set(state => {
              state.ui.mobileMenuOpen = !state.ui.mobileMenuOpen;
            });
          },

          setTheme: (theme) => {
            set(state => {
              state.ui.theme = theme;
            });
          },

          // Nettoyage et reset
          clearChatData: (chatId) => {
            set(state => {
              delete state.messages[chatId];
              delete state.messageReactions[chatId];
              delete state.messageReplies[chatId];
              delete state.unreadCounts[chatId];
              delete state.typingIndicators[chatId];
            });
          },

          resetStore: () => {
            set(state => {
              state.chats = [];
              state.activeChat = null;
              state.messages = {};
              state.messageCache = {};
              state.messageReactions = {};
              state.messageReplies = {};
              state.users = [];
              state.contacts = [];
              state.onlineUsers = new Set();
              state.userStatuses = {};
              state.notifications = [];
              state.unreadCounts = {};
              state.typingIndicators = {};
              state.performance.lastSync = null;
              state.performance.lastError = null;
            });
          }

        })),
        {
          name: 'chat-store',
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({
            ui: state.ui,
            chatSettings: state.chatSettings,
            performance: state.performance
          })
        }
      )
    ),
    {
      name: 'chat-store'
    }
  )
);

// Sélecteurs optimisés
export const useChatSelector = (selector) => useChatStore(selector);

// Hooks spécialisés
export const useActiveChat = () => useChatStore(state => ({
  chat: state.chats.find(c => c.id === state.activeChat),
  messages: state.messages[state.activeChat] || [],
  participants: state.chatParticipants[state.activeChat] || [],
  unreadCount: state.unreadCounts[state.activeChat] || 0,
  isTyping: Array.from(state.typingIndicators[state.activeChat] || [])
}));

export const useChatMessages = (chatId) => useChatStore(state => ({
  messages: state.messages[chatId] || [],
  reactions: state.messageReactions,
  replies: state.messageReplies,
  unreadCount: state.unreadCounts[chatId] || 0
}));

export const useChatUI = () => useChatStore(state => ({
  sidebarOpen: state.ui.sidebarOpen,
  mobileMenuOpen: state.ui.mobileMenuOpen,
  theme: state.ui.theme,
  compactMode: state.ui.compactMode,
  showTimestamps: state.ui.showTimestamps,
  showReadReceipts: state.ui.showReadReceipts,
  enableAnimations: state.ui.enableAnimations,
  enableSounds: state.ui.enableSounds
}));

export default useChatStore;
