import PropTypes from 'prop-types';

const genreKeys = [
	{ id: 12, name: 'Adventure' },
	{ id: 14, name: 'Fantasy' },
	{ id: 16, name: 'Animation' },
	{ id: 18, name: 'Drama' },
	{ id: 27, name: 'Horror' },
	{ id: 28, name: 'Action' },
	{ id: 35, name: 'Comedy' },
	{ id: 36, name: 'History' },
	{ id: 37, name: 'Western' },
	{ id: 53, name: 'Thriller' },
	{ id: 80, name: 'Crime' },
	{ id: 99, name: 'Documentary' },
	{ id: 878, name: 'Science Fiction' },
	{ id: 9648, name: 'Mystery' },
	{ id: 10402, name: 'Music' },
	{ id: 10749, name: 'Romance' },
	{ id: 10751, name: 'Family' },
	{ id: 10752, name: 'War' },
	{ id: 10759, name: 'Action & Adventure' },
	{ id: 10762, name: 'Kids' },
	{ id: 10763, name: 'News' },
	{ id: 10764, name: 'Reality' },
	{ id: 10765, name: 'Sci-Fi & Fantasy' },
	{ id: 10766, name: 'Soap' },
	{ id: 10767, name: 'Talk' },
	{ id: 10768, name: 'War & Politics' },
	{ id: 10770, name: 'TV Movie' },
];

export default function Genres({
	genres = [],
	bgColor = 'bg-slate-100',
	ringColor = 'ring-slate-200',
}) {
	const genreName = (genre) => {
		if (typeof genre === 'number') {
			const match = genreKeys.find((cur) => cur.id === genre);
			console.log(match);
			return match ? match.name : 'Unknown Genre';
		}
		return genre.name;
	};

	return (
		<div className="flex  mb-4">
			{genres.map((genre, index) => (
				<div className="flex items-center" key={index}>
					{index !== 0 && (
						<svg
							width="2"
							height="2"
							fill="currentColor"
							className="mx-2 text-slate-300"
							aria-hidden="true"
						>
							<circle cx="1" cy="1" r="1" />
						</svg>
					)}
					<div
						className={`font-normal ${bgColor} py-1 px-2 rounded-md ring-1 ${ringColor}`}
					>
						{genreName(genre)}
					</div>
				</div>
			))}
		</div>
	);
}

Genres.propTypes = {
	genres: PropTypes.array,
	bgColor: PropTypes.string,
	ringColor: PropTypes.string,
};
