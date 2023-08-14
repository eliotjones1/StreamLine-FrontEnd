import PropTypes from 'prop-types';
import LoginProvider from './Auth';
import TMDBProvider from './TMDB';

export default function CommonContextWrapper({ children }) {
  return (
    <LoginProvider>
      <TMDBProvider>
        {children}
      </TMDBProvider>
    </LoginProvider>
  );
}

CommonContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};