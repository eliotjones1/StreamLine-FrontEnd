import React from 'react';
import { useNavigate } from 'react-router-dom';
import noimage from '../../../images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Moviecard({ movie }) {
  const nav = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className="card relative w-44 mx-4 md:mx-0 cursor-pointer rounded-xl overflow-hidden"
    >
      <button onClick={() => nav(`/content-data/${movie.id}`)} className='h-full w-full shadow absolute z-10'></button>

      <div>
        {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
        <LazyLoadImage effect='blur' className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
      </div>
    </motion.div>
  )
}

export default Moviecard;