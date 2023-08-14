import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ContentNameAndDate({ content, classNameMods }) {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/content-data/${content.media_type}/${content.id}`);
  };

  const renderDate = (label, date) => {
    if (date) {
      return (
        <p className="font-thin text-sm">
          {label}: {formatDate(date)}
        </p>
      );
    }
    return null;
  };

  return (
    <div className={`${classNameMods}`}>
      <p className="font-semibold cursor-pointer" onClick={handleClick}>
        {content.title || content.name}
      </p>
      {renderDate('Released', content.release_date)}
      {renderDate('First Aired', content.first_air_date)}
    </div>
  );
}

ContentNameAndDate.propTypes = {
  content: PropTypes.shape({
    media_type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
  }).isRequired,
  classNameMods: PropTypes.string,
};
