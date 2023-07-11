import React from 'react';
import { useNavigate } from 'react-router-dom';
import noimage from '../../../images/no-image.jpg';

function Moviecard({ movie }) {
  const nav = useNavigate();
  return (
    <div className="card relative w-44 mx-4 md:mx-0 cursor-pointer rounded-xl overflow-hidden">
      <button onClick={() => nav(`/content-data/${movie.id}`)} className='h-full w-full shadow absolute z-10'></button>

      <div>
        {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
        <img className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
      </div>
    </div>
  )
}

export default Moviecard;