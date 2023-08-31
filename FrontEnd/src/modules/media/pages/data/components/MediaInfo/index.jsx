import { useQuery } from '@tanstack/react-query';
import { useMedia } from 'src/modules/media/hooks';
import PropTypes from 'prop-types';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function MediaInfo({ type, id }) {
	const { fetchMedia } = useMedia();

	const { status, data } = useQuery({
		queryKey: ['media', type, id, 'data'],
		staleTime: Infinity,
		queryFn: () => fetchMedia(type, id),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<>
			<h2 className="text-3xl font-bold truncate">Information</h2>
			<div>
				<h3 className="font-bold text-xl">Media Type</h3>
				<p>{data.media_type}</p>
			</div>

			<div>
				<h3 className="font-bold text-xl">Status</h3>
				<p>{data.status}</p>
			</div>

			<div>
				<div className="flex space-x-1 items-center">
					<h3 className="font-bold text-xl">Rating</h3>
					<div className="text-sky-500">
						<svg width="16" height="20" fill="currentColor">
							<path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
						</svg>
					</div>
				</div>
				<p>{data.vote_average.toFixed(2)} / 10</p>
			</div>

			{data.seasons && data.seasons.length > 0 && (
				<div>
					<h3 className="font-bold text-xl">Seasons</h3>

					{data.seasons.map((season, index) => (
						<li key={index} className="ml-2 font-semibold">
							{`Season ${season.season_number}: ${season.name}`}
							<li className="ml-4 font-normal">{`Aired: ${new Date(
								season.air_date,
							).toLocaleString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}`}</li>
							<li className="ml-4 font-normal">{`Episodes: ${season.episode_count}`}</li>
						</li>
					))}
				</div>
			)}

			<div>
				<h3 className="font-bold text-xl">Budget</h3>
				<p>
					{data.budget === undefined || data.budget === 0
						? 'Currently Unknown'
						: data.budget.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
						  })}
				</p>
			</div>

			<div>
				<h3 className="font-bold text-xl">Reported Revenue</h3>
				<p>
					{data.revenue === undefined || data.revenue === 0
						? 'Currently Unknown'
						: data.revenue.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
						  })}
				</p>
			</div>
			<div>
				<h3 className="font-bold text-xl">Producers:</h3>
				<ul className="space-y-2">
					{data.production_companies.map((producer, index) => (
						<li key={index}>{producer.name}</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="font-bold text-xl">Spoken Languages:</h3>
				{data.spoken_languages.map((language) => (
					<li key={language.iso_639_1} className="ml-2">
						{`${language.english_name} (${language.name})`}
					</li>
				))}
			</div>
		</>
	);
}

MediaInfo.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
