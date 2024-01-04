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
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { DeleteDialog, RenewDialog, SwapDialog } from './components';

export default function ActionsDialog({ subscription }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<Tooltip content="Subscription Actions" className="bg-slate-900">
				<IconButton variant="text">
					<EllipsisHorizontalIcon className="h-4 w-4" onClick={handleOpen} />
				</IconButton>
			</Tooltip>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					<Typography variant="h3">Subscription Actions</Typography>
				</DialogHeader>
				<DialogBody
					divider
					className="grid grid-cols-3 place-items-center gap-4"
				>
					<RenewDialog subscription={subscription} closeMain={handleOpen} />
					<SwapDialog subscription={subscription} closeMain={handleOpen} />
					<DeleteDialog subscription={subscription} closeMain={handleOpen} />
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

ActionsDialog.propTypes = {
	subscription: PropTypes.shape({
		subscription_name: PropTypes.string.isRequired,
		end_date: PropTypes.string.isRequired,
	}),
};
