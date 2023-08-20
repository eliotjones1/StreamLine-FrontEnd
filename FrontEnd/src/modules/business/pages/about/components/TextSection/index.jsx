import PropTypes from 'prop-types';

export default function TextSection({ sectionHeader, paragraphTextList }) {
  return (
    <div className="space-y-4">
      <h2 className="text-4xl mb-6 font-bold tracking-tight">{sectionHeader}</h2>
      {paragraphTextList.map((text, index) => (
        <p className="text-lg leading-8" key={index}>
          {text}
        </p>
      ))}
    </div>
  );
}

TextSection.propTypes = {
  sectionHeader: PropTypes.string.isRequired,
  paragraphTextList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
