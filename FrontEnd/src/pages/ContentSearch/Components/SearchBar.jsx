import React, { useContext, useState, useMemo, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import Fuse from 'fuse.js';
import axios from 'axios';

// Import Contexts
import { SearchContext } from '../../../contexts/SearchContext';

export default function Searchbar() {
  const { fetchSearch } = useContext(SearchContext);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [autosuggestions, setAutoSuggestions] = useState([]);

  const fetchAutoSuggestions = () => {
    setAutoSuggestions([
      "Star Wars",
      "Star Wars",
      "Star Wars",
      "Star Wars"
    ]);
    
    axios.get("http://127.0.0.1:8000/getAutofill/").then(response => {
      console.log(response);
      setAutoSuggestions(response);
    });
  }

  useEffect(() => {
    fetchAutoSuggestions()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchSearch(value);
      setValue('');
    } catch (error) {
      console.error('Error fetching search:', error);
    }
  };

  const options = {
    keys: ['title'],
    threshold: 0.3,
  };

  const fuse = new Fuse(autosuggestions, options);

  const onInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const filteredSuggestions = fuse.search(value).map((result) => result.item);
    const limitedSuggestions = filteredSuggestions.slice(0, 2);
    setSuggestions(limitedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionClick = async (event, { suggestion }) => {
    try {
      await fetchSearch(suggestion);
      setValue('');
    } catch (error) {
      console.error('Error fetching search:', error);
    }
  };

  const renderSuggestion = useMemo(
    () => (suggestion, { isHighlighted }) => (
      <div
        className={`relative text-lg text-slate-900 py-2 w-full pl-3 ${isHighlighted ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 cursor-pointer`}
      >
        {suggestion}
      </div>
    ),
    []
  );

  const inputProps = {
    value,
    onChange: onInputChange,
    placeholder: "Search Desired Content...",
    className: `pl-10 pr-4 ${suggestions.length === 0 ? "rounded-md" : "rounded-t-md"} text-slate-900 bg-white placeholder-gray-500 w-full shadow-md`,
    "aria-label": "Search",
    role: "search",
  };

  return (
    <form className="max-w-4xl mx-auto relative h-16" onSubmit={handleSubmit}>
      <div className={`container max-w-4xl mx-auto w-full relative`}>
        <button className="absolute left-3 top-3" type="button">
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 22l-6-6" />
            <path d="M16 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
          </svg>
        </button>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={handleSuggestionClick}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    </form>
  );
}