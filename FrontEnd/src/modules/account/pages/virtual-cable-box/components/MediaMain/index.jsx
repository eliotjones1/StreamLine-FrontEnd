import { useQueries } from '@tanstack/react-query';
import { useTMDB } from 'src/modules/common/hooks';
import { useAccount } from 'src/modules/account/hooks';
import { ContentSlider } from './components';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function Content() {
	const { fetchTrending, fetchNewlyReleased } = useTMDB();
	const { fetchUpcoming } = useAccount();

	const [trending, newlyReleased, upcoming] = useQueries({
		queries: [
			{
				queryKey: ['media', 'trending'],
				queryFn: () => fetchTrending(),
			},
			{
				queryKey: ['media', 'newly_released'],
				queryFn: () => fetchNewlyReleased(),
			},
			{
				queryKey: ['account', 'upcoming releases'],
				queryFn: () => fetchUpcoming(),
			},
		],
	});

	if (
		trending.status === 'loading' ||
		newlyReleased.status === 'loading' ||
		upcoming.status === 'loading'
	)
		return <QueryLoading />;
	if (
		trending.status === 'error' ||
		newlyReleased.status === 'error' ||
		upcoming.status === 'error'
	)
		return <QueryError />;

	console.log(upcoming);
	return (
		<div className="max-w-7xl mx-auto relative z-0 text-slate-800">
			<div className="pb-2">
				<p className="font-bold pb-2 text-2xl ">Upcoming Releases</p>
				<ContentSlider mediaContent={upcoming.data} />
			</div>
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
