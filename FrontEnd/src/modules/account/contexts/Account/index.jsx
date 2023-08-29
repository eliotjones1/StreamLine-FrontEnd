import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '/src/modules/common/hooks';

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
	const APIKEY = '95cd5279f17c6593123c72d04e0bedfa';

	/*  List  */

	const fetchList = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/return-user-data/',
			{
				withCredentials: true,
			},
		);

		const promises = data.media.map(async (media) => {
			let { data } = await axios.get(
				`https://api.themoviedb.org/3/${media.media_type}/${media.id}?api_key=${APIKEY}`,
			);
			data.media_type = media.media_type;
			return data;
		});

		const results = await Promise.all(promises);
		return results;
	};

	const addToUserList = async (id, type) => {
		try {
			await axios.post(
				'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/save-media/',
				{ id: id, media_type: type },
				{ withCredentials: true },
			);
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
			await axios.post(
				'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/remove-media/',
				{ id: id, media_type: type },
				{ withCredentials: true },
			);
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
			const { data } = await axios.get(
				'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/in-user-watchlist',
				{ params: { id: id, media_type: type }, withCredentials: true },
			);
			if (data.Status === 'false') return false;
			return true;
		} catch (error) {
			return true;
		}
	};

	/*  Subscriptions  */

	const fetchSubscriptions = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/view/',
			{ withCredentials: true },
		);
		return data;
	};

	const searchSubscriptions = async (query) => {
		const { data } = await axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/api/search/services?search=${query}`,
			{ withCredentials: true },
		);
		return data;
	};

	const recommendSubscriptions = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/recommendations/',
			{ withCredentials: true },
		);
		return data;
	};

	const addSubscription = async (subscription) => {
		try {
			await axios.post(
				'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/create/',
				subscription,
				{ withCredentials: true },
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
			await axios.post(
				'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/cancel/',
				subscription,
				{ withCredentials: true },
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
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/get-upcoming/',
			{
				withCredentials: true,
			},
		);
		return data;
	};

	/*  Budget  */

	const fetchBudget = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/return-user-data/',
			{
				withCredentials: true,
			},
		);
		return data.budget;
	};

	/*  Account Information  */

	const fetchAccountInfo = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/get-user-settings/',
			{ withCredentials: true },
		);
		return data;
	};

	const updateAccount = async (newInfo) => {
		try {
			await axios.post(
				'http://127.0.0.1:8000/api/user/settings/update/',
				newInfo,
				{ withCredentials: true },
			);
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
			await axios.post('http://127.0.0.1:8000/api/user/settings/delete/', [], {
				withCredentials: true,
			});
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
