import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Pokud máš nějaké globální styly
import App from './App'; // Import hlavní komponenty
import './App.css';   // Import tvých CSS stylů pro widget

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element'); // Kontrola existence root elementu

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);