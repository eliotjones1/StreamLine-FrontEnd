import React, { createContext } from 'react';
import axios from 'axios';

export const TMDBContext = createContext();

export default function TMDBProvider({ children }){
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchContentData = async (type, id) => {
    const { data } = await axios.post("http://127.0.0.1:8000/returnInfo/", { media_type: type, id: id });
    return data;
  };

  const fetchCast = async (type, id) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${APIKEY}&language`);
    return data;
  }

  const fetchVideo = async (type, id) => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${APIKEY}&language=en-US`);
      return data.results;
  }

  return (
    <TMDBContext.Provider value={{
      APIKEY,
      fetchCast,
      fetchContentData,
      fetchVideo
    }}>
      {children}
    </TMDBContext.Provider>);
};