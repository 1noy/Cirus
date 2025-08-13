import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactsDrawer = ({ visible, onClose, chats, contacts, currentUserId, onSelectChat, messages, pinned = false }) => {
  const getOtherParticipant = (chat) => chat?.participants?.find(p => p !== currentUserId);
  const getContact = (uid) => contacts?.find(c => c.uid === uid);
  const getUnread = (chatId) => {
    const list = messages?.[chatId] || [];
    return list.filter(m => !m.read && m.senderId !== currentUserId).length;
  };

  const List = (
    <>
      <div className="drawer__header">
        <h3>Conversations</h3>
        {!pinned && (
          <button className="btn btn-icon" onClick={onClose} aria-label="Fermer">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      <div className="chat-list">
        {chats?.length ? chats.map((chat) => {
          const otherId = getOtherParticipant(chat);
          const contact = getContact(otherId);
          const unread = getUnread(chat.id);
          return (
            <button key={chat.id} className="chat-item" onClick={() => onSelectChat(chat.id)}>
              <div className="chat-item__avatar">
                {contact?.photoURL ? (
                  <img src={contact.photoURL} alt={contact.displayName || 'Utilisateur'} />
                ) : (
                  <i className="fas fa-user" />
                )}
              </div>
              <div className="chat-item__info">
                <div className="chat-item__name">
                  {contact?.displayName || 'Utilisateur'}
                  {contact?.online && <span style={{ marginLeft: 8, width: 8, height: 8, borderRadius: 999, background: 'var(--accent)', display: 'inline-block', boxShadow: '0 0 8px var(--accent)' }} />}
                </div>
                <div className="chat-item__meta">{chat?.lastMessage?.content?.slice(0, 40) || 'Nouvelle conversation'}</div>
              </div>
              {unread > 0 && (
                <span className="badge-unread" aria-label={`${unread} non lus`}>{unread}</span>
              )}
              <i className="fas fa-chevron-right chat-item__chev"></i>
            </button>
          );
        }) : (
          <div className="empty-messages" style={{ padding: 16 }}>Aucune conversation</div>
        )}
      </div>
    </>
  );

  if (pinned) {
    return (
      <div className="drawer drawer--pinned">
        {List}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="drawer"
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          {List}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ContactsDrawer;


