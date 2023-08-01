import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import ContextWrapper from './contexts/Index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextWrapper> 
      <App/>
    </ContextWrapper>
  </BrowserRouter>
);
