import { BackgroundImage, Overview } from './components';
import { ReleaseDate, Genres } from 'src/modules/media/components';
import { LinkIcon } from '@heroicons/react/20/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useMedia } from 'src/modules/media/hooks';
import { AddToListCheck } from 'src/modules/common/components';
import PropTypes from 'prop-types';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function Main({ type, id }) {
	const { fetchMedia } = useMedia();

	const { status, data } = useQuery({
		queryKey: ['media', type, id, 'data'],
		staleTime: Infinity,
		queryFn: () => fetchMedia(type, id),
	});

	if (status === 'loading')
		return (
			<div className="max-w-5xl mx-auto h-[40rem]">
				<QueryLoading />
			</div>
		);
	if (status === 'error')
		return (
			<div className="max-w-5xl mx-auto h-[40rem]">
				<QueryError />
			</div>
		);

	return (
		<div className="relative">
			<BackgroundImage
				imagePath={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
			/>

			{/* Foreground */}
			<div className="relative z-10 flex max-w-5xl mx-auto space-x-6 text-white h-[40rem] justify-center items-center">
				<img
					className="h-[32rem] rounded-3xl"
					src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
				/>
				<div className="w-full relative flex-auto">
					<div className="flex items-center space-x-1">
						<p className="font-bold truncate text-4xl">
							{data.title || data.name}
						</p>
						<a href={data.homepage} target="_blank" rel="noopener noreferrer">
							<LinkIcon className="h-8 hover:text-sky-600 cursor-pointer text-slate-400" />
						</a>
					</div>
					<p className="font-thin italic truncate pb-4">{data.tagline}</p>

					<Genres
						genres={data.genres}
						bgColor="bg-slate-700"
						ringColor="ring-slate-600"
					/>

					<div className="flex items-center space-x-1 mb-4">
						<ReleaseDate date={data.release_date || data.first_air_date} />
						<svg
							width="2"
							height="2"
							fill="currentColor"
							className="mx-2 text-slate-300"
							aria-hidden="true"
						>
							<circle cx="1" cy="1" r="1" />
						</svg>
						{data.episode_run_time && <p>Episode Avg</p>}
						<ClockIcon className="h-4" />
						{data.episode_run_time && data.episode_run_time.length > 0 ? (
							<p>{data.episode_run_time[0]}mins</p>
						) : (
							<p>{data.runtime}mins</p>
						)}
					</div>
					<AddToListCheck type={type} id={id} tooltipPlacement="right" />
					<Overview text={data.overview} />
				</div>
			</div>
		</div>
	);
}

Main.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
