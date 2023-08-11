import React, { createContext, useState } from 'react';
import Modal from '../utils/Modal';

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
      <Modal 
        centerContent={false}
        header={"Success"}
        body={"Your message has been recieved! Upon review the StreamLine team will be in contact. For urgent issues please contact our support line at: (###) ###-####."}
        colorPalete={"green"}
        isOpen={openSuccessModal} 
        setOpen={setOpenSuccessModal}
      />
      <Modal 
        centerContent={false}
        header={"500: Internal Server Error"} 
        body={"An internal server error occured during this action. We are aware of the issue and working to fix it momentarily. The current page will not include certain functionality. Please reload the page or try again at a later time. If the error continues to occur please contact support."}
        mainButtonText={"Refresh"}
        mainButtonFunction={() => window.location.reload()}
        secondaryButtonText={"Support"}
        secondaryButtonFunction={() => { nav('/support'); setOpen500Modal(false); }}
        colorPalete={"sky"}
        isOpen={open500Modal} 
        setOpen={setOpen500Modal}
      />
      <Modal 
        centerContent={false}
        header={"500: Internal Server Error"} 
        body={"An internal server error occured during this action. We are aware of the issue and working to fix it momentarily. The current page will not include certain functionality. Please reload the page or try again at a later time. If the error continues to occur please contact support."}
        mainButtonText={"Rate"}
        mainButtonFunction={""}
        secondaryButtonText={""}
        secondaryButtonFunction={() => { nav('/support'); setOpen500Modal(false); }}
        colorPalete={"sky"}
        isOpen={open500Modal} 
        setOpen={setOpen500Modal}
      />
    </ModalContext.Provider>);
};