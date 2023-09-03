import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
} from '@material-tailwind/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'src/modules/common/hooks';

export default function RenewDialog({ subscription, closeMain }) {
	const [open, setOpen] = useState(false);
	const { renewSubscription } = useAccount();

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleRenew = () => {
		closeMain();
		setOpen(false);
		//renewSubscription(subscription);
	};

	return (
		<>
			<Button
				color="green"
				className="flex flex-col items-center justify-center outline-solid space-y-2"
				onClick={handleOpen}
			>
				<CheckIcon className="h-6 w-6" color="white" />
				<Typography variant="h5" color="white">
					Renew
				</Typography>
			</Button>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					<Typography variant="h3" color="green">
						Confirm Renewal
					</Typography>
				</DialogHeader>
				<DialogBody divider className="grid place-items-center gap-4">
					<Typography color="green" variant="h4">
						Are you sure you want to renew?
					</Typography>
					<Typography className="text-center font-normal">
						This action is the default action and your{' '}
						<span className="font-bold text-slate-900">
							{subscription.subscription_name}
						</span>{' '}
						subscription will be automatically renewed on{' '}
						<span className="font-bold text-slate-900">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							}).format(new Date(subscription.end_date.replace(/-/g, '/')))}
						</span>{' '}
						if no alternative action is selected.
					</Typography>
				</DialogBody>
				<DialogFooter className="space-x-2">
					<Button variant="text" onClick={handleOpen}>
						Close
					</Button>
					<Button variant="gradient" color="green" onClick={handleRenew}>
						Renew Subscription
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}

RenewDialog.propTypes = {
	subscription: PropTypes.shape({
		subscription_name: PropTypes.string.isRequired,
		end_date: PropTypes.string.isRequired,
	}),
	closeMain: PropTypes.func.isRequired,
};
