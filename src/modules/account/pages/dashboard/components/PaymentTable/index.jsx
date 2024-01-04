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
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { toast } from 'react-toastify';
import { defaultToast } from 'api/toast.config';

const TABLE_HEAD = ['Transaction', 'Amount', 'Date', 'Status', 'Account'];

import { useAccount } from 'src/modules/common/hooks';

export default function TransactionsTable() {
	const [page, setPage] = useState(1);
	const { fetchHistory } = useAccount();

	const { status, data } = useQuery({
		queryKey: ['account', 'payment history', page],
		keepPreviousData: true,
		queryFn: () => fetchHistory(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	console.log(data);

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
							<Button
						    className="flex items-center gap-3 bg-sky-600"
						    size="md"
						    onClick={() => toast.info("Feature coming soon!", defaultToast)}
						  >
						    <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
						  </Button>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="w-full min-w-max table-auto text-left">
					<TableHeader headers={TABLE_HEAD} />
					<TableBody tableRows={data.payments} />
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
