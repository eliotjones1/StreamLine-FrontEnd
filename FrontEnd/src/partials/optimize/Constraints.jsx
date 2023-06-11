import React from 'react'
import { useNavigate } from 'react-router-dom';

function Constraints({items, budget, onSetBudget}) {
  const nav = useNavigate();
  const setLocalStorage = () => {
    let newBudget = parseFloat(document.getElementById("budget").value);
    if (items.length === 0){
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
              document.cookie !== "" ?
              <input id="budget" type="number" value={budget} onChange={(event) => {onSetBudget(event.target.value)}} step="0.01" min="0" className="absolute rounded-md pl-6 pr-1 text-right bg-slate-100 dark:bg-white text-gray-900 placeholder-gray-500"/>
              :
              <input id="budget" type="number" placeholder='0.00' step="0.01" min="0" className="absolute rounded-md pl-6 pr-1 text-right text-gray-900 bg-slate-100 dark:bg-white placeholder-gray-500"/>
            }
            <span className="absolute flex h-full items-center left-3 text-slate-800 dark:text-gray-500">
              $
            </span>
          </div>
          {items.length === 0 ? <p></p> : <a className="text-2xl font-bold h-full cursor-pointer text-sky-500" onClick={setLocalStorage}>Submit</a>}
          
        </div>


        
        {/* <div className="pb-6">
          <a className="btn cursor-pointer text-white bg-sky-600 hover:bg-sky-700 w-full mb-4 sm:w-auto sm:mb-0" onClick={setLocalStorage}>
            Submit
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default Constraints;