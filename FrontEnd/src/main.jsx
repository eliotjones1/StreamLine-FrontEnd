import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import GlobalContextWrapper from './contexts/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextWrapper>
      <App />
    </GlobalContextWrapper>
  </BrowserRouter>
);
