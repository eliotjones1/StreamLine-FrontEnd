import React from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Constraints({media, budget, onSetBudget}) {
  const nav = useNavigate();
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;

  const setLocalStorage = () => {
    let newBudget = parseFloat(document.getElementById("budget").value);
    if (media.length === 0){
      alert("Please select desired content!");
    } else if (isNaN(newBudget)) {
      alert("Please provide a valid budget!");
    } else {
      localStorage.setItem('budget', JSON.stringify(newBudget));
      nav('/results');
    }
  };

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <div className='flex relative mx-auto w-full pb-10 align-center'>
          <h2 className="text-2xl font-bold pr-1">Monthly</h2>
          <h2 className="text-2xl font-bold pr-4">Budget:</h2>
          <div className="container relative pb-10">
            {
              session !== undefined ?
              <input id="budget" type="number" value={budget} onChange={(event) => {onSetBudget(event.target.value)}} step="0.01" min="0" className="absolute rounded-md pl-6 pr-1 text-right bg-slate-100 dark:bg-white text-gray-900 placeholder-gray-500"/>
              :
              <input id="budget" type="number" placeholder='0.00' step="0.01" min="0" className="absolute rounded-md pl-6 pr-1 text-right text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500"/>
            }
            <span className="absolute flex h-full items-center left-3 text-slate-800 dark:text-gray-500">
              $
            </span>
          </div>
          <button className="text-2xl font-bold h-full cursor-pointer text-sky-500" onClick={setLocalStorage}>Submit</button>
        </div>
      </div>
    </section>
  );
}

export default Constraints;