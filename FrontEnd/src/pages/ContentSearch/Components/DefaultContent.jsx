import React, { useState, useEffect } from 'react';
import ContentSlider from './ContentSlider';

function Content() {
  const [trendingAll, setTrendingAll] = useState([]);
  const [popMovies, setPopMovies] = useState([]);
  const [popShows, setPopShows] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US&region=AS`
    );
    let trend = await data.json();
    setTrendingAll(trend.results);
  }

  const fetchTopRatedMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&include_adult=false&sort_by=popularity.desc`
    );
    const topMov = await data.json();
    setPopMovies(topMov.results);
  }

  const fetchTopRatedShows = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=en-US&include_adult=false&sort_by=popularity.desc`
    );
    const topShow = await data.json();
    setPopShows(topShow.results);
  }

  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&include_adult=false`
    );
    const upc = await data.json();
    setUpcoming(upc.results)
  }

  useEffect(() => {
    fetchTrending()
    fetchTopRatedMovies()
    fetchTopRatedShows()
    fetchUpcoming()
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Trending Content
        </p>
        <ContentSlider mediaContent={trendingAll}/>
      </div>
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Top Rated Shows
        </p>
        <ContentSlider mediaContent={popShows}/>
      </div>
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Top Rated Movies
        </p>
        <ContentSlider mediaContent={popMovies}/>
      </div>
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Upcoming & New Movies
        </p>
        <ContentSlider mediaContent={upcoming}/>
      </div>
    </div>
  )
}

export default Content