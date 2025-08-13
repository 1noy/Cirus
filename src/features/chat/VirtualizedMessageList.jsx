import React, { useEffect, useMemo, useRef, useState } from 'react';
import { listenRecentMessages, fetchOlderMessages } from './chatService';
import MessageItem from './MessageItem';
import DaySeparator from './DaySeparator';

const VirtualizedMessageList = ({ chatId, currentUserId, onReact, onReply, onEdit, onDelete }) => {
  const [docs, setDocs] = useState([]); // descending
  const [messages, setMessages] = useState([]); // ascending for render
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    const unsub = listenRecentMessages(chatId, 50, (snap) => {
      setDocs(snap.docs);
      setLastDoc(snap.docs[snap.docs.length - 1]);
    });
    return () => unsub && unsub();
  }, [chatId]);

  useEffect(() => {
    const data = docs.map(d => ({ id: d.id, ...d.data() }));
    data.reverse(); // ascending for render
    setMessages(data);
  }, [docs]);

  const onTopReached = async () => {
    if (!hasMore) return;
    const snap = await fetchOlderMessages(chatId, lastDoc, 50);
    if (snap.docs.length === 0) { setHasMore(false); return; }
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setDocs(prev => [...snap.docs, ...prev]);
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop <= 0) {
      onTopReached();
    }
  };

  const toJSDate = (ts) => {
    if (!ts) return null;
    if (typeof ts.toDate === 'function') return ts.toDate();
    if (ts instanceof Date) return ts;
    if (typeof ts === 'number') return new Date(ts);
    return null;
  };

  const isSameDay = (a, b) => {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  return (
    <div ref={listRef} onScroll={handleScroll} className="tg-messages">
      {messages.map((m, idx, arr) => {
        const prev = arr[idx - 1];
        const p = toJSDate(prev?.timestamp);
        const c = toJSDate(m.timestamp);
        const needDay = !prev || !isSameDay(p, c);
        return (
          <React.Fragment key={m.id}>
            {needDay && <DaySeparator timestamp={m.timestamp} />}
            <MessageItem
              message={m}
              mine={m.senderId === currentUserId}
              currentUserId={currentUserId}
              onReact={(emoji) => onReact(m, emoji)}
              onReply={() => onReply(m)}
              onEdit={(newContent) => onEdit(m, newContent)}
              onDelete={() => onDelete(m)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default VirtualizedMessageList;


