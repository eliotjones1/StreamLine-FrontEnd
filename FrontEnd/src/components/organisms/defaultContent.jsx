// Import Libraries
import React, { useState, useEffect, useContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

// Import Components
import ContentSlider from './contentSlider';
import { ModalContext } from '../../contexts/ModalContext';

const queryClient = new QueryClient();

function Content() {
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";
  const [trending, setTrending] = useState([]);
  const { setOpen500Modal } = useContext(ModalContext);

  const fetchTrending = () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US&region=US`).then(response => {
      setTrending(response.data.results);
    }).catch(error => {
      setOpen500Modal(true);
    });
  };

  const fetchNewlyReleased = () => {
    return axios.get('http://127.0.0.1:8000/recent/').then(response => {
      return response.data;
    }).catch(error => {
      setOpen500Modal(true);
      return Promise.reject(error);
    });
  };
  const { data: newlyReleased } = useQuery('newlyReleased', fetchNewlyReleased);


  const fetchStaffPicks = () => {
    return axios.get('http://127.0.0.1:8000/staffpicks/').then(response => {
      return response.data;
    }).catch(error => {
      setOpen500Modal(true);
      return Promise.reject(error);
    });
  };
  const { data: staffPicks } = useQuery('staffPicks', fetchStaffPicks);
  
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative z-0">
      <div className="pb-2">
        <p className="font-bold pb-2 text-2xl">Trending Content</p>
        <ContentSlider mediaContent={trending} />
      </div>
      {
        newlyReleased !== undefined &&
        <div className="pb-2">
          <p className="font-bold pb-2 text-2xl">
            Newly Released
          </p>
          <ContentSlider mediaContent={newlyReleased} />
        </div>
      }
      {
        staffPicks !== undefined &&
        <div className="pb-2">
          <p className="font-bold pb-2 text-2xl">
            Staff Picks
          </p>
          <ContentSlider mediaContent={staffPicks} />
        </div>
      }
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
