import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalProvider({ children }){
  const [open500Modal, setOpen500Modal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  return (
    <ModalContext.Provider value={{
      open500Modal,
      setOpen500Modal,
      openSuccessModal,
      setOpenSuccessModal
    }}>
      {children}
    </ModalContext.Provider>);
};