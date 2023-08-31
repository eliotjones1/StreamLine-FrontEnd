import PropTypes from 'prop-types';
import { useMedia } from 'src/modules/media/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { TrailerIFrame } from './components';

export default function Trailers({ type, id }) {
	const { fetchVideo } = useMedia();

	const { status, data } = useQuery({
		queryKey: ['media', type, id, 'videos'],
		staleTime: Infinity,
		queryFn: () => fetchVideo(type, id),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Trailers</h2>
			<div className="flex overflow-x-auto">
				{data.video.map((trailer, index) => {
					if (trailer.type === 'Trailer') {
						return (
							<TrailerIFrame
								key={index}
								link={`https://www.youtube.com/embed/${trailer.key}`}
							/>
						);
					}
				})}
			</div>
		</>
	);
}

Trailers.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
