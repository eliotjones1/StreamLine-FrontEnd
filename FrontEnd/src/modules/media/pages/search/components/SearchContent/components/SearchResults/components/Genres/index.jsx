import { useMedia } from '/src/modules/media/hooks';
import PropTypes from 'prop-types';

export default function Genres({ idList = [] }) {
	const { getGenreById } = useMedia();

	return (
		<div className="flex  mb-4">
			{idList.map((id, index) => (
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
					<div className="font-normal bg-slate-100 dark:bg-slate-700 py-1 px-2 rounded-md ring-1 ring-slate-200 dark:ring-slate-600">
						{getGenreById(id)}
					</div>
				</div>
			))}
		</div>
	);
}

Genres.propTypes = {
	idList: PropTypes.arrayOf(PropTypes.number),
};
