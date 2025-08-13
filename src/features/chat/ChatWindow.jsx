import React, { useEffect, useMemo, useRef, useState } from 'react';
import { listenMessages, sendTextMessage, sendMediaMessage, setTyping, listenTyping, addReactionToMessage, editMessage, deleteMessage, markRead } from './chatService';
import { useAppStore } from '../../store';
import MessageItem from './MessageItem';
import Avatar from '../../components/Avatar';
import VirtualizedMessageList from './VirtualizedMessageList';
import MessageInput from './MessageInput';
import TypingBubble from './TypingBubble';
import { pinMessage } from './chatService';

const ChatWindow = ({ chatId, chatMeta }) => {
  const { user } = useAppStore();
  const [messages, setMessages] = useState([]);
  const [typingMap, setTypingMap] = useState({});
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    if (!chatId) return;
    const unsub = listenMessages(chatId, setMessages);
    const unsubTyping = listenTyping(chatId, setTypingMap);
    return () => { unsub && unsub(); unsubTyping && unsubTyping(); };
  }, [chatId]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (value) => {
    await sendTextMessage(chatId, user.uid, value, replyTo?.id || null);
    setReplyTo(null);
    await setTyping(chatId, user.uid, false);
  };

  const handleFile = async (file) => {
    if (!file) return;
    await sendMediaMessage(chatId, user.uid, file);
  };

  const onChangeTyping = async () => {
    await setTyping(chatId, user.uid, true);
    setTimeout(() => setTyping(chatId, user.uid, false), 1500);
  };

  const othersTyping = Object.entries(typingMap).some(([uid, t]) => uid !== user.uid && t);

  useEffect(() => {
    // mark all non-mine messages as read when loaded
    messages.forEach((m) => {
      if (m.senderId !== user.uid) {
        markRead(chatId, m.id, user.uid).catch(() => {});
      }
    });
  }, [messages, chatId, user]);

  const messagesWithReplyText = useMemo(() => {
    const map = new Map(messages.map(m => [m.id, m]));
    return messages.map(m => ({ ...m, replyToText: m.replyTo ? map.get(m.replyTo)?.content : undefined }));
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <VirtualizedMessageList
        chatId={chatId}
        currentUserId={user.uid}
        onReact={(m, emoji) => addReactionToMessage(chatId, m.id, user.uid, emoji)}
        onReply={(m) => setReplyTo(m)}
        onEdit={(m, newContent) => editMessage(chatId, m.id, newContent)}
        onDelete={(m) => deleteMessage(chatId, m.id)}
      />
      {othersTyping && <TypingBubble />}
      <MessageInput
        onSend={handleSend}
        onFile={handleFile}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        onChangeTyping={onChangeTyping}
      />
      <script dangerouslySetInnerHTML={{ __html: `window.__pin = (m) => { fetch('/pin', { method: 'POST' }).catch(()=>{}); };` }} />
    </div>
  );
};

export default ChatWindow;


