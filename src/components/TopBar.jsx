import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { toggleSoundEnabled, isSoundEnabled } from '../utils/sound';

const TopBar = () => {
  const { setTheme } = useAppStore();
  const theme = useMemo(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  }, []);

  const handleToggleTheme = () => {
    const next = (document.documentElement.getAttribute('data-theme') || theme) === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch {}
    setTheme?.(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleToggleSound = () => {
    const enabled = toggleSoundEnabled();
    // feedback visuel minimal: surligner le bouton
    const el = document.getElementById('sound-toggle');
    if (el) {
      el.style.outline = enabled ? '2px solid var(--accent)' : 'none';
      setTimeout(() => { el.style.outline = 'none'; }, 600);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="brand">
          <span className="brand__dot" />
          <span className="brand__name">CirusChat</span>
        </div>
        <nav className="nav">
          <a className="nav__link" href="#"><i className="fas fa-comments"></i> Chat</a>
          <a className="nav__link" href="#"><i className="fas fa-user"></i> Profil</a>
          <a className="nav__link" href="#"><i className="fas fa-cog"></i> Paramètres</a>
          <button type="button" className="nav__link" onClick={handleToggleTheme} aria-label="Basculer le thème">
            <i className="fas fa-moon"></i> Thème
          </button>
          <button id="sound-toggle" type="button" className="nav__link" onClick={handleToggleSound} aria-label="Activer/désactiver le son">
            <i className={isSoundEnabled() ? 'fas fa-volume-up' : 'fas fa-volume-mute'}></i> Son
          </button>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;


