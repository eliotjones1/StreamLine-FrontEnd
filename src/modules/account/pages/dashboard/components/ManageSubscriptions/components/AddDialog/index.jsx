import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Tooltip,
	Typography,
} from '@material-tailwind/react';
import { RecommendationAccordian } from './components';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'src/modules/common/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryLoading } from 'src/modules/error/components';

export default function AddDialog() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const { recommendSubscriptions, searchSubscriptions } = useAccount();

	const handleOpen = () => setOpen(!open);

	const { status, data } = useQuery({
		queryKey: ['account', 'subscription recommendations', query],
		staleTime: Infinity,
		keepPreviousData: true,
		queryFn: () =>
			query !== '' ? searchSubscriptions(query) : recommendSubscriptions(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <></>;

	return (
		<>
			<Tooltip content="Add Subscriptions" className="bg-slate-900">
				<Button
					className="flex items-center gap-3 bg-sky-600"
					size="md"
					onClick={handleOpen}
				>
					<PlusIcon strokeWidth={2} className="h-4 w-4" /> Services
				</Button>
			</Tooltip>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					<Typography className="text-sky-600" variant="h3" color="blue">
						Add New Subscriptions
					</Typography>
				</DialogHeader>
				<DialogBody
					divider
					className="grid place-items-center gap-4 max-h-[75vh] overflow-auto"
				>
					<Input
						name="search"
						color="blue"
						label="Search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						icon={<MagnifyingGlassIcon className="h-4" />}
					/>
					<RecommendationAccordian recommendations={data} close={handleOpen} />
				</DialogBody>
				<DialogFooter className="space-x-2">
					<Button variant="text" onClick={handleOpen}>
						Close
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}
