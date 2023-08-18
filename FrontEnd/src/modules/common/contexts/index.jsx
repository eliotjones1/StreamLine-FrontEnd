import PropTypes from 'prop-types';
import AuthContextWrapper from '/src/modules/auth/contexts';
import TMDBProvider from './TMDB';
import MediaContextWrapper from '/src/modules/media/contexts';
import BusinessContextWrapper from '/src/modules/business/contexts';

export default function CommonContextWrapper({ children }) {
  return (
    <AuthContextWrapper>
      <BusinessContextWrapper>
        <MediaContextWrapper>
          <TMDBProvider>
            {children}
          </TMDBProvider>
        </MediaContextWrapper>
      </BusinessContextWrapper>
    </AuthContextWrapper>
  );
}

CommonContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
