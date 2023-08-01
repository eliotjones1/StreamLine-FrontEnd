import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalProvider({ children }){
  const [open401Modal, setOpen401Modal] = useState(false);

  return (
    <ModalContext.Provider value={{
      open401Modal,
      setOpen401Modal,
    }}>
      {children}
    </ModalContext.Provider>);
};