import PropTypes from 'prop-types';
import ContentCard from '../atoms/contentCard';
import NameAndDate from '../atoms/nameAndDate';

function ContentSlider({ mediaContent }) {
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hidden relative">
      {mediaContent.map((content, index) => (
        <div className="w-44" key={index}>
          <ContentCard content={content} />
          <div className="py-3">
            <NameAndDate content={content} />
          </div>
        </div>
      ))}
    </div>
  );
}

ContentSlider.propTypes = {
  mediaContent: PropTypes.array.isRequired,
};

export default ContentSlider;
