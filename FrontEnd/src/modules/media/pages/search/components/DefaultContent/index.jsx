import { useQueries } from '@tanstack/react-query';
import { useTMDB } from '/src/modules/common/hooks';
import { ContentSlider } from '/src/modules/common/components';
import { QueryError, QueryLoading } from 'src/modules/common/components';

export default function Content() {
	const { fetchTrending, fetchNewlyReleased } = useTMDB();

	const [trending, newlyReleased] = useQueries({
		queries: [
			{
				queryKey: ['trending'],
				queryFn: () => fetchTrending(),
			},
			{
				queryKey: ['newly_released'],
				queryFn: () => fetchNewlyReleased(),
			},
		],
	});

	if (trending.status === 'loading' || newlyReleased.status === 'loading')
		return <QueryLoading />;
	if (trending.status === 'error' || newlyReleased.status === 'error')
		return <QueryError />;

	return (
		<div className="max-w-7xl mx-auto relative z-0">
			<div className="pb-2">
				<p className="font-bold pb-2 text-2xl">Trending Content</p>
				<ContentSlider mediaContent={trending.data} />
			</div>
			<div className="pb-2">
				<p className="font-bold pb-2 text-2xl">Newly Released</p>
				<ContentSlider mediaContent={newlyReleased.data} />
			</div>
		</div>
	);
}
