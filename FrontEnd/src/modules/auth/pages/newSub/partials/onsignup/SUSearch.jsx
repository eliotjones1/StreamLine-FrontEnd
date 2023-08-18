import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ContentSearch from './AltContentSearch';
import DisplaySelected from './DisplaySelected';

function SearchMedia() {
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  const [media, setMedia] = useState([]);
  const [budget, setBudget] = useState(0.0);

  const addItem = (newMedia) => {
    setMedia((prevMedia) => [...prevMedia, newMedia]);
    let temp = media;
    temp.push(newMedia);
    if (session !== undefined) {
      axios
        .post('http://127.0.0.1:8000/saveMedia/', [session.email, temp], { withCredentials: true })
        .catch((error) => {
          // Add Error Modal
        });
    } else {
      localStorage.setItem('selectedContent', JSON.stringify(temp));
    }
  };

  const removeItem = (indexToRemove) => {
    setMedia(media.filter((_, index) => index !== indexToRemove));
    let temp = media.filter((_, index) => index !== indexToRemove);
    if (session !== undefined) {
      axios
        .post('http://127.0.0.1:8000/saveMedia/', [session.email, temp], { withCredentials: true })
        .catch((error) => {
          // Add Error Modal
        });
    } else {
      localStorage.setItem('selectedContent', JSON.stringify(temp));
    }
  };

  const removeAll = () => {
    setMedia([]);
    if (session !== undefined) {
      axios
        .post('http://127.0.0.1:8000/saveMedia/', [session.email, []], { withCredentials: true })
        .catch((error) => {
          // Add Error Modal
        });
    } else {
      localStorage.removeItem('selectedContent');
    }
  };

  useEffect(() => {
    if (session !== undefined) {
      axios
        .get('http://127.0.0.1:8000/returnData/?email=' + session.email, { withCredentials: true })
        .then((response) => {
          setMedia(response.data.media);
          setBudget(JSON.parse(response.data.budget));
        })
        .catch((error) => {
          // Add Error Modal
        });
    } else if (localStorage.getItem('selectedContent') !== null) {
      setMedia(JSON.parse(localStorage.getItem('selectedContent')));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="grow">
        <ContentSearch onAddItem={addItem} />

        <section>
          <div className="max-w-4xl mx-auto py-10">
            <div className="container max-w-4xl w-full mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Selected Movies/Shows</h2>
                {media.length !== 0 && (
                  <button
                    className="text-2xl font-bold mb-4 bg-transparent border-none cursor-pointer text-gray-500"
                    onClick={removeAll}
                  >
                    Clear All
                  </button>
                )}
              </div>
              <DisplaySelected items={media} onRemoveItem={removeItem} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SearchMedia;
