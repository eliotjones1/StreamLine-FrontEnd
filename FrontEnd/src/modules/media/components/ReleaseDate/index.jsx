import PropTypes from 'prop-types';

export default function ReleaseDate({ date = undefined }) {
	if (!date) {
		return null;
	}

	return (
		<div className="flex space-x-1 mb-2">
			<p className="font-semibold">Release Year:</p>
			<p>
				{new Date(date).toLocaleString('en-US', {
					year: 'numeric',
				})}
			</p>
		</div>
	);
}

ReleaseDate.propTypes = {
	date: PropTypes.string,
};
