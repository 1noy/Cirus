import React, { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../store';
import ChatSidebar from '../features/chat/ChatSidebar';
import ChatWindow from '../features/chat/ChatWindow';
import { listenChatById } from '../features/chat/chatService';
import usePresence from '../features/presence/usePresence';
import { listenUserById } from '../features/users/userService';
import { listenPresence } from '../features/presence/presenceService';
import Avatar from '../components/Avatar';
import { formatLastSeen } from '../utils/date';
import ChatHeader from '../features/chat/ChatHeader';
import ChatInfoPanel from '../features/chat/ChatInfoPanel';
import PinnedBar from '../features/chat/PinnedBar';
import { pinMessage, unpinMessage } from '../features/chat/chatService';
import '../styles/chat.css';

const Chat = () => {
  const { logout, user } = useAppStore();
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeChatMeta, setActiveChatMeta] = useState(null);
  const [peerUser, setPeerUser] = useState(null);
  const [peerPresence, setPeerPresence] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  usePresence(user?.uid);

  useEffect(() => {
    if (!activeChatId) { setActiveChatMeta(null); return; }
    const unsub = listenChatById(activeChatId, setActiveChatMeta);
    return () => unsub && unsub();
  }, [activeChatId]);

  useEffect(() => {
    if (!activeChatMeta || activeChatMeta.type !== 'dm') { setPeerUser(null); return; }
    const otherId = activeChatMeta.participants?.find(p => p !== user?.uid);
    if (!otherId) { setPeerUser(null); return; }
    const unsubUser = listenUserById(otherId, setPeerUser);
    const unsubPresence = listenPresence(otherId, setPeerPresence);
    return () => { unsubUser && unsubUser(); unsubPresence && unsubPresence(); };
  }, [activeChatMeta, user]);

  return (
    <div className="tg-layout">
      <ChatSidebar onOpenChat={setActiveChatId} activeChatId={activeChatId} />
      <div className="tg-main">
        <ChatHeader
          chatMeta={activeChatMeta}
          peerUser={peerUser}
          presenceText={activeChatMeta ? (activeChatMeta.type === 'dm' ? formatLastSeen(peerPresence?.online, peerPresence?.lastActive) : `${activeChatMeta.participants?.length || 1} participant(s)`) : ''}
          onLogout={logout}
          onToggleInfo={() => setShowInfo(v => !v)}
        />
        <PinnedBar pinned={activeChatMeta?.pinned} onUnpin={() => unpinMessage(activeChatId)} />
        <div style={{ flex: 1 }}>
          {activeChatId ? (
            <ChatWindow chatId={activeChatId} chatMeta={activeChatMeta} />
          ) : (
            <div style={{ padding: 24 }}>Aucune conversation sélectionnée</div>
          )}
        </div>
        <ChatInfoPanel chatMeta={activeChatMeta} visible={showInfo} onClose={() => setShowInfo(false)} />
      </div>
    </div>
  );
};

export default Chat;


