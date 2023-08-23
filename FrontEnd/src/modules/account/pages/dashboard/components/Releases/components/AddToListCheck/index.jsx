import { useAccount } from 'src/modules/account/hooks';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/common/components';

export default function AddToListCheck({ id, type }) {
	const { checkInList, addToUserList } = useAccount();

	const { status, data } = useQuery({
		queryKey: ['account', 'inList?', { id, type }],
		queryFn: () => checkInList(id, type),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<Tooltip content="Add to Watchlist" className="bg-sky-600">
			<IconButton
				className="z-10"
				variant="text"
				color="blue-gray"
				disabled={data}
				onClick={() => addToUserList(id, type)}
			>
				<PlusIcon className="h-6" />
			</IconButton>
		</Tooltip>
	);
}

AddToListCheck.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
};
