import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Tooltip,
	Typography,
} from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'src/modules/account/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/common/components';

export default function AddDialog() {
	const [open, setOpen] = useState(false);
	const { recommendSubscriptions } = useAccount();

	const handleOpen = () => setOpen(!open);

	const { status, data } = useQuery({
		queryKey: [],
		queryFn: () => recommendSubscriptions(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

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
				<DialogBody divider className="grid place-items-center gap-4">
					{data}
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
