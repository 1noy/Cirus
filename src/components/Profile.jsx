import React, { useState, useRef } from 'react';
import { auth } from '../firebase';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Box, Typography, Avatar, TextField, Button, IconButton, Paper, Fade, Tooltip, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ToastContext } from '../App';

export default function Profile() {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [pseudo, setPseudo] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.photoURL || '');
  const [avatarFile, setAvatarFile] = useState(null); // Pour upload réel
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();
  const { showToast } = React.useContext(ToastContext);

  const handleAvatarChange = e => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleThemeToggle = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let photoURL = avatar;
      if (avatarFile) {
        const fileRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(fileRef, avatarFile);
        photoURL = await getDownloadURL(fileRef);
      }
      await updateDoc(doc(db, 'users', user.uid), {
        pseudo,
        bio,
        photo: photoURL
      });
      showToast('Profil mis à jour !', 'success');
      setEdit(false);
      setAvatarFile(null);
    } catch (e) {
      showToast("Erreur lors de la sauvegarde du profil.", 'error');
    }
    setLoading(false);
  };

  return (
    <Paper elevation={8} sx={{ bgcolor: '#23233a', p: 4, borderRadius: 5, minWidth: 320, maxWidth: 420, mx: 'auto', boxShadow: '0 8px 32px #0008', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Avatar src={avatar} sx={{ width: 90, height: 90, border: '3px solid #4fc3f7', boxShadow: '0 0 16px #4fc3f7cc', cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 0 32px #4fc3f7' } }} onClick={() => fileInput.current.click()} />
        <input type="file" accept="image/*" ref={fileInput} style={{ display: 'none' }} onChange={handleAvatarChange} aria-label="Changer l’avatar" />
        <Tooltip title="Changer l’avatar">
          <IconButton sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#4fc3f7', color: '#222' } }} onClick={() => fileInput.current.click()}>
            <UploadFileIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {edit ? (
        <>
          <TextField value={pseudo} onChange={e => setPseudo(e.target.value)} label="Pseudo" fullWidth sx={{ mb: 2, bgcolor: '#181828', borderRadius: 2, input: { color: '#fff', fontWeight: 700 } }} />
          <TextField value={bio} onChange={e => setBio(e.target.value)} label="Bio" fullWidth multiline minRows={2} sx={{ mb: 2, bgcolor: '#181828', borderRadius: 2, input: { color: '#fff' } }} />
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave} sx={{ fontWeight: 700, borderRadius: 2 }} disabled={loading}>{loading ? 'Enregistrement...' : 'Enregistrer'}</Button>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#4fc3f7', mb: 1 }}>{pseudo}</Typography>
          <Typography variant="body1" sx={{ color: '#fff', mb: 2, fontStyle: 'italic', fontSize: 16 }}>{bio || <span style={{ color: '#bbb' }}>Aucune bio renseignée.</span>}</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Tooltip title="Modifier le profil"><IconButton onClick={() => setEdit(true)}><EditIcon sx={{ color: '#4fc3f7' }} /></IconButton></Tooltip>
            <Tooltip title="Déconnexion rapide"><IconButton><LogoutIcon sx={{ color: '#f44336' }} /></IconButton></Tooltip>
          </Box>
        </>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <Typography sx={{ color: '#fff', fontWeight: 700 }}>Thème aquatique</Typography>
        <Switch checked={theme === 'dark'} onChange={handleThemeToggle} />
      </Box>
    </Paper>
  );
} 