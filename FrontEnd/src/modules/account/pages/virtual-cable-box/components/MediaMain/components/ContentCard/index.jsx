import PropTypes from 'prop-types';
import noimage from 'src/assets/images/no-image.jpg';

export default function ContentCard({ content }) {
	return (
		<div className="relative w-44 overflow-hidden">
			{content.poster_path === null ? (
				<img className="rounded-lg" src={noimage} />
			) : (
				<img
					className="rounded-lg"
					src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
				/>
			)}
		</div>
	);
}

ContentCard.propTypes = {
	content: PropTypes.shape({
		poster_path: PropTypes.string,
		media_type: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
};
