import { createContext, useState } from 'react';
import axios from 'axios';

export const MediaContext = createContext();

export default function MediaProvider({ children }) {
  const [showDefault, setShowDefault] = useState(true);
  const [content, setContent] = useState([]);
  const [lastSearch, setLastSearch] = useState('');

  const fetchSearch = async (query) => {
    const response = await axios.get(`http://127.0.0.1:8000/search/all/?search=${query}`, {
      withCredentials: true,
    });
    console.log(response);
    setContent(response.data);
    setLastSearch(query);
    setShowDefault(false);
  };

  const returnToMain = () => {
    setShowDefault(true);
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
        lastSearch,
        setLastSearch,
        content,
        showDefault,
        returnToMain,
        getGenreById,
        fetchSearch,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}
