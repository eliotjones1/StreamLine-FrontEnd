import { createContext } from 'react';
import axios from 'axios';

export const BusinessContext = createContext();

export default function BusinessProvider({ children }) {
	const fetchServices = async () => {
		const { data } = axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/api/search/services/`,
		);
		return data;
	};

	return (
		<BusinessContext.Provider
			value={{
				fetchServices,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
}
