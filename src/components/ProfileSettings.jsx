import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { useToast } from './ToastContext';
import { auth } from '../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const ProfileSettings = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  
  const fileInputRef = useRef(null);
  const { user, setUser } = useAppStore();
  const { showToast } = useToast();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        showToast('Veuillez sélectionner une image', 'error');
        return;
      }
      
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('L\'image doit faire moins de 5MB', 'error');
        return;
      }
      
      setSelectedFile(file);
      
      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      // Simuler l'upload vers Firebase Storage
      // Dans un vrai projet, vous utiliseriez Firebase Storage
      const fakeUploadUrl = URL.createObjectURL(selectedFile);
      
      // Mettre à jour le profil Firebase Auth
      await updateProfile(auth.currentUser, {
        photoURL: fakeUploadUrl
      });
      
      // Mettre à jour dans Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: fakeUploadUrl
      });
      
      // Mettre à jour le store local
      setUser({
        ...user,
        photoURL: fakeUploadUrl
      });
      
      showToast('Photo de profil mise à jour !', 'success');
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      showToast('Erreur lors de la mise à jour de la photo', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDisplayNameUpdate = async () => {
    if (!newDisplayName.trim()) {
      showToast('Le pseudo ne peut pas être vide', 'error');
      return;
    }
    
    if (newDisplayName.length < 3) {
      showToast('Le pseudo doit faire au moins 3 caractères', 'error');
      return;
    }
    
    if (newDisplayName.length > 20) {
      showToast('Le pseudo doit faire moins de 20 caractères', 'error');
      return;
    }
    
    try {
      // Mettre à jour le profil Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName
      });
      
      // Mettre à jour dans Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: newDisplayName
      });
      
      // Mettre à jour le store local
      setUser({
        ...user,
        displayName: newDisplayName
      });
      
      showToast('Pseudo mis à jour !', 'success');
      setIsEditing(false);
      setNewDisplayName('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      showToast('Erreur lors de la mise à jour du pseudo', 'error');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSettingChange = (setting, value) => {
    switch (setting) {
      case 'notifications':
        setNotificationsEnabled(value);
        showToast(`Notifications ${value ? 'activées' : 'désactivées'}`, 'success');
        break;
      case 'darkMode':
        setDarkMode(value);
        showToast(`Mode sombre ${value ? 'activé' : 'désactivé'}`, 'success');
        break;
      case 'autoSave':
        setAutoSave(value);
        showToast(`Sauvegarde automatique ${value ? 'activée' : 'désactivée'}`, 'success');
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: 'fas fa-user' },
    { id: 'privacy', label: 'Confidentialité', icon: 'fas fa-shield-alt' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'appearance', label: 'Apparence', icon: 'fas fa-palette' },
    { id: 'advanced', label: 'Avancé', icon: 'fas fa-cog' }
  ];

  return (
    <motion.div 
      className="profile-settings-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="profile-settings-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="settings-header">
          <h2>Paramètres</h2>
          <button onClick={onClose} className="btn btn-icon close-btn">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                {/* Section Photo de profil */}
                <div className="settings-section">
                  <h3>Photo de profil</h3>
                  <div className="profile-photo-container">
                    <div className="current-photo">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Photo de profil" />
                      ) : (
                        <i className="fas fa-user"></i>
                      )}
                    </div>
                    
                    <div className="photo-actions">
                      <button 
                        onClick={triggerFileInput}
                        className="btn btn-secondary"
                      >
                        <i className="fas fa-camera"></i>
                        Changer la photo
                      </button>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Aperçu de la nouvelle photo */}
                  {previewUrl && (
                    <motion.div 
                      className="photo-preview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h4>Aperçu</h4>
                      <img src={previewUrl} alt="Aperçu" />
                      <div className="preview-actions">
                        <button 
                          onClick={handleImageUpload}
                          disabled={isUploading}
                          className="btn btn-success save-btn"
                        >
                          {isUploading ? (
                            <><i className="fas fa-spinner fa-spin"></i> Upload...</>
                          ) : (
                            <><i className="fas fa-check"></i> Confirmer</>
                          )}
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl('');
                          }}
                          className="btn btn-danger cancel-btn"
                        >
                          <i className="fas fa-times"></i>
                          Annuler
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Section Pseudo */}
                <div className="settings-section">
                  <h3>Pseudo</h3>
                  <div className="display-name-container">
                    {isEditing ? (
                      <div className="edit-display-name">
                        <input
                          type="text"
                          value={newDisplayName}
                          onChange={(e) => setNewDisplayName(e.target.value)}
                          placeholder="Nouveau pseudo"
                          maxLength={20}
                          className="edit-input"
                        />
                        <div className="edit-actions">
                          <button 
                            onClick={handleDisplayNameUpdate}
                            className="btn btn-success save-btn"
                          >
                            <i className="fas fa-check"></i>
                            Sauvegarder
                          </button>
                          <button 
                            onClick={() => {
                              setIsEditing(false);
                              setNewDisplayName('');
                            }}
                            className="btn btn-danger cancel-btn"
                          >
                            <i className="fas fa-times"></i>
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="current-display-name">
                        <span className="current-name">{user?.displayName || 'Utilisateur'}</span>
                        <button 
                          onClick={() => {
                            setIsEditing(true);
                            setNewDisplayName(user?.displayName || '');
                          }}
                          className="btn btn-warning edit-btn"
                        >
                          <i className="fas fa-edit"></i>
                          Modifier
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section Informations */}
                <div className="settings-section">
                  <h3>Informations</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{user?.email || 'Non renseigné'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">ID utilisateur:</span>
                      <span className="info-value">{user?.uid}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <div className="settings-section">
                  <h3>Confidentialité</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Profil public</h4>
                      <p>Permettre aux autres utilisateurs de voir votre profil</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Statut en ligne</h4>
                      <p>Afficher votre statut en ligne aux autres</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Dernière connexion</h4>
                      <p>Afficher votre dernière connexion</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <div className="settings-section">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Notifications push</h4>
                      <p>Recevoir des notifications sur votre appareil</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notificationsEnabled}
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Nouveaux messages</h4>
                      <p>Notifications pour les nouveaux messages</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Nouveaux contacts</h4>
                      <p>Notifications quand quelqu'un vous ajoute</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <div className="settings-section">
                  <h3>Apparence</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Mode sombre</h4>
                      <p>Activer le thème sombre</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={darkMode}
                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Animations</h4>
                      <p>Activer les animations d'interface</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Effets visuels</h4>
                      <p>Activer les effets néon et cyberpunk</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'advanced' && (
              <motion.div
                key="advanced"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <div className="settings-section">
                  <h3>Paramètres avancés</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Sauvegarde automatique</h4>
                      <p>Sauvegarder automatiquement vos données</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={autoSave}
                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Mode développeur</h4>
                      <p>Activer les outils de développement</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="settings-section">
                    <h3>Actions</h3>
                    <div className="action-buttons">
                      <button className="btn btn-warning">
                        <i className="fas fa-download"></i>
                        Exporter les données
                      </button>
                      <button className="btn btn-danger">
                        <i className="fas fa-trash"></i>
                        Supprimer le compte
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSettings; 