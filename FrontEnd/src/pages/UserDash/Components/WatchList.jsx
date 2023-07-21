import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MinusIcon } from '@heroicons/react/24/solid';

export default function WatchList() {
  const nav = useNavigate()
  const [userList, setUserList] = useState([]);
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchList = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/returnData/", { withCredentials: true });
    console.log(data.media)
    const promises = data.media.map(async (media) => {
      let { data } = await axios.get(`https://api.themoviedb.org/3/${media.media_type}/${media.id}?api_key=${APIKEY}`);
      data.media_type = media.media_type;
      return data;
    });
  
    try {
      const results = await Promise.all(promises);
      setUserList(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const removeFromUserList = (media) => {
    axios.post("http://127.0.0.1:8000/removeMedia/", {id: media.id.toString(), media_type: media.media_type}, { withCredentials: true }).then(() => {
      fetchList();
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (userList.length === 0){
    return (
      <div className="container py-8 col-span-2">
        <h1 className="text-2xl font-bold mb-4">WatchList</h1>
        <div className='flex flex-col h-96 items-center justify-center bg-slate-50 dark:bg-slate-700 w-full rounded-lg ring-1 ring-slate-200 dark:ring-slate-600 col-span-2'>
          <p>List is empty...</p>
          <button className="bg-sky-600 text-white font-semibold p-2 mt-2 rounded-md cursor-pointer hover:bg-sky-500" onClick={() => nav('/content-search')}>
            Discover Content
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="container py-8 col-span-2">
      <h1 className="text-2xl font-bold mb-4">WatchList</h1>
      <div className="h-96 grid grid-cols-2 gap-x-1 overflow-auto">
        {userList.map((content) => (
          <div className={`bg-slate-50 dark:bg-slate-700 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 m-2 p-2 flex space-x-2 shadow-md ${userList.length <= 2 ? 'h-1/2' : ''}`} key={content.id}>
            <div className="flex relative w-1/4">
              {
                content.poster_path === null ? 
                  <img className='img object-cover w-full rounded-xl overflow-hidden' src={noimage} alt="No Poster" /> 
                :
                  <img className='img object-cover w-full rounded-xl overflow-hidden cursor-pointer' src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} alt={content.title || content.name} onClick={() => nav(`/content-data/${content.media_type}/${content.id}`)}/>
              }
            </div>
            <div className="w-3/4 relative flex-auto">
              <h2 className="font-bold truncate pr-20 text-lg cursor-pointer" onClick={() => nav(`/content-data/${content.media_type}/${content.id}`)}>
                {content.title || content.name}
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
                <div className='flex flex-wrap space-x-2 space-y-2 h-full mb-4'>
                  {content.genres.map((genre, index) => (
                    <div className="flex mt-2" key={index}>
                      <div className='font-normal bg-slate-300 dark:bg-slate-800 py-1 px-2 rounded-md ring-1 ring-slate-200 dark:ring-slate-600 truncate'>
                        {genre.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='absolute bottom-0 right-0 rounded-full p-2 z-20'>
                  <MinusIcon className='h-6 text-slate-900 hover:text-sky-600 cursor-pointer' onClick={() => removeFromUserList(content)}/>
                </div>
              </div>
            </div>
          </div> 
        ))}
      </div>
    </div>
  );
}