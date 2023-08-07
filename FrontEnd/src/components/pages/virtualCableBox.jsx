// Import Libraries
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// Import Components
import ContentSlider from '../molecules/contentSlider';
import Header from "../organisms/header";
import Footer from "../organisms/footer";

import { ModalContext } from '../../contexts/ModalContext';

export default function CableBox() {
  const [myList, setMyList] = useState([]);
  const [services, setServices] = useState([]);
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";
  const { setOpen500Modal } = useContext(ModalContext); 

  const fetchMyList = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/returnData/", { withCredentials: true }).catch(error => {
      console.log(error);
      setOpen500Modal(true);
    });
    const promises = data.media.map(async (media) => {
      let { data } = await axios.get(`https://api.themoviedb.org/3/${media.media_type}/${media.id}?api_key=${APIKEY}`);
      data.media_type = media.media_type;
      return data;
    });
  
    try {
      const results = await Promise.all(promises);
      setMyList(results);
    } catch (error) {
      console.log(error);
      setOpen500Modal(true);
    }
  };

  const fetchRecs = () => {
    // Get recs here: change link accordingly ##### NEED TO GENERATE DATA TO TEST ####
    axios.get("http://127.0.0.1:8000/api/recommendations/getRecommendations/", {withCredentials: true}).then(response => {
      console.log(response.data)
      setServices(/*Something here not sure your response structure. */)
    }).catch(error => {
      setOpen500Modal(true);
    })
  };

  useEffect(()=> {
    fetchMyList();
    fetchRecs();
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow max-w-7xl mx-auto w-full">
        <div className="mt-28 max-w-3xl mx-auto text-center">
          <h1 className="h1 pb-4" data-aos="fade-up">
              <span className="text-sky-600">StreamLine</span> Cable Box
          </h1>
          <p className='text-lg'>
            Explore content reccomendations based on all of your subscriptions in one place. Enjoying your favorite content has never been easier!
          </p>
        </div>
        <section>
          <div className="pb-4" key="My List">
            <p className="font-bold pb-2 text-3xl">My List</p>
            <ContentSlider mediaContent={myList} />
          </div>
          {
            services.map(service => (
              <div className="pb-4" key={service}>
                <a className='flex pb-2' href={service.web_link} target="_blank">
                  <img src={service.logo_link} className="w-12 h-12 rounded-full"/>
                  <p className="font-bold pb-2 text-3xl">{service.name}</p>
                </a>
                <ContentSlider mediaContent={service.reccomendations} />
              </div>
            ))
          }
        </section>
      </main>
      <Footer />
    </div>
  );
}