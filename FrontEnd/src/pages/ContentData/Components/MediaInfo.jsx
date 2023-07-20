// Import Libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MediaInfo({ info }){
  const [contentKeywords, setKeywords] = useState([]);
  const { type, id } = useParams();
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchKeywords = async () => {
    if (type === "Movie") {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${APIKEY}`);
      setKeywords(data.keywords);
    } else {
      const { data } = axios.get(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${APIKEY}`);
      setKeywords(data.keywords);
    }
  }

  useEffect(() => {
    fetchKeywords();
  }, []);

  return(
    <>
      <div>
        <h3 className="font-bold text-xl">
          Media Type
        </h3>
        <p>
          {info.type}
        </p>
      </div>


      <div>
        <h3 className="font-bold text-xl">
          Status
        </h3>
        <p>
          {info.status}
        </p>
      </div>

      <div>
        <div className='flex space-x-1 items-center'>
          <h3 className="font-bold text-xl">
            Rating
          </h3>
          <div className="text-sky-500">
            <svg width="16" height="20" fill="currentColor">
            <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
            </svg>
          </div>
        </div>
        <p>
          {info.vote_average.toFixed(2)} / 10
        </p>
      </div>

      {
        info.seasons && info.seasons.length > 0 &&
        <div>
          <h3 className="font-bold text-xl">
            Seasons
          </h3>

          {
            info.seasons.map(season => (
              <li key={season.id} className='ml-2 font-semibold'>
                {`Season ${season.season_number}: ${season.name}` }
                  <li className='ml-4 font-normal'>{`Aired: ${new Date(season.air_date).toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric'})}`}</li>
                  <li className='ml-4 font-normal'>{`Episodes: ${season.episode_count}` }</li>
              </li>
            ))
          }
        </div>
      }

      <div>
        <h3 className="font-bold text-xl">
          Budget
        </h3>
        <p>
          {
            info.budget === 0 ?
              "Currently Unknown"
            :
              info.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          }
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl">
          Reported Revenue
        </h3>
        <p>
          {
            info.revenue === 0 ?
              "Currently Unknown"
            :
              info.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          }
        </p>
      </div>
      <div>
        <h3 className="font-bold text-xl">Producers:</h3>
        <ul className='space-y-2'>
          {info.production_companies.map((producer) => (
            <li key={producer}>
              {
                producer.logo_path ?
                  <img
                    src={`https://image.tmdb.org/t/p/original${producer.logo_path}`}
                    className='h-6'
                  />
                :
                  <p>
                    {producer.name}
                  </p>
              }
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-xl">Spoken Languages:</h3>
        {info.spoken_languages.map(language => (
          <li key={language.iso_639_1} className='ml-2'>
            {`${language.english_name} (${language.name})`}
          </li>
        ))}
      </div>

      {
        contentKeywords !== undefined && 
        <div>
          <h3 className="font-bold text-xl">Keywords:</h3>
          {contentKeywords.map((word, index) => (
            <li key={word.id} className='ml-2'>
              {word.name}
            </li>
          ))}
        </div>
      }
    </>
  );
}