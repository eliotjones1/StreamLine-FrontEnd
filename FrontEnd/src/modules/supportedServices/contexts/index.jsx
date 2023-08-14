import PropTypes from 'prop-types';
import CompaniesProvider from './Companies';

export default function CompaniesContextWrapper({ children }) {
  return (
    <CompaniesProvider>
      {children}
    </CompaniesProvider>
  );
}

CompaniesContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};