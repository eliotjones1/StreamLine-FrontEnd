import PropTypes from 'prop-types';
export default function ImageContainer({ posterPath, classNameMods }) {

	return (
		<div className={`flex h-full w-full justify-center ${classNameMods}`}>
			<div className="h-64 w-44 overflow-hidden rounded-lg">
				<img
					src={posterPath}
					alt={'src/assets/images/no-image.jpg'}
					className="h-full w-full object-cover object-center"
				/>
			</div>
		</div>
	);
}

ImageContainer.propTypes = {
	posterPath: PropTypes.string.isRequired,
	classNameMods: PropTypes.string,
};
