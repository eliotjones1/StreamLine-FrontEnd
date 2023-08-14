import PropTypes from 'prop-types';
import SearchProvider from './Search';

export default function SearchContextWrapper({ children }) {
  return <SearchProvider>{children}</SearchProvider>;
}

SearchContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
