import { useAccount } from 'src/modules/account/hooks';
import { Tooltip, IconButton } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function AddToListCheck({ id, type }) {
	const { checkInList, addToUserList } = useAccount();
	console.log(id, type);

	return (
		<Tooltip content={'Add to Watchlist'} className="bg-sky-600">
			<IconButton
				variant="text"
				color="blue-gray"
				disabled={checkInList(id, type)}
				onClick={() => addToUserList(id, type)}
			>
				<PlusIcon className="h-6" />
			</IconButton>
		</Tooltip>
	);
}
