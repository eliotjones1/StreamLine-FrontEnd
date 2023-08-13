import PropTypes from 'prop-types';
import LoginProvider from './LoginContext';
import SearchProvider from './SearchContext';
import ServicesSearchProvider from './servicesSearchContext';
import ModalProvider from './ModalContext';
import APIProvider from './api';

function GlobalContextWrapper({ children }) {
  return (
    <LoginProvider>
      <ModalProvider>
        <SearchProvider>
          <ServicesSearchProvider>
            <APIProvider>
              {children}
            </APIProvider>
          </ServicesSearchProvider>
        </SearchProvider>
      </ModalProvider>
    </LoginProvider>
  );
}

GlobalContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextWrapper;

