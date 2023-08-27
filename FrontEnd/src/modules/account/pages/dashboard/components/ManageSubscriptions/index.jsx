import { useState } from 'react';
import {
	ChevronUpIcon,
	ChevronDownIcon,
	ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import {
	Card,
	CardHeader,
	Typography,
	CardBody,
	Avatar,
} from '@material-tailwind/react';
import { AddDialog, DeleteDialog } from './components';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { useAccount } from 'src/modules/account/hooks';

const TABLE_HEAD = ['Service', 'Version', 'Cost', 'Status', ''];

export default function SortableTable() {
	const { fetchSubscriptions } = useAccount();
	const [sortColumn, setSortColumn] = useState(null);
	const [sortOrder, setSortOrder] = useState('asc');

	const handleHeaderClick = (columnIndex) => {
		if (columnIndex === sortColumn) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(columnIndex);
			setSortOrder('asc');
		}
	};

	const { status, data } = useQuery({
		queryKey: ['account', 'subscriptions'],
		queryFn: () => fetchSubscriptions(),
	});

	const sortedRows =
		data === undefined
			? []
			: [...data].sort((a, b) => {
					if (sortColumn !== null) {
						const columnKey = Object.keys(a)[sortColumn];
						const aValue = a[columnKey];
						const bValue = b[columnKey];

						if (typeof aValue === 'string' && typeof bValue === 'string') {
							return sortOrder === 'asc'
								? aValue.localeCompare(bValue)
								: bValue.localeCompare(aValue);
						}

						if (typeof aValue === 'number' && typeof bValue === 'number') {
							return sortOrder === 'asc' ? bValue - aValue : aValue - bValue;
						}
					}
					return 0;
			  });

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<Card className="h-full w-full bg-slate-50 h-[34rem]">
			<CardHeader
				floated={false}
				shadow={false}
				className="rounded-none bg-slate-50"
			>
				<div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div>
						<div>
							<Typography variant="h3" color="blue-gray">
								Current Subscriptions
							</Typography>
							<Typography color="gray" className="mt-1 font-normal">
								See information about all your current entertainment
								subscriptions.
							</Typography>
						</div>
					</div>
					<div className="flex w-full shrink-0 gap-2 md:w-max">
						<AddDialog />
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="mt-4 w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head, index) => (
								<th
									key={head}
									className="cursor-pointer border-y border-slate-300 bg-slate-200 p-4 transition-colors hover:bg-slate-100"
									onClick={() =>
										index === 4 ? null : handleHeaderClick(index)
									}
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex text-slate-900 font-semibold items-center justify-between gap-2 leading-none opacity-70"
									>
										{head}{' '}
										{index === sortColumn
											? sortOrder === 'asc'
												? head !== '' && (
														<ChevronUpIcon
															strokeWidth={2}
															className="h-4 w-4"
														/>
												  )
												: head !== '' && (
														<ChevronDownIcon
															strokeWidth={2}
															className="h-4 w-4"
														/>
												  )
											: head !== '' && (
													<ChevronUpDownIcon
														strokeWidth={2}
														className="h-4 w-4"
													/>
											  )}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedRows.map((subscription, index) => {
							const isLast = index === sortedRows.length - 1;
							const classes = isLast
								? 'p-4'
								: 'p-4 border-b border-blue-gray-50';

							return (
								<tr key={index}>
									<td className={classes}>
										<div className="flex items-center gap-3">
											<Avatar
												src={subscription.subscription_image_path}
												alt={subscription.subscription_name}
												size="md"
												className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
											/>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-bold"
											>
												{subscription.subscription_name}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{subscription.subscription_version}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												${subscription.subscription_price}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{new Intl.DateTimeFormat('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											}).format(
												new Date(subscription.end_date.replace(/-/g, '/')),
											)}
										</Typography>
									</td>
									<td className={classes}>
										<DeleteDialog subscription={subscription} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
}
