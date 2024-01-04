import PropTypes from 'prop-types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { StreamLineAxios, fetchStreamLine } from 'api/axios.config';
import { defaultToast } from 'api/toast.config';

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
			{ type: 'movie', id: '572802' },
			{ type: 'tv', id: '108978' },
			{ type: 'movie', id: '726209' },
			{ type: 'movie', id: '848326' },
			{ type: 'tv', id: '146176' },
			{ type: 'tv', id: '93740' },
			{ type: 'movie', id: '872585' },
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
				fetchAllServices: () => fetchStreamLine('/api/all-services/'),
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
