// Basic Imports
import React from "react";

// Import Contexts
import LoginProvider from './LoginContext';
import SearchProvider from './SearchContext';

export default function ContextWrapper({ children }) {
  //element to wrap all context
  return (
    <LoginProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </LoginProvider>
  );
}