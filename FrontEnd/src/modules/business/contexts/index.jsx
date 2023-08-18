import PropTypes from 'prop-types';
import BusinessProvider from './Business';

export default function BusinessContextWrapper({ children }) {
  return <BusinessProvider>{children}</BusinessProvider>;
}

BusinessContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
