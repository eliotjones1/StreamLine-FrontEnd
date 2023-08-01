import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalProvider({ children }){
  const [open500Modal, setOpen500Modal] = useState(false);

  return (
    <ModalContext.Provider value={{
      open500Modal,
      setOpen500Modal,
    }}>
      {children}
    </ModalContext.Provider>);
};