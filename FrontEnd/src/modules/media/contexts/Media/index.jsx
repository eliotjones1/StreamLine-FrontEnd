import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const MediaContext = createContext();

export default function MediaProvider({ children }) {
	const APIKEY = '95cd5279f17c6593123c72d04e0bedfa';

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US&region=US`,
		);
		return data.results;
	};

	const fetchNewlyReleased = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/newly-released/',
		);
		return data;
	};

	const fetchSearch = async (query) => {
		const { data } = await axios.get(
			`https://streamline-backend-82dbd26e19c5.herokuapp.com/api/search/all?search=${query}`,
			{
				withCredentials: true,
			},
		);
		return data;
	};

	const getGenreById = (id) => {
		const genres = [
			{ id: 12, name: 'Adventure' },
			{ id: 14, name: 'Fantasy' },
			{ id: 16, name: 'Animation' },
			{ id: 18, name: 'Drama' },
			{ id: 27, name: 'Horror' },
			{ id: 28, name: 'Action' },
			{ id: 35, name: 'Comedy' },
			{ id: 36, name: 'History' },
			{ id: 37, name: 'Western' },
			{ id: 53, name: 'Thriller' },
			{ id: 80, name: 'Crime' },
			{ id: 99, name: 'Documentary' },
			{ id: 878, name: 'Science Fiction' },
			{ id: 9648, name: 'Mystery' },
			{ id: 10402, name: 'Music' },
			{ id: 10749, name: 'Romance' },
			{ id: 10751, name: 'Family' },
			{ id: 10752, name: 'War' },
			{ id: 10759, name: 'Action & Adventure' },
			{ id: 10762, name: 'Kids' },
			{ id: 10763, name: 'News' },
			{ id: 10764, name: 'Reality' },
			{ id: 10765, name: 'Sci-Fi & Fantasy' },
			{ id: 10766, name: 'Soap' },
			{ id: 10767, name: 'Talk' },
			{ id: 10768, name: 'War & Politics' },
			{ id: 10770, name: 'TV Movie' },
		];
		const genre = genres.find((genre) => genre.id === id);
		return genre ? genre.name : 'Unknown Genre';
	};

	return (
		<MediaContext.Provider
			value={{
				getGenreById,
				fetchSearch,
				fetchTrending,
				fetchNewlyReleased,
			}}
		>
			{children}
		</MediaContext.Provider>
	);
}

MediaProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
