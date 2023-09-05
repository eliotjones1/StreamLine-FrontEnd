import PropTypes from 'prop-types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '/src/modules/common/hooks';
import { StreamLineAxios, TMDBAxios } from '../../axios.config';

const defaultToast = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
};

export const AccountContext = createContext();

export default function AccountProvider({ children }) {
	const queryClient = useQueryClient();
	const { logout } = useAuth();

	/*  List  */

	const fetchList = async () => {
		const { data: userData } = StreamLineAxios.get('/api/return-user-data/');

		const promises = userData.media.map(async (media) => {
			let { data: mediaData } = await TMDBAxios.get(
				`/${media.media_type}/${media.id}`,
			);
			mediaData.media_type = media.media_type;
			return mediaData;
		});

		const results = await Promise.all(promises);
		return results;
	};

	const addToUserList = async (id, type) => {
		try {
			await StreamLineAxios.post('/api/save-media/', {
				id: id,
				media_type: type,
			});
			queryClient.invalidateQueries(['account', 'inList?', { id, type }]);
			toast.success('Added to Watchlist', defaultToast);
		} catch (error) {
			toast.error(
				'Add to watchlist failed, please try again later',
				defaultToast,
			);
		}
	};

	const removeFromList = async (id, type) => {
		try {
			await StreamLineAxios.post('/api/remove-media/', {
				id: id,
				media_type: type,
			});
			queryClient.invalidateQueries(['account', 'inList?', { id, type }]);
			toast.success('Removed from Watchlist', defaultToast);
		} catch (error) {
			toast.error(
				'Remove from watchlist failed, please try again later',
				defaultToast,
			);
		}
	};

	const checkInList = async (id, type) => {
		try {
			const { data } = await StreamLineAxios.post('/api/save-media/', {
				params: { id: id, media_type: type },
			});
			if (data.Status === 'false') return false;
			return true;
		} catch (error) {
			return true;
		}
	};

	/*  Subscriptions  */

	const fetchSubscriptions = async () => {
		const { data } = StreamLineAxios.get('/settings/user-subscriptions/view/');
		return data;
	};

	const searchSubscriptions = async (query) => {
		const { data } = await StreamLineAxios.get(
			`/api/search/services?search=${query}`,
		);
		return data;
	};

	const recommendSubscriptions = async () => {
		const { data } = await StreamLineAxios.get(
			'/settings/user-subscriptions/recommendations/',
		);
		return data;
	};

	const addSubscription = async (subscription) => {
		try {
			await StreamLineAxios.post(
				'/settings/user-subscriptions/create/',
				subscription,
			);
			queryClient.invalidateQueries(['account', 'subscriptions']);
			queryClient.invalidateQueries([
				'account',
				'subscription recommendations',
				'',
			]);
			toast.success('Subscription Will Be Added', defaultToast);
		} catch (error) {
			toast.error(
				'Error adding subscription, please try again later',
				defaultToast,
			);
		}
	};

	const deleteSubscription = async (subscription) => {
		try {
			await StreamLineAxios.post(
				'/settings/user-subscriptions/cancel/',
				subscription,
			);
			queryClient.invalidateQueries(['account', 'subscriptions']);
			queryClient.invalidateQueries([
				'account',
				'subscription recommendations',
				'',
			]);
			toast.success('Subscription Will Be Canceled', defaultToast);
		} catch (error) {
			toast.error(
				'Error canceling subscription, please try again later',
				defaultToast,
			);
		}
	};

	/*  Possible Interests  */

	const fetchUpcoming = async () => {
		const { data } = await StreamLineAxios.get('/api/get-upcoming/');
		return data;
	};

	/*  Finances  */

	const fetchHistory = async () => {
		const { data } = await StreamLineAxios.get('/webhooks/user-payments');
		return data;
	};

	const fetchBudget = async () => {
		const { data } = await StreamLineAxios.get('/api/return-user-data/');
		return data.budget;
	};

	/*  Account Information  */

	const fetchAccountInfo = async () => {
		const { data } = await StreamLineAxios.get('/settings/get-user-settings/');
		return data;
	};

	const updateAccount = async (newInfo) => {
		try {
			await StreamLineAxios.post('/api/user/settings/update/', newInfo);
			queryClient.invalidateQueries(['account', 'information']);
			toast.success('Account Updated', defaultToast);
		} catch (error) {
			toast.error(
				'Error updating account, please try again later',
				defaultToast,
			);
		}
	};

	const deleteAccount = async () => {
		try {
			await StreamLineAxios.post('/api/user/settings/delete/', {});
			logout();
			queryClient.invalidateQueries(['account', 'information']);
			toast.success('Account Deleted', defaultToast);
		} catch (error) {
			toast.error(
				'Error deleting account, please try again later',
				defaultToast,
			);
		}
	};

	return (
		<AccountContext.Provider
			value={{
				fetchList,
				addToUserList,
				removeFromList,
				checkInList,
				fetchSubscriptions,
				searchSubscriptions,
				recommendSubscriptions,
				addSubscription,
				deleteSubscription,
				fetchUpcoming,
				fetchHistory,
				fetchBudget,
				deleteAccount,
				fetchAccountInfo,
				updateAccount,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}

AccountProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
