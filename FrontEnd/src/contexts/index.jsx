// Basic Imports
import React from "react";

// Import Contexts
import { LoginProvider } from './loginContext';
import { SearchProvider } from './searchContext';

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