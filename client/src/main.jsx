import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CapContextStore } from './store/store.jsx';
import { ImagesContextStore } from './store/images.jsx';

createRoot(document.getElementById('root')).render(
  <CapContextStore>
    <ImagesContextStore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ImagesContextStore>
  </CapContextStore>
  
)
