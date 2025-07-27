import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { useToast } from './ToastContext';
import UserSearch from './UserSearch';

// Composant d'image lazy loading optimisé
const LazyImage = React.memo(({ src, alt, fallback = '/favicon.svg' }) => {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    // Optimisation WebP si supporté
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    const img = new Image();
    
    // Préchargement avec placeholder
    img.style.filter = 'blur(10px)';
    img.style.transition = 'filter 0.3s ease';
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      img.style.filter = 'blur(0px)';
    };
    
    img.onerror = () => {
      setHasError(true);
      setIsLoaded(true);
    };
    
    // Optimisation de la source selon le support
    if (supportsWebP() && src.includes('.')) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      img.src = webpSrc;
    } else {
      img.src = src;
    }
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
        backgroundColor: hasError ? 'rgba(28, 198, 255, 0.2)' : 'transparent'
      }}
    />
  );
});

// Composant de contact optimisé
const ContactItem = React.memo(({ contact, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(contact)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px',
        margin: window.innerWidth <= 768 ? '0 8px' : '0 8px',
        borderRadius: window.innerWidth <= 768 ? '8px' : '12px',
        background: isSelected 
          ? 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)'
          : 'rgba(255, 255, 255, 0.05)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: isSelected 
          ? '1px solid rgba(28, 198, 255, 0.3)'
          : '1px solid transparent',
        minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateX(4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.transform = 'translateX(0)';
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(contact);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Sélectionner ${contact.displayName || contact.email}`}
    >
      <div style={{
        width: window.innerWidth <= 768 ? '36px' : '40px',
        height: window.innerWidth <= 768 ? '36px' : '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: window.innerWidth <= 768 ? '8px' : '12px',
        fontSize: window.innerWidth <= 768 ? '14px' : '16px',
        fontWeight: '600',
        color: '#fff',
        flexShrink: 0
      }}>
        {(contact.displayName || contact.email).charAt(0).toUpperCase()}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: window.innerWidth <= 768 ? '13px' : '14px',
          fontWeight: '600',
          color: isSelected ? '#fff' : '#fff',
          marginBottom: '2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {contact.displayName || contact.email.split('@')[0]}
        </div>
        <div style={{
          fontSize: window.innerWidth <= 768 ? '10px' : '11px',
          color: isSelected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {contact.email}
        </div>
      </div>
      
      {contact.online && (
        <div style={{
          width: window.innerWidth <= 768 ? '8px' : '10px',
          height: window.innerWidth <= 768 ? '8px' : '10px',
          borderRadius: '50%',
          background: '#4caf50',
          marginLeft: window.innerWidth <= 768 ? '6px' : '8px',
          flexShrink: 0
        }} />
      )}
    </div>
  );
});

export default function ContactsList({ onSelectContact, selectedContact }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Nettoyage automatique des doublons à chaque chargement
  const cleanDuplicates = useCallback(async () => {
    if (!auth.currentUser) return;
    
    try {
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const snapshot = await getDocs(contactsRef);
      const emailMap = new Map();
      const duplicatesToDelete = [];
      
      snapshot.docs.forEach((docSnap) => {
        const email = docSnap.data().email;
        if (emailMap.has(email)) {
          duplicatesToDelete.push(docSnap.id);
        } else {
          emailMap.set(email, docSnap.id);
        }
      });
      
      // Supprime les doublons en parallèle
      const deletePromises = duplicatesToDelete.map(docId => 
        deleteDoc(doc(db, 'users', auth.currentUser.uid, 'contacts', docId))
      );
      
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
        console.log(`Nettoyage terminé: ${deletePromises.length} doublons supprimés`);
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage des doublons:', error);
    }
  }, []);

  // Chargement fiable de la liste de contacts
  const loadContacts = useCallback(async () => {
    if (!auth.currentUser) return;
    
    try {
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const snapshot = await getDocs(contactsRef);
      const contactsData = [];
      const seenEmails = new Set();
      
      for (const doc of snapshot.docs) {
        const contactData = doc.data();
        if (seenEmails.has(contactData.email)) continue;
        seenEmails.add(contactData.email);
        contactsData.push({
          id: doc.id,
          email: contactData.email,
          displayName: contactData.email.split('@')[0], // Utilise la partie avant @ comme nom d'affichage
        });
      }
      
      setContacts(contactsData);
      console.log(`Contacts chargés: ${contactsData.length} contacts uniques`);
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
      showToast({ message: 'Erreur lors du chargement des contacts', severity: 'error' });
    }
  }, [showToast]);

  // Initialisation propre : nettoyage puis chargement
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      try {
        await cleanDuplicates();
        await loadContacts();
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [cleanDuplicates, loadContacts]);

  // Suppression d'un contact
  const removeContact = async (contactEmail) => {
    if (!auth.currentUser) return;
    
    setLoading(true);
    try {
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const contactQuery = query(contactsRef, where('email', '==', contactEmail));
      const contactSnapshot = await getDocs(contactQuery);
      
      if (!contactSnapshot.empty) {
        await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'contacts', contactSnapshot.docs[0].id));
        showToast({ message: 'Contact supprimé avec succès', severity: 'success' });
        await loadContacts(); // Recharge la liste
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      showToast({ message: 'Erreur lors de la suppression du contact', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Optimisation avec useMemo pour filtrer les contacts
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    
    const term = searchTerm.toLowerCase();
    return contacts.filter(contact => 
      contact.displayName.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term)
    );
  }, [contacts, searchTerm]);

  // Gestion de la navigation vers l'accueil
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const handleAddContact = useCallback(async (user) => {
    setShowUserSearch(false);
    setLoading(true);
    try {
      // Vérification ultra-sécurisée
      if (contacts.find(c => c.email === user.email)) {
        showToast({ message: 'Ce contact existe déjà dans votre liste', severity: 'warning' });
        setLoading(false);
        return;
      }
      
      const contactsRef = collection(db, 'users', auth.currentUser.uid, 'contacts');
      const contactQuery = query(contactsRef, where('email', '==', user.email));
      const contactSnapshot = await getDocs(contactQuery);
      
      if (!contactSnapshot.empty) {
        showToast({ message: 'Ce contact existe déjà dans votre liste', severity: 'warning' });
        setLoading(false);
        return;
      }
      
      await addDoc(contactsRef, {
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        addedAt: new Date().toISOString()
      });
      
      showToast({ message: 'Contact ajouté avec succès', severity: 'success' });
      await loadContacts();
    } catch (err) {
      console.error('Erreur lors de l\'ajout du contact:', err);
      showToast({ message: 'Erreur lors de l\'ajout du contact', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [contacts, loadContacts, showToast]);

  const handleOpenChat = useCallback((contact) => {
    setShowUserSearch(false);
    // Ouvrir directement la discussion avec le contact existant
    onSelectContact(contact);
    showToast({ 
      message: `Discussion ouverte avec ${contact.displayName || contact.email}`, 
      severity: 'success' 
    });
  }, [onSelectContact, showToast]);

  return (
    <div style={{
      width: window.innerWidth <= 768 ? '100%' : '300px',
      height: window.innerWidth <= 768 ? '40vh' : '100vh',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRight: window.innerWidth <= 768 ? 'none' : '1px solid rgba(62, 242, 255, 0.2)',
      borderBottom: window.innerWidth <= 768 ? '1px solid rgba(62, 242, 255, 0.2)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* En-tête des contacts */}
      <div style={{
        padding: window.innerWidth <= 768 ? '12px 16px' : '20px',
        borderBottom: '1px solid rgba(62, 242, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        minHeight: window.innerWidth <= 768 ? '60px' : 'auto'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: window.innerWidth <= 768 ? '16px' : '18px',
          fontWeight: '600',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          Contacts
          <button
            onClick={() => setShowUserSearch(true)}
            aria-label="Rechercher un utilisateur"
            role="button"
            tabIndex={0}
            style={{
              background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? '8px' : '12px',
              color: '#fff',
              padding: window.innerWidth <= 768 ? '6px 12px' : '8px 16px',
              cursor: 'pointer',
              fontSize: window.innerWidth <= 768 ? '12px' : '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              minWidth: window.innerWidth <= 768 ? '44px' : 'auto',
              minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowUserSearch(true);
              }
            }}
          >
            +
          </button>
        </h2>
      </div>
      
      {/* Liste des contacts */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: window.innerWidth <= 768 ? '8px 0' : '16px 0',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}>
        {contacts.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: window.innerWidth <= 768 ? '12px' : '14px',
            textAlign: 'center',
            padding: window.innerWidth <= 768 ? '20px' : '40px'
          }}>
            Aucun contact pour le moment
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: window.innerWidth <= 768 ? '4px' : '8px'
          }}>
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.email}
                contact={contact}
                isSelected={selectedContact?.email === contact.email}
                onSelect={onSelectContact}
                onRemove={removeContact}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de recherche d'utilisateur */}
      {showUserSearch && (
        <UserSearch
          onClose={() => setShowUserSearch(false)}
          onUserSelect={handleAddContact}
          onMessage={handleOpenChat}
          contacts={contacts}
        />
      )}
    </div>
  );
} 