// Import Libraries
import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

// Import Components
import ContentSlider from './ContentSlider';

const queryClient = new QueryClient();

const fetchNewlyReleased = async () => {
  const { data } = await axios.get('http://127.0.0.1:8000/recent/');
  return data;
};

const fetchTrending = async () => {
  const { data } = await axios.get('http://127.0.0.1:8000/trending/');
  return data;
}

function Content() {
  const [trending, setTrending] = useState([]);
  const { data: newlyReleased } = useQuery('newlyReleased', fetchNewlyReleased);

  const fetchTrending = () => {
    axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=95cd5279f17c6593123c72d04e0bedfa&language=en-US&region=US`
    ).then((response) => {
      setTrending(response.data.results);
    });
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="pb-4">
        <p className="font-bold pb-2 text-2xl">Trending Content</p>
        <ContentSlider mediaContent={trending} />
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
