import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	CardFooter,
} from '@material-tailwind/react';
import { Pagination, TableBody, TableHeader } from './components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/common/components';

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

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

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
					<TableHeader headers={TABLE_HEAD} />
					<TableBody tableRows={data.pageData} />
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
				<Pagination
					totalPages={data.numPages}
					curPage={data.curPage}
					setPage={setPage}
				/>
			</CardFooter>
		</Card>
	);
}
