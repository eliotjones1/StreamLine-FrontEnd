import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Import Contexts
import { SearchContext } from '../../../contexts/SearchContext';

export default function WatchList() {
  const [userList, setUserList] = useState([]);
  const { getGenreById } = useContext(SearchContext)
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchList = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/returnData/", { withCredentials: true });
  
    // Use map instead of for...in loop to skip index 0
    const promises = data.media.slice(1).map(async (media) => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${media.type.toLowerCase()}/${media.id}?api_key=${APIKEY}`);
      return data;
    });
  
    try {
      const results = await Promise.all(promises);
      setUserList(results);
      console.log(results)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  if (userList.length === 0){
    return (
      <p>userList Loading...</p>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Current WatchList</h1>
      <div className="mb-20 md:mb-0 space-y-8">
        {userList.map((content) => (
            <div className='bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 px-4 flex w-full cursor-pointer space-x-6 shadow-md' onClick={() => nav(`/content-data/${content.type}/${content.id}`)} key={content.id}>
                <div className="relative w-24 rounded-md overflow-hidden">
                    {
                      content.poster_path === null ? 
                        <img className='img object-cover' src={noimage} /> 
                      :
                        <img className='img object-cover' src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />
                    }
                </div>
                <div className="w-full relative flex-auto">
                    <h2 className="font-bold truncate pr-20 text-lg">
                        {content.title}
                    </h2>
                    <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                        <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <div className="text-sky-500">
                            <svg width="16" height="20" fill="currentColor">
                            <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                            </svg>
                        </div>
                        <div>{content.vote_average.toFixed(1)} / 10</div>
                        </div>
                        <div className='flex  mb-4'>
                            {
                                content.genres.map((genre, index) => (
                                    <div className="flex items-center" key={index}>
                                        {
                                            index !== 0 && 
                                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                                <circle cx="1" cy="1" r="1" />
                                            </svg>
                                        }
                                        <div className='font-normal bg-slate-100 dark:bg-slate-700 py-1 px-2 rounded-md ring-1 ring-slate-200 dark:ring-slate-600 truncate'>
                                            {genre.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div> 
        ))}
    </div>
  </div>
  )
}