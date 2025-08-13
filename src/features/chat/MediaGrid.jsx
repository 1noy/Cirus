import React, { useEffect, useState } from 'react';
import { fetchRecentMedia } from './chatService';

const MediaGrid = ({ chatId }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!chatId) return;
    fetchRecentMedia(chatId).then(setItems).catch(() => setItems([]));
  }, [chatId]);
  if (!items.length) return <div style={{ padding: 12, color: '#999' }}>Aucun média récent</div>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: 12 }}>
      {items.map(m => (
        <a key={m.id} href={m.content} target="_blank" rel="noreferrer" style={{ display: 'block', borderRadius: 8, overflow: 'hidden', border: '1px solid #242428' }}>
          <img src={m.content} alt="media" style={{ width: '100%', height: 96, objectFit: 'cover', display: 'block' }} />
        </a>
      ))}
    </div>
  );
};

export default MediaGrid;


