import React, { useEffect, useState } from 'react';
import { listenUserChats, ensureDMChat, createGroupChat } from './chatService';
import { useAppStore } from '../../store';
import { searchUsersByDisplayName } from '../users/userService';
import Avatar from '../../components/Avatar';

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
    <div className="tg-sidebar">
      <div className="tg-search">
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
        />
      </div>
      <div className="tg-sidebar-actions">
        <button onClick={async () => {
          const otherId = prompt('UID du contact ?');
          if (!otherId) return;
          const id = await ensureDMChat(user.uid, otherId);
          onOpenChat(id);
        }}>Nouveau message</button>
        <button onClick={async () => {
          const title = prompt('Nom du groupe ?');
          const members = prompt('UID membres séparés par des virgules');
          const ids = members ? members.split(',').map(s => s.trim()).filter(Boolean) : [];
          const id = await createGroupChat(user.uid, title || 'Groupe', ids);
          onOpenChat(id);
        }}>Nouveau groupe</button>
        <button onClick={async () => {
          const title = prompt('Nom du canal ?');
          if (!title) return;
          const { createChannel } = await import('./chatService');
          const id = await createChannel(user.uid, title);
          onOpenChat(id);
        }}>Nouveau canal</button>
      </div>
      <div className="tg-chat-list">
        {userResults.length > 0 && (
          <div>
            <div style={{ padding: '4px 12px', color: '#888', fontSize: 12 }}>Utilisateurs</div>
            {userResults.map(u => (
              <div key={u.uid}
                   onClick={async () => { const id = await ensureDMChat(user.uid, u.uid); onOpenChat(id);} }
                   className="tg-chat-item">
                <Avatar name={u.displayName} src={u.photoURL} />
                <div>
                  <div className="tg-chat-item-title">{u.displayName}</div>
                  <div className="tg-chat-item-sub">{u.email || '—'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {chats
          .filter(c => !search || (c.title || c.lastMessage || '').toLowerCase().includes(search.toLowerCase()))
          .map(c => (
            <div key={c.id} onClick={() => onOpenChat(c.id)} className="tg-chat-item" style={c.id === activeChatId ? { background:'rgba(255,255,255,0.05)' } : undefined}>
              <Avatar name={c.title || 'DM'} />
              <div>
                <div className="tg-chat-item-title">{c.type === 'group' ? (c.title || 'Groupe') : c.type === 'channel' ? (c.title || 'Canal') : 'Message direct'}</div>
                <div className="tg-chat-item-sub">{c.lastMessage || 'Aucun message'}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSidebar;


