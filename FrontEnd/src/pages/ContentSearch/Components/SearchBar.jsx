import React, { useContext, useState, useMemo } from 'react';
import Autosuggest from 'react-autosuggest';
import Fuse from 'fuse.js';

// Import Contexts
import { SearchContext } from '../../../contexts/SearchContext';

export default function Searchbar() {
  const { fetchSearch } = useContext(SearchContext);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Add error handling for fetchSearch function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchSearch(value);
      setValue('');
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error('Error fetching search:', error);
    }
  };

  // Your autosuggestions data source
  const autosuggestions = [
    'Movie 1',
    'Movie 2',
    'Movie 3',
    'TV Show 1',
    'TV Show 2',
    'TV Show 3',
    'TV Show 4',
    // Add more suggestions here
  ];

  // Optimize autosuggestions filtering with Fuse.js
  const options = {
    keys: ['title'], // The property to search in the suggestions objects
    threshold: 0.3, // Adjust the matching threshold as needed
  };

  const fuse = new Fuse(autosuggestions, options);

  const onInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const filteredSuggestions = fuse.search(value).map((result) => result.item);

    // Limit the number of suggestions displayed to 3
    const limitedSuggestions = filteredSuggestions.slice(0, 3);

    setSuggestions(limitedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue("");
    fetchSearch(suggestion); // Call fetchSearch directly instead of submitting the form
  };

  const renderSuggestion = useMemo(
    () => (suggestion, { isHighlighted }) => (
      <div
        className={`text-lg text-gray-900 p-1 w-full ${
          isHighlighted ? 'bg-slate-200' : 'bg-slate-100'
        } hover:bg-slate-200 cursor-pointer`}
        onClick={() => handleSuggestionClick(suggestion)}
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
    className: "pl-10 pr-4 rounded-md text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500 w-full",
    "aria-label": "Search",
    role: "search",
  };

  return (
    <form className="max-w-4xl mx-auto relative" onSubmit={handleSubmit}>
      <div className="container absolute max-w-4xl mx-auto w-full pb-10">
        <button className="absolute z-10 left-3 top-3" type="button">
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 22l-6-6" />
            <path d="M16 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
          </svg>
        </button>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    </form>
  );
}


