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
	Spinner,
	CardBody,
	Avatar,
} from '@material-tailwind/react';
import { DeleteDialog } from './components';
import { useQuery } from '@tanstack/react-query';

const TABLE_HEAD = ['Service', 'Version', 'Cost', 'Next Payment', ''];

const TABLE_ROWS = [
	{
		name: 'Netflix',
		version: 'Standard',
		cost: 10.49,
		paymentDate: '04-20-18',
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
	},
	{
		name: 'Hulu',
		version: 'With Ads',
		cost: 15.49,
		paymentDate: '04-21-18',
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
	},
	{
		name: 'Disney+',
		version: 'No Ads',
		cost: 20.49,
		paymentDate: '04-22-18',
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
	},
	{
		name: 'Amazon Prime Video',
		version: 'Test',
		cost: 5.49,
		paymentDate: '04-23-18',
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
	},
];

export default function SortableTable() {
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
		queryFn: () => {
			return TABLE_ROWS;
		},
	});

	const sortedRows =
		data === undefined
			? []
			: [...data].sort((a, b) => {
					if (sortColumn !== null) {
						const columnKey = Object.keys(a)[sortColumn];
						const aValue = a[columnKey];
						const bValue = b[columnKey];
						console.log(columnKey + ':' + aValue + ' ____ ' + bValue);

						if (aValue < bValue) {
							return sortOrder === 'asc' ? -1 : 1;
						}
						if (aValue > bValue) {
							return sortOrder === 'asc' ? 1 : -1;
						}
					}
					return 0;
			  });

	if (status === 'loading')
		return (
			<div className="flex h-full w-full bg-slate-50 rounded-lg items-center justify-center">
				<Spinner className="h-12 w-12" color="blue" />
			</div>
		);
	if (status === 'error') return <></>;

	return (
		<Card className="h-full w-full bg-slate-50 h-[34rem]">
			<CardHeader
				floated={false}
				shadow={false}
				className="rounded-none bg-slate-50"
			>
				<div className="flex items-center justify-between gap-8">
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
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="mt-4 w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head, index) => (
								<th
									key={head}
									className="cursor-pointer border-y border-slate-300 bg-slate-200 p-4 transition-colors hover:bg-slate-100"
									onClick={() => handleHeaderClick(index)}
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
						{sortedRows.map(
							({ img, name, cost, version, paymentDate }, index) => {
								const isLast = index === sortedRows.length - 1;
								const classes = isLast
									? 'p-4'
									: 'p-4 border-b border-blue-gray-50';

								return (
									<tr key={name}>
										<td className={classes}>
											<div className="flex items-center gap-3">
												<Avatar
													src={img}
													alt={name}
													size="md"
													className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
												/>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-bold"
												>
													{name}
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
													{version}
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
													${cost.toFixed(2)}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{new Date(paymentDate).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												})}
											</Typography>
										</td>
										<td className={classes}>
											<DeleteDialog name={name} date={paymentDate} />
										</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
}
