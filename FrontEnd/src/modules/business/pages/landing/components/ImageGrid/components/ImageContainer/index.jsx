import PropTypes from 'prop-types';

export default function ImageContainer({ src, alt, classNameMods }) {
  return (
    <div className={`flex h-full w-full justify-center ${classNameMods}`}>
      <div className="h-64 w-44 overflow-hidden rounded-lg">
        <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
      </div>
    </div>
  );
}

ImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  classNameMods: PropTypes.string,
};