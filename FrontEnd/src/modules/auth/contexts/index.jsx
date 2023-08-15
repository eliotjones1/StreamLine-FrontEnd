import PropTypes from 'prop-types';
import LoginProvider from './Auth';

export default function AuthContextWrapper({ children }) {
  return <LoginProvider>{children}</LoginProvider>;
}

AuthContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
