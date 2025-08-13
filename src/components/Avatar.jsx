import React from 'react';

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase();
};

const Avatar = ({ size = 36, name, src }) => {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: '#333',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: Math.max(12, Math.floor(size / 3)),
    overflow: 'hidden',
  };
  if (src) return <img src={src} alt={name} style={style} />;
  return <div style={style}>{getInitials(name)}</div>;
};

export default Avatar;


