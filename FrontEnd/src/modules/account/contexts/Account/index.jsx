import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const accordionData = [
	{
		subscription_image_path:
			'https://1000logos.net/wp-content/uploads/2017/05/Netflix_logo_PNG4.png',
		subscription_name: 'Netflix',
		versions: [
			{
				name: 'Standard',
				cost: '8.99',
			},
		],
	},
	{
		subscription_image_path:
			'https://1000logos.net/wp-content/uploads/2020/12/Hulu-Logo-PNG.png',
		subscription_name: 'Hulu',
		versions: [
			{
				name: 'Standard',
				cost: '8.99',
			},
			{
				name: 'With Ads',
				cost: '6.99',
			},
		],
	},
	{
		subscription_image_path:
			'https://1000logos.net/wp-content/uploads/2022/02/HBO-Max-Logo-PNG6.png',
		subscription_name: 'HBO Max',
		versions: [
			{
				name: 'Premium',
				cost: '10.99',
			},
			{
				name: 'Standard',
				cost: '8.99',
			},
			{
				name: 'With Ads',
				cost: '6.99',
			},
		],
	},
];

export const AccountContext = createContext();

export default function AccountProvider({ children }) {
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
			console.log(data.Status);
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
		/*
		const { data } = await axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/recommendations/${query}`,
			{ withCredentials: true },
		);
		*/
		return [accordionData[2], accordionData[1]];
		//return data;
	};

	const recommendSubscriptions = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/recommendations/',
			{ withCredentials: true },
		);
		console.log(data);
		return accordionData;
		//return data;
	};

	const addSubscription = async (subscription) => {
		try {
			await axios.post(
				'https://streamline-backend-82dbd26e19c5.herokuapp.com/settings/user-subscriptions/add/',
				subscription,
				{ withCredentials: true },
			);
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
			toast.success('Subscription Will Be Canceled', defaultToast);
		} catch (error) {
			toast.error(
				'Error canceling subscription, please try again later',
				defaultToast,
			);
		}
	};

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
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}

AccountProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
