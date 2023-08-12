// Import Libraries
import React, { useContext } from 'react';

// Import Contexts
import { ServicesSearchContext } from '../../contexts/servicesSearchContext';

export default function FilterBar() {
  const { filter, updateFilter } = useContext(ServicesSearchContext);

  const handleChange = (event) => {
    event.preventDefault();
    updateFilter(event.target.value);
  };

  return (
    <div className="container relative max-w-4xl mx-auto w-full pb-10">
      <input
        value={filter}
        onChange={handleChange}
        id="searchInput"
        name="searchInput"
        type="search"
        placeholder="Filter Services..."
        className="absolute pl-10 pr-4 rounded-md text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500 w-full"
        autoComplete="off"
      />
      <button className="absolute left-3 h-full" type="submit">
        <svg
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M22 22l-6-6" />
          <path d="M16 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
        </svg>
      </button>
    </div>
  );
}
