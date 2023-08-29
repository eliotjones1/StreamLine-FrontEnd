import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ContentCard } from '/src/modules/common/components';
import { Genres, Rating } from './components';
import { ReleaseDate } from 'src/modules/media/components';

export default function SearchResults({ results = [] }) {
	const nav = useNavigate();

	if (results.length === 0) {
		return (
			<p className="w-full flex items-center justify-center">
				No Content matches this query. Please enter new search enquiry.
			</p>
		);
	}

	return (
		<div className="mb-20 md:mb-0 space-y-8">
			{results.map((content, index) => {
				if (content.media_type !== 'person') {
					return (
						<div
							className="bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 px-4 flex w-full cursor-pointer space-x-6 shadow-md"
							onClick={() => nav(`/media/${content.media_type}/${content.id}`)}
							key={index}
						>
							<div className="flex items-center">
								<ContentCard content={content} />
							</div>
							<div className="w-full relative flex-auto">
								<h2 className="font-bold truncate pr-20 text-2xl">
									{content.title || content.name}
								</h2>
								<div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
									<Rating rating={content.vote_average} />
									<Genres idList={content.genre_ids} />
									<ReleaseDate
										date={content.release_date || content.first_air_date}
									/>
									{content.overview ? (
										<div className="w-full mt-2 font-normal">
											<p className="font-semibold">Overview:</p>
											{content.overview}
										</div>
									) : null}
								</div>
							</div>
						</div>
					);
				}
			})}
		</div>
	);
}

SearchResults.propTypes = {
	results: PropTypes.array,
};
