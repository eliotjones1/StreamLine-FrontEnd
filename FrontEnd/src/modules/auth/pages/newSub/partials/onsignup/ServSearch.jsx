import { useState, useEffect } from 'react';

import CurSubs from './ListSubs';
import AltDisplay from './AltDisplay';

function SearchServs() {
  const [media, setMedia] = useState([]);
  const [dates, setDates] = useState([]);

  const addItem = (newMedia) => {
    setMedia((prevMedia) => {
      const updatedMedia = prevMedia ? [...prevMedia, newMedia] : [newMedia];
      let temp = media ? [...media, newMedia] : [newMedia];
      localStorage.setItem('selectedContent', JSON.stringify(temp));
      return updatedMedia;
    });
  };

  const removeItem = (indexToRemove) => {
    setMedia(media.filter((_, index) => index !== indexToRemove));
    let temp = media.filter((_, index) => index !== indexToRemove);
    localStorage.setItem('selectedContent', JSON.stringify(temp));
    console.log(dates);
    console.log(indexToRemove);
    setDates(dates.filter((_, index) => index !== indexToRemove));
    let temp2 = dates.filter((_, index) => index !== indexToRemove);
    localStorage.setItem('selectedDates', JSON.stringify(temp2));
  };

  useEffect(() => {
    setMedia(JSON.parse(localStorage.getItem('selectedContent')));
    setDates(JSON.parse(localStorage.getItem('selectedDates')));
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="grow">
        <CurSubs onAddItem={addItem} />

        <section>
          <div className="max-w-4xl mx-auto py-10">
            <div className="container max-w-4xl w-full mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Your Streaming Services</h2>
              </div>
              <AltDisplay items={media} onRemoveItem={removeItem} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SearchServs;
