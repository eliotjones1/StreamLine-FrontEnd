import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	IconButton,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Tooltip,
	Typography,
} from '@material-tailwind/react';
import {
	TrashIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useAccount } from 'src/modules/account/hooks';

export default function DeleteDialog({ subscription }) {
	console.log(subscription);
	const [open, setOpen] = useState(false);
	const { deleteSubscription } = useAccount();

	const handleOpen = () => setOpen(!open);

	const cancel = () => {
		setOpen(!open);
		deleteSubscription(subscription);
	};

	return (
		<>
			<Tooltip content="Cancel Subscription" className="bg-slate-900">
				<IconButton variant="text">
					<TrashIcon className="h-4 w-4" onClick={handleOpen} />
				</IconButton>
			</Tooltip>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					<Typography variant="h3" color="red">
						Confirm Cancelation
					</Typography>
				</DialogHeader>
				<DialogBody divider className="grid place-items-center gap-4">
					<ExclamationTriangleIcon color="red" className="h-16  w-16" />
					<Typography color="red" variant="h4">
						Are you sure you want to cancel?
					</Typography>
					<Typography className="text-center font-normal">
						This action is permanent and can not be undone. Your access to{' '}
						<span className="font-bold text-slate-900">
							{subscription.subscription_name}
						</span>{' '}
						will be revoked on{' '}
						<span className="font-bold text-slate-900">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							}).format(new Date(subscription.end_date.replace(/-/g, '/')))}
						</span>
						.
					</Typography>
				</DialogBody>
				<DialogFooter className="space-x-2">
					<Button variant="text" onClick={handleOpen}>
						Close
					</Button>
					<Button variant="gradient" color="red" onClick={cancel}>
						Cancel Subscription
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}

DeleteDialog.propTypes = {
	subscription: PropTypes.shape({
		subscription_name: PropTypes.string.isRequired,
		end_date: PropTypes.string.isRequired,
	}),
};
