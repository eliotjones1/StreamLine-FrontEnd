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
		if (data) {
			await removeFromList(id, type);
		} else {
			await addToUserList(id, type);
		}
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
					: 'Login to access watchlist'
			}
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
	tooltipPlacement: PropTypes.string,
};