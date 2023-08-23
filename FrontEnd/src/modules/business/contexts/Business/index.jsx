import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BusinessContext = createContext();

export default function BusinessProvider({ children }) {
	const [content, setContent] = useState([]);
	const [filteredContent, setFilteredContent] = useState([]);
	const [filter, setFilter] = useState('');

	const fetchServices = () => {
		axios
			.get(
				`https://streamline-backend-82dbd26e19c5.herokuapp.com/api/search/services/`,
			)
			.then((response) => {
				setFilteredContent(response.data);
				setContent(response.data);
			});
	};

	const updateFilter = (filterString) => {
		setFilter(filterString);
		if (!filterString) {
			setFilteredContent(content);
		}
		const filterLowerCase = filterString.toLowerCase();
		const filteredList = content.filter((obj) => {
			const titleLowerCase = obj.title.toLowerCase();
			return titleLowerCase.includes(filterLowerCase);
		});
		setFilteredContent(filteredList);
	};

	useEffect(() => {
		fetchServices();
	}, []);

	return (
		<BusinessContext.Provider
			value={{
				filter,
				updateFilter,
				filteredContent,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
}
