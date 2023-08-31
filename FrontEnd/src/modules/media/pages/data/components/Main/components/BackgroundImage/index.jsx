import PropTypes from 'prop-types';

export default function BackgroundImage({ imagePath }) {
	return (
		<div className="absolute inset-0 z-0">
			<div className="absolute z-0 inset-0 bg-slate-900 opacity-80"></div>
			<img
				className="object-cover object-top w-full h-[40rem]"
				src={imagePath}
				alt=""
			/>
		</div>
	);
}

BackgroundImage.propTypes = {
	imagePath: PropTypes.string.isRequired,
};
