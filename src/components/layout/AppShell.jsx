import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAppStore } from '../../store';

const AppShell = ({ children }) => {
  const { theme } = useAppStore();
  const location = useLocation();

  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <Sidebar />
      <Topbar />
      <main className="app-main">
        <div className="app-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppShell;