import React from 'react';

const EMOJIS = ['👍', '❤️', '😂', '🔥', '🎉'];

const MessageReactions = ({ onReact }) => {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {EMOJIS.map(e => (
        <button key={e} onClick={() => onReact(e)} style={{ padding: '2px 6px' }}>{e}</button>
      ))}
    </div>
  );
};

export default MessageReactions;


