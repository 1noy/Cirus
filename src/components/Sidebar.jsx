import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'conversations'), where('members', 'array-contains', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const convs = [];
      snap.forEach(doc => convs.push({ id: doc.id, ...doc.data() }));
      setConversations(convs);
    });
    return () => unsub();
  }, [user]);

  return (
    <Paper elevation={8} sx={{ bgcolor: '#23233a', width: 280, height: '100vh', position: 'fixed', left: 0, top: 0, boxShadow: '0 8px 32px #0008', borderRadius: 0, zIndex: 10 }}>
      <Typography variant="h5" align="center" sx={{ py: 3, fontWeight: 800, color: '#4fc3f7', letterSpacing: 1, borderBottom: '1px solid #333' }}>
        Conversations
      </Typography>
      <List sx={{ mt: 2 }}>
        {conversations.map(conv => {
          const other = conv.users?.find(u => u.uid !== user.uid);
          return (
            <ListItem button key={conv.id} onClick={() => navigate(`/chat/${other?.uid}`)} sx={{ mb: 2, borderRadius: 3, bgcolor: '#1e1e2f', boxShadow: 2, transition: 'background 0.2s, transform 0.2s', '&:hover': { bgcolor: '#4fc3f7', color: '#222', transform: 'scale(1.03)' } }}>
              <ListItemAvatar>
                <Avatar src={other?.photo} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #fff' }} />
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>{other?.pseudo || 'Utilisateur'}</Typography>} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
} 