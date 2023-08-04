// Basic Imports
import React from "react";

// Import Contexts
import LoginProvider from './LoginContext';
import SearchProvider from './SearchContext';
import ServicesSearchProvider from "./servicesSearchContext";
import ModalProvider from "./ModalContext";

export default function ContextWrapper({ children }) {
  //element to wrap all context
  return (
    <LoginProvider>
      <SearchProvider>
        <ServicesSearchProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ServicesSearchProvider>
      </SearchProvider>
    </LoginProvider>
  );
}