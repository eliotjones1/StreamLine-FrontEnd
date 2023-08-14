import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const TMDBContext = createContext();

export default function TMDBProvider({ children }) {
  const APIKEY = '95cd5279f17c6593123c72d04e0bedfa';

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US&region=US`);
    console.log(data);
    return data.results;
  };

  const fetchNewlyReleased = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/recent/');
    console.log(data);
    return data;
  };

  const fetchStaffPicks = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/staffpicks/');
    return data;
  };

  const fetchContentData = async (type, id) => {
    const [data, cast, video] = await Promise.all([
      axios.post('http://127.0.0.1:8000/returnInfo/', { media_type: type, id: id }).then(response => response.data),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${APIKEY}&language`).then(response => response.data.cast),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${APIKEY}&language=en-US`).then(response => response.data.results)
    ]);

    return {
      data,
      cast,
      video,
    };
  };


  return (
    <TMDBContext.Provider
      value={{
        fetchContentData,
        fetchTrending,
        fetchStaffPicks,
        fetchNewlyReleased
      }}
    >
      {children}
    </TMDBContext.Provider>
  );
}

TMDBProvider.propTypes = {
  children: PropTypes.node.isRequired,
};