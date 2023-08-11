/* Ryan Needs to Vet */


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import Header from "../organisms/header";
import Footer from "../organisms/footer";

import MainBundle from '../../partials/bundles/MainBundle';
import SideBundle from '../../partials/bundles/SideBundle';
import Loading from '../../partials/bundles/Loading';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Bundles() {
  const [bundles, setBundles] = useState([]);
  const [media, setMedia] = useState({});
  const nav = useNavigate();
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  const dashPin = session !== undefined ? (bundle) => {
    axios.post('http://127.0.0.1:8000/saveBundle/', [session.email, bundle], { withCredentials: true });
    nav('/user-dash');
  } : undefined;

  const fetchData = async () => {
    try {
      let optimizeData;
      let budget;

      if (session !== undefined) {
        const { data } = await axios.get(`http://127.0.0.1:8000/returnData/?email=${session.email}`, { withCredentials: true });
        optimizeData = data.media;
        setMedia(data.media);
        budget = JSON.parse(data.budget);
      } else {
        optimizeData = JSON.parse(localStorage.getItem('selectedContent'));
        setMedia(JSON.parse(localStorage.getItem('selectedContent')));
        budget = JSON.parse(localStorage.getItem('budget'));
      }

      const { data } = await axios.post('http://127.0.0.1:8000/optimize/', [...optimizeData, budget], { withCredentials: true });
      setBundles(data);
    } catch (error) {
      // Add Error Modal
      nav('/search');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (bundles.length !== 3) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        {
          bundles.length === 0
            ? <Loading />
            : (
              <>
                <p className="text-2xl text-sky-600 font-extrabold mb-2">No Bundles Available</p>
                <p className="font-semibold text-slate-800 dark:text-white mb-4">Sorry, there are no possible bundles available based on your selection and budget.</p>
                <button className="btn bg-sky-600 text-white hover:bg-sky-700 h-[40px]" type="button" onClick={() => nav('/search')}>Return to Content</button>
              </>
            )
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow mb-12">
        <div>
          <section>
            <div className="relative pt-20 md:pt-28">
              <div className="max-w-3xl mx-auto text-center pb-4 md:pb-8">
                <h1 className="h1 mb-4" data-aos="fade-up">
                  <span className="text-sky-500">StreamLine</span>
                  {' '}
                  Bundles
                </h1>
                <p className="text-xl text-slate-800 dark:text-gray-400 mb-2" data-aos="fade-up" data-aos-delay="200">
                  StreamLine your entertainment experience with our curated bundles. We&apos;ve handpicked the best streaming combinations based on your preferences, so you can enjoy all your favorite content on a budget you can afford.
                </p>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-full max-w-6xl">
              <SideBundle bundle={bundles[0]} userData={media} dashPin={dashPin} isLeft />
              <MainBundle bundle={bundles[1]} userData={media} dashPin={dashPin} />
              <SideBundle bundle={bundles[2]} userData={media} dashPin={dashPin} isLeft={false} />
            </div>
          </section>
        </div>
      </main>

      <div className="flex w-full items-center justify-center">
        <p className="text-slate-600 dark:text-gray-400 text-sm font-thin">
          Don&apos;t Like Your Bundles?
          {' '}
          <button type="button" className="font-medium text-sky-600 dark:text-sky-500 hover:text-gray-200 transition duration-150 ease-in-out" onClick={() => nav('/search')}>Modify Content and Budget</button>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Bundles;
