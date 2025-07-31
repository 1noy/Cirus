import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';
import { db } from '../utils/firebase';
import { collection, getDocs, doc, setDoc, onSnapshot, query, where, deleteDoc, addDoc, orderBy, limit, updateDoc, writeBatch } from 'firebase/firestore';

// Store principal de l'application
export const useAppStore = create(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // État de l'utilisateur
        user: null,
        isAuthenticated: false,

        // État des utilisateurs et contacts
        users: [],
        contacts: [],
        searchResults: [],

        // État de l'interface
        theme: 'dark',
        sidebarOpen: false,
        mobileMenuOpen: false,

        // État des chats
        chats: [],
        activeChat: null,
        unreadCount: 0,

        // État des messages
        messages: {},
        messageCache: {},

        // État des notifications
        notifications: [],
        notificationSettings: {
          sound: true,
          vibration: true,
          desktop: true,
        },

        // État de la performance
        performance: {
          lastRender: 0,
          memoryUsage: 0,
          networkStatus: 'online',
        },

        // État des erreurs
        errors: [],

        // État des informations de l'appareil
        deviceInfo: {
          type: 'desktop',
          orientation: 'portrait',
          breakpoint: 'lg',
          dimensions: { width: 0, height: 0 },
          isTouch: false,
          isRetina: false,
          isLowBandwidth: false,
        },

        // Actions utilisateur
        setUser: user => {
          set(state => {
            state.user = user;
            state.isAuthenticated = !!user;
          });
          
          // Recharger les contacts si l'utilisateur se connecte
          if (user) {
            get().reloadContacts();
          }
        },

        // Actions pour les utilisateurs et contacts
        setUsers: users => {
          set(state => {
            state.users = users;
          });
        },

        // Initialiser avec des utilisateurs de test
        initializeTestUsers: async () => {
          try {
            // Charger les utilisateurs depuis Firebase
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const firebaseUsers = [];
            
            snapshot.forEach((doc) => {
              firebaseUsers.push({
                uid: doc.id,
                ...doc.data()
              });
            });
            
            set(state => {
              state.users = firebaseUsers;
            });
            
            // Écouter les changements en temps réel pour les utilisateurs
            onSnapshot(usersRef, (snapshot) => {
              const updatedUsers = [];
              snapshot.forEach((doc) => {
                updatedUsers.push({
                  uid: doc.id,
                  ...doc.data()
                });
              });
              set(state => {
                state.users = updatedUsers;
              });
            });
            
            // Charger les contacts depuis Firebase (filtrés par utilisateur connecté)
            const currentUser = get().user;
            if (currentUser) {
              // Utiliser la nouvelle fonction reloadContacts qui charge aussi les contacts de chat
              await get().reloadContacts();
              
              // Écouter les changements en temps réel pour les contacts de l'utilisateur connecté
              const contactsRef = collection(db, 'contacts');
              const contactsQuery = query(contactsRef, where('addedBy', '==', currentUser.uid));
              onSnapshot(contactsQuery, async (snapshot) => {
                // Recharger les contacts quand il y a des changements
                await get().reloadContacts();
              });
            }
            
            // Charger les chats depuis Firebase
            const chatsRef = collection(db, 'chats');
            const chatsSnapshot = await getDocs(chatsRef);
            const firebaseChats = [];
            
            chatsSnapshot.forEach((doc) => {
              firebaseChats.push({
                id: doc.id,
                ...doc.data()
              });
            });
            
            set(state => {
              state.chats = firebaseChats;
            });
            
            // Écouter les changements en temps réel pour les chats
            onSnapshot(chatsRef, async (snapshot) => {
              const updatedChats = [];
              snapshot.forEach((doc) => {
                updatedChats.push({
                  id: doc.id,
                  ...doc.data()
                });
              });
              set(state => {
                state.chats = updatedChats;
              });
              
              // Recharger les contacts quand les chats changent
              const currentUser = get().user;
              if (currentUser) {
                await get().reloadContacts();
              }
            });
            
          } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
            // Fallback vers les utilisateurs de test si Firebase échoue
            set(state => {
              state.users = [
                {
                  uid: 'user1',
                  displayName: 'Alice Cyber',
                  email: 'alice@cyberpunk.com',
                  photoURL: null
                },
                {
                  uid: 'user2',
                  displayName: 'Bob Neon',
                  email: 'bob@cyberpunk.com',
                  photoURL: null
                },
                {
                  uid: 'user3',
                  displayName: 'Charlie Matrix',
                  email: 'charlie@cyberpunk.com',
                  photoURL: null
                },
                {
                  uid: 'user4',
                  displayName: 'Diana Glitch',
                  email: 'diana@cyberpunk.com',
                  photoURL: null
                }
              ];
            });
          }
        },

        addUser: async (user) => {
          try {
            // Vérification pour empêcher l'auto-ajout
            const currentUser = get().user;
            if (user.uid === currentUser?.uid) {
              console.warn('Tentative d\'auto-ajout d\'utilisateur bloquée');
              return;
            }
            
            // Ajouter l'utilisateur à Firebase avec priorité au pseudo
            await setDoc(doc(db, 'users', user.uid), {
              displayName: user.displayName || 'Utilisateur',
              email: user.email,
              photoURL: user.photoURL,
              createdAt: Date.now()
            });
            
            // L'utilisateur sera automatiquement ajouté au store via onSnapshot
          } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            // Fallback vers le store local
            set(state => {
              const existingUser = state.users.find(u => u.uid === user.uid);
              if (!existingUser) {
                state.users.push({
                  ...user,
                  displayName: user.displayName || 'Utilisateur'
                });
              }
            });
          }
        },

        setContacts: contacts => {
          set(state => {
            state.contacts = contacts;
          });
        },

        addContact: async (contact) => {
          try {
            // Vérification pour empêcher l'auto-ajout
            const currentUser = get().user;
            if (contact.uid === currentUser?.uid) {
              console.warn('Tentative d\'auto-ajout bloquée au niveau du store');
              if (window.showError) {
                window.showError('Vous ne pouvez pas vous ajouter vous-même');
              }
              return;
            }
            
            // Ajouter le contact à Firebase
            await setDoc(doc(db, 'contacts', `${contact.uid}_${Date.now()}`), {
              uid: contact.uid,
              displayName: contact.displayName || 'Utilisateur',
              email: contact.email,
              photoURL: contact.photoURL,
              addedAt: contact.addedAt || Date.now(),
              addedBy: currentUser?.uid,
              autoAdded: contact.autoAdded || false
            });
            
            // Le contact sera automatiquement ajouté au store via onSnapshot
            
            // Notification de succès
            if (window.showContactAdded) {
              window.showContactAdded(contact.displayName);
            }
          } catch (error) {
            console.error('Erreur lors de l\'ajout du contact:', error);
            if (window.showError) {
              window.showError('Erreur lors de l\'ajout du contact');
            }
            // Fallback vers le store local
            set(state => {
              const existingContact = state.contacts.find(c => c.uid === contact.uid);
              if (!existingContact) {
                state.contacts.push({
                  ...contact,
                  autoAdded: contact.autoAdded || false
                });
              }
            });
          }
        },

        removeContact: async (contactId) => {
          try {
            // Supprimer le contact de Firebase
            const contactsRef = collection(db, 'contacts');
            const q = query(contactsRef, where('uid', '==', contactId));
            const snapshot = await getDocs(q);
            snapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
            });
            
            // Le contact sera automatiquement supprimé du store via onSnapshot
          } catch (error) {
            console.error('Erreur lors de la suppression du contact:', error);
            // Fallback vers le store local
            set(state => {
              state.contacts = state.contacts.filter(c => c.uid !== contactId);
            });
          }
        },

        setSearchResults: results => {
          set(state => {
            state.searchResults = results;
          });
        },

        clearSearchResults: () => {
          set(state => {
            state.searchResults = [];
          });
        },

        // Actions pour les chats
        createChat: async (participants) => {
          try {
            // Créer le chat dans Firebase
            const chatRef = await addDoc(collection(db, 'chats'), {
              participants,
              createdAt: Date.now(),
              lastMessage: null,
              unreadCount: 0,
            });
            
            const chatId = chatRef.id;
            
            // Le chat sera automatiquement ajouté au store via onSnapshot
            return chatId;
          } catch (error) {
            console.error('Erreur lors de la création du chat:', error);
            // Fallback vers le store local
            const chatId = `chat_${Date.now()}`;
            set(state => {
              const newChat = {
                id: chatId,
                participants,
                createdAt: Date.now(),
                lastMessage: null,
                unreadCount: 0,
              };
              state.chats.unshift(newChat);
            });
            return chatId;
          }
        },

        setTheme: theme => {
          set(state => {
            state.theme = theme;
            document.documentElement.setAttribute('data-theme', theme);
          });
        },

        toggleSidebar: () => {
          set(state => {
            state.sidebarOpen = !state.sidebarOpen;
          });
        },

        toggleMobileMenu: () => {
          set(state => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
          });
        },

        setChats: chats => {
          set(state => {
            state.chats = chats;
          });
        },

        addChat: chat => {
          set(state => {
            state.chats.unshift(chat);
          });
        },

        updateChat: (chatId, updates) => {
          set(state => {
            const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
            if (chatIndex !== -1) {
              state.chats[chatIndex] = { ...state.chats[chatIndex], ...updates };
            }
          });
        },

        removeChat: chatId => {
          set(state => {
            state.chats = state.chats.filter(chat => chat.id !== chatId);
          });
        },

        setActiveChat: chatId => {
          set(state => {
            state.activeChat = chatId;
          });
        },

        setUnreadCount: count => {
          set(state => {
            state.unreadCount = count;
          });
        },

        addMessage: async (chatId, message) => {
          try {
            // Ajouter le message à Firebase avec plus de métadonnées
            const messageData = {
              content: message.content,
              senderId: message.senderId,
              timestamp: message.timestamp,
              type: message.type || 'text',
              status: 'sent', // sent, delivered, read
              edited: false,
              replyTo: message.replyTo || null,
              attachments: message.attachments || [],
              reactions: message.reactions || []
            };
            
            await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
            
            // Le message sera automatiquement ajouté au store via onSnapshot
            
            // Notification de message envoyé
            if (window.showMessageSent) {
              window.showMessageSent();
            }
            
            // Déclencher l'ajout automatique aux contacts pour les autres participants
            const currentUser = get().user;
            const chat = get().chats.find(c => c.id === chatId);
            if (chat && currentUser) {
              const otherParticipants = chat.participants.filter(p => p !== currentUser.uid);
              otherParticipants.forEach(async (participantId) => {
                await get().autoAddToContacts(participantId, chatId);
              });
            }
          } catch (error) {
            console.error('Erreur lors de l\'ajout du message:', error);
            // Fallback vers le store local
            set(state => {
              if (!state.messages[chatId]) {
                state.messages[chatId] = [];
              }
              state.messages[chatId].push({
                ...message,
                status: 'sent',
                edited: false,
                replyTo: message.replyTo || null,
                attachments: message.attachments || [],
                reactions: message.reactions || []
              });
              
              // Mettre à jour le dernier message du chat
              const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
              if (chatIndex !== -1) {
                state.chats[chatIndex].lastMessage = message;
                state.chats[chatIndex].lastMessageTime = message.timestamp;
                state.chats[chatIndex].unreadCount = (state.chats[chatIndex].unreadCount || 0) + 1;
              }
            });
          }
        },

        // Recharger les contacts de l'utilisateur connecté
        reloadContacts: async () => {
          try {
            const currentUser = get().user;
            if (!currentUser) return;

            // Charger les contacts explicites
            const contactsRef = collection(db, 'contacts');
            const contactsQuery = query(contactsRef, where('addedBy', '==', currentUser.uid));
            const contactsSnapshot = await getDocs(contactsQuery);
            const explicitContacts = [];
            
                          contactsSnapshot.forEach((doc) => {
                explicitContacts.push({
                  uid: doc.data().uid,
                  displayName: doc.data().displayName || 'Utilisateur',
                  email: doc.data().email,
                  photoURL: doc.data().photoURL,
                  addedAt: doc.data().addedAt,
                  autoAdded: doc.data().autoAdded || false,
                  source: 'explicit'
                });
              });

            // Charger les contacts basés sur les chats existants
            const chatsRef = collection(db, 'chats');
            const chatsQuery = query(chatsRef, where('participants', 'array-contains', currentUser.uid));
            const chatsSnapshot = await getDocs(chatsQuery);
            const chatContacts = [];

            // Récupérer tous les utilisateurs en une seule fois
            const allUsersRef = collection(db, 'users');
            const allUsersSnapshot = await getDocs(allUsersRef);
            const usersMap = new Map();
            allUsersSnapshot.forEach((doc) => {
              usersMap.set(doc.id, { uid: doc.id, ...doc.data() });
            });

            chatsSnapshot.forEach((doc) => {
              const chat = doc.data();
              const otherParticipant = chat.participants.find(p => p !== currentUser.uid);
              
              if (otherParticipant && usersMap.has(otherParticipant)) {
                const userData = usersMap.get(otherParticipant);
                chatContacts.push({
                  uid: otherParticipant,
                  displayName: userData.displayName || 'Utilisateur',
                  email: userData.email,
                  photoURL: userData.photoURL,
                  addedAt: chat.createdAt || Date.now(),
                  autoAdded: false,
                  source: 'chat',
                  chatId: doc.id
                });
              }
            });

            // Combiner les contacts explicites et les contacts de chat
            const allContacts = [...explicitContacts, ...chatContacts];
            
            // Supprimer les doublons (priorité aux contacts explicites)
            const uniqueContacts = allContacts.reduce((acc, contact) => {
              const existing = acc.find(c => c.uid === contact.uid);
              if (!existing || contact.source === 'explicit') {
                if (existing) {
                  acc = acc.filter(c => c.uid !== contact.uid);
                }
                acc.push(contact);
              }
              return acc;
            }, []);
            
            set(state => {
              state.contacts = uniqueContacts;
            });
          } catch (error) {
            console.error('Erreur lors du rechargement des contacts:', error);
          }
        },

        // Nouvelle fonction : Ajouter automatiquement aux contacts quand quelqu'un répond
        autoAddToContacts: async (senderId, chatId) => {
          try {
            const currentUser = get().user;
            if (!currentUser || senderId === currentUser.uid) {
              return; // Ne pas s'ajouter soi-même
            }

            // Vérifier si l'utilisateur est déjà dans les contacts
            const existingContact = get().contacts.find(c => c.uid === senderId);
            if (existingContact) {
              return; // Déjà dans les contacts
            }

            // Récupérer les informations de l'utilisateur qui a envoyé le message
            const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', senderId)));
            if (!userDoc.empty) {
              const userData = userDoc.docs[0].data();
              
              // Ajouter automatiquement aux contacts
              await setDoc(doc(db, 'contacts', `${senderId}_${Date.now()}`), {
                uid: senderId,
                displayName: userData.displayName || 'Utilisateur',
                email: userData.email,
                photoURL: userData.photoURL,
                addedAt: Date.now(),
                addedBy: currentUser.uid,
                autoAdded: true // Marquer comme ajouté automatiquement
              });
              
              console.log(`Utilisateur ${userData.displayName} ajouté automatiquement aux contacts`);
              
              // Déclencher une notification (sera gérée par le composant)
              if (window.showContactAutoAdded) {
                window.showContactAutoAdded(userData.displayName);
              }
            }
          } catch (error) {
            console.error('Erreur lors de l\'ajout automatique aux contacts:', error);
            if (window.showError) {
              window.showError('Erreur lors de l\'ajout automatique aux contacts');
            }
          }
        },

        // Améliorer la fonction de chargement des messages pour gérer l'ajout automatique
        loadChatMessages: async (chatId) => {
          try {
            const messagesRef = collection(db, 'chats', chatId, 'messages');
            const q = query(messagesRef, orderBy('timestamp', 'asc'));
            const snapshot = await getDocs(q);
            const firebaseMessages = [];
            
            snapshot.forEach((doc) => {
              firebaseMessages.push({
                id: doc.id,
                ...doc.data()
              });
            });
            
            set(state => {
              state.messages[chatId] = firebaseMessages;
            });
            
            // Écouter les nouveaux messages en temps réel avec gestion de l'ajout automatique
            onSnapshot(q, (snapshot) => {
              const updatedMessages = [];
              snapshot.forEach((doc) => {
                updatedMessages.push({
                  id: doc.id,
                  ...doc.data()
                });
              });
              
              set(state => {
                state.messages[chatId] = updatedMessages;
              });
              
              // Vérifier s'il y a de nouveaux messages d'autres utilisateurs
              const currentUser = get().user;
              if (currentUser && updatedMessages.length > 0) {
                // Trouver les messages les plus récents d'autres utilisateurs
                const latestMessage = updatedMessages[updatedMessages.length - 1];
                if (latestMessage.senderId !== currentUser.uid) {
                  // Ajouter automatiquement aux contacts si c'est un nouveau message
                  get().autoAddToContacts(latestMessage.senderId, chatId).catch(error => {
                    console.error('Erreur lors de l\'ajout automatique aux contacts:', error);
                  });
                }
              }
            });
            
          } catch (error) {
            console.error('Erreur lors du chargement des messages:', error);
          }
        },

        // Marquer les messages comme lus
        markMessagesAsRead: async (chatId) => {
          try {
            const messagesRef = collection(db, 'chats', chatId, 'messages');
            const q = query(messagesRef, where('status', '==', 'delivered'));
            const snapshot = await getDocs(q);
            
            const batch = writeBatch(db);
            snapshot.forEach((doc) => {
              batch.update(doc.ref, { status: 'read' });
            });
            await batch.commit();
            
            // Mettre à jour le store local
            set(state => {
              if (state.messages[chatId]) {
                state.messages[chatId].forEach(msg => {
                  if (msg.status === 'delivered') {
                    msg.status = 'read';
                  }
                });
              }
              
              // Réinitialiser le compteur de messages non lus
              const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
              if (chatIndex !== -1) {
                state.chats[chatIndex].unreadCount = 0;
              }
            });
          } catch (error) {
            console.error('Erreur lors du marquage des messages:', error);
          }
        },

        // Modifier un message
        editMessage: async (chatId, messageId, newContent) => {
          try {
            const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
            await updateDoc(messageRef, {
              content: newContent,
              edited: true,
              editedAt: Date.now()
            });
          } catch (error) {
            console.error('Erreur lors de la modification du message:', error);
            // Fallback vers le store local
            set(state => {
              if (state.messages[chatId]) {
                const messageIndex = state.messages[chatId].findIndex(msg => msg.id === messageId);
                if (messageIndex !== -1) {
                  state.messages[chatId][messageIndex].content = newContent;
                  state.messages[chatId][messageIndex].edited = true;
                  state.messages[chatId][messageIndex].editedAt = Date.now();
                }
              }
            });
          }
        },

        // Supprimer un message
        deleteMessage: async (chatId, messageId) => {
          try {
            await deleteDoc(doc(db, 'chats', chatId, 'messages', messageId));
          } catch (error) {
            console.error('Erreur lors de la suppression du message:', error);
            // Fallback vers le store local
            set(state => {
              if (state.messages[chatId]) {
                state.messages[chatId] = state.messages[chatId].filter(msg => msg.id !== messageId);
              }
            });
          }
        },

        // Ajouter une réaction à un message
        addReaction: async (chatId, messageId, reaction) => {
          try {
            const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
            await updateDoc(messageRef, {
              [`reactions.${reaction.userId}`]: reaction.emoji
            });
          } catch (error) {
            console.error('Erreur lors de l\'ajout de la réaction:', error);
            // Fallback vers le store local
            set(state => {
              if (state.messages[chatId]) {
                const messageIndex = state.messages[chatId].findIndex(msg => msg.id === messageId);
                if (messageIndex !== -1) {
                  if (!state.messages[chatId][messageIndex].reactions) {
                    state.messages[chatId][messageIndex].reactions = {};
                  }
                  state.messages[chatId][messageIndex].reactions[reaction.userId] = reaction.emoji;
                }
              }
            });
          }
        },

        // Charger les messages d'un chat depuis Firebase
        updateMessage: (chatId, messageId, updates) => {
          set(state => {
            if (state.messages[chatId]) {
              const messageIndex = state.messages[chatId].findIndex(
                msg => msg.id === messageId
              );
              if (messageIndex !== -1) {
                state.messages[chatId][messageIndex] = {
                  ...state.messages[chatId][messageIndex],
                  ...updates,
                };
              }
            }
          });
        },

        removeMessage: (chatId, messageId) => {
          set(state => {
            if (state.messages[chatId]) {
              state.messages[chatId] = state.messages[chatId].filter(
                msg => msg.id !== messageId
              );
            }
          });
        },

        setMessages: (chatId, messages) => {
          set(state => {
            state.messages[chatId] = messages;
          });
        },

        addNotification: notification => {
          set(state => {
            state.notifications.unshift({
              id: Date.now(),
              timestamp: Date.now(),
              ...notification,
            });
            if (state.notifications.length > 50) {
              state.notifications = state.notifications.slice(0, 50);
            }
          });
        },

        removeNotification: notificationId => {
          set(state => {
            state.notifications = state.notifications.filter(
              notif => notif.id !== notificationId
            );
          });
        },

        clearNotifications: () => {
          set(state => {
            state.notifications = [];
          });
        },

        updateNotificationSettings: settings => {
          set(state => {
            state.notificationSettings = {
              ...state.notificationSettings,
              ...settings,
            };
          });
        },

        setPerformance: performance => {
          set(state => {
            state.performance = { ...state.performance, ...performance };
          });
        },

        setDeviceInfo: deviceInfo => {
          set(state => {
            state.deviceInfo = { ...state.deviceInfo, ...deviceInfo };
          });
        },

        addError: error => {
          set(state => {
            state.errors.unshift({
              id: Date.now(),
              message: error.message,
              stack: error.stack,
              timestamp: Date.now(),
            });
            if (state.errors.length > 10) {
              state.errors = state.errors.slice(0, 10);
            }
          });
        },

        clearErrors: () => {
          set(state => {
            state.errors = [];
          });
        },

        // Actions de nettoyage
        clearChatData: () => {
          set(state => {
            state.chats = [];
            state.messages = {};
            state.activeChat = null;
            state.unreadCount = 0;
          });
        },

        logout: () => {
          set(state => {
            state.user = null;
            state.isAuthenticated = false;
            state.chats = [];
            state.messages = {};
            state.activeChat = null;
            state.unreadCount = 0;
            state.notifications = [];
            state.errors = [];
          });
        },

        // Initialisation de l'application
        initializeApp: async () => {
          try {
            // Charger les préférences utilisateur
            const savedTheme = localStorage.getItem('theme') || 'dark';
            set(state => {
              state.theme = savedTheme;
            });

            // Vérifier l'authentification
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
              try {
                const user = JSON.parse(savedUser);
                set(state => {
                  state.user = user;
                  state.isAuthenticated = !!user;
                });
              } catch (error) {
                console.warn("Erreur lors du chargement de l'utilisateur:", error);
                localStorage.removeItem('user');
              }
            }

            return true;
          } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
            return false;
          }
        },
      })),
      {
        name: 'cirus-chat-store',
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({
          theme: state.theme,
          notificationSettings: state.notificationSettings,
        }),
      }
    )
  )
);

// Store pour les optimisations de performance
export const usePerformanceStore = create(
  subscribeWithSelector(
    immer((set, get) => ({
      // Métriques de performance
      metrics: {
        fps: 0,
        memory: 0,
        domNodes: 0,
        loadTime: 0,
        renderTime: 0,
      },

      // Actions
      setMetrics: metrics => {
        set(state => {
          state.metrics = { ...state.metrics, ...metrics };
        });
      },

      updateFPS: fps => {
        set(state => {
          state.metrics.fps = fps;
        });
      },

      updateMemory: memory => {
        set(state => {
          state.metrics.memory = memory;
        });
      },

      updateDOMNodes: nodes => {
        set(state => {
          state.metrics.domNodes = nodes;
        });
      },

      updateLoadTime: time => {
        set(state => {
          state.metrics.loadTime = time;
        });
      },

      updateRenderTime: time => {
        set(state => {
          state.metrics.renderTime = time;
        });
      },

      resetMetrics: () => {
        set(state => {
          state.metrics = {
            fps: 0,
            memory: 0,
            domNodes: 0,
            loadTime: 0,
            renderTime: 0,
          };
        });
      },
    }))
  )
);

// Store pour la sécurité
export const useSecurityStore = create(
  subscribeWithSelector(
    immer((set, get) => ({
      // État de sécurité
      securityStatus: {
        blocked: false,
        reason: null,
        attempts: 0,
        lastAttempt: 0,
      },

      // Actions
      setSecurityStatus: status => {
        set(state => {
          state.securityStatus = { ...state.securityStatus, ...status };
        });
      },

      incrementAttempts: () => {
        set(state => {
          state.securityStatus.attempts += 1;
          state.securityStatus.lastAttempt = Date.now();
        });
      },

      resetAttempts: () => {
        set(state => {
          state.securityStatus.attempts = 0;
          state.securityStatus.lastAttempt = 0;
        });
      },

      blockUser: reason => {
        set(state => {
          state.securityStatus.blocked = true;
          state.securityStatus.reason = reason;
        });
      },

      unblockUser: () => {
        set(state => {
          state.securityStatus.blocked = false;
          state.securityStatus.reason = null;
        });
      },
    }))
  )
);

// Sélecteurs pour optimiser les re-renders
export const useUserSelector = () => {
  return useAppStore(state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));
};

export const useThemeSelector = () => {
  return useAppStore(state => ({
    theme: state.theme,
  }));
};
