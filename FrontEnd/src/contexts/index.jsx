// Basic Imports
import React from "react";

// Import Contexts
import LoginProvider from './LoginContext';
import SearchProvider from './SearchContext';
import ModalProvider from "./ModalContext";

export default function ContextWrapper({ children }) {
  //element to wrap all context
  return (
    <LoginProvider>
      <SearchProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </SearchProvider>
    </LoginProvider>
  );
}