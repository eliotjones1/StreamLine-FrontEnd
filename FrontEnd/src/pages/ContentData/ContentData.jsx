// Import Libraries
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import Icons
import { PlusIcon, LinkIcon } from '@heroicons/react/20/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

// Import Components
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import MediaInfo from './Components/MediaInfo';
import CastSlider from './Components/CastSlider';
import TrailerIFrame from './Components/Trailer';

// Import Contexts
import { LoginContext } from '../../contexts/LoginContext';

export default function Detail() {
  const { isLoggedIn } = useContext(LoginContext);
  const { type, id } = useParams();
  const [contentDetails, setContentDetails] = useState({});
  const [contentVideos, setContentVideos] = useState({});
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchContentData = async () => {
    const { data } = await axios.post("http://127.0.0.1:8000/returnInfo/", {type: type, id: id});
    setContentDetails(data);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    console.log(castdetail);
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`);
    setContentVideos(data.results);
  }

  const addToUserList = () => {
      axios.post("http://127.0.0.1:8000/saveMedia/", contentDetails, { withCredentials: true });
  };

  useEffect(() => {
    fetchContentData();
    fetchVideo();
    fetchCast();
  }, []);

  if (Object.keys(contentDetails).length === 0){
    return (
      <></>
    );
  }

  return (
    <div>
      <Header/>
          <main className='grow'>
            <div className='h-20'/>
            <div className="relative">
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-900 opacity-80"></div>
                  <img className="object-cover object-top w-full h-[40rem]" src={`https://image.tmdb.org/t/p/original/${contentDetails.backdrop_path}`} />
                </div>
              </div>

              {/* Foreground */}
              <div className="relative z-10 flex max-w-5xl mx-auto space-x-6 text-white h-[40rem] justify-center items-center">
                <img className='h-[32rem] rounded-3xl' src={`https://image.tmdb.org/t/p/original/${contentDetails.poster_path}`}/>
                <div className="w-full relative flex-auto">
                  <div className='flex items-center space-x-1'>
                    <p className="font-bold truncate text-4xl">
                      {contentDetails.title || contentDetails.name}
                    </p>
                    <LinkIcon href={contentDetails.homepage} target="_blank" rel="noopener noreferrer" className='h-8 hover:text-sky-600 cursor-pointer text-slate-400'/>
                  </div>

                  <p className="font-thin italic truncate pb-4">
                    {contentDetails.tagline}
                  </p>

                  <div className='flex mb-4'>
                    {
                        contentDetails.genres.map((genre, index) => (
                            <div className="flex items-center" key={index}>
                                {
                                    index !== 0 && 
                                    <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                }
                                <div className='font-normal bg-slate-700 py-1 px-2 rounded-md ring-1 ring-slate-600'>
                                    {genre.name}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='flex items-center space-x-1 mb-4'>
                      { contentDetails.release_date && 
                        <p className='font-thin text-sm'>
                          ({new Date(contentDetails.release_date).toLocaleString('en-US', {year:'numeric'})})
                        </p>
                      }
                      { contentDetails.first_air_date && 
                        <p className='font-thin text-sm'>
                          ({new Date(contentDetails.first_air_date).toLocaleString('en-US', {year:'numeric'})})
                        </p>
                      }
                    <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    {
                      contentDetails.episode_run_time && 
                      <p>
                        Episode Avg
                      </p>
                    }
                    <ClockIcon className='h-4'/>
                    {
                      contentDetails.episode_run_time ? 
                        <p>
                          {contentDetails.episode_run_time[0]}mins
                        </p>
                      :
                        <p>
                          {contentDetails.runtime}mins
                        </p>
                    }
                  </div>

                  {
                    isLoggedIn &&
                    <button className='rounded-full p-2 bg-slate-900 hover:bg-sky-600' onClick={() => addToUserList()}>
                      <PlusIcon className='h-6 text-white' />
                    </button>
                  }

                  <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                    <div className="w-full font-normal">
                      <p className="font-semibold text-xl mb-2">Overview</p>
                      {contentDetails.overview}
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <section className="mx-auto my-6 grid max-w-7xl gap-x-8 gap-y-8 grid-cols-4 grid-rows-2 items-start">
                <div className="col-start-4 row-span-2 p-4 space-y-4">
                  <h2 className="text-3xl font-bold truncate">
                    Relevent Information
                  </h2>
                  <MediaInfo info={contentDetails}/>
                </div>
                <div className='col-start-1 col-span-3 row-start-1'>
                  <h2 className="text-2xl font-bold mb-4">
                    Cast & Crew
                  </h2>
                  {/*
                    <CastSlider cast={contentDetails.cast}/>
                  */}
                </div>
                <div className='col-start-1 col-span-3 row-start-2'>
                  <h2 className="text-2xl font-bold mb-4">
                    Trailers
                  </h2>
                  
                  {
                    contentVideos.map((trailer) => (
                      <>
                        {trailer.type === "Trailer" &&
                          <TrailerIFrame key={trailer.key} link={`https://www.youtube.com/embed/${trailer.key}`}/>
                        }
                      </>
                    ))
                  }

                </div>
            </section>   
          </main>
      <Footer/>
    </div>
  )
}