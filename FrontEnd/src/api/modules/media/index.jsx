import { createContext } from 'react';
import PropTypes from 'prop-types';
import { StreamLineAxios, TMDBAxios } from '../../axios.config';

export const MediaContext = createContext();

export default function MediaProvider({ children }) {
	const fetchMedia = async (type, id) => {
		const { data } = await StreamLineAxios.post('/api/return-media-info/', {
			media_type: type,
			id: id,
		});
		return data;
	};

	const fetchCast = async (type, id) => {
		const { data } = await TMDBAxios.get(`/${type}/${id}/credits`);
		return data;
	};

	const fetchVideo = async (type, id) => {
		const { data } = await TMDBAxios.get(`/${type}/${id}/videos`);
		return data.results;
	};

	const fetchTrending = async () => {
		const { data } = await TMDBAxios.get(`/trending/all/week?&region=US`);
		return data.results;
	};

	const fetchStaffPicks = async () => {
		const { data } = await StreamLineAxios.get('/api/staff-picks/');
		return data;
	};

	const fetchNewlyReleased = async () => {
		const { data } = await StreamLineAxios.get('/api/newly-released/');
		return data;
	};

	const fetchSearch = async (query) => {
		const { data } = await StreamLineAxios.get(
			`/api/search/all?search=${query}`,
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
