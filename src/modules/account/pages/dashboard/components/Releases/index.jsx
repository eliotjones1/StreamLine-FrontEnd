import {
	Card,
	CardHeader,
	CardBody,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'src/modules/account/hooks';
import { AddToListCheck } from 'src/modules/common/components';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function UpcomingReleases() {
	const nav = useNavigate();
	const { fetchUpcoming } = useAccount();

	const { status, data } = useQuery({
		queryKey: ['account', 'upcoming releases'],
		staleTime: new Date().setUTCHours(23, 59, 59, 999) - new Date(), // Until Next Day
		queryFn: () => fetchUpcoming(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<Card className="h-full w-full bg-slate-50 h-[34rem] pb-2">
			<CardHeader
				floated={false}
				shadow={false}
				className="rounded-none bg-slate-50 pb-4"
			>
				<div className="flex items-center justify-between gap-8 pb-12">
					<div>
						<Typography variant="h3" color="blue-gray">
							Upcoming Releases
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See information regarding upcoming releases next month across all
							subscriptions. Add to your list to include in StreamLine&apos;s bundle
							optimization algorithm.
						</Typography>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll p-0 h-[48rem]">
				{data.length === 0 ? (
					<div className="flex flex-col h-full w-full bg-slate-50 rounded-lg items-center justify-center">
						<FaceFrownIcon className="text-slate-800 h-32 w-32" />
						<Typography className="text-center">
							Oh no! There is currently no upcoming content at this time.
						</Typography>
					</div>
				) : (
					<List>
						{data.map((release, index) => (
							<ListItem key={index}>
								<ListItemPrefix
									onClick={() =>
										nav(`/media/${release.media_type}/${release.id}`)
									}
								>
									<img
										className="w-20 object-cover rounded-md"
										src={
											release.poster_path
												? `https://image.tmdb.org/t/p/original${release.poster_path}`
												: 'src/assets/images/no-image.jpg'
										}
										alt={release.title || release.name}
									/>
								</ListItemPrefix>
								<div
									className="container w-3/4 h-full"
									onClick={() =>
										nav(`/media/${release.media_type}/${release.id}`)
									}
								>
									<Typography className="text-slate-900" variant="h5">
										{release.title || release.name}
									</Typography>
									<div className="flex items-center space-x-1">
										<Typography className="font-semibold text-slate-800">
											Releases:
										</Typography>
										<Typography className="font-semibold text-slate-800">
											{new Intl.DateTimeFormat('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											}).format(
												release.first_air_date === undefined
													? new Date(release.release_date.replace(/-/g, '/'))
													: new Date(release.first_air_date.replace(/-/g, '/')),
											)}
										</Typography>
									</div>
									<Typography className="h-12 text-slate-900 line-clamp-2">
										{release.overview}
									</Typography>
								</div>
								<ListItemSuffix>
									<AddToListCheck id={release.id} type={release.media_type} />
								</ListItemSuffix>
							</ListItem>
						))}
					</List>
				)}
			</CardBody>
		</Card>
	);
}
