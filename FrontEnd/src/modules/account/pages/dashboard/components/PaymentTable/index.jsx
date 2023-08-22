import { ArrowDownTrayIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Avatar,
	Spinner,
} from '@material-tailwind/react';
import { Pagination } from './components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const TABLE_HEAD = ['Transaction', 'Amount', 'Date', 'Status', 'Account'];

const TABLE_ROWS = [
	{
		img: '/img/logos/logo-spotify.svg',
		name: 'Spotify',
		amount: 2500,
		date: 'Wed 3:00pm',
		status: 'paid',
		account: 'visa',
		accountNumber: '1234',
		expiry: '06/2026',
	},
	{
		img: '/img/logos/logo-amazon.svg',
		name: 'Amazon',
		amount: 5000,
		date: 'Wed 1:00pm',
		status: 'paid',
		account: 'master-card',
		accountNumber: '1234',
		expiry: '06/2026',
	},
	{
		img: '/img/logos/logo-pinterest.svg',
		name: 'Pinterest',
		amount: 3400,
		date: 'Mon 7:40pm',
		status: 'pending',
		account: 'master-card',
		accountNumber: '1234',
		expiry: '06/2026',
	},
	{
		img: '/img/logos/logo-google.svg',
		name: 'Google',
		amount: 1000,
		date: 'Wed 5:00pm',
		status: 'paid',
		account: 'visa',
		accountNumber: '1234',
		expiry: '06/2026',
	},
	{
		img: '/img/logos/logo-netflix.svg',
		name: 'Netflix',
		amount: 14000,
		date: 'Wed 3:30am',
		status: 'cancelled',
		account: 'visa',
		accountNumber: '1234',
		expiry: '06/2026',
	},
];

export default function TransactionsTable() {
	const [page, setPage] = useState(1);

	const { status, data } = useQuery({
		queryKey: ['account', 'payment history', page],
		keepPreviousData: true,
		queryFn: () => {
			return {
				pageData: TABLE_ROWS,
				numPages: 10,
				curPage: page,
			};
		},
	});

	if (status === 'loading') {
		return (
			<div className="flex h-full w-full bg-slate-50 rounded-lg items-center justify-center">
				<Spinner className="h-12 w-12" color="blue" />
			</div>
		);
	}
	console.log(data);
	if (data.length === 0 || status === 'error') {
		console.log('error');
		return (
			<div className="flex h-full w-full bg-slate-50 rounded-lg items-center justify-center">
				<FaceFrownIcon className="text-slate-800 h-12 w-12" />
			</div>
		);
	}

	return (
		<Card className="h-full w-full bg-slate-50">
			<CardHeader
				floated={false}
				shadow={false}
				className="rounded-none bg-slate-50"
			>
				<div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div>
						<Typography variant="h3" color="blue-gray">
							Payment History
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							These are details about your latest streaming transactions.
						</Typography>
					</div>
					<div className="flex w-full shrink-0 gap-2 md:w-max">
						<Button className="flex items-center gap-3 bg-sky-600" size="md">
							<ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className="border-y border-slate-300 bg-slate-200 p-4"
								>
									<Typography
										variant="small"
										className="font-semibold text-slate-900 leading-none opacity-70"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.pageData.map(
							(
								{
									img,
									name,
									amount,
									date,
									status,
									account,
									accountNumber,
									expiry,
								},
								index,
							) => {
								const isLast = index === TABLE_ROWS.length - 1;
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
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												${amount.toFixed(2)}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{date}
											</Typography>
										</td>
										<td className={classes}>
											<div className="w-max">
												<Chip
													size="sm"
													variant="ghost"
													value={status}
													color={
														status === 'paid'
															? 'green'
															: status === 'pending'
															? 'amber'
															: 'red'
													}
												/>
											</div>
										</td>
										<td className={classes}>
											<div className="flex items-center gap-3">
												<div className="h-9 w-12 bg-white rounded-md border border-blue-gray-50 p-1">
													<Avatar
														src={
															account === 'visa'
																? 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png'
																: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png'
														}
														size="sm"
														alt={account}
														variant="square"
														className="h-full w-full object-contain p-1"
													/>
												</div>
												<div className="flex flex-col">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal capitalize"
													>
														{account.split('-').join(' ')} {accountNumber}
													</Typography>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal opacity-70"
													>
														{expiry}
													</Typography>
												</div>
											</div>
										</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
				<Pagination
					paginationData={{
						numPages: data.numPages,
						curPage: data.curPage,
					}}
					setPage={setPage}
				/>
			</CardFooter>
		</Card>
	);
}
