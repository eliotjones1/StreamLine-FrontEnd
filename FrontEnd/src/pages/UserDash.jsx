// Import Libraries
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Header from '../partials/Header';
import MainBundle from '../partials/bundles/MainBundle';
import DisplaySelected from '../partials/optimize/DisplayUD';
import Footer from '../partials/Footer';

// Import Contexts
import { LoginContext } from '../contexts/loginContext';


function UserDash() {
  const { isLoggedIn, user } = useContext(LoginContext);
  const [budget, setBudget] = useState(null);
  const [media, setMedia] = useState([]);
  const [bundle, setBundle] = useState({ Movies_and_TV_Shows: [], Images: [] });
  const nav = useNavigate();

  const removeItem = (indexToRemove) => {
    setMedia(media.filter((_, index) => index !== indexToRemove));
    let temp = media.filter((_, index) => index !== indexToRemove);
    if (isLoggedIn) {
      axios
        .post("http://127.0.0.1:8000/saveMedia/", [user.email, temp], { withCredentials: true })
        .catch((error) => {
          // Add Error Modal
        });
    } else {
      localStorage.setItem('selectedContent', JSON.stringify(temp));
    }
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/tosCompliance/?email=${user.email}`, { withCredentials: true }).then(response => {
      if (response.data !== "ok") {
        nav('/new-sub')
      }
    })
    axios
      .get(`http://127.0.0.1:8000/returnData/?email=${user.email}`, { withCredentials: true })
      .then((response) => {
        setBudget(parseFloat(JSON.parse(response.data.budget)).toFixed(2));
        setBundle(response.data.bundle);
        setMedia(response.data.media);
      })
      .catch((error) => {
        // Add Error Modal
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="grow">
        <section>
          <div className="max-w-3xl mx-auto text-center relative pb-6 md:pt-28 md:pb-8">
            <h1 className="h1 mb-4" data-aos="fade-up">
              <span className="text-sky-600">StreamLine</span> Dashboard
            </h1>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <button
                className="btn text-white rounded-md bg-sky-600 hover:bg-sky-700 w-full mb-4 sm:w-auto sm:mb-0"
                onClick={() => nav('/search')}
              >
                Edit Current Content
              </button>
              <button
                className="btn text-white rounded-md bg-slate-800 dark:bg-slate-700 hover:bg-slate-800 w-full sm:w-auto sm:ml-4"
                onClick={() => nav('/results')}
              >
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
                <h2 className="text-2xl font-bold mb-2">Watchlist</h2>
                <DisplaySelected items={media} onRemoveItem={removeItem} />
              </div>
            </div>
          </section>

          <section className="w-1/2 px-8 py-5">
            <MainBundle bundle={bundle} userData={media} />
          </section>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}

export default UserDash;
