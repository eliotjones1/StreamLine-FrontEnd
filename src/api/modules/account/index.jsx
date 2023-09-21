import PropTypes from 'prop-types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '/src/modules/common/hooks';
import { StreamLineAxios, TMDBAxios, fetchStreamLine } from 'api/axios.config';
import { defaultToast } from 'api/toast.config';

export const AccountContext = createContext();

export default function AccountProvider({ children }) {
	const queryClient = useQueryClient();
	const { logout } = useAuth();

	/*  List  */

	const fetchList = async () => {
		const userData = fetchStreamLine('/api/return-user-data/');
		const promises = userData.media.map(async (media) => {
			const { data } = await TMDBAxios.get(`/${data.media_type}/${data.id}`);
			data.media_type = media.media_type;
			return data;
		});
		const results = await Promise.all(promises);
		return results;
	};

	const searchList = async (id, type) => {
		try {
			const { data } = await StreamLineAxios.get('/api/in-user-watchlist', {
				params: { id: id, media_type: type },
			});
			if (data.Status === 'false') return false;
			return true;
		} catch (error) {
			return true;
		}
	};

	const modifyList = async (id, type, action) => {
		try {
			await StreamLineAxios.post(`/api/${action}-media/`, {
				id: id,
				media_type: type,
			});
			queryClient.invalidateQueries(['account', 'inList?', { id, type }]);

			const successMessage =
				action === 'remove' ? 'Removed from Watchlist' : 'Added to Watchlist';
			toast.success(successMessage, defaultToast);
		} catch (error) {
			const errorMessage =
				action === 'remove' ? 'Remove from watchlist' : 'Add to watchlist';
			toast.error(
				`${errorMessage} failed, please try again later`,
				defaultToast,
			);
		}
	};

	/*  Subscriptions  */

	const modifySubscriptions = async (subscription, action) => {
		try {
			await StreamLineAxios.post(
				`/settings/user-subscriptions/${action}/`,
				subscription,
			);
			queryClient.invalidateQueries(['account', 'subscriptions']);
			queryClient.invalidateQueries([
				'account',
				'subscription recommendations',
				'',
			]);
			toast.success(`Subscription will be ${action}ed`, defaultToast);
		} catch (error) {
			toast.error(
				`Error ${action}ing subscription, please try again later`,
				defaultToast,
			);
		}
	};

	/*  Account Information  */

	const modifyAccount = async (action, requestData = {}) => {
		try {
			await StreamLineAxios.post(`/api/user/settings/${action}/`, requestData);
			queryClient.invalidateQueries(['account', 'information']);
			if (action === 'delete') logout();
			toast.success(`Account ${action}d`, defaultToast);
		} catch (error) {
			toast.error(
				`Error ${action.slice(0, -1)}ing account , please try again later`,
				defaultToast,
			);
		}
	};

	return (
		<AccountContext.Provider
			value={{
				fetchList,
				checkInList: (id, type) => searchList(id, type),
				addToUserList: (id, type) => modifyList(id, type, 'save'),
				removeFromList: (id, type) => modifyList(id, type, 'remove'),
				fetchSubscriptions: () =>
					fetchStreamLine('/settings/user-subscriptions/view'),
				recommendSubscriptions: () =>
					fetchStreamLine('/settings/user-subscriptions/recommendations'),
				searchSubscriptions: (query) =>
					fetchStreamLine(`/api/search/services?search=${query}`),
				addSubscription: (subscription) =>
					modifySubscriptions(subscription, 'create'),
				deleteSubscription: (subscription) =>
					modifySubscriptions(subscription, 'cancel'),
				fetchUpcoming: () => fetchStreamLine('/api/get-upcoming/'),
				fetchHistory: () => fetchStreamLine('/webhooks/user-payments'),
				fetchAccountInfo: () => fetchStreamLine('/settings/get-user-settings/'),
				deleteAccount: () => modifyAccount('delete'),
				updateAccount: (newInfo) => modifyAccount('update', newInfo),
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}

AccountProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
