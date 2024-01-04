import { useAccount } from 'src/modules/account/hooks';
import PropTypes from 'prop-types';
import { useAuth } from 'src/modules/common/hooks';
import { Tooltip, IconButton } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function AddToListCheck({ id, type, tooltipPlacement = 'top' }) {
	const { isLoggedIn } = useAuth();
	const { checkInList, addToUserList, removeFromList } = useAccount();

	const handleClick = async () => {
		isLoggedIn
			? data
				? await removeFromList(id, type)
				: await addToUserList(id, type)
			: null;
	};

	const { status, data } = useQuery({
		queryKey: ['account', 'inList?', { id, type }],
		staleTime: new Date().setUTCHours(23, 59, 59, 999) - new Date(), // Until Next Day
		queryFn: () => checkInList(id, type),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<Tooltip
			placement={tooltipPlacement}
			content={
				isLoggedIn
					? data
						? 'Remove from Watchlist'
						: 'Add to Watchlist'
					: 'Login to access Watchlist'
			}
			className="bg-sky-600"
		>
	<IconButton
		className="z-10 bg-gray-300 rounded-full"
		variant="text"
		color="blue-gray"
		onClick={handleClick}
	>
		{isLoggedIn && data ? (
			<MinusIcon className="h-6 rounded-full" />
		) : (
			<PlusIcon className="h-6 rounded-full" />
		)}
	</IconButton>
		</Tooltip>
	);
}

AddToListCheck.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	tooltipPlacement: PropTypes.string,
};
