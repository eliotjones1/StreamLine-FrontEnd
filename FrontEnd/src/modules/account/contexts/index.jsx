import PropTypes from 'prop-types';
import AccountProvider from './Account';

export default function AccountContextWrapper({ children }) {
  return <AccountProvider>{children}</AccountProvider>;
}

AccountContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};