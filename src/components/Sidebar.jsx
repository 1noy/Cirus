import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper, Badge, Divider, Zoom, Grow, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useTheme } from '@mui/material/styles';

export default function Sidebar() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  // Simulation présence en ligne (à remplacer par une vraie logique temps réel)
  function isOnline(uid) {
    // Pour la démo, 60% de chances d'être en ligne
    return Math.random() < 0.6;
  }

  return (
    <Paper elevation={8} sx={{ bgcolor: '#23233a', width: isMobile ? '100vw' : 280, height: '100vh', position: 'fixed', left: 0, top: 0, boxShadow: '0 8px 32px #0008', borderRadius: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" align="center" sx={{ py: 3, fontWeight: 800, color: '#4fc3f7', letterSpacing: 1, borderBottom: '1px solid #333', animation: 'sidebarTitleWave 2.5s infinite linear alternate' }}>
        Conversations
      </Typography>
      <style>{`@keyframes sidebarTitleWave { 0%{letter-spacing:1px;transform:translateY(0);} 50%{letter-spacing:6px;transform:translateY(-4px);} 100%{letter-spacing:1px;transform:translateY(0);} }`}</style>
      <Divider sx={{ bgcolor: '#4fc3f7', opacity: 0.2, mb: 1 }} />
      <List sx={{ mt: 2, flex: 1, overflowY: 'auto' }}>
        {[...conversations].sort((a,b) => (b.lastMessage?.createdAt?.seconds||0)-(a.lastMessage?.createdAt?.seconds||0)).map((conv, idx) => {
          const other = conv.users?.find(u => u.uid !== user.uid);
          // Simulation badge : si la conversation a un champ 'unread' true, badge visible
          const hasUnread = conv.unread && conv.unread[user.uid];
          const online = isOnline(other?.uid);
          return (
            <Grow in={true} timeout={400 + idx * 60} key={conv.id}>
              <ListItem button onClick={() => navigate(`/chat/${other?.uid}`)} sx={{ mb: 2, borderRadius: 3, bgcolor: '#1e1e2f', boxShadow: 2, transition: 'background 0.3s, transform 0.3s', '&:hover': { bgcolor: '#4fc3f7', color: '#222', transform: 'scale(1.04) translateX(6px)', boxShadow: '0 0 24px #4fc3f7' } }}>
                <ListItemAvatar>
                  <Zoom in={true}><Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={hasUnread ? <FiberManualRecordIcon sx={{ color: '#ff4081', fontSize: 18 }} /> : null}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <Avatar src={other?.photo} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #fff', boxShadow: hasUnread ? '0 0 16px #ff4081' : '0 0 8px #4fc3f7', transition: 'box-shadow 0.3s, transform 0.2s', '&:hover': { transform: 'scale(1.08)' } }} />
                      <FiberManualRecordIcon sx={{ position: 'absolute', bottom: 2, right: 6, color: online ? '#4caf50' : '#bbb', fontSize: 18, border: '2px solid #23233a', borderRadius: '50%' }} />
                    </Box>
                  </Badge></Zoom>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>{other?.pseudo || 'Utilisateur'}</Typography>} />
              </ListItem>
            </Grow>
          );
        })}
      </List>
    </Paper>
  );
} 