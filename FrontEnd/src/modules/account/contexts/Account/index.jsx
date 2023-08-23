import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AccountContext = createContext();

export default function AccountProvider({ children }) {
	const APIKEY = '95cd5279f17c6593123c72d04e0bedfa';

	const checkInList = async (id, type) => {
		const response = await axios.get(
			'http://127.0.0.1:8000/isInWatchlist/',
			{ id: id, media_type: type },
			{ withCredentials: true },
		);
		console.log(response);
		return response.status;
	};

	const fetchUpcoming = async () => {
		const { data } = await axios.get('http://127.0.0.1:8000/getAllUpcoming/', {
			withCredentials: true,
		});
		return data;
	};

	const fetchSubscriptions = async () => {
		const { data } = await axios.get(
			'http://127.0.0.1:8000/api/user/subscriptions/view/',
			{ withCredentials: true },
		);
		return data;
	};

	const fetchBudget = async () => {
		const { data } = await axios.get('http://127.0.0.1:8000/returnData/', {
			withCredentials: true,
		});
		return data.budget;
	};

	const fetchList = async () => {
		const { data } = await axios.get('http://127.0.0.1:8000/returnData/', {
			withCredentials: true,
		});

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

	const removeFromList = async (id, type) => {
		try {
			await axios.post(
				'http://127.0.0.1:8000/removeMedia/',
				{ id: id, media_type: type },
				{ withCredentials: true },
			);
			toast.success('Removed from Watchlist', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		} catch (error) {
			toast.error('Remove from watchlist failed, please try again later', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	};

	const addToUserList = async (id, type) => {
		try {
			await axios.post(
				'http://127.0.0.1:8000/saveMedia/',
				{ id: id, media_type: type },
				{ withCredentials: true },
			);
			toast.success('Added to Watchlist', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		} catch (error) {
			toast.error('Add to watchlist failed, please try again later', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	};

	return (
		<AccountContext.Provider
			value={{
				fetchUpcoming,
				fetchSubscriptions,
				fetchBudget,
				fetchList,
				removeFromList,
				addToUserList,
				checkInList,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}

AccountProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
