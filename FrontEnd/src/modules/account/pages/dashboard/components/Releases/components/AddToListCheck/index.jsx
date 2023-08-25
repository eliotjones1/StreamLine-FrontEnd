import { useAccount } from 'src/modules/account/hooks';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/common/components';

export default function AddToListCheck({ id, type }) {
	const queryClient = useQueryClient();
	const { checkInList, addToUserList, removeFromList } = useAccount();

	const { status, data } = useQuery({
		queryKey: ['account', 'inList?', { id, type }],
		queryFn: () => checkInList(id, type),
	});

	const handleClick = async () => {
		if (data) {
			await removeFromList(id, type);
		} else {
			await addToUserList(id, type);
		}
		queryClient.invalidateQueries(['account', 'inList?', { id, type }]);
	};

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<Tooltip
			content={data ? 'Remove from Watchlist' : 'Add to Watchlist'}
			className="bg-sky-600"
		>
			<IconButton
				className="z-10"
				variant="text"
				color="blue-gray"
				onClick={handleClick}
			>
				{data ? <MinusIcon className="h-6" /> : <PlusIcon className="h-6" />}
			</IconButton>
		</Tooltip>
	);
}

AddToListCheck.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
};
