import PropTypes from 'prop-types';

export default function TrailerIFrame({ link }) {
  return (
    <div className="aspect-w-64 aspect-h-32">
      <iframe title="Media Trailer" width={560} height={315} src={link} allowFullScreen />;
    </div>
  );
}

TrailerIFrame.propTypes = {
  link: PropTypes.string.isRequired,
};