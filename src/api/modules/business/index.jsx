import PropTypes from 'prop-types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { StreamLineAxios, fetchStreamLine } from '../../axios.config';

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

export const BusinessContext = createContext();

export default function BusinessProvider({ children }) {
	/*  Advertising  */
	const fetchTop7Streaming = async (top7 = []) => {
		{
			/*try {
			//const { data } = await axios.get('#');
			//return data;
		} catch (error) {
			return [
				{ type: 'movie', id: '555299' },
				{ type: 'tv', id: '66732' },
				{ type: 'tv', id: '97546' },
				{ type: 'tv', id: '1399' },
				{ type: 'tv', id: '84773' },
				{ type: 'tv', id: '1416' },
				{ type: 'tv', id: '93405' },
			];
		} */
		}
		return [
			{ type: 'movie', id: '555299' },
			{ type: 'tv', id: '66732' },
			{ type: 'tv', id: '97546' },
			{ type: 'tv', id: '1399' },
			{ type: 'tv', id: '84773' },
			{ type: 'tv', id: '1416' },
			{ type: 'tv', id: '93405' },
		];
	};

	/*  Newsletter  */
	const addToNewsletter = async (email) => {
		try {
			await StreamLineAxios.post('/api/recommendations/saveEmail/', email);
			toast.success('Added to Newsletter', defaultToast);
		} catch (error) {
			toast.error(
				'Add to newsletter failed, please try again later',
				defaultToast,
			);
		}
	};

	/*  Customer Support  */
	const contactSupport = async (postData) => {
		try {
			await StreamLineAxios.post('/api/user/contact/', postData);
			toast.success('StreamLine will contact you shortly', defaultToast);
		} catch (error) {
			toast.error(
				'Conatct StreamLine failed, please try again later',
				defaultToast,
			);
		}
	};

	return (
		<BusinessContext.Provider
			value={{
				addToNewsletter,
				contactSupport,
				fetchNews: (page) =>
					fetchStreamLine(`/newsletter/return-page-posts?page=${page}`),
				fetchNewsPost: (id) =>
					fetchStreamLine(`/newsletter/return-post?id=${id}`),
				fetchServices: () => fetchStreamLine('/api/search/services/'),
				fetchTop7Streaming,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
}

BusinessProvider.propTypes = {
	children: PropTypes.node.isRequired,
};