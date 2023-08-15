import PropTypes from 'prop-types';
import AuthContextWrapper from '/src/modules/auth/contexts';
import TMDBProvider from './TMDB';

export default function CommonContextWrapper({ children }) {
  return (
    <AuthContextWrapper>
      <TMDBProvider>
        {children}
      </TMDBProvider>
    </AuthContextWrapper>
  );
}

CommonContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
