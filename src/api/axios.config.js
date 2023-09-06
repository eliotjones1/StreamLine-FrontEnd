import axios from 'axios';

// Set API base URLs here
export const STREAMLINE_URL =
	'https://streamline-backend-82dbd26e19c5.herokuapp.com';
export const TMDB_URL = 'https://api.themoviedb.org/3';

// Set API keys here
export const TMDB_KEY = '95cd5279f17c6593123c72d04e0bedfa';

// Create and export Axios instances with common configurations
export const StreamLineAxios = axios.create({
	baseURL: STREAMLINE_URL,
	withCredentials: true,
});
export const TMDBAxios = axios.create({
	baseURL: TMDB_URL,
	params: {
		api_key: TMDB_KEY,
		language: 'en-US',
	},
});

// Basic Get Requests
export const fetchStreamLine = async (url) => {
	const { data } = await StreamLineAxios.get(url);
	return data;
};
export const fetchTMDB = async (url) => {
	const { data } = await TMDBAxios.get(url);
	return data;
};
