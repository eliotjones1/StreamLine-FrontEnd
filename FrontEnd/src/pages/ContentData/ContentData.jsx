import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/20/solid';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";

function Detail() {
  const { type, id } = useParams();
  const [contentDetails, setContentDetails] = useState({});
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  let date = "";

  const fetchContentData = () => {
    axios.post("http://127.0.0.1:8000/returnInfo/", {type: type, id: id}).then(response => {
      setContentDetails(response.data);
      if (response.data.first_air_date !== undefined) {date = response.data.first_air_date;}
      else {date = response.data.release_date;}
    });
  };

  const addToUserList = () => {
      axios.post("http://127.0.0.1:8000/saveMedia/", [session.email, contentDetails], { withCredentials: true });
  };

  useEffect(() => {
    fetchContentData();
  }, []);

  if (Object.keys(contentDetails).length === 0){
    return (
      <></>
    );
  }

  return (
    <div>
      <Header/>
          <main className='grow'>
            <div className='h-20'/>
            <div className="relative">
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-900 opacity-80"></div>
                  <img className="object-cover object-top w-full h-[40rem]" src={`https://image.tmdb.org/t/p/original/${contentDetails.backdrop_path}`} />
                </div>
              </div>

              {/* Foreground */}
              <div className="relative z-10 flex max-w-5xl mx-auto space-x-6 text-white h-[40rem] justify-center items-center">
                <img className='h-[32rem] rounded-3xl' src={`https://image.tmdb.org/t/p/original/${contentDetails.poster_path}`} />
                <div className="w-full relative flex-auto">
                  <h2 className="font-bold truncate pr-20 text-4xl">
                    {contentDetails.title || contentDetails.name}
                  </h2>

                  <button className='rounded-full p-2 bg-slate-900 hover:bg-sky-600' onClick={() => addToUserList()}>
                    <PlusIcon className='h-6 text-white' />
                  </button>


                  <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                    <div className="flex space-x-1 mb-2">
                      <p className="font-semibold">Release Year:</p>
                      <p>{new Date(date).toLocaleString("en-US", { year: "numeric" })}</p>
                    </div>
                    <div className="w-full mt-2 font-normal">
                      <p className="font-semibold text-xl mb-2">Overview</p>
                      {contentDetails.overview}
                    </div>
                  </div>
                </div>
              </div>

            </div>            
          </main>
      <Footer/>
    </div>
  )
}

export default Detail;