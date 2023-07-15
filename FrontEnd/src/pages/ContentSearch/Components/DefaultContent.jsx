import React, { useState, useEffect } from 'react';
import ContentSlider from './ContentSlider';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { SearchContext } from '../../../contexts/SearchContext';

const queryClient = new QueryClient();

function Content() {
  const [trending, setTrending] = useState([]);
  const [popularContent, setPopularContent] = useState([]);
  const [popularServices, setPopularServices] = useState([]);

  const fetchNewlyReleased = async () => {
    const response = await axios.get('http://127.0.0.1:8000/recent/');
    return response.data;
  };
  const { data: newlyReleased } = useQuery('newlyReleased', fetchNewlyReleased);

  const fetchTrending = async () => {
    axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=95cd5279f17c6593123c72d04e0bedfa&language=en-US&region=US`
    )
    .then((response) => {
      setTrending(response.data.results);
    });
  };

  const fetchPopularContent = async () => {
    /*axios.get('url').then(response => {
      setPopularContent(response.data)
    })*/
  };

  const fetchPopularServices = async () => {
    // axios.get('http://127.0.0.1:8000/popularServices/').then(response => {
    //   setPopularServices(response.data)
    // })
  };

  useEffect(() => {
    fetchTrending();
    fetchPopularContent();
    fetchPopularServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="pb-4">
        <p className="font-bold pb-2 text-2xl">Trending Content</p>
        <ContentSlider mediaContent={trending} />
      </div>
      <div className="pb-4">
        <p className="font-bold pb-2 text-2xl">Popular Services</p>
        <ContentSlider mediaContent={popularServices} />
      </div>
      <div className="pb-4">
        <p className="font-bold pb-2 text-2xl">Popular Content</p>
        <ContentSlider mediaContent={popularContent} />
      </div>
      
      <div className="pb-4">
        <p className="font-bold pb-2 text-2xl">Newly Released</p>
        {
          newlyReleased !== undefined &&
          <ContentSlider mediaContent={newlyReleased} />
        }
      </div>
    </div>
  );
}

export default function cacheWrapped(){
  return (
    <QueryClientProvider client={queryClient}>
      <Content/>
    </QueryClientProvider>
  )
}
