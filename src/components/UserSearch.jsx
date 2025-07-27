import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import { useToast } from './ToastContext';

export default function UserSearch({ onUserSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const searchUsers = useCallback(async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 3 || !mounted) {
      if (mounted) {
        setSearchResults([]);
      }
      return;
    }

    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      
      // Recherche par email
      const emailQuery = query(
        usersRef,
        where('email', '>=', searchQuery),
        where('email', '<=', searchQuery + '\uf8ff'),
        limit(10)
      );
      
      const emailSnapshot = await getDocs(emailQuery);
      const emailResults = [];
      emailSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email !== auth.currentUser?.email) {
          emailResults.push({
            id: doc.id,
            ...userData
          });
        }
      });

      // Recherche par nom d'affichage
      const nameQuery = query(
        usersRef,
        where('displayName', '>=', searchQuery),
        where('displayName', '<=', searchQuery + '\uf8ff'),
        limit(10)
      );
      
      const nameSnapshot = await getDocs(nameQuery);
      const nameResults = [];
      nameSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email !== auth.currentUser?.email) {
          nameResults.push({
            id: doc.id,
            ...userData
          });
        }
      });

      // Combiner et dédupliquer les résultats
      const allResults = [...emailResults, ...nameResults];
      const uniqueResults = allResults.filter((user, index, self) => 
        index === self.findIndex(u => u.id === user.id)
      );

      if (mounted) {
        setSearchResults(uniqueResults);
      }
    } catch {
      if (mounted) {
        showToast({ message: 'Erreur lors de la recherche', severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }, [showToast, mounted]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 3) {
      searchUsers(value);
    } else {
      setSearchResults([]);
    }
  }, [searchUsers]);

  const handleUserSelect = useCallback((user) => {
    if (mounted) {
      onUserSelect(user);
      onClose();
    }
  }, [onUserSelect, onClose, mounted]);

  return (
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
        padding: '24px',
        borderRadius: '12px',
        width: '500px',
        maxHeight: '80vh',
        border: '1px solid rgba(62, 242, 255, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#3ef2ff'
          }}>
            Rechercher des utilisateurs
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3ef2ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fff';
            }}
          >
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Rechercher par email ou nom..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(62, 242, 255, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            marginBottom: '16px',
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

        <div style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid rgba(62, 242, 255, 0.2)',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              color: '#a0f0ff',
              fontSize: '14px'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
              Recherche en cours...
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              color: '#a0f0ff',
              fontSize: '14px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                {searchTerm.length >= 3 ? '🔍' : '💡'}
              </div>
              {searchTerm.length >= 3 ? 'Aucun utilisateur trouvé' : 'Tapez au moins 3 caractères pour rechercher'}
            </div>
          ) : (
            searchResults.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(62, 242, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(28, 198, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: user.avatar || 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#fff',
                  overflow: 'hidden'
                }}>
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    (user.displayName || user.email).charAt(0).toUpperCase()
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: user.online ? '#4caf50' : '#fff'
                  }}>
                    {user.displayName || user.email}
                    {user.online && (
                      <span style={{ 
                        marginLeft: '8px', 
                        fontSize: '10px',
                        background: '#4caf50',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '10px'
                      }}>
                        En ligne
                      </span>
                    )}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#a0f0ff',
                    marginTop: '2px'
                  }}>
                    {user.email}
                  </div>
                </div>
                <button
                  style={{
                    padding: '6px 12px',
                    background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Ajouter
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 