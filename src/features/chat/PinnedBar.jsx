import React from 'react';

const PinnedBar = ({ pinned, onUnpin }) => {
  if (!pinned) return null;
  return (
    <div style={{ background: 'rgba(42,127,255,0.1)', borderBottom: '1px solid #242428', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span role="img" aria-label="pin">📌</span>
        <div style={{ fontSize: 13, color: '#cfd3dc' }}>{pinned.content}</div>
      </div>
      <button className="tg-btn" onClick={onUnpin}>Désépingler</button>
    </div>
  );
};

export default PinnedBar;


