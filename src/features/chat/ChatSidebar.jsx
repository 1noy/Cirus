import React, { useEffect, useState } from 'react';
import { listenUserChats, ensureDMChat, createGroupChat } from './chatService';
import { useAppStore } from '../../store';
import { searchUsersByDisplayName } from '../users/userService';
import Avatar from '../../components/Avatar';
import '../../styles/chat.css';

const ChatSidebar = ({ onOpenChat, activeChatId }) => {
  const { user } = useAppStore();
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsub = listenUserChats(user.uid, setChats);
    return () => unsub && unsub();
  }, [user]);

  return (
    <div className="drawer drawer--pinned">
      <div className="drawer__header">
        <h3>Conversations</h3>
      </div>
      <div className="chat-list">
        <div className="tg-search" style={{ padding: 8 }}>
          <input
            placeholder="Rechercher"
            value={search}
            onChange={async (e) => {
              const v = e.target.value;
              setSearch(v);
              if (v.length >= 3) {
                const results = await searchUsersByDisplayName(v);
                setUserResults(results.filter(u => u.uid !== user?.uid));
              } else {
                setUserResults([]);
              }
            }}
            className="message-input"
            style={{ width: '100%' }}
          />
        </div>
        {userResults.length > 0 && (
          <div>
            <div style={{ padding: '4px 12px', color: 'var(--muted)', fontSize: 12 }}>Utilisateurs</div>
            {userResults.map(u => (
              <div key={u.uid}
                   onClick={async () => { const id = await ensureDMChat(user.uid, u.uid); onOpenChat(id);} }
                   className="chat-item">
                <Avatar name={u.displayName} src={u.photoURL} />
                <div>
                  <div className="chat-item__name">{u.displayName}</div>
                  <div className="chat-item__meta">{u.email || '—'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {chats
          .filter(c => !search || (c.title || c.lastMessage || '').toLowerCase().includes(search.toLowerCase()))
          .map(c => (
            <div key={c.id} onClick={() => onOpenChat(c.id)} className="chat-item" style={c.id === activeChatId ? { background:'rgba(255,255,255,0.06)' } : undefined}>
              <Avatar name={c.title || 'DM'} />
              <div>
                <div className="chat-item__name">{c.type === 'group' ? (c.title || 'Groupe') : c.type === 'channel' ? (c.title || 'Canal') : 'Message direct'}</div>
                <div className="chat-item__meta">{c.lastMessage || 'Aucun message'}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSidebar;


