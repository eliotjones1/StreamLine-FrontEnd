import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ContentSearch from '../partials/optimize/ContentSearch';
import DisplaySelected from '../partials/optimize/DisplaySelected';
import Constraints from '../partials/optimize/Constraints';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

function Optimize() {
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState(0.00);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
    let temp = items;
    temp.push(item);
    if (session !== undefined) {
      axios.post("http://127.0.0.1:8000/saveMedia/", [session.email, temp]);
    } else {
      localStorage.setItem('selectedContent', JSON.stringify(temp));
    }
  };

  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
    let temp = items.filter((_, index) => index !== indexToRemove);
    if (session !== undefined) {
      axios.post("http://127.0.0.1:8000/saveMedia/", [session.email, temp]);
    } else {
      localStorage.setItem('selectedContent', JSON.stringify(temp));
    }
  };

  const updateBudget = (newVal) => {
    setBudget(newVal);
    if (session !== undefined) {
      axios.post("http://127.0.0.1:8000/saveBudget/", [session.email, newVal]);
    }
  }

  const removeAll = () => {
    setItems([]);
    if (session !== undefined) {
      axios.post("http://127.0.0.1:8000/saveMedia/", [session.email, []]);
    } else {
      localStorage.removeItem('selectedContent');
    }
  }

  useEffect(() => {
    if (session !== undefined) {
      axios.get("http://127.0.0.1:8000/returnData/?email=" + session.email).then(response => {
        setItems(response.data.media);
        setBudget(JSON.parse(response.data.budget));
      }).catch(error => {
        console.log(error);
      });
    } else {
      if (localStorage.getItem('selectedContent') !== null){
        setItems(JSON.parse(localStorage.getItem('selectedContent')));
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <ContentSearch onAddItem={addItem}/>
        <DisplaySelected items={items} onRemoveItem={removeItem} removeAll={removeAll}/>
        <Constraints items={items} budget={budget} onSetBudget={updateBudget} />
      </main>
    </div>
  );
}

export default Optimize;