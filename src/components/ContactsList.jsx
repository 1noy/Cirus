import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { useToast } from './ToastContext';
import UserSearch from './UserSearch';

export default function ContactsList({ onSelectContact, selectedContact }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [newContactEmail, setNewContactEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const { showToast } = useToast();

  const loadContacts = useCallback(async () => {
    if (!auth.currentUser || !mounted) return;
    
    setLoading(true);
    try {
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      
      // Utiliser onSnapshot pour les mises à jour en temps réel
      const unsubscribe = onSnapshot(contactsRef, async (snapshot) => {
        const contactsData = [];
        
        for (const doc of snapshot.docs) {
          const contactData = doc.data();
          // Récupérer les informations du contact
          const userRef = collection(db, 'users');
          const userQuery = query(userRef, where('email', '==', contactData.email));
          const userSnapshot = await getDocs(userQuery);
          
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            contactsData.push({
              id: doc.id,
              email: contactData.email,
              displayName: userData.displayName || contactData.email,
              avatar: userData.avatar || null,
              online: userData.online || false,
              lastSeen: userData.lastSeen || null
            });
          }
        }
        
        if (mounted) {
          setContacts(contactsData);
        }
      }, () => {
        if (mounted) {
          showToast({ message: 'Erreur lors du chargement des contacts', severity: 'error' });
        }
      });
      
      // Nettoyer le listener lors du démontage
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } catch {
      if (mounted) {
        showToast({ message: 'Erreur lors du chargement des contacts', severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }, [showToast, mounted]);

  useEffect(() => {
    setMounted(true);
    loadContacts();
    
    return () => {
      setMounted(false);
    };
  }, [loadContacts]);

  const addContact = async (e) => {
    e.preventDefault();
    if (!newContactEmail.trim() || !mounted) return;

    setLoading(true);
    try {
      // Vérifier si l'utilisateur existe
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('email', '==', newContactEmail));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        if (mounted) {
          showToast({ message: 'Utilisateur non trouvé', severity: 'error' });
        }
        return;
      }

      // Vérifier si le contact existe déjà dans Firestore
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const contactQuery = query(contactsRef, where('email', '==', newContactEmail));
      const contactSnapshot = await getDocs(contactQuery);

      if (!contactSnapshot.empty) {
        if (mounted) {
          showToast({ message: 'Ce contact existe déjà dans votre liste', severity: 'warning' });
        }
        return;
      }

      // Ajouter le contact mutuellement

      // Ajouter le contact dans la liste de l'utilisateur actuel
      await addDoc(contactsRef, {
        email: newContactEmail,
        addedAt: new Date().toISOString()
      });

      // Ajouter l'utilisateur actuel dans la liste du contact
      const otherUserContactsRef = collection(db, 'users', userSnapshot.docs[0].id, 'contacts');
      await addDoc(otherUserContactsRef, {
        email: auth.currentUser.email,
        addedAt: new Date().toISOString()
      });

      if (mounted) {
        showToast({ message: 'Contact ajouté avec succès', severity: 'success' });
        setNewContactEmail('');
        setShowAddContact(false);
        
        // Recharger les contacts et sélectionner le nouveau contact
        await loadContacts();
        
        // Sélectionner automatiquement le nouveau contact
        const newContact = {
          email: newContactEmail,
          displayName: userSnapshot.docs[0].data().displayName || newContactEmail,
          avatar: userSnapshot.docs[0].data().avatar || null,
          online: userSnapshot.docs[0].data().online || false,
          lastSeen: userSnapshot.docs[0].data().lastSeen || null
        };
        
        onSelectContact(newContact);
      }
    } catch {
      if (mounted) {
        showToast({ message: 'Erreur lors de l\'ajout du contact', severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  const handleUserSelect = async (user) => {
    if (!mounted) return;
    
    setLoading(true);
    try {
      // Vérifier si le contact existe déjà dans Firestore
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const contactQuery = query(contactsRef, where('email', '==', user.email));
      const contactSnapshot = await getDocs(contactQuery);

      if (!contactSnapshot.empty) {
        if (mounted) {
          showToast({ message: 'Ce contact existe déjà dans votre liste', severity: 'warning' });
        }
        return;
      }

      // Ajouter le contact mutuellement

      // Ajouter le contact dans la liste de l'utilisateur actuel
      await addDoc(contactsRef, {
        email: user.email,
        addedAt: new Date().toISOString()
      });

      // Ajouter l'utilisateur actuel dans la liste du contact
      const otherUserContactsRef = collection(db, 'users', user.uid, 'contacts');
      await addDoc(otherUserContactsRef, {
        email: auth.currentUser.email,
        addedAt: new Date().toISOString()
      });

      if (mounted) {
        showToast({ message: 'Contact ajouté avec succès', severity: 'success' });
        setShowUserSearch(false);
        
        // Recharger les contacts et sélectionner le nouveau contact
        await loadContacts();
        
        // Sélectionner automatiquement le nouveau contact
        onSelectContact(user);
      }
    } catch {
      if (mounted) {
        showToast({ message: 'Erreur lors de l\'ajout du contact', severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  const removeContact = async (contactEmail) => {
    if (!mounted) return;
    
    setLoading(true);
    try {
      // Supprimer le contact de la liste de l'utilisateur actuel
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const contactQuery = query(contactsRef, where('email', '==', contactEmail));
      const contactSnapshot = await getDocs(contactQuery);
      
      if (!contactSnapshot.empty) {
        const contactDoc = contactSnapshot.docs[0];
        await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'contacts', contactDoc.id));
      }

      // Supprimer l'utilisateur actuel de la liste du contact
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('email', '==', contactEmail));
      const userSnapshot = await getDocs(userQuery);
      
      if (!userSnapshot.empty) {
        const otherUserContactsRef = collection(db, 'users', userSnapshot.docs[0].id, 'contacts');
        const otherContactQuery = query(otherUserContactsRef, where('email', '==', auth.currentUser.email));
        const otherContactSnapshot = await getDocs(otherContactQuery);
        
        if (!otherContactSnapshot.empty) {
          const otherContactDoc = otherContactSnapshot.docs[0];
          await deleteDoc(doc(db, 'users', userSnapshot.docs[0].id, 'contacts', otherContactDoc.id));
        }
      }

      if (mounted) {
        showToast({ message: 'Contact supprimé avec succès', severity: 'success' });
      }
    } catch {
      if (mounted) {
        showToast({ message: 'Erreur lors de la suppression du contact', severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      width: '320px',
      background: 'rgba(28, 198, 255, 0.05)',
      borderRight: '1px solid rgba(62, 242, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backdropFilter: 'blur(10px)',
      boxShadow: '2px 0 16px rgba(28, 198, 255, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(62, 242, 255, 0.2)',
        background: 'rgba(28, 198, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '20px',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #3ef2ff 0%, #1cc6ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Contacts
        </h3>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(62, 242, 255, 0.3)',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '14px',
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

        {/* Boutons d'action */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button
            onClick={() => setShowAddContact(true)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(28, 198, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(28, 198, 255, 0.3)';
            }}
          >
            + Contact
          </button>
          <button
            onClick={() => setShowUserSearch(true)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(252, 92, 125, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(252, 92, 125, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(252, 92, 125, 0.3)';
            }}
          >
            🔍 Rechercher
          </button>
        </div>
      </div>

      {/* Modal d'ajout de contact */}
      {showAddContact && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
            padding: '28px',
            borderRadius: '16px',
            width: '420px',
            border: '1px solid rgba(62, 242, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInUp 0.3s ease'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #3ef2ff 0%, #1cc6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Ajouter un contact
            </h3>
            <form onSubmit={addContact}>
              <input
                type="email"
                placeholder="Email de l'utilisateur"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(62, 242, 255, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  marginBottom: '20px',
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
                required
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    opacity: loading ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(28, 198, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(28, 198, 255, 0.3)';
                  }}
                >
                  {loading ? 'Ajout...' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(62, 242, 255, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px',
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
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de recherche d'utilisateurs */}
      {showUserSearch && (
        <UserSearch
          onUserSelect={handleUserSelect}
          onClose={() => setShowUserSearch(false)}
        />
      )}

      {/* Liste des contacts */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#a0f0ff',
            background: 'rgba(28, 198, 255, 0.05)',
            borderRadius: '12px',
            margin: '10px'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
            Chargement...
          </div>
        ) : filteredContacts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#a0f0ff',
            background: 'rgba(28, 198, 255, 0.05)',
            borderRadius: '12px',
            margin: '10px',
            border: '1px solid rgba(62, 242, 255, 0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              {searchTerm ? '🔍' : '👥'}
            </div>
            {searchTerm ? 'Aucun contact trouvé' : 'Aucun contact'}
            <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>
              {searchTerm ? 'Essayez une autre recherche' : 'Ajoutez votre premier contact'}
            </div>
          </div>
        ) : (
          filteredContacts.map((contact, index) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              style={{
                padding: '14px 16px',
                margin: '6px 0',
                background: selectedContact?.id === contact.id
                  ? 'rgba(28, 198, 255, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                cursor: 'pointer',
                border: selectedContact?.id === contact.id
                  ? '1px solid rgba(28, 198, 255, 0.5)'
                  : '1px solid transparent',
                transition: 'all 0.3s ease',
                animation: 'fadeInUp 0.3s ease',
                animationDelay: `${index * 0.05}s`,
                animationFillMode: 'both'
              }}
              onMouseEnter={(e) => {
                if (selectedContact?.id !== contact.id) {
                  e.target.style.background = 'rgba(28, 198, 255, 0.1)';
                  e.target.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedContact?.id !== contact.id) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'translateX(0)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: contact.avatar || 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(28, 198, 255, 0.3)',
                  border: contact.online ? '2px solid #4caf50' : '2px solid transparent',
                  position: 'relative'
                }}>
                  {contact.avatar ? (
                    <img 
                      src={contact.avatar} 
                      alt="Avatar" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    contact.displayName.charAt(0).toUpperCase()
                  )}
                  {contact.online && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#4caf50',
                      border: '2px solid #23234a',
                      boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)'
                    }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: contact.online ? '#4caf50' : '#fff',
                    marginBottom: '2px'
                  }}>
                    {contact.displayName}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#a0f0ff',
                    opacity: 0.8
                  }}>
                    {contact.email}
                  </div>
                </div>
                {contact.online && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#4caf50',
                    boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 