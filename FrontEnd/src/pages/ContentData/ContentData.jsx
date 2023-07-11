import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ListBulletIcon } from '@heroicons/react/20/solid';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Header from "../../partials/Header";
import Footer from "../../partials/Footer";

function Detail() {
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const { id } = useParams()

  const [contentDetails, setContentDetails] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    console.log(moviedetail)
    setContentDetails(moviedetail);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
  }

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
  }

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

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
                <img className='h-[32rem] rounded-3xl' src={`https://image.tmdb.org/t/p/original/${contentDetails.poster_path}`} />
                <div className="w-full relative flex-auto">
                  <h2 className="font-bold truncate pr-20 text-4xl">
                    {contentDetails.title || contentDetails.name}
                  </h2>

                  <button className='rounded-full p-2 bg-slate-900'>
                    <ListBulletIcon className='h-6 text-white' />
                  </button>


                  <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                    <div className="flex space-x-1 mb-2">
                      <p className="font-semibold">Release Year:</p>
                      {contentDetails.release_date && (
                        <div>{"  " + new Date(contentDetails.release_date).toLocaleString("en-US", { year: "numeric" })}</div>
                      )}
                      {contentDetails.first_air_date && (
                        <div>{"  " + new Date(contentDetails.first_air_date).toLocaleString("en-US", { year: "numeric" })}</div>
                      )}
                    </div>
                    <div className="w-full mt-2 font-normal">
                      <p className="font-semibold text-xl mb-2">Overview</p>
                      {contentDetails.overview}
                    </div>
                  </div>
                </div>
              </div>

            </div>            
          </main>
      <Footer/>
    </div>
  )
}

export default Detail;