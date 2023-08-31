import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const MediaContext = createContext();

export default function MediaProvider({ children }) {
	const APIKEY = '95cd5279f17c6593123c72d04e0bedfa';

	const fetchMedia = async (type, id) => {
		const { data } = await axios.post(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/return-media-info/',
			{ media_type: type, id: id },
		);
		return data;
	};

	const fetchCast = async (type, id) => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${APIKEY}&language`,
		);
		return data;
	};

	const fetchVideo = async (type, id) => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${APIKEY}&language=en-US`,
		);
		return data.results;
	};

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US&region=US`,
		);
		return data.results;
	};

	const fetchStaffPicks = async () => {
		const { data } = await axios.get(
			'https://streamline-backend-82dbd26e19c5.herokuapp.com/api/staff-picks/',
		);
		return data;
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

	return (
		<MediaContext.Provider
			value={{
				fetchSearch,
				fetchVideo,
				fetchCast,
				fetchTrending,
				fetchNewlyReleased,
				fetchStaffPicks,
				fetchMedia,
			}}
		>
			{children}
		</MediaContext.Provider>
	);
}

MediaProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
