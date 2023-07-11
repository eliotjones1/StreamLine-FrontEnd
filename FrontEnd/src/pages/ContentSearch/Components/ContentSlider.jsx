import React from 'react';
import ContentCard from './ContentCard';

function ContentSlider({ mediaContent }) {
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hidden relative">
      {mediaContent.map((content, index) => (
        <div className='w-44' key={index} >
          <ContentCard key={content.id} content={content} />
          <div className='py-3'>
            <p className='font-semibold'>{content.title || content.name}</p>
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

export default ContentSlider;
