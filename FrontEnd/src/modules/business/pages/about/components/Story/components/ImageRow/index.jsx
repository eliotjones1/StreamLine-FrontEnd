import noimage from '/src/assets/images/no-image.jpg';
import PropTypes from 'prop-types';

export default function ImageRow({
	images = [
		noimage,
		noimage,
		noimage,
		noimage,
		noimage,
		noimage,
		noimage,
		noimage,
	],
}) {
	return (
		<div className="py-10">
			<div className="flex w-full h-64 justify-center">
				{images.map((imgSrc, index) => (
					<img src={imgSrc} key={index} />
				))}
			</div>
		</div>
	);
}

ImageRow.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string.isRequired),
};
