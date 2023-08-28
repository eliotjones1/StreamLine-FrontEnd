import { createContext } from 'react';
import axios from 'axios';

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
		console.log(data);
		return data;
	};

	return (
		<BusinessContext.Provider
			value={{
				fetchNews,
				fetchNewsPost,
				fetchServices,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
}
