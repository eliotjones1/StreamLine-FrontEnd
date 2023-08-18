import { createContext } from 'react';
import PropTypes from 'prop-types';

export const AccountContext = createContext();

export default function AccountProvider({ children }) {

  return (
    <AccountContext.Provider
      value={{
        
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};