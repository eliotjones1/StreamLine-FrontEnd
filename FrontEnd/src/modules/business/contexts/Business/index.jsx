import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BusinessContext = createContext();

export default function BusinessProvider({ children }) {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchServices = () => {
    axios.get(`http://127.0.0.1:8000/showServices/`).then((response) => {
      setFilteredContent(response.data);
      setContent(response.data);
    });
  };

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
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <BusinessContext.Provider
      value={{
        filter,
        updateFilter,
        filteredContent,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}