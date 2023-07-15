// Basic Imports
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const SearchContext = createContext();

export default function SearchProvider({ children }){
  const [showDefault, setShowDefault] = useState(true)
  const [content, setContent] = useState([]);
  const [lastSearch, setLastSearch] = useState("");

  const fetchSearch = (query) => {
    axios.get(`http://127.0.0.1:8000/search/all/?search=${query}`).then(response => {
      setContent(response.data);
      setLastSearch(query);
      setShowDefault(false);
    });
  }

  return (
    <SearchContext.Provider value={{
      lastSearch,
      setLastSearch,
      content,
      showDefault,
      setShowDefault,
      fetchSearch
    }}>
      {children}
    </SearchContext.Provider>);
};