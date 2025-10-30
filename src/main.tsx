import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Předpokládám, že tento soubor existuje pro základní styly
import './App.css';   // Tvé specifické styly pro wizard

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("CRITICAL ERROR: Root element not found. Check your index.html for <div id='root'></div>");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);