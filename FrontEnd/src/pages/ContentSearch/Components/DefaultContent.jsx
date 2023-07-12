import React, { useState, useEffect } from 'react';
import ContentSlider from './ContentSlider';
import axios from 'axios';

function Content() {
  const [trending, setTrending] = useState([]);
  const [popularContent, setPopularContent] = useState([]);
  const [popularServcies, setPopularServices] = useState([]);
  const [newlyReleased, setNewlyReleased] = useState([]);

  const fetchTrending = async () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=95cd5279f17c6593123c72d04e0bedfa&language=en-US&region=US`)
    .then(response => {
      console.log(response);
      setTrending(response.data.results);
    });
  }

  const fetchPopularContent = () => {
    /*axios.get('url').then(response => {
      setPopularContent(response.data)
    })*/
  }

  const fetchPopularServices = () => {
    // axios.get('http://127.0.0.1:8000/popularServices/').then(response => {
    //   setPopularServices(response.data)
    // })
  }

  const fetchNewlyReleased =  () => {
    axios.get('http://127.0.0.1:8000/recent/').then(response => {
      console.log(response.data)
      setNewlyReleased(response.data)
    })
  }

  useEffect(() => {
    fetchTrending()
    fetchPopularContent()
    fetchPopularServices()
    fetchNewlyReleased()
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Trending Content
        </p>
        <ContentSlider mediaContent={trending}/>
      </div>
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Popular Services
        </p>
        <ContentSlider mediaContent={popularServcies}/>
      </div>
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Popular Content
        </p>
        <ContentSlider mediaContent={popularContent}/>
      </div>
      <div className='pb-4'>
        <p className="font-bold pb-2 text-2xl">
          Newly Released
        </p>
        <ContentSlider mediaContent={newlyReleased}/>
      </div>
    </div>
  )
}

export default Content