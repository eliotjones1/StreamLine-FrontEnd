// Basic Imports
import React from 'react';

// Import Contexts
import LoginProvider from './LoginContext';
import SearchProvider from './SearchContext';
import ServicesSearchProvider from './servicesSearchContext';
import ModalProvider from './ModalContext';
import TMDBProvider from './tmdbContext';

export default function GlobalContextWrapper({ children }) {
  //element to wrap all context
  return (
    <LoginProvider>
      <ModalProvider>
        <SearchProvider>
          <ServicesSearchProvider>
            <TMDBProvider>{children}</TMDBProvider>
          </ServicesSearchProvider>
        </SearchProvider>
      </ModalProvider>
    </LoginProvider>
  );
}
