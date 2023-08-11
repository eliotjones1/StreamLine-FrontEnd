import React from 'react';

export default function NameAndDate({ content }){
  return (
    <>
      <p className='font-semibold cursor-pointer' onClick={() => nav(`/content-data/${content.media_type}/${content.id}`)}>
          {content.title || content.name}
        </p>
        { content.release_date && 
          <p className='font-thin text-sm'>
            Released: {new Date(content.release_date).toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric'})}
          </p>
        }
        { content.first_air_date && 
          <p className='font-thin text-sm'>
            First Aired: {new Date(content.first_air_date).toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric'})}
          </p>
        }
    </>
  );
}