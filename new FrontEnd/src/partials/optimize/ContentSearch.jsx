import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultMovieImg from '../../images/StreamLine.jpeg';

function ContentSearch({ onAddItem }) {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsCache, setSearchResultsCache] = useState(new Map());

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showDropdown && dropdownOptions.length > 0) {
      const selectedOption = dropdownOptions[hoveredItemIndex];
      if (selectedOption) {
        onAddItem(selectedOption);
        setSearchQuery('');
        setShowDropdown(false);
      }
    }
  };

  useEffect(() => {
    if (searchQuery && !searchResultsCache.has(searchQuery)) {
      axios.get('http://127.0.0.1:8000/search/?search=' + searchQuery)
      .then((response) => {
        setSearchResultsCache(prevCache => new Map(prevCache).set(searchQuery, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && searchResultsCache.has(searchQuery)) {
      setDropdownOptions(searchResultsCache.get(searchQuery));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery, searchResultsCache]);


  useEffect(() => {
    const keyHandler = (event) => {
      if (showDropdown){
        if (event.keyCode === 38 && hoveredItemIndex !== 0) { // Up Arrow = ASCII 38
          event.preventDefault();
          setHoveredItemIndex(hoveredItemIndex - 1); 
        } else if (event.keyCode === 40 && hoveredItemIndex < dropdownOptions.length - 1) { // Down Arrow = ASCII 40
          event.preventDefault();
          setHoveredItemIndex(hoveredItemIndex + 1); 
        } else if (event.keycode === 13) { // Enter = ASCII 13
          event.preventDefault();
          handleSubmit(event); 
        }
      }
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  }, [showDropdown]);

  return (
    <section>
      <div className="max-w-3xl mx-auto text-center pb-6 md:pt-32 md:pb-8">
        <h1 className="h1 mb-4" data-aos="fade-up">
          <span className="text-sky-500">StreamLine</span> Your Subscriptions
        </h1>
      </div>

      <form className="max-w-4xl mx-auto relative" onSubmit={(event) => handleSubmit(event)}>
        <div className="container relative max-w-4xl mx-auto w-full pb-10">
        <input id="searchInput" type="text" placeholder="Search Desired Content..." className="absolute pl-10 pr-4 rounded-md text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500 w-full" value={searchQuery} onChange={handleInputChange} autoComplete="off"
        />
          <button className="absolute left-3 h-full" type="submit">
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 22l-6-6"/>
              <path d="M16 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"/>
            </svg>
          </button>
        </div>
        {showDropdown && dropdownOptions.length > 0 && (
          <ul className="realtive w-full mt-1 bg-slate-200 dark:bg-white rounded-md">
            {dropdownOptions.map((option, index) => (
              <li className={hoveredItemIndex === index ? "flex flex-row p-2 bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-white rounded-md" : "flex flex-row p-2 text-slate-900"} key={index} onClick={(event) => handleSubmit(event)} onMouseEnter={() => setHoveredItemIndex(index)}>
                  <img width="60" height="90.65" src={`https://image.tmdb.org/t/p/w185${option.image}`} alt={DefaultMovieImg}/>
                  <div className="pl-2">
                    <p className="font-bold text-base">{option.title}</p>
                    { option.release_date !== null &&
                      <p className="text-xs">Release Date: {option.release_date}</p>}
                    {
                      option.type !== null &&
                      <p className="text-xs">Type: {option.type}</p>
                    }
                  </div>
              </li>
            ))}
          </ul>
        )}
      </form>
    </section>
  );
}

export default ContentSearch;