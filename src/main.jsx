import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { setupConsoleCleanup } from './utils/console-cleanup.js'

// Configurer le nettoyage de console
setupConsoleCleanup();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 