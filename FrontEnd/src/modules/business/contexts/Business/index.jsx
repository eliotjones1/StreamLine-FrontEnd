import PropTypes from 'prop-types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

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
	const fetchServices = async () => {
		const { data } = await axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/api/search/services/`,
		);
		return data;
	};

	/*  News  */
	const fetchNews = async (page) => {
		const { data } = await axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/newsletter/return-page-posts?page=${page}`,
		);
		return data;
	};

	const fetchNewsPost = async (id) => {
		const { data } = await axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/newsletter/return-post?id=${id}`,
		);
		return data;
	};

	/*  Advertising  */

	const fetchTop7Streaming = async () => {
		try {
			const { data } = await axios.get('#');
			return data;
		} catch (error) {
			return [
				{
					src: 'https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY2500_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
				{
					src: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1080_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
				{
					src: 'https://m.media-amazon.com/images/M/MV5BMTdmZjBjZjQtY2JiNS00Y2ZlLTg2NzgtMjUzMGY2OTVmOWJiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX675_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
				{
					src: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
				{
					src: 'https://m.media-amazon.com/images/M/MV5BNTg3NjcxYzgtYjljNC00Y2I2LWE3YmMtOTliZTkwYTE1MmZiXkEyXkFqcGdeQXVyNTY4NDc5MDE@._V1_FMjpg_UX1080_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
				{
					src: 'https://m.media-amazon.com/images/M/MV5BODA2Mjk0N2MtNGY0Mi00ZWFjLTkxODEtZDFjNDg4ZDliMGVmXkEyXkFqcGdeQXVyMzAzNTY3MDM@._V1_FMjpg_UY4000_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
				{
					src: 'https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UY2048_.jpg',
					alt: 'src/assets/images/no-image.jpg',
				},
			];
		}
	};

	/*  Newsletter  */

	const addToNewsletter = async (email) => {
		try {
			await axios.post(
				'http://127.0.0.1:8000/api/recommendations/saveEmail/',
				email,
				{ withCredentials: true },
			);
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
			await axios.post('http://127.0.0.1:8000/api/user/contact/', postData);
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
				fetchNews,
				fetchNewsPost,
				fetchServices,
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
