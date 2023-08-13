import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextWrapper from './contexts/index';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalContextWrapper>
          <App />
          <ReactQueryDevtools />
        </GlobalContextWrapper>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
