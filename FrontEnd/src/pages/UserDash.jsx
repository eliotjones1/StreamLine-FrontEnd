import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Header, MainBundle, DisplaySelected, PageIllustration } from '../partials';

function UserDash() {
  const [budget, setBudget] = useState(null);
  const [media, setMedia] = useState([]);
  const [bundle, setBundle] = useState({Movies_and_TV_Shows: [], Images: []});
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/returnData/?email=${session.email}`, {withCredentials: true}).then(response => {
      setBudget(parseFloat(JSON.parse(response.data.budget)).toFixed(2));
      setBundle(response.data.bundle);
      setMedia(response.data.media);
    }).catch(error => {
      // Add Error Modal
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section>
          <div className="max-w-3xl mx-auto text-center relative pb-6 md:pt-28 md:pb-8">
            <h1 className="h1 mb-4" data-aos="fade-up">
              <span className="text-sky-500">StreamLine</span> Dashboard
            </h1>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <button className="btn bg-sky-600 hover:bg-sky-700 w-full mb-4 sm:w-auto sm:mb-0" onClick={() => nav('/search')}>
                Edit Current Content
              </button>
              <button className="btn bg-slate-800 dark:bg-slate-700 hover:bg-slate-800 w-full sm:w-auto sm:ml-4" onClick={() => nav('/results')}>
                View Current Bundles
              </button>
            </div>
          </div>
        </section>

        <div className="flex">

          <section className="w-1/2 px-8">
            <div className="flex flex-col justify-start max-w-4xl mx-auto py-2 pb-4 h-full">
              <h2 className="text-2xl font-bold mb-2">Current Monthly Budget</h2>
              <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-700 font-semibold text-center rounded-lg shadow-lg px-6 py-4 mb-4">
                ${budget}
              </div>
              <div className="container max-w-4xl w-full mx-auto">
                <h2 className="text-2xl font-bold mb-2">Current Content</h2>
                <DisplaySelected items={media}/>
              </div>
            </div>
          </section>

          <section className="w-1/2 px-8 py-5">
            <MainBundle bundle={bundle} userData={media}/>
          </section> 

        </div>
      </main>
    </div>
  );
}

export default UserDash;
