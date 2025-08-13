import React, { useState } from 'react';
import { formatTime } from '../../utils/date';
import { isMessageReadByOthers } from './chatService';
import MessageReactions from './MessageReactions';
import Avatar from '../../components/Avatar';

const bubbleClass = (mine) => `tg-bubble${mine ? ' me' : ''}`;

const Quote = ({ text }) => (
  <div style={{ borderLeft: '2px solid #888', paddingLeft: 8, marginBottom: 6, color: '#ddd' }}>
    {text?.slice(0, 120)}
  </div>
);

const MessageItem = ({ message, mine, onReact, onReply, onEdit, onDelete, currentUserId }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(message.content);
  const reactionsSummary = message.reactions ? Object.entries(message.reactions).reduce((acc, [uid, emoji]) => {
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {}) : null;
  return (
    <div className={`tg-msg${mine ? ' me' : ''}`}>
      {!mine && <div className="tg-avatar"><Avatar name={message.senderName || 'Utilisateur'} /></div>}
      <div className="tg-bubble-wrap">
        {!mine && message.senderName && <div className="tg-name">{message.senderName}</div>}
        <div className={bubbleClass(mine)}>
          {message.replyToText && <div className="tg-quote"><Quote text={message.replyToText} /></div>}
          {message.deleted ? (
            <i style={{ color: '#ccc' }}>{message.content}</i>
          ) : editing ? (
            <form onSubmit={(e) => { e.preventDefault(); onEdit(value); setEditing(false); }}>
              <input value={value} onChange={(e) => setValue(e.target.value)} style={{ width: '100%' }} />
            </form>
          ) : (
            message.type === 'media' ? (
              <span className="tg-file">
                <span role="img" aria-label="file">📎</span>
                <a href={message.content} target="_blank" rel="noreferrer">Fichier</a>
              </span>
            ) : message.content
          )}
        </div>
        <div className="tg-meta">
          {formatTime(message.timestamp)}{message.edited ? ' • modifié' : ''} {mine && isMessageReadByOthers(message, currentUserId) ? ' • ✓✓' : ''}
        </div>
        {!message.deleted && (
          <div className="tg-actions">
            <button onClick={onReply}>Répondre</button>
            <MessageReactions onReact={onReact} />
            {mine && !editing && <button onClick={() => setEditing(true)}>Modifier</button>}
            {mine && <button onClick={onDelete}>Supprimer</button>}
            {mine && <button onClick={() => window.__pin?.(message)}>Épingler</button>}
          </div>
        )}
        {reactionsSummary && (
          <div style={{ color: '#aaa', fontSize: 12, marginTop: 4, display: 'flex', gap: 8 }}>
            {Object.entries(reactionsSummary).map(([emoji, count]) => (
              <span key={emoji} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #333', borderRadius: 12, padding: '2px 8px' }}>{emoji} {count}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;


