import PropTypes from 'prop-types';
import MediaProvider from './Media';

export default function MediaContextWrapper({ children }) {
  return <MediaProvider>{children}</MediaProvider>;
}

MediaContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
