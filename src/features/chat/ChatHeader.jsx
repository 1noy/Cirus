import React from 'react';
import Avatar from '../../components/Avatar';

const ChatHeader = ({ chatMeta, peerUser, presenceText, onLogout, onToggleInfo }) => {
  return (
    <div className="tg-header">
      <div className="tg-header-left">
        <Avatar name={peerUser?.displayName || chatMeta?.title || 'Chat'} src={peerUser?.photoURL} />
        <div className="tg-header-titles">
          <div className="tg-header-title">{chatMeta?.type === 'dm' ? (peerUser?.displayName || 'Message direct') : (chatMeta?.title || chatMeta?.type || 'Chat')}</div>
          <div className="tg-header-subtitle">{presenceText}</div>
        </div>
      </div>
      <div className="tg-header-actions">
        <button className="tg-btn" onClick={onToggleInfo} title="Infos">Infos</button>
        <button className="tg-btn" onClick={onLogout} title="Déconnexion">Quitter</button>
      </div>
    </div>
  );
};

export default ChatHeader;


