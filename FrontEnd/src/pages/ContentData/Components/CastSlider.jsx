// Import Libraries
import React from 'react';

// Import Images
import noimage from '../../../images/no-image.jpg';

export default function CastSlider({ cast }) {
  return (
    <div className="p-1 pb-2 flex overflow-x-auto space-x-6 scrollbar-hidden relative">
      {cast.map((actor, index) => (
        <div className='pb-2 w-44 shadow-md rounded-2xl ring-1 ring-slate-200 dark:ring-slate-600' key={index} >
          <div className="card w-44 relative mx-4 md:mx-0 rounded-xl overflow-hidden">
              {actor.image === null ? <img className='img object-cover' src={noimage} /> :
              <img className='img object-cover' src={`https://image.tmdb.org/t/p/w500${actor.image}`}/>}
          </div>
          <div className='p-3'>
            <p className='font-semibold truncate'>
              {actor.name}
            </p>
            <p className='font-thin truncate'>
              {actor.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}