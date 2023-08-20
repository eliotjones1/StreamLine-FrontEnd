import PropTypes from 'prop-types';
import { ContentCard, ContentNameAndDate } from '/src/modules/common/components';

export default function ContentSlider({ mediaContent }) {
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hidden relative">
      {mediaContent.map((content, index) => (
        <div className="w-44" key={index}>
          <ContentCard content={content} />
          <ContentNameAndDate content={content} classNameMods={'py-3'} />
        </div>
      ))}
    </div>
  );
}

ContentSlider.propTypes = {
  mediaContent: PropTypes.array.isRequired,
};
