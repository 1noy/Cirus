import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';

const NavItem = ({ to, icon, label, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link to={to} className={`sidebar-item ${isActive ? 'active' : ''}`}>
      <i className={`fas ${icon}`} />
      <span className="label">{label}</span>
      {badge ? <span className="badge">{badge}</span> : null}
    </Link>
  );
};

const Sidebar = () => {
  const { unreadCount } = useAppStore();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand">Cirus</div>
      </div>
      <nav className="sidebar-nav">
        <NavItem to="/" icon="fa-house" label="Accueil" />
        <NavItem to="/chat" icon="fa-comments" label="Messages" badge={unreadCount > 0 ? unreadCount : undefined} />
        <NavItem to="/search" icon="fa-magnifying-glass" label="Recherche" />
        <NavItem to="/profile" icon="fa-user" label="Profil" />
      </nav>
      <div className="sidebar-footer">
        <a className="sidebar-item" href="https://cirus" target="_blank" rel="noreferrer">
          <i className="fas fa-circle-info" />
          <span className="label">Aide</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;