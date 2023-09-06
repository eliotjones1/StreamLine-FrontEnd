import { useParams } from 'react-router-dom';
import { useMedia } from 'src/modules/media/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { TrailerIFrame } from './components';

export default function Trailers() {
	const { type, id } = useParams();
	const { fetchVideo } = useMedia();

	console.log(type, id);

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
				{data.results.map((trailer, index) => {
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
