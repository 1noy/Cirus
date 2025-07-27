import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import { useToast } from './ToastContext';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    avatar: '',
    bio: '',
    phone: '',
    location: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [mounted, setMounted] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchProfile = useCallback(async () => {
    if (!mounted) return;
    
    try {
      const snap = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (snap.exists()) {
        const data = snap.data();
        if (mounted) {
          setProfile({
            displayName: data.displayName || '',
            email: auth.currentUser.email || '',
            avatar: data.avatar || '',
            bio: data.bio || '',
            phone: data.phone || '',
            location: data.location || '',
            website: data.website || ''
          });
        }
      } else {
        // Créer le profil si il n'existe pas
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          displayName: auth.currentUser.displayName || '',
          email: auth.currentUser.email,
          avatar: '',
          bio: '',
          phone: '',
          location: '',
          website: '',
          createdAt: new Date().toISOString(),
          online: true
        });
        if (mounted) {
          setProfile({
            displayName: auth.currentUser.displayName || '',
            email: auth.currentUser.email || '',
            avatar: '',
            bio: '',
            phone: '',
            location: '',
            website: ''
          });
        }
      }
    } catch {
      if (mounted) {
        showToast({ message: 'Erreur lors du chargement du profil', severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }, [showToast, mounted]);

  useEffect(() => {
    setMounted(true);
    
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    fetchProfile();

    return () => {
      setMounted(false);
    };
  }, [navigate, fetchProfile]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      showToast({ message: 'Session expirée, reconnexion requise.', severity: 'error' });
      navigate('/login');
      return;
    }

    if (!profile.displayName.trim()) {
      showToast({ message: 'Le nom ne peut pas être vide', severity: 'error' });
      return;
    }

    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: profile.displayName.trim(),
        avatar: profile.avatar,
        bio: profile.bio.trim(),
        phone: profile.phone.trim(),
        location: profile.location.trim(),
        website: profile.website.trim(),
        updatedAt: new Date().toISOString()
      });
      showToast({ message: 'Profil mis à jour avec succès !', severity: 'success' });
    } catch {
      showToast({ message: 'Erreur lors de la mise à jour du profil', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      showToast({ message: 'Déconnexion réussie', severity: 'success' });
    } catch {
      showToast({ message: 'Erreur lors de la déconnexion', severity: 'error' });
    }
  };

  const avatarOptions = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe'
  ];

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
        color: '#3ef2ff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
      color: '#fff',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '20px',
        background: 'rgba(28, 198, 255, 0.1)',
        borderRadius: '16px',
        border: '1px solid rgba(62, 242, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '28px', 
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #3ef2ff 0%, #1cc6ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Mon Profil
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/chat')}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(62, 242, 255, 0.3)',
              borderRadius: '8px',
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
            Retour au Chat
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(90deg, #ff4757 0%, #ff3742 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
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
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '32px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section Avatar */}
        <div style={{
          background: 'rgba(28, 198, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(62, 242, 255, 0.2)',
          height: 'fit-content'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#3ef2ff'
          }}>
            Avatar
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: profile.avatar || 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(28, 198, 255, 0.3)',
              border: '3px solid rgba(62, 242, 255, 0.3)',
              overflow: 'hidden'
            }}>
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt="Avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                profile.displayName.charAt(0).toUpperCase()
              )}
            </div>
            
            <button
              onClick={() => setShowAvatarModal(true)}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
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
              Changer l&apos;avatar
            </button>
          </div>
        </div>

        {/* Section Informations */}
        <div style={{
          background: 'rgba(28, 198, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(62, 242, 255, 0.2)'
        }}>
          <h3 style={{ 
            margin: '0 0 24px 0', 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#3ef2ff'
          }}>
            Informations Personnelles
          </h3>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#a0f0ff' }}>
                  Nom d&apos;affichage *
                </label>
        <input
          type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                  placeholder="Votre nom"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(62, 242, 255, 0.3)',
                    borderRadius: '8px',
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
          maxLength={32}
          required
        />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#a0f0ff' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(62, 242, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#a0f0ff',
                    fontSize: '14px',
                    opacity: 0.7
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#a0f0ff' }}>
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="Parle de toi..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(62, 242, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(62, 242, 255, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(62, 242, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(62, 242, 255, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
                maxLength={200}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#a0f0ff' }}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="Votre numéro"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(62, 242, 255, 0.3)',
                    borderRadius: '8px',
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
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#a0f0ff' }}>
                  Localisation
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="Votre ville"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(62, 242, 255, 0.3)',
                    borderRadius: '8px',
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
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#a0f0ff' }}>
                Site web
              </label>
        <input
          type="url"
                value={profile.website}
                onChange={(e) => setProfile({...profile, website: e.target.value})}
                placeholder="https://votre-site.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(62, 242, 255, 0.3)',
                  borderRadius: '8px',
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
            </div>

            {/* Boutons d'action */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '16px'
            }}>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                aria-label="Sauvegarder le profil"
                role="button"
                tabIndex={0}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: saving ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !saving) {
                    e.preventDefault();
                    handleSave();
                  }
                }}
              >
                {saving ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid #fff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Sauvegarde...
                  </span>
                ) : (
                  'Sauvegarder'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/chat')}
                aria-label="Retourner au chat"
                role="button"
                tabIndex={0}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/chat');
                  }
                }}
              >
                Retour au chat
              </button>
            </div>
      </form>
        </div>
      </div>

      {/* Modal de sélection d'avatar */}
      {showAvatarModal && (
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
            width: '500px',
            border: '1px solid rgba(62, 242, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{ 
              margin: '0 0 20px 0', 
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#3ef2ff'
            }}>
              Choisir un avatar
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              {avatarOptions.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: selectedAvatar === avatar ? '3px solid #3ef2ff' : '2px solid rgba(62, 242, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <img 
                    src={avatar} 
                    alt={`Avatar ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  if (selectedAvatar) {
                    setProfile({...profile, avatar: selectedAvatar});
                    setShowAvatarModal(false);
                    setSelectedAvatar('');
                  }
                }}
                disabled={!selectedAvatar}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: selectedAvatar ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  opacity: selectedAvatar ? 1 : 0.6,
                  transition: 'all 0.3s ease'
                }}
              >
                Confirmer
              </button>
              <button
                onClick={() => {
                  setShowAvatarModal(false);
                  setSelectedAvatar('');
                }}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(62, 242, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 