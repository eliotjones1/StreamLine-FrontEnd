import PropTypes from 'prop-types';
import AuthContextWrapper from '/src/modules/auth/contexts';
import TMDBProvider from './TMDB';
import MediaContextWrapper from '/src/modules/media/contexts';
import BusinessContextWrapper from '/src/modules/business/contexts';
import AccountContextWrapper from '../../account/contexts';

export default function CommonContextWrapper({ children }) {
  return (
    <AuthContextWrapper>
      <AccountContextWrapper>
        <BusinessContextWrapper>
          <MediaContextWrapper>
            <TMDBProvider>
              {children}
            </TMDBProvider>
          </MediaContextWrapper>
        </BusinessContextWrapper>
      </AccountContextWrapper>
    </AuthContextWrapper>
  );
}

CommonContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
