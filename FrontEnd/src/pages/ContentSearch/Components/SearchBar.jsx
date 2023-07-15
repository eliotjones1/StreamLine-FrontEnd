import React, { useContext, useRef } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

export default function Searchbar() {
  const { fetchSearch } = useContext(SearchContext)
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearch(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <form className="max-w-4xl mx-auto relative" onSubmit={handleSubmit}>
      <div className="container relative max-w-4xl mx-auto w-full pb-10">
        <input
          ref={inputRef}
          id="searchInput"
          name="searchInput"
          type="search"
          placeholder="Search Desired Content..."
          className="absolute pl-10 pr-4 rounded-md text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500 w-full"
          autoComplete="off"
        />
        <button className="absolute left-3 h-full" type="submit">
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 22l-6-6" />
            <path d="M16 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}

