import {
	Card,
	CardHeader,
	CardBody,
	List,
	Spinner,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	IconButton,
	Typography,
	Tooltip,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import { ClockIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'src/modules/account/hooks';
import { Button } from 'react-bootstrap';

export default function UpcomingReleases() {
	const nav = useNavigate();
	const { fetchUpcoming, addToUserList } = useAccount();

	const { status, data } = useQuery({
		queryKey: ['account', 'upcoming releases'],
		queryFn: () => fetchUpcoming(),
	});

	if (status === 'loading')
		return (
			<div className="flex h-full w-full bg-slate-50 rounded-lg items-center justify-center">
				<Spinner className="h-12 w-12" color="blue" />
			</div>
		);
	if (status === 'error')
		return (
			<div className="flex flex-col h-full w-full bg-slate-50 rounded-lg items-center justify-center">
				<FaceFrownIcon className="text-slate-800 h-32 w-32" />
				<Typography className="flex w-3/4 text-center">
					An internal server error has occured. Our staff is aware of the issue
					and working to resolve it in a timely manner. If the issue persists
					please contact support for assistance.
				</Typography>
				<button
					type="button"
					className="colored-sky-btn mt-4"
					onClick={() => nav('/support')}
				>
					Contact Support
				</button>
			</div>
		);

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
							subscriptions. Add to your list to include in StreamLines bundle
							optimization algorithm.
						</Typography>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll p-0">
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
							<ListItem
								key={index}
								onClick={() =>
									nav(`/media/${release.media_type}/${release.id}`)
								}
							>
								<ListItemPrefix>
									<img
										className="w-20 object-cover rounded-md"
										src={`https://image.tmdb.org/t/p/original${release.poster_path}`}
										alt={release.title || release.name}
									/>
								</ListItemPrefix>
								<div className="container w-3/4 h-full">
									<Typography className="text-slate-900" variant="h5">
										{release.title || release.name}
									</Typography>
									<div className="flex items-center space-x-2">
										<Typography className="font-bold text-slate-800">
											{release.first_air_date === undefined
												? new Date(release.release_date).toLocaleString(
														'en-US',
														{
															month: 'long',
															day: 'numeric',
														},
												  )
												: new Date(release.first_air_date).toLocaleString(
														'en-US',
														{
															month: 'long',
															day: 'numeric',
														},
												  )}
										</Typography>
										<div className="flex items-center">
											<ClockIcon className="h-4 text-slate-900" />
											<Typography className="text-slate-900">
												{release.runtime || release.episode_run_time[0]}mins
											</Typography>
										</div>
									</div>
									<Typography className="h-12 text-slate-900 line-clamp-2">
										{release.overview}
									</Typography>
								</div>
								<ListItemSuffix>
									<Tooltip content="Add to Watchlist" className="bg-sky-600">
										<IconButton
											variant="text"
											color="blue-gray"
											onClick={() =>
												addToUserList(release.id, release.media_type)
											}
										>
											<PlusIcon className="h-6" />
										</IconButton>
									</Tooltip>
								</ListItemSuffix>
							</ListItem>
						))}
					</List>
				)}
			</CardBody>
		</Card>
	);
}
