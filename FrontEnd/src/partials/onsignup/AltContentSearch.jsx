import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultMovieImg from '../../images/StreamLine.jpeg';

function ContentSearch({ onAddItem }) {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsCache, setSearchResultsCache] = useState(new Map());
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAllResults = async () => {
    try {
      setLoading(true); // Set loading state to true to display spinner
      const response = await axios.get('http://127.0.0.1:8000/search/all/?search=' + searchQuery);
      setPopupData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false when the request is complete
    }
  };

  const handlePopupItemSelect = (event) => {
    event.preventDefault();
    const selectedOption = popupData[hoveredItemIndex];
    if (selectedOption) {
      onAddItem(selectedOption);
      setSearchQuery('');
      setShowDropdown(false);
      setPopupData(null);
    }
  };



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
      axios
        .get('http://127.0.0.1:8000/search/?search=' + searchQuery)
        .then((response) => {
          setSearchResultsCache((prevCache) => new Map(prevCache).set(searchQuery, response.data));
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
      if (showDropdown) {
        if (event.keyCode === 38 && hoveredItemIndex !== 0) {
          // Up Arrow = ASCII 38
          event.preventDefault();
          setHoveredItemIndex((prevIndex) => prevIndex - 1);
        } else if (event.keyCode === 40 && hoveredItemIndex < dropdownOptions.length - 1) {
          // Down Arrow = ASCII 40
          event.preventDefault();
          setHoveredItemIndex((prevIndex) => prevIndex + 1);
        } else if (event.keyCode === 13) {
          // Enter = ASCII 13
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
        <h3 className="h3 mb-4" data-aos="fade-up">
            Step 1: Watchlist
        </h3>
        <p className="text-xl mb-4">
            Search for your favorite movies and shows, and add them to your watchlist.
        </p>
      </div>

      <form className="max-w-4xl mx-auto relative" onSubmit={handleSubmit}>
        <div className="container relative max-w-4xl mx-auto w-full pb-10">
          <input
            id="searchInput"
            type="text"
            placeholder="Search Desired Content..."
            className="absolute pl-10 pr-4 rounded-md text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500 w-full"
            value={searchQuery}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <button className="absolute left-3 h-full" type="submit">
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 22l-6-6" />
              <path d="M16 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
            </svg>
          </button>
        </div>
        {showDropdown && dropdownOptions.length > 0 && (
          <ul className="relative w-full mt-1 bg-slate-200 dark:bg-white rounded-md">
            {dropdownOptions.map((option, index) => (
              <li
                className={hoveredItemIndex === index ? 'flex flex-row p-2 bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-white rounded-md' : 'flex flex-row p-2 text-slate-900'}
                key={index}
                onClick={handleSubmit}
                onMouseEnter={() => setHoveredItemIndex(index)}
              >
                <img width="60" height="90.65" src={`https://image.tmdb.org/t/p/w185${option.image}`} alt={DefaultMovieImg} />
                <div className="pl-2">
                  <p className="font-bold text-base">{option.title}</p>
                  {option.release_date !== null && <p className="text-xs">Release Date: {option.release_date}</p>}
                  {option.type !== null && <p className="text-xs">Type: {option.type}</p>}
                </div>
              </li>
            ))}
             {/* Create a button that will show all results */}
            <button className="flex flex-row p-2 text-slate-900" onClick={(e) => { e.preventDefault(); handleAllResults(); }}>
              <p className="font-bold text-base">Show All Results</p>
            </button>
            {popupData && (
          <div className="popup-container">
            <div className="popup-content">
              <ul>
                {popupData.map((option, index) => (
                  <li
                    className={hoveredItemIndex === index ? 'flex flex-row p-2 bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-white rounded-md' : 'flex flex-row p-2 text-slate-900'}
                    key={index}
                    onClick={handlePopupItemSelect}
                    onMouseEnter={() => setHoveredItemIndex(index)}
                  >
                    <img width="60" height="90.65" src={`https://image.tmdb.org/t/p/w185${option.image}`} alt={DefaultMovieImg} />
                    <div className="pl-2">
                      <p className="font-bold text-base">{option.title}</p>
                      {option.release_date !== null && <p className="text-xs">Release Date: {option.release_date}</p>}
                      {option.type !== null && <p className="text-xs">Type: {option.type}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="close-button" onClick={() => setPopupData(null)}>Close</button>
          </div>
        )}
          </ul>
        )}
      </form>
      {loading && (
        <div className="pinwheel-container">
          <div className="pinwheel"></div>
        </div>
      )}

      <style jsx>{`
      .pinwheel-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px; /* Adjust the height as needed */
      }
    
      .pinwheel {
        border: 4px solid #f3f3f3; /* Light gray color */
        border-top: 4px solid #3498db; /* Blue color */
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 2s linear infinite;
      }
    
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
  .popup-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff; /* Set your desired background color */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    box-sizing: border-box;
    z-index: 9999;
    border-radius: 0.375rem;
  }

  .popup-content {
    max-width: 100%;     
    max-height: 80vh;
    overflow-y: auto;
    margin-right: auto;
    width: 100%;
  }

  .popup-container h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .popup-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .popup-container li {
    display: flex;  }

  .popup-container button {
    padding: 8px 16px;
    background-color: #0EA5E9;
    color: #000000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-button {
    margin-top: 16px;
    color: #0EA5E9;
  }
`}</style>
    </section>
  );
}

export default ContentSearch;
