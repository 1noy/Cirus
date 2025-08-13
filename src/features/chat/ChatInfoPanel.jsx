import React, { useState } from 'react';
import MediaGrid from './MediaGrid';

const ChatInfoPanel = ({ chatMeta, visible, onClose }) => {
  const [tab, setTab] = useState('info');
  if (!visible) return null;
  return (
    <div className="tg-info">
      <div className="tg-info-header">
        <div>Infos de la conversation</div>
        <button className="tg-btn" onClick={onClose}>Fermer</button>
      </div>
      <div className="tg-info-body">
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button className="tg-btn" onClick={() => setTab('info')} disabled={tab==='info'}>Infos</button>
          <button className="tg-btn" onClick={() => setTab('media')} disabled={tab==='media'}>Médias</button>
        </div>
        {tab === 'info' ? (
          <>
            <div className="tg-info-row"><b>Type</b>: {chatMeta?.type}</div>
            {chatMeta?.title && <div className="tg-info-row"><b>Titre</b>: {chatMeta.title}</div>}
            <div className="tg-info-row"><b>Participants</b>: {chatMeta?.participants?.length || 1}</div>
          </>
        ) : (
          <MediaGrid chatId={chatMeta?.id} />
        )}
      </div>
    </div>
  );
};

export default ChatInfoPanel;


