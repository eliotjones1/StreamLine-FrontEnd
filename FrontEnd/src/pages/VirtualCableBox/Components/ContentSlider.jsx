// Import Libraries
import React from 'react';

// Imprt Components
import ContentCard from './ContentCard';
import { useNavigate } from 'react-router-dom';

export default function ContentSlider({ mediaContent }) {
  const nav = useNavigate();
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hidden relative">
      {mediaContent.map((content, index) => (
        <div className='w-44' key={index} >
          <ContentCard content={content} />
          <div className='py-3'>
            <p className='font-semibold cursor-pointer' onClick={() => nav(`/content-data/${content.media_type}/${content.id}`)}>
              {content.title || content.name}
            </p>
            { content.release_date && 
              <p className='font-thin text-sm'>
                {new Date(content.release_date).toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric'})}
              </p>
            }
            { content.first_air_date && 
              <p className='font-thin text-sm'>
                {new Date(content.first_air_date).toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric'})}
              </p>
            }
          </div>
        </div>
      ))}
    </div>
  );
}