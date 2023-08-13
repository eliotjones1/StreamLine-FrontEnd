import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const APIContext = createContext();

function APIProvider({ children }) {
  const TMDBAPIKEY = '95cd5279f17c6593123c72d04e0bedfa';

  const fetchTrendingContent = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${TMDBAPIKEY}&language=en-US&region=US`);
    return data.results;
  };

  const fetchContentData = async (type, id) => {
    const [data, cast, video] = await Promise.all([
      axios.post('http://127.0.0.1:8000/returnInfo/', { media_type: type, id: id }).then(response => response.data),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${TMDBAPIKEY}&language`).then(response => response.data.cast),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDBAPIKEY}&language=en-US`).then(response => response.data.results)
    ]);

    return {
      data,
      cast,
      video,
    };
  };


  return (
    <APIContext.Provider
      value={{
        fetchContentData,
        fetchTrendingContent,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default APIProvider;