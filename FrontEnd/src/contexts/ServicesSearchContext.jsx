// Import Libraries
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ServicesSearchContext = createContext();

export default function ServicesSearchProvider({ children }){
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchServices = () => {
    axios.get(`http://127.0.0.1:8000/showServices/`).then(response => {
      setFilteredContent(response.data);
      setContent(response.data);
    });
  }

  const updateFilter = (filterString) => {
    setFilter(filterString);
    if (!filterString) {
      setFilteredContent(content);
    }
    const filterLowerCase = filterString.toLowerCase();
    const filteredList = content.filter((obj) => {
      const titleLowerCase = obj.title.toLowerCase();
      return titleLowerCase.includes(filterLowerCase);
    });
    setFilteredContent(filteredList);
  }

  useEffect(() => {
    fetchServices();
  }, [])

  return (
    <ServicesSearchContext.Provider value={{
      filter,
      updateFilter,
      filteredContent
    }}>
      {children}
    </ServicesSearchContext.Provider>);
};