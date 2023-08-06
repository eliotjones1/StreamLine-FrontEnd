// Import Libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Images
import noimage from '../../../images/no-image.jpg';

export default function ContentCard({ content }) {
  const nav = useNavigate();
  
  return (
    <div className="relative w-44 overflow-hidden">
      {content.poster_path === null ? <img className='rounded-xl' src={noimage} /> :
      <img onClick={() => nav(`/content-data/${content.media_type}/${content.id}`)} className='rounded-xl' src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />}
    </div>
  );
}