// Import Libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Images
import noimage from '../../../images/no-image.jpg';

export default function ContentCard({ content }) {
  const nav = useNavigate();
  
  return (
    <div className="card relative w-44 mx-4 md:mx-0 cursor-pointer rounded-xl overflow-hidden">
      <button onClick={() => nav(`/content-data/${content.type}/${content.id}`)} className='h-full w-full shadow absolute z-10'/>
      <div>
        {content.poster_path === null ? <img className='img object-cover' src={noimage} /> :
        <img className='img object-cover' src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />}
      </div>
    </div>
  )
}