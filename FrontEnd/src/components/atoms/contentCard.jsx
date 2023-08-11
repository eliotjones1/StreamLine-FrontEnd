import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import noimage from '../../images/no-image.jpg';

export default function ContentCard({ content }) {
  const nav = useNavigate();
  
  return (
    <div className="relative w-44 overflow-hidden cursor-pointer">
      {
        content.poster_path === null ? 
          <img className='rounded-xl' src={noimage} /> 
        :
          <img onClick={() => nav(`/content-data/${content.media_type}/${content.id}`)} className='rounded-xl' src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />
      }
    </div>
  );
}

ContentCard.propTypes = {
  content: PropTypes.shape({
    poster_path: PropTypes.string,
    media_type: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};