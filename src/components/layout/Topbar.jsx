import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme, user } = useAppStore();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  return (
    <header className="topbar">
      <div className="left">
        <button className="btn btn-icon btn-outline" onClick={() => navigate(-1)} title="Retour">
          <i className="fas fa-arrow-left" />
        </button>
        <div className="route-label">{location.pathname}</div>
      </div>
      <div className="center">
        <div className="topbar-search">
          <i className="fas fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Rechercher..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/search');
            }}
          />
        </div>
      </div>
      <div className="right">
        <button className="btn btn-icon" onClick={toggleTheme} title="Changer de thème">
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
        </button>
        <button className="btn btn-icon" onClick={() => navigate('/profile')} title="Profil">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="avatar" />
          ) : (
            <i className="fas fa-user" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Topbar;