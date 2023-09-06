import { createContext } from 'react';
import PropTypes from 'prop-types';
import {
	StreamLineAxios,
	fetchStreamLine,
	fetchTMDB,
} from '../../axios.config';

export const MediaContext = createContext();

export default function MediaProvider({ children }) {
	const fetchMedia = async (type, id) => {
		const { data } = await StreamLineAxios.post('/api/return-media-info/', {
			media_type: type,
			id: id,
		});
		return data;
	};

	return (
		<MediaContext.Provider
			value={{
				fetchSearch: (query) =>
					fetchStreamLine(`/api/search/all?search=${query}`),
				fetchVideo: (type, id) => fetchTMDB(`/${type}/${id}/videos`),
				fetchCast: (type, id) => fetchTMDB(`/${type}/${id}/credits`),
				fetchTrending: () => fetchTMDB(`/trending/all/week?&region=US`),
				fetchNewlyReleased: () => fetchStreamLine('/api/newly-released/'),
				fetchStaffPicks: () => fetchStreamLine('/api/staff-picks/'),
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
