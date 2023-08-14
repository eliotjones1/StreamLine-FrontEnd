import PropTypes from 'prop-types';
import { SocialLink } from './components';

export default function SocialLinksList({ list, classNameMods }) {
  return (
    <ul className={`flex space-x-4 mb-4 ${classNameMods}`}>
      {list.map((link, index) => (
        <SocialLink link={link} key={index} />
      ))}
    </ul>
  );
}

SocialLinksList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  classNameMods: PropTypes.string,
};