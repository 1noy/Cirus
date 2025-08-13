import React from 'react';

const TopBar = () => {
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
        </nav>
      </div>
    </header>
  );
};

export default TopBar;


