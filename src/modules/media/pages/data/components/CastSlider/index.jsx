import { useMedia } from 'src/modules/media/hooks';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function CastSlider() {
	const { type, id } = useParams();
	const { fetchCast } = useMedia();

	const { status, data } = useQuery({
		queryKey: ['media', type, id, 'cast and crew'],
		staleTime: Infinity,
		queryFn: () => fetchCast(type, id),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Cast</h2>
			<div className="p-1 pb-2 flex overflow-x-auto space-x-6 scrollbar-hidden relative">
				{data.cast.map((person, index) => {
					if (person.profile_path !== null) {
						return (
							<div
								className="w-40 shadow-md rounded-xl ring-1 ring-slate-200 dark:ring-slate-600"
								key={index}
							>
								<div className="card w-40 relative mx-4 md:mx-0 rounded-t-xl overflow-hidden">
									<img
										className="img object-cover"
										src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
										alt={person.name}
									/>
								</div>
								<div className="p-3">
									<p className="font-semibold truncate">{person.name}</p>
									<p className="font-thin truncate">
										{person.character || person.job}
									</p>
								</div>
							</div>
						);
					}
					return null;
				})}
			</div>
		</>
	);
}
